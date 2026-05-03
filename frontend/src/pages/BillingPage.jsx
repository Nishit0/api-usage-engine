import { RefreshCw } from "lucide-react";
import BillingCostTable from "../components/BillingCostTable.jsx";
import BillingSummaryCards from "../components/BillingSummaryCards.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Shell from "../components/Shell.jsx";
import { useBillingSummary } from "../hooks/useBillingSummary.js";

export default function BillingPage({ onLogout, user }) {
  const {
    items,
    totalRequests,
    totalBillableUnits,
    totalCost,
    currency,
    isLoading,
    isFetching,
    error,
    refresh
  } = useBillingSummary();

  return (
    <Shell onLogout={onLogout} user={user}>
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Usage-based charges</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal sm:text-3xl">Billing</h1>
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

      <div className="mt-6 space-y-6">
        <BillingSummaryCards
          currency={currency}
          isLoading={isLoading}
          totalBillableUnits={totalBillableUnits}
          totalCost={totalCost}
          totalRequests={totalRequests}
        />
        <BillingCostTable data={items} isLoading={isLoading} />
      </div>
    </Shell>
  );
}
