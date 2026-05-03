import { useQuery } from "@tanstack/react-query";
import { billingService } from "../services/billingService.js";
import { queryKeys } from "../services/queryKeys.js";

export const useBillingSummary = () => {
  const billingQuery = useQuery({
    queryKey: queryKeys.billing.summary,
    queryFn: billingService.getBillingSummary
  });

  const items = billingQuery.data?.data || billingQuery.data || [];
  const totalRequests = items.reduce((sum, item) => sum + Number(item.totalRequests || 0), 0);
  const totalBillableUnits = items.reduce((sum, item) => sum + Number(item.billableUnits || 0), 0);
  const totalCost = items.reduce((sum, item) => sum + Number(item.totalCost || 0), 0);
  const currency = items[0]?.currency || "UNIT";

  return {
    items,
    totalRequests,
    totalBillableUnits,
    totalCost,
    currency,
    isLoading: billingQuery.isLoading,
    isFetching: billingQuery.isFetching,
    error: billingQuery.error?.message || null,
    refresh: billingQuery.refetch
  };
};
