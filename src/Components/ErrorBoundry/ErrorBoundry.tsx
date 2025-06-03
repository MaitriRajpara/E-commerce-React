import React from "react";
import type { ErrorBoundaryState, ErrorBoundaryProps } from "../../Type/Type";

class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ color: "red", textAlign: "center" }}>
            <h2>Something went wrong.</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  return (
    <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>
  );
};

export default ErrorBoundary;
