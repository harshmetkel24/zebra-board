"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  accuracy: number;
  wpm: number;
  restartTest: () => void;
}

const getPerformanceTier = (wpm: number, accuracy: number) => {
  if (wpm >= 100 && accuracy >= 98) return { tier: "Elite Typist", color: "#00d9ff", icon: "👑" };
  if (wpm >= 80 && accuracy >= 95) return { tier: "Master Level", color: "#7c3aed", icon: "⭐" };
  if (wpm >= 60 && accuracy >= 90) return { tier: "Rising Star", color: "#10b981", icon: "✨" };
  if (wpm >= 40) return { tier: "Getting Better", color: "#0099ff", icon: "📈" };
  return { tier: "Keep Practicing", color: "#94a3b8", icon: "💪" };
};

const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const endValue = value;
    const durationMs = duration;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / durationMs, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (endValue - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span className="count-up">{count}</span>;
};

const CircularProgressRing = ({ value, max, size = 120, strokeWidth = 8, color }: { value: number; max: number; size?: number; strokeWidth?: number; color: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min((value / max) * 100, 100);
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="circular-progress" style={{ width: size, height: size }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring"
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color }}>
            <AnimatedCounter value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TestResult = (props: Props) => {
  const { accuracy, wpm, restartTest } = props;
  const performance = getPerformanceTier(wpm, accuracy);
  const wpmColor = wpm >= 80 ? "#00d9ff" : wpm >= 60 ? "#0099ff" : "#7c3aed";
  const accuracyColor = accuracy >= 95 ? "#10b981" : accuracy >= 90 ? "#00d9ff" : "#ef4444";

  return (
    <Card className="p-8 text-center w-md mx-auto test-complete-pop dark:bg-[rgba(26,31,46,0.8)] bg-white dark:border-[rgba(255,255,255,0.08)] border-[#e5e5e5] dark:backdrop-blur-[8px] rounded-[18px] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] shadow-[0_0_20px_rgba(0,0,0,0.04)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: 'linear-gradient(45deg, #00d9ff, #7c3aed, #00d9ff)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 3s ease infinite'
      }}></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 dark:bg-[rgba(0,217,255,0.1)] bg-[rgba(0,217,255,0.05)] dark:border-[rgba(0,217,255,0.3)] border-[rgba(0,217,255,0.2)] border rounded-full px-4 py-2 mb-4">
            <Trophy className="h-4 w-4" style={{ color: performance.color }} />
            <span className="text-sm font-semibold" style={{ color: performance.color }}>
              {performance.tier} {performance.icon}
            </span>
          </div>
          <h2 className="text-2xl font-bold dark:text-[#f1f5f9] text-[#1a1a1a]">Test Complete!</h2>
        </div>
        
        <div className="flex justify-center gap-12 mb-8">
          <div className="flex flex-col items-center">
            <CircularProgressRing value={wpm} max={150} color={wpmColor} />
            <p className="text-sm dark:text-[#94a3b8] text-[#808080] mt-3 uppercase tracking-wide font-semibold">WPM</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgressRing value={accuracy} max={100} color={accuracyColor} />
            <p className="text-sm dark:text-[#94a3b8] text-[#808080] mt-3 uppercase tracking-wide font-semibold">Accuracy</p>
          </div>
        </div>
        
        <Button 
          onClick={restartTest} 
          className="w-full dark:bg-[#00d9ff] dark:hover:bg-[#0099ff] bg-[#4a4aff] hover:bg-[#3a3ae6] text-white rounded-[10px] dark:shadow-[0_0_12px_rgba(0,217,255,0.4)] font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5" 
          variant="default"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart Test
        </Button>
      </div>
    </Card>
  );
};

export default TestResult;
