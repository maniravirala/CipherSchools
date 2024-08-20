import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [windowOpen, setWindowOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newWindow = window.open("/test", "_blank", "popup");

    if (newWindow) {
      // Ensure the window is loaded before attaching onload
      const interval = setInterval(() => {
        if (newWindow.document.readyState === 'complete') {
          clearInterval(interval);
          setWindowOpen(true);
        }
      }, 100);

      window.addEventListener("message", (event) => {
        if (event.data.type === "TEST_SUBMITTED") {
          setWindowOpen(false);
          navigate("/finish");
        }
      });

      // Fallback to close the window if the user tries to close it
      newWindow.onbeforeunload = () => {
        setWindowOpen(false);
      };
    } else {
      console.error("Failed to open new window. It might be blocked by the browser.");
    }

    return () => {
        window.removeEventListener("message", () => {});
    };
  }, []);

  return(
    <div className="h-screen flex items-center justify-center">
        {windowOpen ? (
            <div className="text-center">
            <h1 className="text-3xl font-bold">Test Page</h1>
            <p className="mt-4 text-lg">This is a test page.</p>
            </div>
        ) : (
            <div className="text-center">
            <h1 className="text-3xl font-bold">Loading Test Page...</h1>
            <p className="mt-4 text-lg">Please wait while we load the test page.</p>
            </div>
        )}
    </div>
  )
};

export default TestPage;
