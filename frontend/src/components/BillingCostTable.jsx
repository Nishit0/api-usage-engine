import EmptyState from "./EmptyState.jsx";
import { TableSkeletonRows } from "./Skeleton.jsx";

export default function BillingCostTable({ data, isLoading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold">Cost Per API Key</h2>
        <p className="mt-1 text-sm text-slate-500">Usage-based billing by key</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">API Key</th>
              <th className="py-3 pr-4 font-semibold">Requests</th>
              <th className="py-3 pr-4 font-semibold">Pricing</th>
              <th className="py-3 pr-4 font-semibold">Billable Units</th>
              <th className="py-3 font-semibold">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeletonRows columns={5} />
            ) : data.length === 0 ? (
              <tr>
                <td className="py-4" colSpan="5">
                  <EmptyState
                    description="Billable usage appears after API requests are logged."
                    title="No billable usage available"
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.apiKey}>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600">{item.apiKey}</td>
                  <td className="py-3 pr-4">{item.totalRequests}</td>
                  <td className="py-3 pr-4 text-slate-600">
                    {item.pricing?.requestsPerUnit || 1000} requests = {item.unitCost} {item.currency}
                  </td>
                  <td className="py-3 pr-4">{item.billableUnits}</td>
                  <td className="py-3 font-medium">
                    {item.totalCost} {item.currency}
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
