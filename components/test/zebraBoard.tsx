"use client";

import { RotateCcw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TEST_DURATIONS } from "./constants";
import TestResult from "./testResult";

const ZebraBoard: React.FC = () => {
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [selectedTime, setSelectedTime] = useState(TEST_DURATIONS[0]);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATIONS[0]);
  const [isTestActive, setIsTestActive] = useState(true);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const inputRefCallback = React.useCallback((node: HTMLDivElement) => {
    inputRef.current = node;
  }, []);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.paragraphs.length);
        setCurrentParagraph(data.paragraphs[randomIndex]);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && startTime && isTestActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTestActive) {
      setIsTestActive(false);
      setIsTestFinished(true);
    }
  }, [timeLeft, startTime, isTestActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isTestActive) return;

    let newInput = userInput;
    let newIndex = currentIndex;

    if (e.key === "Backspace") {
      newInput = userInput.slice(0, -1);
      newIndex = Math.max(0, currentIndex - 1);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      newInput = userInput + e.key;
      newIndex = currentIndex + 1;
    } else {
      return; // Ignore other keys
    }

    setUserInput(newInput);
    setCurrentIndex(newIndex);

    if (!startTime) {
      setStartTime(Date.now());
      setTimeLeft(selectedTime);
    }

    // Calculate WPM
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const wordsTyped = newInput.length / 5; // average word length
      setWpm(Math.round(wordsTyped / timeElapsed));
    }

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] === currentParagraph[i]) {
        correctChars++;
      }
    }
    setAccuracy(Math.round((correctChars / newInput.length) * 100) || 100);

    // Check if paragraph is completed
    if (newInput.length === currentParagraph.length) {
      // Load new paragraph and append it
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          const randomIndex = Math.floor(
            Math.random() * data.paragraphs.length,
          );
          const newParagraph = data.paragraphs[randomIndex];
          setCurrentParagraph((prev) => prev + " " + newParagraph);
        });
    }

    e.preventDefault();
  };

  const renderText = () => {
    return currentParagraph.split("").map((char, index) => {
      let className = "text-gray-400";
      if (index < userInput.length) {
        className =
          userInput[index] === char
            ? "text-green-400"
            : "text-red-400 bg-red-900";
      } else if (index === currentIndex && isTestActive) {
        className = "bg-blue-600 text-white";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const restartTest = () => {
    setUserInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(selectedTime);
    setIsTestActive(true);
    setIsTestFinished(false);
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.paragraphs.length);
        setCurrentParagraph(data.paragraphs[randomIndex]);
      });
  };

  return (
    <div className="h-full flex-center flex-col p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <Tooltip>
            <TooltipTrigger>
              <Tabs
                value={selectedTime.toString()}
                onValueChange={(value) => {
                  const time = parseInt(value);
                  setSelectedTime(time);
                  if (!startTime) setTimeLeft(time);
                }}
              >
                <TabsList>
                  {TEST_DURATIONS.map((duration) => (
                    <TabsTrigger key={duration} value={duration.toString()}>
                      {duration}s
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </TooltipTrigger>
            <TooltipContent>test duration</TooltipContent>
          </Tooltip>
          <Button
            onClick={restartTest}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Tooltip>
              <TooltipTrigger>
                <RotateCcw className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Restart Test</TooltipContent>
            </Tooltip>
          </Button>
        </div>
        <div className="flex-between mb-4 text-sm text-primary">
          <span>WPM: {wpm}</span>
          <span>Accuracy: {accuracy}%</span>
          <span>Time: {timeLeft}s</span>
        </div>
        {isTestFinished ? (
          <TestResult wpm={wpm} accuracy={accuracy} testDuration={selectedTime} restartTest={restartTest} />
        ) : (
          <div className="relative">
            <div
              ref={inputRefCallback}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!startTime) setIsFocused(false);
              }}
              className="text-xl font-mono font-extrabold leading-relaxed mb-4 focus:outline-none cursor-text p-4"
            >
              {renderText()}
            </div>
            {!isFocused && !isTestFinished && (
              <div
                className="absolute inset-0 bg-opacity-50 rounded backdrop-blur-sm flex items-center justify-center cursor-pointer"
                onClick={() => inputRef.current?.focus()}
              >
                <p className="text-primary text-lg font-medium">
                  Click to Focus and start typing
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZebraBoard;
