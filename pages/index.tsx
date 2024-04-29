import { useState } from "react";

export default function Home() {
  // 1. Storing the text that the user will enter in the textarea -> String
  const [text, setText] = useState("");
  // 2. Saving the summary that the AI API will send us -> String
  const [summary, setSummary] = useState("");
  // 3. For storing the current state of the app -> Boolean
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          min_length: 100,
          max_length: 300,
        }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg py-24 space-y-24 min-h-screen flex flex-col justify-center">
      <div className="space-y-6 w-full text-center">
        <h1 className="text-6xl font-bold">Shorten AI</h1>
        <p>Unlock the power of text summarization with AI.</p>
      </div>
      <div className="space-y-4 w-full">
        <div className="p-4 border rounded flex flex-col space-y-4 bg-gray-50">
          <textarea
            className="border rounded p-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleClick}
            className="bg-black text-white rounded px-4 py-2"
          >
            Summarize
          </button>
        </div>
      </div>
      <div className="border space-y-2 rounded bg-white overflow-hidden">
        <div className="p-2">{summary}</div>
      </div>
    </div>
  );
}