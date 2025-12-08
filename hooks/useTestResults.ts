"use client";
import useSWR from "swr";
import { getRecentTestResults } from "@/actions/userDetails";

const useTestResults = (limit: number = 10) => {
  const { data, isLoading, mutate, error } = useSWR(
    ["test-results", limit],
    () => getRecentTestResults(limit),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  );

  return { testResults: data || [], isLoading, mutate, error };
};

export default useTestResults;

