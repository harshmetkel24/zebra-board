import { getRecentTestResults, getUserProfile } from "@/actions/userDetails";
import UserProfileCard from "@/components/user/userProfileCard";
import { Clock, Target, Trophy } from "lucide-react";

export default async function ProfilePage() {
  const userProfile = await getUserProfile();
  const recentTests = await getRecentTestResults(10);

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

  return (
    <div className="h-ex-nav-footer overflow-y-auto flex-center bg-background p-4">
      <div className="w-3xl max-w-4xl mx-auto space-y-6">
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
