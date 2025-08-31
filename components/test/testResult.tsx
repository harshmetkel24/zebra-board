import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  accuracy: number;
  wpm: number;
  restartTest: () => void;
}

const TestResult = (props: Props) => {
  const { accuracy, wpm, restartTest } = props;

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
      <Button onClick={restartTest} className="w-full">
        Restart Test
      </Button>
    </Card>
  );
};

export default TestResult;
