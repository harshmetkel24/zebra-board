export interface UserProfile {
  name: string;
  username?: string;
  email?: string;
  title?: string;
  level?: number;
  avatarUrl?: string;
}

export interface UserStats {
  totalTests: number;
  avgWpm: number;
  avgAccuracy?: number;
  bestWpm: number;
}

export interface RecentTest {
  id: string | number;
  wpm: number;
  accuracy: number;
  timeAgo: string;
  createdAt?: Date | string;
}

export interface ProfileData {
  profile: UserProfile;
  stats: UserStats;
  recentTests: RecentTest[];
}

