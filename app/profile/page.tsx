"use client";

import UserProfileCard from "@/components/user/userProfileCard";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, Target, Trophy } from "lucide-react";
import { useState } from "react";

// Mock data structure matching the final version's expected format
interface MockUserProfile {
  totalTests: number;
  avgWpm: number;
  avgAccuracy: number;
  bestWpm: number;
}

interface MockTestResult {
  id: number;
  wpm: number;
  accuracy: number;
  createdAt: Date | null;
}

const mockUserProfile: MockUserProfile = {
  totalTests: 3,
  avgWpm: 64,
  avgAccuracy: 97,
  bestWpm: 71,
};

const mockRecentTests: MockTestResult[] = [
  { id: 1, wpm: 71, accuracy: 91, createdAt: new Date(Date.now() - 58 * 60 * 1000) },
  { id: 2, wpm: 63, accuracy: 100, createdAt: new Date(Date.now() - 59 * 60 * 1000) },
  { id: 3, wpm: 59, accuracy: 100, createdAt: new Date(Date.now() - 60 * 60 * 1000) },
];

const formatTimeAgo = (date: Date | null) => {
  if (!date) return "Unknown";
  const now = new Date();
  const testDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - testDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return testDate.toLocaleDateString();
};

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({ title, value, subtitle, icon, color = "#00d9ff" }: StatCardProps) => {
  return (
    <div className="bg-[#1a1f2e] p-6 rounded-2xl shadow-lg border border-[rgba(0,217,255,0.1)] stat-card-glow relative overflow-hidden group hover:border-[rgba(0,217,255,0.3)] transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 via-transparent to-[#9d4edd]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wide font-mono">{title}</h3>
          <div className="p-2 bg-[#0f1419] rounded-lg border border-[rgba(0,217,255,0.2)]" style={{ color }}>
            {icon}
          </div>
        </div>
        <div className="text-3xl font-bold font-mono text-white mb-2" style={{ color }}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-[#94a3b8]">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

interface ActivityItemProps {
  test: MockTestResult;
}

const ActivityItem = ({ test }: ActivityItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1419]/50 border border-[rgba(57,255,20,0.1)] hover:border-[rgba(57,255,20,0.3)] transition-all duration-300 group">
      <div className="mt-1 relative">
        <div className="w-3 h-3 bg-[#39ff14] rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]"></div>
        <div className="absolute inset-0 w-3 h-3 bg-[#39ff14] rounded-full animate-ping opacity-20"></div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white font-mono mb-1">Completed typing test</p>
        <p className="text-xs text-[#94a3b8] font-mono">
          {formatTimeAgo(test.createdAt)} • <span className="text-[#00d9ff]">{test.wpm} WPM</span> • <span className="text-[#39ff14]">{test.accuracy}% accuracy</span>
        </p>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  // Mock state - will be replaced with hooks in final version
  const [userProfile] = useState<MockUserProfile | null>(mockUserProfile);
  const [recentTests] = useState<MockTestResult[]>(mockRecentTests);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: In final version, this will call:
    // await refreshProfile();
    // await refreshTests();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="h-ex-nav-footer overflow-y-auto bg-[#0f1419] p-4 md:p-6">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-mono text-white">Profile</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-[#1a1f2e] border-[rgba(0,217,255,0.2)] text-[#00d9ff] hover:bg-[#1a1f2e] hover:border-[rgba(0,217,255,0.4)] hover:text-[#00d9ff] font-mono"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <UserProfileCard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Tests"
            value={userProfile?.totalTests ?? 0}
            subtitle="All time tests"
            icon={<Trophy className="h-5 w-5" />}
            color="#00d9ff"
          />
          <StatCard
            title="Average WPM"
            value={userProfile?.avgWpm ?? 0}
            subtitle={userProfile?.avgAccuracy ? `${userProfile.avgAccuracy}% accuracy` : undefined}
            icon={<Target className="h-5 w-5" />}
            color="#9d4edd"
          />
          <StatCard
            title="Best WPM"
            value={userProfile?.bestWpm ?? 0}
            subtitle="Personal best"
            icon={<Clock className="h-5 w-5" />}
            color="#00d9ff"
          />
        </div>

        <div className="bg-[#1a1f2e] p-6 rounded-2xl shadow-lg border border-[rgba(0,217,255,0.1)] activity-card-glow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 via-transparent to-[#9d4edd]/5 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold font-mono text-white mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentTests.length === 0 ? (
                <p className="text-[#94a3b8] text-sm font-mono text-center py-4">
                  No tests completed yet. Start typing to see your results here!
                </p>
              ) : (
                recentTests.map((test) => (
                  <ActivityItem key={test.id} test={test} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
