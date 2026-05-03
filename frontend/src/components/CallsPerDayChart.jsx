import EmptyState from "./EmptyState.jsx";
import { SkeletonLine } from "./Skeleton.jsx";

export default function CallsPerDayChart({ data }) {
  const maxCalls = Math.max(...data.map((item) => item.calls), 1);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Calls Per Day</h2>
          <p className="mt-1 text-sm text-slate-500">Daily request volume from usage logs</p>
        </div>
      </div>
      <div className="mt-6 flex h-64 items-end gap-2 overflow-x-auto border-b border-slate-200 pb-3">
        {data.length === 0 ? (
          <EmptyState
            description="Once protected endpoints receive traffic, daily request volume will appear here."
            title="No usage data available"
          />
        ) : (
          data.map((item) => (
            <div className="flex min-w-10 flex-1 flex-col items-center gap-2" key={item.date}>
              <div
                className="w-full rounded-t bg-ocean"
                style={{ height: `${Math.max((item.calls / maxCalls) * 100, 4)}%` }}
                title={`${item.date}: ${item.calls} calls`}
              />
              <span className="w-16 rotate-[-35deg] text-right text-xs text-slate-500">{item.date.slice(5)}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function CallsPerDayChartSkeleton() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <SkeletonLine className="h-5 w-32" />
      <SkeletonLine className="mt-2 h-4 w-56" />
      <div className="mt-6 flex h-64 items-end gap-2 border-b border-slate-200 pb-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonLine
            className="min-w-8 flex-1"
            key={index}
            style={{ height: `${24 + (index % 5) * 14}%` }}
          />
        ))}
      </div>
    </section>
  );
}
