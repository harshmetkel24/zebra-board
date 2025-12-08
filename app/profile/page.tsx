"use client";

import UserProfileCard from "@/components/user/userProfileCard";
import useTestResults from "@/hooks/useTestResults";
import useUserProfile from "@/hooks/useUserProfile";
import { testDatabaseConnection } from "@/actions/testDb";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, Target, Trophy } from "lucide-react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { userProfile, isLoading: profileLoading, mutate: refreshProfile } = useUserProfile();
  const { testResults: recentTests, isLoading: testsLoading, mutate: refreshTests } = useTestResults(10);

  useEffect(() => {
    testDatabaseConnection().then((result) => {
      console.log("Database connection test:", result);
    });
  }, []);

  const handleRefresh = async () => {
    console.log("Manual refresh triggered");
    await refreshProfile();
    await refreshTests();
  };

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

  if (profileLoading || testsLoading) {
    return (
      <div className="h-ex-nav-footer overflow-y-auto flex-center bg-background p-4">
        <div className="w-3xl max-w-4xl mx-auto space-y-6">
          <div className="text-center">Loading profile data...</div>
        </div>
      </div>
    );
  }

  const hasDatabaseError = !userProfile && !profileLoading;

  return (
    <div className="h-ex-nav-footer overflow-y-auto flex-center bg-background p-4">
      <div className="w-3xl max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={profileLoading || testsLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${(profileLoading || testsLoading) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        {hasDatabaseError && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
              ⚠️ Database Not Connected
            </h2>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              The profile page cannot load data because the database connection is not configured.
            </p>
            <div className="space-y-2 text-sm text-red-600 dark:text-red-400">
              <p><strong>To fix this:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Get your Neon DB connection string from <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" className="underline">console.neon.tech</a></li>
                <li>Open <code className="bg-red-200 dark:bg-red-800 px-1 rounded">.env.local</code> file</li>
                <li>Replace the placeholder with your actual connection string</li>
                <li>Run <code className="bg-red-200 dark:bg-red-800 px-1 rounded">pnpm drizzle:push</code> to set up the database</li>
                <li>Restart the dev server</li>
              </ol>
            </div>
          </div>
        )}

        <UserProfileCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Total Tests</h3>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">
              {userProfile?.totalTests || 0}
            </div>
            <p className="text-xs text-muted-foreground">All time tests</p>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Average WPM</h3>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">
              {userProfile?.avgWpm || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {userProfile?.avgAccuracy || 0}% accuracy
            </p>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Best WPM</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">
              {userProfile?.bestWpm || 0}
            </div>
            <p className="text-xs text-muted-foreground">Personal best</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentTests.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tests completed yet. Start typing to see your results here!
              </p>
            ) : (
              recentTests.map((test) => (
                <div key={test.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed typing test</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(test.createdAt)} • {test.wpm} WPM •{" "}
                      {test.accuracy}% accuracy
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
