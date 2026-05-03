import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiKeyService } from "../services/apiKeyService.js";
import { queryKeys } from "../services/queryKeys.js";

export const useApiKeys = () => {
  const queryClient = useQueryClient();

  const apiKeysQuery = useQuery({
    queryKey: queryKeys.apiKeys.all,
    queryFn: apiKeyService.getApiKeys
  });

  const usageStatsQuery = useQuery({
    queryKey: queryKeys.apiKeys.usageStats,
    queryFn: apiKeyService.getUsageStats
  });

  const createKeyMutation = useMutation({
    mutationFn: apiKeyService.createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.apiKeys.all });
    }
  });

  const usageByKey = new Map(
    (usageStatsQuery.data?.data || usageStatsQuery.data || []).map((item) => [item.apiKey, item])
  );

  const apiKeys = (apiKeysQuery.data?.data || []).map((item) => ({
    ...item,
    usage: usageByKey.get(item.key) || {
      totalRequests: 0,
      successRate: 0,
      averageResponseTime: 0
    }
  }));

  return {
    apiKeys,
    createApiKey: createKeyMutation.mutateAsync,
    createdApiKey: createKeyMutation.data,
    isCreating: createKeyMutation.isPending,
    isLoading: apiKeysQuery.isLoading || usageStatsQuery.isLoading,
    isFetching: apiKeysQuery.isFetching || usageStatsQuery.isFetching,
    error: apiKeysQuery.error?.message || usageStatsQuery.error?.message || createKeyMutation.error?.message || null,
    refresh: () => {
      apiKeysQuery.refetch();
      usageStatsQuery.refetch();
    }
  };
};
