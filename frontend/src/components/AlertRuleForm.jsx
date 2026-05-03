import { Bell, Loader2, Plus } from "lucide-react";
import { useState } from "react";

export default function AlertRuleForm({ apiKeys, isCreating, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    apiKey: "",
    threshold: ""
  });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onCreate({
        name: form.name.trim(),
        apiKey: form.apiKey || null,
        threshold: Number(form.threshold)
      });
      setForm({ name: "", apiKey: "", threshold: "" });
    } catch {
      // The page-level error banner displays mutation failures.
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-amber-50 p-2 text-amberline">
          <Bell aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold">Create Usage Alert</h2>
          <p className="mt-1 text-sm text-slate-500">Trigger an alert when total requests cross a threshold</p>
        </div>
      </div>

      <form className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_160px_auto]" onSubmit={handleSubmit}>
        <input
          className="min-h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Alert name"
          value={form.name}
        />
        <select
          className="min-h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          onChange={(event) => updateField("apiKey", event.target.value)}
          value={form.apiKey}
        >
          <option value="">All API keys</option>
          {apiKeys.map((item) => (
            <option key={item._id || item.key} value={item.key}>
              {item.name || item.key}
            </option>
          ))}
        </select>
        <input
          className="min-h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          min="1"
          onChange={(event) => updateField("threshold", event.target.value)}
          placeholder="Threshold"
          type="number"
          value={form.threshold}
        />
        <button
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isCreating || !form.name.trim() || !form.threshold}
          type="submit"
        >
          {isCreating ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
          Add
        </button>
      </form>
    </section>
  );
}
