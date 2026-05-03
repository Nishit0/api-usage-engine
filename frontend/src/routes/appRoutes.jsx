import { Activity, BarChart3, Bell, CreditCard, KeyRound } from "lucide-react";

import AlertsPage from "../pages/AlertsPage.jsx";
import ApiKeysPage from "../pages/ApiKeysPage.jsx";
import BillingPage from "../pages/BillingPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";

export const navigationItems = [
  { label: "Overview", href: "/", icon: BarChart3 },
  { label: "Usage", href: "/", icon: Activity },
  { label: "API Keys", href: "/keys", icon: KeyRound },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Alerts", href: "/alerts", icon: Bell }
];

const appRoutes = [
  { path: "/", component: DashboardPage },
  { path: "/keys", component: ApiKeysPage },
  { path: "/billing", component: BillingPage },
  { path: "/alerts", component: AlertsPage }
];

export const getRouteComponent = (path) => {
  return appRoutes.find((route) => route.path === path)?.component || DashboardPage;
};
