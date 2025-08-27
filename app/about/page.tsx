export default function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Zebra Board</h1>
      <p className="mb-4">
        Zebra Board is a typing speed test application inspired by MonkeyType. It helps users improve their typing skills by providing real-time feedback on speed and accuracy.
      </p>
      <p className="mb-4">
        Our mission is to make typing practice fun and effective. Whether you're a beginner or an expert, Zebra Board offers customizable tests to suit your needs.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Real-time typing speed and accuracy tracking</li>
        <li>Customizable test modes</li>
        <li>Multiple themes</li>
        <li>Statistics and leaderboards</li>
      </ul>
    </div>
  );
}