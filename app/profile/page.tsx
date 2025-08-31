import UserProfileCard from "@/components/user/userProfileCard";
import { Clock, Target, Trophy } from "lucide-react";

export default function ProfilePage() {
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
            <div className="text-2xl font-bold mt-2">127</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Average WPM</h3>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">68</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Best Time</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">2:34</div>
            <p className="text-xs text-muted-foreground">Fastest completion</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed typing test</p>
                <p className="text-xs text-muted-foreground">
                  2 hours ago • 72 WPM • 98% accuracy
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Achieved new personal best
                </p>
                <p className="text-xs text-muted-foreground">
                  1 day ago • 85 WPM
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Leveled up to Level 5</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
