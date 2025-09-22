import { Bug } from "lucide-react";

interface ErrorProps {
  text?: string;
}

export function Error({ text = "Something went wrong!" }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-1">
        <Bug className=" text-red-500 animate-pulse" />
        <p className="text-lg font-medium">{text}</p>
      </div>
    </div>
  );
}
