"use client";

import { Activity, RotateCcw, Target, Timer, Zap } from "lucide-react";
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
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
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
      const newWpm = Math.round(wordsTyped / timeElapsed);
      setWpm(newWpm);
      
      // Update WPM history for chart (keep last 20 points)
      setWpmHistory(prev => {
        const updated = [...prev, newWpm].slice(-20);
        return updated;
      });
    }

    // Calculate accuracy and streak
    let correctChars = 0;
    let currentStreak = 0;
    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] === currentParagraph[i]) {
        correctChars++;
        if (i === newInput.length - 1) {
          currentStreak = streak + 1;
        }
      } else {
        currentStreak = 0;
      }
    }
    setAccuracy(Math.round((correctChars / newInput.length) * 100) || 100);
    setStreak(currentStreak);
    if (currentStreak > maxStreak) {
      setMaxStreak(currentStreak);
    }

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
      let className = "dark:text-[#94a3b8] text-[#808080] inline transition-all duration-200";
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = "dark:text-[#10b981] text-[#27ae60] typing-correct char-typed inline";
        } else {
          className = "dark:text-[#ef4444] text-[#c0392b] dark:bg-[#ef4444]/20 bg-[#c0392b]/20 typing-incorrect inline";
        }
      } else if (index === currentIndex && isTestActive) {
        className = "dark:bg-[#00d9ff] dark:text-[#0f1419] bg-[#4a4aff] text-white relative inline dark:shadow-[0_0_10px_rgba(0,217,255,0.8)]";
      }
      return (
        <span key={index} className={className} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  const CircularProgress = ({ value, max, color, label, icon: Icon }: { value: number; max: number; color: string; label: string; icon: any }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min((value / max) * 100, 100);
    const offset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="circular-progress w-24 h-24">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="progress-ring"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${progress > 50 ? 'metric-glow' : ''}`} style={{ color }}>
                {value}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {Icon && <Icon className="h-4 w-4 dark:text-[#94a3b8] text-[#808080]" />}
          <p className="text-xs dark:text-[#94a3b8] text-[#808080] uppercase tracking-wider font-semibold">{label}</p>
        </div>
      </div>
    );
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
    setWpmHistory([]);
    setStreak(0);
    setMaxStreak(0);
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.paragraphs.length);
        setCurrentParagraph(data.paragraphs[randomIndex]);
      });
  };


  return (
    <div className="h-full flex-center flex-col p-4 md:p-6 dark:bg-[#0f1419] bg-[#fafafa]">
      <div className="w-full max-w-5xl pt-10">
        {!isTestFinished && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
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
                      <TabsList className="glassmorphic-button rounded-full p-1 gap-1 border-0">
                        {TEST_DURATIONS.map((duration) => (
                          <TabsTrigger 
                            key={duration} 
                            value={duration.toString()}
                            className={`glassmorphic-button rounded-full px-4 py-1.5 transition-all duration-300 ${
                              selectedTime === duration ? 'active' : ''
                            } dark:text-[#94a3b8] text-[#1f2937] dark:data-[state=active]:text-[#00d9ff] data-[state=active]:text-[#1f2937]`}
                          >
                            {duration}s
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </TooltipTrigger>
                  <TooltipContent>test duration</TooltipContent>
                </Tooltip>
              </div>
              <Button
                onClick={restartTest}
                variant="ghost"
                size="sm"
                className="p-2 dark:hover:bg-[rgba(255,255,255,0.1)] hover:bg-[#eaeaea] rounded-lg transition-all duration-300"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <RotateCcw className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Restart Test</TooltipContent>
                </Tooltip>
              </Button>
            </div>

            <div className="dark:bg-[#1a1f2e] bg-white rounded-2xl p-6 mb-6 dark:border-[rgba(255,255,255,0.08)] border-[#e5e5e5] border shadow-lg">
              <div className="grid grid-cols-3 gap-8 text-center">
                <CircularProgress 
                  value={wpm} 
                  max={150} 
                  color="#00d9ff" 
                  label="WPM" 
                  icon={Activity}
                />
                <CircularProgress 
                  value={accuracy} 
                  max={100} 
                  color={accuracy >= 95 ? "#10b981" : accuracy >= 90 ? "#00d9ff" : "#ef4444"} 
                  label="Accuracy" 
                  icon={Target}
                />
                <CircularProgress 
                  value={timeLeft} 
                  max={selectedTime} 
                  color="#7c3aed" 
                  label="Time" 
                  icon={Timer}
                />
              </div>
              
              {wpmHistory.length > 1 && (
                <div className="mt-6 h-16 relative">
                  <svg className="w-full h-full" viewBox={`0 0 ${wpmHistory.length * 10} 60`} preserveAspectRatio="none">
                    <polyline
                      points={wpmHistory.map((w, i) => `${i * 10},${60 - (w / 150) * 60}`).join(' ')}
                      fill="none"
                      stroke="#00d9ff"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
              )}
            </div>

            {streak > 0 && (
              <div className="flex justify-end mb-4">
                <div className="streak-badge dark:bg-[#1a1f2e] bg-white dark:border-[rgba(0,217,255,0.3)] border-[#00d9ff] border rounded-full px-4 py-2 flex items-center gap-2 dark:text-[#00d9ff] text-[#4a4aff]">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-semibold">Streak: {streak}</span>
                </div>
              </div>
            )}
          </>
        )}

        {isTestFinished ? (
          <div className="result-container flex justify-center items-center mt-10">
            <TestResult wpm={wpm} accuracy={accuracy} restartTest={restartTest} />
          </div>
        ) : (
          <div className={`relative dark:bg-[#1a1f2e] bg-white dark:border-[rgba(255,255,255,0.08)] border-[#e5e5e5] border rounded-2xl p-8 md:p-12 dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] shadow-[0_4px_15px_rgba(0,0,0,0.06)] gradient-border-glow ${startTime ? 'active' : ''}`}>
            <div
              ref={inputRefCallback}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!startTime) setIsFocused(false);
              }}
              className="relative text-xl md:text-2xl font-mono font-extrabold leading-relaxed focus:outline-none cursor-text min-h-[250px] z-10 dark:text-[#f1f5f9] text-[#1a1a1a] w-full"
              style={{ 
                wordBreak: 'break-word', 
                overflowWrap: 'break-word',
                maxWidth: '100%',
                overflow: 'visible',
                whiteSpace: 'pre-wrap'
              }}
            >
              {renderText()}
            </div>
            {!isFocused && !isTestFinished && (
              <div
                className="absolute inset-0 dark:bg-[#0f1419]/90 bg-[#fafafa]/90 rounded-2xl backdrop-blur-sm flex items-center justify-center cursor-pointer z-20 transition-opacity duration-300"
                onClick={() => inputRef.current?.focus()}
              >
                <div className="text-center">
                  <p className="dark:text-[#00d9ff] text-[#4a4aff] text-lg font-semibold mb-1">
                    Click to Focus and start typing
                  </p>
                  <p className="text-xs dark:text-[#94a3b8] text-[#808080]">Begin typing to start the test</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZebraBoard;
