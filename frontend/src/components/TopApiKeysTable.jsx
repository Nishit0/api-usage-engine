import EmptyState from "./EmptyState.jsx";
import { TableSkeletonRows } from "./Skeleton.jsx";

export default function TopApiKeysTable({ data, isLoading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold">API Keys</h2>
        <p className="mt-1 text-sm text-slate-500">Ranked by total usage</p>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">API Key</th>
              <th className="py-3 pr-4 font-semibold">Calls</th>
              <th className="py-3 pr-4 font-semibold">Avg Response</th>
              <th className="py-3 font-semibold">Last Used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeletonRows columns={4} />
            ) : data.length === 0 ? (
              <tr>
                <td className="py-4" colSpan="4">
                  <EmptyState
                    description="Generate API keys and send protected requests to see usage rankings."
                    title="No API key usage yet"
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.apiKey}>
                  <td className="py-3 pr-4 font-mono text-xs">{item.apiKey}</td>
                  <td className="py-3 pr-4 font-medium">{item.calls}</td>
                  <td className="py-3 pr-4">{item.averageResponseTime ?? 0} ms</td>
                  <td className="py-3 text-slate-600">
                    {item.lastUsedAt ? new Date(item.lastUsedAt).toLocaleString() : "Never"}
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
