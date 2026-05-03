import { CreditCard, Gauge, Hash } from "lucide-react";
import StatCard from "./StatCard.jsx";
import { StatCardSkeleton } from "./Skeleton.jsx";

const formatNumber = (value) => new Intl.NumberFormat().format(value || 0);

export default function BillingSummaryCards({ currency, isLoading, totalBillableUnits, totalCost, totalRequests }) {
  if (isLoading) {
    return (
      <section className="grid gap-4 md:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard
        helper="Requests included in this billing view"
        icon={Hash}
        title="Total Requests"
        value={formatNumber(totalRequests)}
      />
      <StatCard
        helper="Usage converted by pricing rule"
        icon={Gauge}
        title="Billable Units"
        tone="mint"
        value={totalBillableUnits.toFixed(4)}
      />
      <StatCard
        helper={`Estimated charge in ${currency}`}
        icon={CreditCard}
        title="Total Cost"
        tone="amber"
        value={`${totalCost.toFixed(4)} ${currency}`}
      />
    </section>
  );
}
