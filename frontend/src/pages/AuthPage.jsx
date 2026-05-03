import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AuthPage({ error, isLoading, onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: form.email.trim(),
      password: form.password
    };

    try {
      if (mode === "register") {
        await onRegister({ ...payload, name: form.name.trim() });
        return;
      }

      await onLogin(payload);
    } catch {
      // The hook exposes the failed auth request through the page error state.
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4 py-10 text-ink">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-blue-50 p-2 text-ocean">
            <KeyRound aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-500">API Usage Engine</p>
            <h1 className="text-xl font-semibold">{mode === "login" ? "Sign in" : "Create account"}</h1>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="name">Name</label>
              <input
                className="mt-1 min-h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
                id="name"
                onChange={(event) => updateField("name", event.target.value)}
                value={form.name}
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input
              className="mt-1 min-h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
              id="email"
              onChange={(event) => updateField("email", event.target.value)}
              type="email"
              value={form.email}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <input
              className="mt-1 min-h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
              id="password"
              minLength="6"
              onChange={(event) => updateField("password", event.target.value)}
              type="password"
              value={form.password}
            />
          </div>

          {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <button
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          className="mt-4 w-full text-sm font-medium text-ocean hover:text-blue-700"
          onClick={() => setMode((current) => current === "login" ? "register" : "login")}
          type="button"
        >
          {mode === "login" ? "Create a new account" : "Use an existing account"}
        </button>
      </section>
    </main>
  );
}
