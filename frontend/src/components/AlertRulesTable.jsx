import EmptyState from "./EmptyState.jsx";
import { TableSkeletonRows } from "./Skeleton.jsx";

export default function AlertRulesTable({ data, isLoading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold">Alert Rules</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Name</th>
              <th className="py-3 pr-4 font-semibold">Scope</th>
              <th className="py-3 pr-4 font-semibold">Threshold</th>
              <th className="py-3 font-semibold">Last Triggered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeletonRows columns={4} />
            ) : data.length === 0 ? (
              <tr>
                <td className="py-4" colSpan="4">
                  <EmptyState title="No alert rules yet" description="Create a threshold rule to start monitoring usage." />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td className="py-3 pr-4 font-medium">{item.name}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600">{item.apiKey || "All API keys"}</td>
                  <td className="py-3 pr-4">{item.threshold} requests</td>
                  <td className="py-3 text-slate-600">
                    {item.lastTriggeredAt ? new Date(item.lastTriggeredAt).toLocaleString() : "Not triggered"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
