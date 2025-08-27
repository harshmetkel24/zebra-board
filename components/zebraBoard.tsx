"use client";

import React, { useEffect, useState } from "react";

const ZebraBoard: React.FC = () => {
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.paragraphs.length);
        setCurrentParagraph(data.paragraphs[randomIndex]);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    setCurrentIndex(value.length);

    // Calculate WPM
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const wordsTyped = value.length / 5; // average word length
      setWpm(Math.round(wordsTyped / timeElapsed));
    }

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentParagraph[i]) {
        correctChars++;
      }
    }
    setAccuracy(Math.round((correctChars / value.length) * 100) || 100);
  };

  const renderText = () => {
    return currentParagraph.split("").map((char, index) => {
      let className = "text-gray-400";
      if (index < userInput.length) {
        className =
          userInput[index] === char
            ? "text-green-400"
            : "text-red-400 bg-red-900";
      } else if (index === currentIndex) {
        className = "bg-blue-600 text-white";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="h-full flex-center flex-col p-4">
      <div className="w-full max-w-4xl">
        <div className="flex-between mb-4 text-sm text-amber-300">
          <span>WPM: {wpm}</span>
          <span>Accuracy: {accuracy}%</span>
        </div>
        <div className="text-xl font-mono leading-relaxed mb-4">
          {renderText()}
        </div>
        <textarea
          value={userInput}
          onChange={handleInputChange}
          className="w-full bg-gray-700 text-white font-mono p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Start typing here..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default ZebraBoard;
