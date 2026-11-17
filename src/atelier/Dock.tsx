import { MOTIFS, ZONES, useAtelier } from "./store";

export function Dock() {
  const motif = useAtelier((s) => s.motif);
  const zone = useAtelier((s) => s.zone);
  const panel = useAtelier((s) => s.panel);
  const name = useAtelier((s) => s.name);
  const handle = useAtelier((s) => s.handle);
  const note = useAtelier((s) => s.note);
  const setMotif = useAtelier((s) => s.setMotif);
  const setZone = useAtelier((s) => s.setZone);
  const setField = useAtelier((s) => s.setField);
  const openReserve = useAtelier((s) => s.openReserve);
  const backToLoom = useAtelier((s) => s.backToLoom);
  const submit = useAtelier((s) => s.submit);

  const zoneMeta = ZONES.find((z) => z.id === zone)!;
  const motifMeta = MOTIFS.find((m) => m.id === motif)!;

  return (
    <section className="pointer-events-auto max-h-80 w-full max-w-xl overflow-y-auto rounded-3xl border border-gold/30 bg-veil/80 p-4 text-paper shadow-2xl backdrop-blur-md sm:p-5">
      <header className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm tracking-[0.28em] text-gold">MEHRKHAT</p>
          <h1 className="text-2xl font-medium leading-tight">مهرخط</h1>
        </div>
        <p className="max-w-40 text-left text-xs leading-relaxed text-mist">{zoneMeta.whisper}</p>
      </header>

      {panel === "loom" && (
        <>
          <p className="mb-3 text-sm leading-relaxed text-paper/90">
            فرم را بچرخان. یک نقطهٔ طلایی را لمس کن، بعد نقش را انتخاب کن تا خط، زنده روی پوست کشیده شود.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z.id)}
                className={
                  "min-h-11 rounded-full border px-3 text-sm " +
                  (zone === z.id
                    ? "border-blush bg-blush text-ink"
                    : "border-gold/40 bg-transparent text-paper")
                }
              >
                {z.fa}
              </button>
            ))}
          </div>
          <div className="mb-4 grid grid-cols-5 gap-2">
            {MOTIFS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMotif(m.id)}
                className={
                  "flex min-h-14 flex-col items-center justify-center rounded-2xl border text-xs " +
                  (motif === m.id
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-paper/15 text-mist")
                }
              >
                <MotifGlyph id={m.id} />
                <span className="mt-1">{m.fa}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openReserve}
            className="min-h-12 w-full rounded-full bg-paper text-sm font-medium text-ink"
          >
            این نقش را برای جلسه نگه دار
          </button>
        </>
      )}

      {panel === "reserve" && (
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <p className="text-sm text-mist">
            {motifMeta.fa} روی {zoneMeta.fa}. جلسه خصوصی است؛ فقط خانم‌ها، فقط فاین‌لاین.
          </p>
          <label className="text-xs text-mist">
            نام
            <input
              required
              value={name}
              onChange={(e) => setField("name", e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-gold/30 bg-ink px-3 text-sm text-paper outline-none"
            />
          </label>
          <label className="text-xs text-mist">
            اینستاگرام
            <input
              value={handle}
              onChange={(e) => setField("handle", e.target.value)}
              placeholder="@username"
              className="mt-1 min-h-11 w-full rounded-xl border border-gold/30 bg-ink px-3 text-sm text-paper outline-none"
            />
          </label>
          <label className="text-xs text-mist">
            این خط باید چه حسی داشته باشد؟
            <textarea
              value={note}
              onChange={(e) => setField("note", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
            />
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={backToLoom} className="min-h-12 flex-1 rounded-full border border-gold/40 text-sm">
              برگشت
            </button>
            <button type="submit" className="min-h-12 flex-1 rounded-full bg-blush text-sm font-medium text-ink">
              درخواست جلسه
            </button>
          </div>
        </form>
      )}

      {panel === "done" && (
        <div className="py-2">
          <p className="font-display text-3xl text-gold">نگه داشته شد.</p>
          <p className="mt-2 text-sm leading-relaxed">
            {name || "تو"}، نقش {motifMeta.fa} روی {zoneMeta.fa} در دفتر آتلیه نشست. این یک پیش‌نویس خصوصی است تا روز جلسه.
          </p>
          <button type="button" onClick={backToLoom} className="mt-4 min-h-12 w-full rounded-full bg-paper text-sm text-ink">
            یک نقش دیگر
          </button>
        </div>
      )}
    </section>
  );
}

function MotifGlyph({ id }: { id: string }) {
  const d =
    id === "bloom"
      ? "M12 13c2-4 6-4 6 0s-4 5-6 5-6-1-6-5 4-4 6 0z"
      : id === "moon"
        ? "M14 6a6 6 0 1 0 4 10 5 5 0 1 1-4-10z"
        : id === "vine"
          ? "M12 18c0-4 2-5 2-8a3 3 0 1 0-3 3c2 0 3-1 4-3"
          : id === "seed"
            ? "M12 6c3 3 3 9 0 12-3-3-3-9 0-12z"
            : "M4 13c2-3 4 3 6 0s4 3 6 0 4 3 4 0";
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.2" className="stitch-line" />
    </svg>
  );
}
