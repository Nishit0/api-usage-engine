import { useQueries } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService.js";
import { queryKeys } from "../services/queryKeys.js";

export const useDashboardQueries = ({ days = 30, limit = 10 } = {}) => {
  const [totalCallsQuery, callsPerDayQuery, topApiKeysQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.dashboard.totalCalls,
        queryFn: dashboardService.getTotalCalls
      },
      {
        queryKey: queryKeys.dashboard.callsPerDay(days),
        queryFn: () => dashboardService.getCallsPerDay(days)
      },
      {
        queryKey: queryKeys.dashboard.topApiKeys(limit),
        queryFn: () => dashboardService.getTopApiKeys(limit)
      }
    ]
  });

  const queries = [totalCallsQuery, callsPerDayQuery, topApiKeysQuery];

  return {
    totalCalls: totalCallsQuery.data?.data?.total || 0,
    callsPerDay: callsPerDayQuery.data?.data || [],
    topApiKeys: topApiKeysQuery.data?.data || [],
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    error: queries.find((query) => query.error)?.error?.message || null,
    refresh: () => queries.forEach((query) => query.refetch())
  };
};
