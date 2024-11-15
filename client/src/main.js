import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import config from "./config";
import RedBox from "redbox-react";
import { FavoritesProvider } from "./context/FavoritesContext";

document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app");

  if (reactElement) {
    const root = createRoot(reactElement);

    const renderApp = (Component) => {
      root.render(
        <FavoritesProvider>
          <Component />
        </FavoritesProvider>
      );
    };

    if (config.nodeEnv === "development") {
      try {
        renderApp(App);
      } catch (e) {
        root.render(<RedBox error={e} />);
      }
    } else {
      renderApp(App);
    }

    if (module.hot) {
      module.hot.accept("./components/App", () => {
        renderApp(App);
      });
    }
  }
});