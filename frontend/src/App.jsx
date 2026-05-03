import AuthPage from "./pages/AuthPage.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { getRouteComponent } from "./routes/appRoutes.jsx";

export default function App() {
  const auth = useAuth();
  const path = window.location.pathname;

  if (!auth.isAuthenticated) {
    return (
      <AuthPage
        error={auth.error}
        isLoading={auth.isLoading}
        onLogin={auth.login}
        onRegister={auth.register}
      />
    );
  }

  const Page = getRouteComponent(path);

  return <Page onLogout={auth.logout} user={auth.user} />;
}
