import { navigationItems } from "../routes/appRoutes.jsx";

export default function Shell({ children, onLogout, user }) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">API Usage Engine</p>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                href={item.href}
                key={item.label}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
          <p className="truncate text-sm font-medium text-slate-700">{user?.name || "User"}</p>
          <p className="truncate text-xs text-slate-500">{user?.email}</p>
          <button
            className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            onClick={onLogout}
            type="button"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
