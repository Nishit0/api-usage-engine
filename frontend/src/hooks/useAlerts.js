import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { alertService } from "../services/alertService.js";
import { apiKeyService } from "../services/apiKeyService.js";
import { queryKeys } from "../services/queryKeys.js";

export const useAlerts = () => {
  const queryClient = useQueryClient();

  const rulesQuery = useQuery({
    queryKey: queryKeys.alerts.rules,
    queryFn: alertService.getRules
  });

  const eventsQuery = useQuery({
    queryKey: queryKeys.alerts.events,
    queryFn: alertService.getEvents
  });

  const apiKeysQuery = useQuery({
    queryKey: queryKeys.apiKeys.all,
    queryFn: apiKeyService.getApiKeys
  });

  const createRuleMutation = useMutation({
    mutationFn: alertService.createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.rules });
    }
  });

  return {
    rules: rulesQuery.data?.data || [],
    events: eventsQuery.data?.data || [],
    apiKeys: apiKeysQuery.data?.data || [],
    createRule: createRuleMutation.mutateAsync,
    isCreating: createRuleMutation.isPending,
    isLoading: rulesQuery.isLoading || eventsQuery.isLoading || apiKeysQuery.isLoading,
    isFetching: rulesQuery.isFetching || eventsQuery.isFetching || apiKeysQuery.isFetching,
    error: rulesQuery.error?.message || eventsQuery.error?.message || apiKeysQuery.error?.message || createRuleMutation.error?.message || null,
    refresh: () => {
      rulesQuery.refetch();
      eventsQuery.refetch();
      apiKeysQuery.refetch();
    }
  };
};
