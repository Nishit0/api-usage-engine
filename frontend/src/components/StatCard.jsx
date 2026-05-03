export default function StatCard({ title, value, helper, icon: Icon, tone = "ocean" }) {
  const tones = {
    ocean: "bg-blue-50 text-ocean",
    mint: "bg-emerald-50 text-mint",
    amber: "bg-amber-50 text-amberline"
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal">{value}</p>
          {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
        </div>
        {Icon ? (
          <span className={`rounded-md p-2 ${tones[tone]}`}>
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </section>
  );
}
