import { RefreshCw } from "lucide-react";
import AlertEventsTable from "../components/AlertEventsTable.jsx";
import AlertRuleForm from "../components/AlertRuleForm.jsx";
import AlertRulesTable from "../components/AlertRulesTable.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Shell from "../components/Shell.jsx";
import { useAlerts } from "../hooks/useAlerts.js";

export default function AlertsPage({ onLogout, user }) {
  const {
    rules,
    events,
    apiKeys,
    createRule,
    isCreating,
    isLoading,
    isFetching,
    error,
    refresh
  } = useAlerts();

  return (
    <Shell onLogout={onLogout} user={user}>
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Threshold monitoring</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal sm:text-3xl">Usage Alerts</h1>
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
        <AlertRuleForm apiKeys={apiKeys} isCreating={isCreating} onCreate={createRule} />
        <AlertRulesTable data={rules} isLoading={isLoading} />
        <AlertEventsTable data={events} isLoading={isLoading} />
      </div>
    </Shell>
  );
}
