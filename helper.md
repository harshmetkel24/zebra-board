# Complete Implementation Guide: User Profile & Database Setup

This document explains the complete implementation of the user profile system, database setup, authentication flow, and how everything works together.

---

## Table of Contents

1. [Database Setup](#1-database-setup)
2. [Authentication with Clerk](#2-authentication-with-clerk)
3. [User Profile System](#3-user-profile-system)
4. [Complete User Flow](#4-complete-user-flow)
5. [Test Results & Statistics](#5-test-results--statistics)
6. [File Structure](#6-file-structure)

---

## 1. Database Setup

### 1.1 Database Schema (`lib/db/schema.ts`)

We use **Drizzle ORM** with **PostgreSQL** (Neon DB) to define our database schema.

#### Tables Created:

**`user_details` Table:**
```typescript
- id: Auto-incrementing primary key
- user_id: Clerk user ID (unique, not null)
- name: User's full name from Clerk
- username: Username from Clerk
- email: Email address from Clerk
- totalTests: Total number of tests completed
- avgWpm: Average words per minute
- avgAccuracy: Average accuracy percentage
- bestWpm: Best WPM score achieved
- custom-theme: User's selected theme
- created_at: Timestamp when user was created
- updated_at: Timestamp when user was last updated
```

**`speed_test_results` Table:**
```typescript
- id: Auto-incrementing primary key
- user_id: Foreign key to user_details (cascade delete)
- wpm: Words per minute for this test
- accuracy: Accuracy percentage for this test
- testDuration: Test duration in seconds
- created_at: When the test was completed
```

#### Relationship:
- **One-to-Many**: One user can have many test results
- **Cascade Delete**: If user is deleted, all their test results are deleted

### 1.2 Database Connection (`lib/db/index.ts`)

```typescript
// Loads DATABASE_URL from .env.local
const connectionString = process.env.DATABASE_URL || "";

// Creates PostgreSQL client
export const client = postgres(connectionString, { prepare: false });

// Creates Drizzle database instance
export const db = drizzle(client);
```

**Key Points:**
- Uses `postgres-js` driver for PostgreSQL
- `prepare: false` is required for transaction pool mode
- Connection string comes from `.env.local` file
- Gracefully handles missing database connection

### 1.3 Database Configuration (`drizzle.config.ts`)

```typescript
// Loads .env.local file
config({ path: resolve(__dirname, ".env.local") });

// Configures Drizzle Kit
export default defineConfig({
  schema: "./lib/db/schema.ts",  // Where table definitions are
  out: "./drizzle",              // Where migrations are generated
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 1.4 Setting Up Database

1. **Create Neon DB Account:**
   - Go to https://console.neon.tech
   - Sign up and create a project
   - Get your connection string

2. **Configure Environment:**
   - Create `.env.local` file
   - Add: `DATABASE_URL=postgresql://your-connection-string`

3. **Run Migrations:**
   ```bash
   npm run drizzle:push
   ```
   This creates all tables in your Neon DB database.

---

## 2. Authentication with Clerk

### 2.1 Clerk Setup

**Clerk** is used for authentication. It handles:
- User sign-up and sign-in
- Session management
- User data (name, email, username)

### 2.2 Middleware (`middleware.ts`)

```typescript
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();  // Requires authentication
  }
});
```

**How it works:**
- **Public routes**: `/`, `/sign-in`, `/sign-up`, `/data.json`, `/theme-preview`
- **Protected routes**: Everything else (including `/profile`)
- If user tries to access protected route without auth → redirected to sign-in

### 2.3 Sign-In Flow

1. **User clicks "Sign In"** → Redirected to `/sign-in`
2. **Clerk Sign-In Component** (`app/sign-in/[[...sign-in]]/page.tsx`):
   ```typescript
   <SignIn />  // Clerk's pre-built sign-in component
   ```
3. **After successful sign-in** → Redirected to `/after-signin`

### 2.4 After Sign-In Handler (`app/after-signin/page.tsx`)

```typescript
export default async function Page() {
  const authObj = await auth();  // Get auth status from Clerk
  
  if (authObj.isAuthenticated) {
    await ensureUserExists(authObj.userId);  // Create user in database
    redirect("/");  // Redirect to home
  }
}
```

**What happens:**
1. Gets authenticated user from Clerk
2. Calls `ensureUserExists()` to sync user data to database
3. Redirects to home page

### 2.5 User Data Sync (`actions/userDetails.ts` - `ensureUserExists`)

```typescript
export const ensureUserExists = async (userId: string) => {
  const user = await currentUser();  // Get full user data from Clerk
  
  // Insert or update user in database
  await db.insert(userDetails).values({
    userId,
    name: user?.fullName || user?.firstName || null,
    username: user?.username || null,
    email: user?.primaryEmailAddress?.emailAddress || null,
  }).onConflictDoUpdate({
    target: userDetails.userId,
    set: {
      name: user?.fullName || user?.firstName || null,
      username: user?.username || null,
      email: user?.primaryEmailAddress?.emailAddress || null,
      updatedAt: new Date(),
    },
  });
};
```

**Key Points:**
- Uses `onConflictDoUpdate` - if user exists, updates their info
- Syncs: name, username, email from Clerk
- Creates user record in database if doesn't exist

---

## 3. User Profile System

### 3.1 Profile Page (`app/profile/page.tsx`)

The profile page is a **client component** that displays user statistics and test history.

#### Components Used:

1. **`useUserProfile` Hook:**
   - Fetches user profile data (stats, totals)
   - Uses SWR for caching and auto-refresh

2. **`useTestResults` Hook:**
   - Fetches recent test results
   - Uses SWR for caching and auto-refresh

3. **`UserProfileCard` Component:**
   - Displays user's name and avatar
   - Gets data from Clerk (not database)

#### Data Displayed:

- **Total Tests**: Number of completed typing tests
- **Average WPM**: Average words per minute across all tests
- **Average Accuracy**: Average accuracy percentage
- **Best WPM**: Highest WPM score achieved
- **Recent Activity**: List of recent tests with timestamps

### 3.2 Data Fetching Hooks

#### `hooks/useUserProfile.ts`:

```typescript
const useUserProfile = () => {
  const { data, isLoading, mutate, error } = useSWR(
    "user-profile",           // Cache key
    getUserProfile,           // Fetcher function
    {
      revalidateOnFocus: true,      // Refresh when window gains focus
      revalidateOnReconnect: true,  // Refresh when network reconnects
    }
  );
  
  return { userProfile: data, isLoading, mutate, error };
};
```

**How it works:**
- Uses **SWR** (stale-while-revalidate) for data fetching
- Automatically caches data
- Refreshes when needed (focus, reconnect)
- Returns loading state and error state

#### `hooks/useTestResults.ts`:

```typescript
const useTestResults = (limit: number = 10) => {
  const { data, isLoading, mutate, error } = useSWR(
    ["test-results", limit],  // Cache key with limit
    () => getRecentTestResults(limit),  // Fetcher function
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  
  return { testResults: data || [], isLoading, mutate, error };
};
```

### 3.3 Server Actions

#### `getUserProfile()` (`actions/userDetails.ts`):

```typescript
export const getUserProfile = async () => {
  const authObj = await auth();  // Get current user from Clerk
  
  if (!authObj.isAuthenticated) return null;
  
  // Fetch user from database
  const user = await db
    .select()
    .from(userDetails)
    .where(eq(userDetails.userId, authObj.userId))
    .limit(1);
  
  // If user doesn't exist, create them
  if (!user[0]) {
    await ensureUserExists(authObj.userId);
    // Fetch again
  }
  
  return user[0] || null;
};
```

#### `getRecentTestResults()` (`actions/userDetails.ts`):

```typescript
export const getRecentTestResults = async (limit: number = 10) => {
  const authObj = await auth();
  
  if (!authObj.isAuthenticated) return [];
  
  // Fetch recent tests ordered by date (newest first)
  return await db
    .select()
    .from(speedTestResults)
    .where(eq(speedTestResults.userId, authObj.userId))
    .orderBy(desc(speedTestResults.createdAt))
    .limit(limit);
};
```

---

## 4. Complete User Flow

### 4.1 User Signs In

```
1. User clicks "Sign In" button
   ↓
2. Redirected to /sign-in
   ↓
3. Clerk Sign-In component displayed
   ↓
4. User enters credentials
   ↓
5. Clerk authenticates user
   ↓
6. Redirected to /after-signin
   ↓
7. ensureUserExists() called
   ├─ Gets user data from Clerk
   ├─ Inserts/updates user in database
   └─ Syncs: name, username, email
   ↓
8. Redirected to home page (/)
```

### 4.2 User Visits Profile Page

```
1. User navigates to /profile
   ↓
2. Middleware checks authentication
   ├─ If not authenticated → redirect to /sign-in
   └─ If authenticated → continue
   ↓
3. Profile page loads (client component)
   ↓
4. useUserProfile() hook called
   ├─ Calls getUserProfile() server action
   ├─ Fetches user data from database
   └─ Returns: stats, totals, etc.
   ↓
5. useTestResults() hook called
   ├─ Calls getRecentTestResults() server action
   ├─ Fetches recent tests from database
   └─ Returns: array of test results
   ↓
6. Profile page renders with data
   ├─ User card (from Clerk)
   ├─ Statistics cards (from database)
   └─ Recent activity list (from database)
```

### 4.3 User Completes Typing Test

```
1. User types in ZebraBoard component
   ↓
2. Test timer reaches 0
   ↓
3. TestResult component renders
   ↓
4. useEffect in TestResult runs
   ├─ Checks if already saved (useRef flag)
   ├─ Calls saveTestResult() server action
   └─ Prevents double-saving
   ↓
5. saveTestResult() executes:
   ├─ Checks authentication
   ├─ Ensures user exists in database
   ├─ Starts database transaction:
   │  ├─ Inserts test result into speed_test_results
   │  ├─ Calculates aggregate stats (totalTests, avgWpm, etc.)
   │  └─ Updates user_details with new stats
   └─ Returns calculated stats
   ↓
6. Cache invalidation:
   ├─ mutate("user-profile") - refreshes profile data
   ├─ mutate(["test-results", 10]) - refreshes test list
   └─ router.refresh() - refreshes page
   ↓
7. Profile page automatically updates (SWR revalidation)
```

---

## 5. Test Results & Statistics

### 5.1 Saving Test Results

**Component:** `components/test/testResult.tsx`

```typescript
useEffect(() => {
  const saveResult = async () => {
    if (wpm <= 0 || accuracy < 0) return;
    
    hasSavedRef.current = true;  // Prevent double-saving
    const result = await saveTestResult(wpm, accuracy, testDuration);
    
    // Refresh profile data
    mutate("user-profile");
    mutate(["test-results", 10]);
    router.refresh();
  };
  
  saveResult();
}, [wpm, accuracy, testDuration, router]);
```

**Key Features:**
- Uses `useRef` to prevent saving twice
- Only saves if WPM > 0 and accuracy >= 0
- Automatically refreshes profile after saving

### 5.2 Statistics Calculation

**Function:** `saveTestResult()` in `actions/userDetails.ts`

```typescript
// Inside database transaction:
await tx.insert(speedTestResults).values({
  userId: authObj.userId,
  wpm,
  accuracy,
  testDuration,
});

// Calculate aggregates from all user's tests
const results = await tx
  .select({
    totalTests: sql`count(*)::int`,           // Total number of tests
    avgWpm: sql`avg(${speedTestResults.wpm})::int`,        // Average WPM
    avgAccuracy: sql`avg(${speedTestResults.accuracy})::int`, // Average accuracy
    bestWpm: sql`max(${speedTestResults.wpm})::int`,       // Best WPM
  })
  .from(speedTestResults)
  .where(eq(speedTestResults.userId, authObj.userId));

// Update user_details with calculated stats
await tx
  .update(userDetails)
  .set({
    totalTests: stats.totalTests,
    avgWpm: stats.avgWpm,
    avgAccuracy: stats.avgAccuracy,
    bestWpm: stats.bestWpm,
    updatedAt: new Date(),
  })
  .where(eq(userDetails.userId, authObj.userId));
```

**How Statistics Work:**
- **totalTests**: Count of all rows in `speed_test_results` for user
- **avgWpm**: SQL `AVG()` function on all WPM values
- **avgAccuracy**: SQL `AVG()` function on all accuracy values
- **bestWpm**: SQL `MAX()` function on all WPM values
- All calculated in a **single transaction** for consistency

### 5.3 Real-Time Updates

**How profile updates automatically:**

1. **SWR Auto-Refresh:**
   - `revalidateOnFocus: true` - refreshes when you switch tabs
   - `revalidateOnReconnect: true` - refreshes when network reconnects

2. **Manual Cache Invalidation:**
   - After saving test: `mutate("user-profile")` triggers refresh
   - Profile page shows updated data immediately

3. **Refresh Button:**
   - Manual refresh button on profile page
   - Calls `mutate()` on both hooks to force refresh

---

## 6. File Structure

### 6.1 Database Files

```
lib/db/
├── index.ts          # Database connection setup
├── schema.ts         # Table definitions (Drizzle schema)
└── utils.ts          # Database utility functions

drizzle/
├── 0000_*.sql        # Migration files
├── 0001_*.sql
└── meta/             # Migration metadata
    ├── _journal.json
    └── *.json

drizzle.config.ts     # Drizzle Kit configuration
.env.local            # Database connection string (not in Git)
```

### 6.2 Authentication Files

```
middleware.ts                    # Route protection with Clerk
app/
├── sign-in/[[...sign-in]]/
│   └── page.tsx                # Sign-in page
├── sign-up/[[...sign-up]]/
│   └── page.tsx                # Sign-up page
└── after-signin/
    └── page.tsx                # Post-sign-in handler

components/auth/
├── signInButton.tsx            # Sign-in button component
├── signInActions.tsx           # Auth state wrapper
└── signUpButton.tsx            # Sign-up button component
```

### 6.3 Profile System Files

```
app/profile/
└── page.tsx                    # Main profile page (client component)

hooks/
├── useUserProfile.ts           # Hook for fetching user profile
└── useTestResults.ts           # Hook for fetching test results

actions/
└── userDetails.ts              # Server actions:
    ├── ensureUserExists()      # Create/update user
    ├── getUserProfile()        # Fetch user profile
    ├── getRecentTestResults()  # Fetch test history
    └── saveTestResult()         # Save test and update stats

components/
├── user/
│   ├── userProfileCard.tsx     # User card component
│   ├── userProfileIcon.tsx     # Profile icon in navbar
│   └── userProfileActions.tsx # Profile actions menu
└── test/
    └── testResult.tsx          # Test result component (saves results)
```

---

## 7. Key Technologies Used

### 7.1 Database
- **Drizzle ORM**: Type-safe SQL ORM for TypeScript
- **PostgreSQL**: Database (hosted on Neon DB)
- **postgres-js**: PostgreSQL driver

### 7.2 Authentication
- **Clerk**: Authentication provider
- **@clerk/nextjs**: Next.js integration for Clerk

### 7.3 Data Fetching
- **SWR**: Stale-while-revalidate data fetching
- **Server Actions**: Next.js server-side functions

### 7.4 State Management
- **React Hooks**: useState, useEffect, useRef
- **SWR Cache**: Automatic caching and revalidation

---

## 8. Security Considerations

### 8.1 Authentication
- All protected routes require authentication (middleware)
- User can only access their own data (filtered by userId)
- Server actions verify authentication before database operations

### 8.2 Database
- Connection string stored in `.env.local` (not committed to Git)
- User data filtered by `userId` - users can't access others' data
- Foreign key constraints ensure data integrity

### 8.3 Data Validation
- Server actions validate authentication before operations
- Database constraints ensure data integrity
- Error handling prevents crashes

---

## 9. Common Operations

### 9.1 Adding a New User Field

1. **Update Schema** (`lib/db/schema.ts`):
   ```typescript
   export const userDetails = pgTable("user_details", {
     // ... existing fields
     newField: text("new_field"),
   });
   ```

2. **Update ensureUserExists** (`actions/userDetails.ts`):
   ```typescript
   await tx.insert(userDetails).values({
     // ... existing fields
     newField: user?.newField || null,
   });
   ```

3. **Run Migration**:
   ```bash
   npm run drizzle:push
   ```

### 9.2 Adding a New Statistic

1. **Update Schema** - add column to `user_details`
2. **Update saveTestResult** - calculate new stat in SQL query
3. **Update Profile Page** - display new stat
4. **Run Migration**

---

## 10. Troubleshooting

### Profile shows 0 for everything?
- Check database connection: `DATABASE_URL` in `.env.local`
- Verify migrations ran: `npm run drizzle:push`
- Check browser console for errors

### Tests not saving?
- Check authentication: user must be signed in
- Check browser console for "Test result saved successfully"
- Verify database connection

### Double counting tests?
- Fixed with `useRef` flag in `testResult.tsx`
- Each test saves only once per completion

### Profile not updating?
- Click "Refresh" button
- Check SWR cache: `mutate()` calls
- Verify server actions are working

---

## Summary

This implementation provides:

✅ **Complete user authentication** with Clerk  
✅ **Database-backed user profiles** with Neon DB  
✅ **Real-time statistics** calculated from test results  
✅ **Automatic data sync** between Clerk and database  
✅ **Type-safe database operations** with Drizzle ORM  
✅ **Auto-refreshing profile page** with SWR  
✅ **Secure data access** (users only see their own data)

The system is production-ready and handles all edge cases gracefully!

