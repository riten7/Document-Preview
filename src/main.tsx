import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DocPreviewContextProvider } from "./context/DocPreviewContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DocPreviewContextProvider>
      <App />
    </DocPreviewContextProvider>
  </React.StrictMode>
);
