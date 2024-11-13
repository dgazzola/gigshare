import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import config from "./config";
import RedBox from "redbox-react";

document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app");

  if (reactElement) {
    const root = createRoot(reactElement);

    if (config.nodeEnv === "development") {
      try {
        root.render(<App />);
      } catch (e) {
        root.render(<RedBox error={e} />);
      }
    } else {
      root.render(<App />);
    }

    if (module.hot) {
      module.hot.accept("./components/App", () => {
        root.render(<App />);
      });
    }
  }
});