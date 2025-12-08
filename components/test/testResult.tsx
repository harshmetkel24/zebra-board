import { saveTestResult } from "@/actions/userDetails";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";

interface Props {
  accuracy: number;
  wpm: number;
  testDuration: number;
  restartTest: () => void;
}

const TestResult = (props: Props) => {
  const { accuracy, wpm, testDuration, restartTest } = props;
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const hasSavedRef = useRef(false);

  useEffect(() => {
    if (hasSavedRef.current) return;
    
    const saveResult = async () => {
      if (wpm <= 0 || accuracy < 0) return;
      
      hasSavedRef.current = true;
      setIsSaving(true);
      try {
        const result = await saveTestResult(wpm, accuracy, testDuration);
        console.log("Test result saved:", result);
        
        mutate("user-profile", undefined, { revalidate: true });
        mutate(["test-results", 10], undefined, { revalidate: true });
        
        router.refresh();
      } catch (error) {
        console.error("Error saving test result:", error);
        hasSavedRef.current = false;
      } finally {
        setIsSaving(false);
      }
    };
    
    saveResult();
  }, [wpm, accuracy, testDuration, router]);

  const handleRestart = () => {
    hasSavedRef.current = false;
    restartTest();
  };

  return (
    <Card className="p-6 text-center w-md">
      <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
      <div className="space-y-2 mb-6">
        <p className="text-lg">
          WPM: <span className="font-semibold">{wpm}</span>
        </p>
        <p className="text-lg">
          Accuracy: <span className="font-semibold">{accuracy}%</span>
        </p>
      </div>
      <Button onClick={handleRestart} className="m-auto">
        Restart Test
      </Button>
    </Card>
  );
};

export default TestResult;
