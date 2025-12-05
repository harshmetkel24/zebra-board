import { saveTestResult } from "@/actions/userDetails";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

interface Props {
  accuracy: number;
  wpm: number;
  testDuration: number;
  restartTest: () => void;
}

const TestResult = (props: Props) => {
  const { accuracy, wpm, testDuration, restartTest } = props;

  useEffect(() => {
    saveTestResult(wpm, accuracy, testDuration);
  }, [wpm, accuracy, testDuration]);

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
      <Button onClick={restartTest} className="m-auto">
        Restart Test
      </Button>
    </Card>
  );
};

export default TestResult;
