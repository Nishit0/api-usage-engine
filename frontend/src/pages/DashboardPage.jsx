import { Activity, KeyRound, RefreshCw } from "lucide-react";
import CallsPerDayChart, { CallsPerDayChartSkeleton } from "../components/CallsPerDayChart.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Shell from "../components/Shell.jsx";
import StatCard from "../components/StatCard.jsx";
import { StatCardSkeleton } from "../components/Skeleton.jsx";
import TopApiKeysTable from "../components/TopApiKeysTable.jsx";
import { useDashboardQueries } from "../hooks/useDashboardQueries.js";

const formatNumber = (value) => new Intl.NumberFormat().format(value || 0);

export default function DashboardPage({ onLogout, user }) {
  const {
    totalCalls,
    callsPerDay,
    topApiKeys,
    isLoading,
    isFetching,
    error,
    refresh
  } = useDashboardQueries({ days: 30, limit: 10 });

  return (
    <Shell onLogout={onLogout} user={user}>
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Live API usage overview</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal sm:text-3xl">API Usage Dashboard</h1>
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

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              helper="Across all tracked API keys"
              icon={Activity}
              title="Total API Calls"
              value={formatNumber(totalCalls)}
            />
            <StatCard
              helper="Keys with recorded usage"
              icon={KeyRound}
              title="Active API Keys"
              tone="mint"
              value={formatNumber(topApiKeys.length)}
            />
          </>
        )}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">
        {isLoading ? <CallsPerDayChartSkeleton /> : <CallsPerDayChart data={callsPerDay} />}
        <TopApiKeysTable data={topApiKeys} isLoading={isLoading} />
      </div>
    </Shell>
  );
}
