import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { authService } from "../services/authService.js";
import { tokenStorage } from "../services/tokenStorage.js";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(() => tokenStorage.getUser());

  const setSession = (session) => {
    tokenStorage.setSession(session);
    setUser(session.user);
    queryClient.clear();
  };

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: setSession
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: setSession
  });

  const logout = () => {
    tokenStorage.clearSession();
    setUser(null);
    queryClient.clear();
  };

  return {
    user,
    isAuthenticated: Boolean(tokenStorage.getToken()),
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error?.message || registerMutation.error?.message || null
  };
};
