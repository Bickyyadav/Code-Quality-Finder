import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import { useState } from "react";
import Markdown from "react-markdown";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Add loading state
  const [prompt, setCode] = useState(` function sum() {
  return 1 + 1
}`);

  async function reviewCode() {
    setLoading(true); // ✅ Show loading state before fetching
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        prompt,
      });

      setReview(response.data);
    } catch (error) {
      setReview("🚀 ~ reviewCode ~ error:", error);
    }
    setLoading(false); // ✅ Hide loading state after response
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <pre>
              <code className="language-javascript">
                <Editor
                  value={prompt}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) =>
                    prism.highlight(
                      code,
                      prism.languages.javascript,
                      "javascript"
                    )
                  }
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    borderRadius: "5px",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </code>
            </pre>
          </div>
          <button onClick={reviewCode} className="review">
            {loading ? "Loading..." : "Review Code"}{" "}
            {/* ✅ Show loading text */}
          </button>
        </div>
        <div className="right">
          {loading ? (
            <p>Loading review...</p> // ✅ Show loading while waiting
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
