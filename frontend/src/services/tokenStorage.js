const TOKEN_KEY = "api_usage_token";
const USER_KEY = "api_usage_user";

export const tokenStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setSession({ token, user }) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const rawUser = localStorage.getItem(USER_KEY);
    try {
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      return null;
    }
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
