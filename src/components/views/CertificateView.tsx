import { useState } from "react";
import { BrandMark } from "@/components/brand/Logo";
import { INSTITUTION_CREDIT } from "@/components/brand/InstitutionCredit";
import { SITUACIONES, TOTAL_SITUACIONES } from "@/data";
import { useGameStore } from "@/store/game-store";

export function CertificateView() {
  const customize = useGameStore((s) => s.customize);
  const certificateDate = useGameStore((s) => s.certificateDate);
  const answers = useGameStore((s) => s.answers);
  const completed = useGameStore((s) => s.completed);
  const goCover = useGameStore((s) => s.goCover);
  const startPlay = useGameStore((s) => s.startPlay);
  const [busy, setBusy] = useState(false);

  const dateSource = customize.sessionDate || certificateDate;
  const date = dateSource
    ? new Date(dateSource + "T12:00:00").toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const firstTry = SITUACIONES.filter((s) => answers[String(s.id)]?.correct).length;
  const done = Math.min(completed.length, TOTAL_SITUACIONES);
  const profiles = useGameStore((s) => s.profiles);
  const activeProfileId = useGameStore((s) => s.activeProfileId);
  const activeCourse = profiles.find((profile) => profile.id === activeProfileId)?.name.trim() ?? "";
  const storedCourse = customize.courseName.trim();
  const course = storedCourse === "Alto Hospicio" ? "" : storedCourse;
  const who = activeCourse || course || "este grupo";

  async function downloadPdf() {
    const el = document.getElementById("certificate-print");
    if (!el) return;
    setBusy(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#fffaf3" });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = Math.min((pageW - 36) / canvas.width, (pageH - 36) / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(img, "PNG", (pageW - w) / 2, (pageH - h) / 2, w, h);
      pdf.save("certificado-viaje-de-los-corazones.pdf");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="sheet-view px-4 py-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={goCover} className="min-h-12 rounded-xl bg-indigo px-5 font-bold text-cream">
            Inicio
          </button>
          <button type="button" onClick={() => window.print()} className="min-h-12 rounded-xl bg-coral px-5 font-bold text-paper">
            Imprimir
          </button>
          <button
            type="button"
            onClick={() => void downloadPdf()}
            disabled={busy}
            className="min-h-12 rounded-xl bg-gold px-5 font-bold text-ink disabled:opacity-60"
          >
            {busy ? "Preparando PDF…" : "Descargar PDF"}
          </button>
          <button type="button" onClick={startPlay} className="min-h-12 px-5 font-semibold text-indigo underline">
            Jugar de nuevo
          </button>
        </div>
        <article
          id="certificate-print"
          className="rounded-xl bg-paper p-8 text-center md:p-12"
          style={{ boxShadow: "inset 0 0 0 8px var(--color-indigo), inset 0 0 0 12px var(--color-gold)" }}
        >
          <BrandMark className="mx-auto h-28" />
          <p className="mt-6 text-sm font-bold tracking-[0.3em] text-coral">CERTIFICADO</p>
          <h1 className="mt-3 text-3xl font-extrabold text-indigo md:text-4xl">Expertos en empatía</h1>
          <p className="mt-6 text-lg">Este certificado reconoce que</p>
          <p className="mt-2 text-2xl font-extrabold text-coral md:text-3xl">{who}</p>
          {customize.teacherName ? <p className="mt-1 text-muted">con {customize.teacherName}</p> : null}
          <p className="mt-4 text-lg">ha completado el viaje</p>
          <p className="mt-1 text-xl font-extrabold text-indigo">El viaje de los corazones</p>
          <p className="mt-8 text-lg font-bold text-indigo">
            Situaciones completadas: {done} / {TOTAL_SITUACIONES}
          </p>
          <p className="text-muted">Respuestas adecuadas a la primera: {firstTry} / {TOTAL_SITUACIONES}</p>
          <p className="mt-4 text-muted">{date}</p>
          <p className="mt-6 text-[11px] font-semibold tracking-wide text-muted">{INSTITUTION_CREDIT}</p>
        </article>
      </div>
    </section>
  );
}
