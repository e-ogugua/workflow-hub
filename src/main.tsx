import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";

// PERFORMANCE OPTIMIZATION: Sentry error monitoring and performance tracking
const sentryDsn = "https://your-dsn@sentry.io/project-id"; // Replace with actual DSN from environment

if (sentryDsn && sentryDsn !== "https://your-dsn@sentry.io/project-id") {
  Sentry.init({
    dsn: sentryDsn,
    environment: 'production', // Simplified for now
    integrations: [
      Sentry.browserTracingIntegration({
        // Set up automatic instrumentation for performance monitoring
      }),
    ],
    // Performance monitoring
    tracesSampleRate: 1.0,
    // Error sampling
    sampleRate: 1.0,
    // Release tracking
    release: 'workflow-hub@4.0.0',
    // Ignore certain errors
    ignoreErrors: [
      'Non-Error promise rejection captured',
      'Network request failed',
      'AbortError',
    ],
    // Before sending errors
    beforeSend(event) {
      // Filter out development errors in production
      if (event.exception?.values?.[0]?.value?.includes('localhost')) {
        return null;
      }
      return event;
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Our team has been notified and is working to fix it.
            </p>
            <button
              onClick={resetError}
              className="bg-gradient-to-r from-ai-primary to-ai-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      onError={(error) => {
        console.error('Sentry Error Boundary caught an error:', error);
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
