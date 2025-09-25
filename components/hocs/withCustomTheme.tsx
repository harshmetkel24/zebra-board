"use client";

import { Error } from "@/components/helpers/error";
import { Loading } from "@/components/helpers/loading";
import useCustomTheme from "@/hooks/useCustomTheme";
import { type PropsWithChildren } from "react";

export default function WithCustomTheme({ children }: PropsWithChildren) {
  const { isLoading, error } = useCustomTheme();

  if (error) return <Error text="Error while downloading user data" />;

  if (isLoading) return <Loading text="Downloading user data" showProgress />;

  return <>{children}</>;
}
