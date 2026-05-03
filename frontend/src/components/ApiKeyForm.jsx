import { KeyRound, Loader2, Plus } from "lucide-react";
import { useState } from "react";

export default function ApiKeyForm({ createdApiKey, isCreating, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      await onCreate(trimmedName);
      setName("");
    } catch {
      // The page-level error banner displays mutation failures.
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-blue-50 p-2 text-ocean">
          <KeyRound aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold">Generate API Key</h2>
          <p className="mt-1 text-sm text-slate-500">Create a named key for a client or integration</p>
        </div>
      </div>

      <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="api-key-name">
          API key name
        </label>
        <input
          className="min-h-10 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          id="api-key-name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Client name"
          value={name}
        />
        <button
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isCreating || !name.trim()}
          type="submit"
        >
          {isCreating ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
          Generate
        </button>
      </form>

      {createdApiKey ? (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">New key generated</p>
          <code className="mt-2 block overflow-x-auto rounded bg-white px-3 py-2 text-xs text-slate-700">
            {createdApiKey.key}
          </code>
        </div>
      ) : null}
    </section>
  );
}
