import EmptyState from "./EmptyState.jsx";
import { TableSkeletonRows } from "./Skeleton.jsx";

export default function AlertEventsTable({ data, isLoading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold">Triggered Alerts</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Alert</th>
              <th className="py-3 pr-4 font-semibold">API Key</th>
              <th className="py-3 pr-4 font-semibold">Usage</th>
              <th className="py-3 font-semibold">Triggered At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeletonRows columns={4} />
            ) : data.length === 0 ? (
              <tr>
                <td className="py-4" colSpan="4">
                  <EmptyState title="No alerts triggered" description="Triggered alerts will appear when usage crosses a rule threshold." />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td className="py-3 pr-4 font-medium">{item.rule?.name || item.message}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600">{item.apiKey || "All API keys"}</td>
                  <td className="py-3 pr-4">{item.currentUsage} / {item.threshold}</td>
                  <td className="py-3 text-slate-600">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
