import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./Components/ErrorBoundry/ErrorBoundry";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<h2>Oops something went Wrong !</h2>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
