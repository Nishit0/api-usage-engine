export function SkeletonLine({ className = "", style }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} style={style} />;
}

export function StatCardSkeleton() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <SkeletonLine className="h-4 w-28" />
          <SkeletonLine className="mt-3 h-8 w-32" />
          <SkeletonLine className="mt-3 h-4 w-44" />
        </div>
        <SkeletonLine className="h-9 w-9 shrink-0" />
      </div>
    </section>
  );
}

export function TableSkeletonRows({ columns, rows = 4 }) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: columns }).map((__, columnIndex) => (
        <td className="py-3 pr-4" key={columnIndex}>
          <SkeletonLine className="h-4 w-full max-w-36" />
        </td>
      ))}
    </tr>
  ));
}
