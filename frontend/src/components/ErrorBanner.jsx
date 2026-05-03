import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-medium">Unable to load data</p>
          <p className="mt-1 text-red-600">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <button
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 font-medium text-red-700 hover:bg-red-100"
          onClick={onRetry}
          type="button"
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
          Retry
        </button>
      ) : null}
    </div>
  );
}
