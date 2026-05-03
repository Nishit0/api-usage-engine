import { RefreshCw } from "lucide-react";
import ApiKeyForm from "../components/ApiKeyForm.jsx";
import ApiKeysUsageTable from "../components/ApiKeysUsageTable.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Shell from "../components/Shell.jsx";
import { useApiKeys } from "../hooks/useApiKeys.js";

export default function ApiKeysPage({ onLogout, user }) {
  const {
    apiKeys,
    createApiKey,
    createdApiKey,
    isCreating,
    isLoading,
    isFetching,
    error,
    refresh
  } = useApiKeys();

  return (
    <Shell onLogout={onLogout} user={user}>
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Manage client access</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal sm:text-3xl">API Keys</h1>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isFetching}
          onClick={refresh}
          type="button"
        >
          <RefreshCw aria-hidden="true" className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      <ErrorBanner message={error} onRetry={refresh} />

      <div className="mt-6 grid gap-6">
        <ApiKeyForm createdApiKey={createdApiKey} isCreating={isCreating} onCreate={createApiKey} />
        <ApiKeysUsageTable data={apiKeys} isLoading={isLoading} />
      </div>
    </Shell>
  );
}
