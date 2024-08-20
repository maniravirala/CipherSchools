import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../app/globals.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <App />
//       <Toaster richColors position="top-center" theme="light" />
//     </AuthProvider>
//   </StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors position="top-center" theme="light" />
    </AuthProvider>
  </StrictMode>
);