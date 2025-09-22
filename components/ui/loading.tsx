import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function Loading({ text = "Loading...", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
        <p className="text-lg font-medium">{text}</p>
      </div>
    </div>
  );
}
