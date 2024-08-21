import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TestPage = () => {
  const [windowOpen, setWindowOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);

  const openNewTab = () => {
    const newWindow = window.open(`/test/${id}`, "_blank", "popup");

    if (newWindow) {
      // Ensure the window is loaded before attaching onload
      const interval = setInterval(() => {
        if (newWindow.document.readyState === "complete") {
          clearInterval(interval);
          setWindowOpen(true);
        }
      }, 100);

      window.addEventListener("message", (event) => {
        if (event.data.type === "TEST_SUBMITTED") {
          setWindowOpen(false);
          navigate("/finish");
        }
        if (event.data.type === "TEST_SUBMISSION_FAILED") {
          setWindowOpen(false);
          setError(event.data.message);
        }
      });

      // Fallback to close the window if the user tries to close it
      newWindow.onbeforeunload = () => {
        setWindowOpen(false);
      };

      newWindow.onunload = () => {
        setWindowOpen(false);
      };
    } else {
      console.error(
        "Failed to open new window. It might be blocked by the browser."
      );
    }
  };

  useEffect(() => {
    openNewTab();

    return () => {
      window.removeEventListener("message", () => {});
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      {windowOpen ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Test Page</h1>
          <p className="mt-4 text-lg">This is a test page.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Loading Test Page...</h1>
          <p className="mt-4 text-lg">
            Please wait while we load the test page.
          </p>
          {error && (
            <div>
              <p className="mt-4 text-red-500">{error}</p>
              <Link to="/">Go back</Link>
            </div>
          )}
          <button
            onClick={openNewTab}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Retry Opening Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
