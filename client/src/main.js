import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import config from "./config";
import RedBox from "redbox-react";

document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app");

  if (reactElement) {
    const root = createRoot(reactElement);

    // Render the app
    if (config.nodeEnv === "development") {
      try {
        root.render(<App />);
      } catch (e) {
        root.render(<RedBox error={e} />);
      }
    } else {
      root.render(<App />);
    }

    // Enable Hot Module Replacement (HMR) in development
    if (module.hot) {
      module.hot.accept("./components/App", () => {
        // If App.js changes, re-render the App component
        root.render(<App />);
      });
    }
  }
});