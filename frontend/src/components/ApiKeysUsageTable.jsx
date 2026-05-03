import EmptyState from "./EmptyState.jsx";
import { TableSkeletonRows } from "./Skeleton.jsx";

export default function ApiKeysUsageTable({ data, isLoading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold">Existing API Keys</h2>
        <p className="mt-1 text-sm text-slate-500">Key details with usage totals</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Name</th>
              <th className="py-3 pr-4 font-semibold">API Key</th>
              <th className="py-3 pr-4 font-semibold">Requests</th>
              <th className="py-3 pr-4 font-semibold">Success Rate</th>
              <th className="py-3 pr-4 font-semibold">Avg Response</th>
              <th className="py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeletonRows columns={6} />
            ) : data.length === 0 ? (
              <tr>
                <td className="py-4" colSpan="6">
                  <EmptyState
                    description="Create your first client key with the form above."
                    title="No API keys created yet"
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id || item.key}>
                  <td className="py-3 pr-4 font-medium">{item.name || "Unnamed key"}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600">{item.key}</td>
                  <td className="py-3 pr-4">{item.usage.totalRequests}</td>
                  <td className="py-3 pr-4">{item.usage.successRate}%</td>
                  <td className="py-3 pr-4">{item.usage.averageResponseTime || 0} ms</td>
                  <td className="py-3">
                    <span className={`rounded px-2 py-1 text-xs font-medium ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
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
