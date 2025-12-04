import UserProfileCard from "@/components/user/userProfileCard";
import { Clock, Sparkles, Star, Target, Trophy, TrendingUp } from "lucide-react";

const getScoreColor = (wpm: number, accuracy?: number) => {
  if (wpm >= 80 || (accuracy && accuracy >= 95)) {
    return "text-green-500 dark:text-green-400";
  }
  if (wpm >= 60 || (accuracy && accuracy >= 90)) {
    return "text-green-600 dark:text-green-500";
  }
  return "text-foreground";
};

const getScoreBgColor = (wpm: number, accuracy?: number) => {
  if (wpm >= 80 || (accuracy && accuracy >= 95)) {
    return "bg-green-500/10 border-green-500/20";
  }
  if (wpm >= 60 || (accuracy && accuracy >= 90)) {
    return "bg-green-600/10 border-green-600/20";
  }
  return "bg-card border-border";
};

export default function ProfilePage() {
  return (
    <div className="h-ex-nav-footer overflow-y-auto bg-background p-4 md:p-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-10 w-6 h-6 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
        <Star className="absolute top-40 right-20 w-4 h-4 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
        <Star className="absolute bottom-40 left-1/4 w-5 h-5 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
        <Star className="absolute top-1/3 right-1/3 w-3 h-3 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
        <Star className="absolute bottom-20 right-10 w-4 h-4 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
        <Star className="absolute top-60 left-1/3 w-5 h-5 text-primary/10 stroke-primary/20 fill-none" strokeWidth={1.5} />
      </div>
      
      <div className="w-full max-w-6xl mx-auto space-y-8 relative z-10">
        <UserProfileCard />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative bg-gradient-to-br from-card to-card/50 p-6 rounded-2xl shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Tests</h3>
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">127</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+12</span>
                <span className="text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-card to-card/50 p-6 rounded-2xl shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Average WPM</h3>
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Target className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">68</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+5</span>
                <span className="text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-card to-card/50 p-6 rounded-2xl shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Best Time</h3>
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">2:34</div>
              <p className="text-sm text-muted-foreground">Fastest completion</p>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-card to-card/50 p-8 rounded-2xl shadow-lg border border-border/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreBgColor(72, 98)}`}>
                <div className="mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">Completed typing test</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                    <span className="text-xs">•</span>
                    <span className={`text-sm font-bold ${getScoreColor(72)}`}>72 WPM</span>
                    <span className="text-xs">•</span>
                    <span className={`text-sm font-bold ${getScoreColor(0, 98)}`}>98% accuracy</span>
                  </div>
                </div>
                <Star className="h-4 w-4 text-green-500/50 stroke-green-500/30 fill-none" strokeWidth={1.5} />
              </div>
              
              <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreBgColor(85)}`}>
                <div className="mt-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                </div>
              <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">Achieved new personal best</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                    <span className="text-xs">•</span>
                    <span className={`text-sm font-bold ${getScoreColor(85)}`}>85 WPM</span>
                  </div>
                </div>
                <Star className="h-4 w-4 text-blue-500/50 stroke-blue-500/30 fill-none" strokeWidth={1.5} />
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-card/50 border-border/50 transition-all duration-200 hover:shadow-md">
                <div className="mt-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
              <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">Leveled up to Level 5</p>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <Star className="h-4 w-4 text-purple-500/50 stroke-purple-500/30 fill-none" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
