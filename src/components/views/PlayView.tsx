import { useEffect } from "react";
import { BookOpen, Pause, Settings, Volume2, X } from "lucide-react";
import { BrandMark } from "@/components/brand/Logo";
import { InstitutionCredit } from "@/components/brand/InstitutionCredit";
import { FeedbackScreen } from "@/components/game/FeedbackScreen";
import { FullscreenButton } from "@/components/game/FullscreenButton";
import { SceneImage } from "@/components/game/SceneImage";
import { SITUACIONES, TOTAL_SITUACIONES, optionById } from "@/data";
import { playClick } from "@/lib/audio/sfx";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game-store";
import type { EmotionOption, LaminaOption, PlayPhase, SiNoOption, Situacion } from "@/types/game";

export function PlayView() {
  const situationIndex = useGameStore((s) => s.situationIndex);
  const phase = useGameStore((s) => s.phase);
  const selectedId = useGameStore((s) => s.selectedId);
  const lastCorrect = useGameStore((s) => s.lastCorrect);
  const paused = useGameStore((s) => s.paused);
  const completed = useGameStore((s) => s.completed);
  const settings = useGameStore((s) => s.settings);
  const togglePause = useGameStore((s) => s.togglePause);
  const choose = useGameStore((s) => s.choose);
  const revealExplain = useGameStore((s) => s.revealExplain);
  const afterFeedback = useGameStore((s) => s.afterFeedback);
  const beginSituation = useGameStore((s) => s.beginSituation);
  const speakCurrent = useGameStore((s) => s.speakCurrent);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const openOverlay = useGameStore((s) => s.openOverlay);

  useEffect(() => {
    if (paused || phase !== "chosen") return;
    const delay = settings.animations ? 500 : 0;
    const t = window.setTimeout(() => revealExplain(), delay);
    return () => window.clearTimeout(t);
  }, [phase, paused, settings.animations, situationIndex, revealExplain]);

  useEffect(() => {
    if (paused) return;
    const seconds = settings.rhythm === "manual" ? null : settings.rhythm;
    if (seconds == null || phase !== "explain") return;
    const t = window.setTimeout(() => afterFeedback(), seconds * 1000);
    return () => window.clearTimeout(t);
  }, [phase, paused, settings.rhythm, situationIndex, afterFeedback]);

  const sit = SITUACIONES[situationIndex];
  if (!sit) return null;

  const scriptOpen = settings.scriptOpen;
  const motion = settings.animations;
  const showQuestion = settings.narrationMode !== "audio";
  const chosen = optionById(sit, selectedId);

  function pick(id: string) {
    if (phase !== "play") return;
    playClick();
    choose(id);
  }

  const pauseModal = paused ? (
    <PauseModal
      onResume={togglePause}
      onSettings={() => {
        togglePause();
        openOverlay("settings");
      }}
      onManual={() => {
        togglePause();
        openOverlay("howto");
      }}
    />
  ) : null;

  if (phase === "explain" && chosen) {
    return (
      <>
        <FeedbackScreen
          sit={sit}
          chosen={chosen}
          correct={!!lastCorrect}
          completed={completed}
          motion={motion}
          onContinue={afterFeedback}
          onSpeak={speakCurrent}
          onSettings={() => openOverlay("settings")}
          onPause={togglePause}
        />
        {pauseModal}
      </>
    );
  }

  return (
    <section className={cn("stage-play", motion ? "" : "no-motion")}>
      <header className="area-header">
        <BrandMark className="hidden h-12 shrink-0 lg:block" />
        <h1 className="min-w-0 flex-1 truncate text-sm font-extrabold tracking-wide text-cream md:text-base">
          El viaje de los corazones
        </h1>
        <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-gold md:text-sm">
          Situación {sit.id} de {TOTAL_SITUACIONES}
        </p>
        <button
          type="button"
          onClick={() => updateSettings({ scriptOpen: !scriptOpen })}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1 rounded-lg px-2 text-sm font-semibold lg:hidden",
            scriptOpen ? "bg-cream text-indigo" : "text-cream",
          )}
        >
          <BookOpen className="size-4" />
          Guión
        </button>
        <button type="button" onClick={speakCurrent} className="h-10 shrink-0 px-1 text-cream" aria-label="Escuchar narración">
          <Volume2 className="size-5" />
        </button>
        <FullscreenButton light />
        <button
          type="button"
          onClick={() => openOverlay("settings")}
          className="h-10 shrink-0 px-1 text-cream"
          aria-label="Configuración"
        >
          <Settings className="size-5" />
        </button>
        <button type="button" onClick={togglePause} className="h-10 shrink-0 px-1 text-cream" aria-label="Pausa">
          <Pause className="size-5" />
        </button>
      </header>

      <main className="area-main">
        <div className="play-art">
          <SceneImage src={sit.ilustracion} alt={sit.ilustracionAlt} />
        </div>
        {showQuestion ? <p className="play-question">{sit.pregunta}</p> : <div className="play-question" />}
        <OptionsBoard sit={sit} phase={phase} selectedId={selectedId} onPick={pick} />
      </main>

      <aside className={cn("area-script", scriptOpen ? "is-open" : "")}>
        <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
          <p className="text-xs font-extrabold uppercase tracking-widest text-coral">Preguntas de reflexión</p>
          <button
            type="button"
            onClick={() => updateSettings({ scriptOpen: false })}
            className="text-indigo lg:hidden"
            aria-label="Cerrar guión"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-4 py-3">
          <ol className="list-decimal space-y-3 pl-5 text-base leading-snug text-ink">
            {sit.guion.preguntas.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </div>
      </aside>

      <footer className="area-footer flex-col gap-1 py-1">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {SITUACIONES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => beginSituation(i)}
              className={cn(
                "progress-dot",
                i === situationIndex ? "is-current" : "",
                completed.includes(item.id) ? "is-done" : "",
              )}
              aria-label={`${item.titulo}${completed.includes(item.id) ? ", completada" : ""}`}
            >
              {item.id}
            </button>
          ))}
        </div>
        <InstitutionCredit />
      </footer>

      {pauseModal}
    </section>
  );
}

function OptionsBoard({
  sit,
  phase,
  selectedId,
  onPick,
}: {
  sit: Situacion;
  phase: PlayPhase;
  selectedId: string | null;
  onPick: (id: string) => void;
}) {
  const disabled = phase !== "play";
  if (sit.mecanica === "si_no") {
    return (
      <div className="play-options grid h-full grid-cols-2 gap-3">
        {(sit.opciones as SiNoOption[]).map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(opt.id)}
            className={cn(
              "flex min-h-16 items-center justify-center rounded-xl px-4 text-xl font-extrabold shadow-md transition active:scale-95 md:min-h-20 md:text-2xl",
              opt.id === "si" ? "bg-yes text-paper" : "bg-no text-paper",
              optionMark(phase, selectedId, opt.id, opt.correcta),
            )}
          >
            {opt.texto}
          </button>
        ))}
      </div>
    );
  }

  if (sit.mecanica === "identificar_emocion_4") {
    return (
      <div className="play-options grid h-full grid-cols-2 gap-2 md:gap-3">
        {(sit.opciones as EmotionOption[]).map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(opt.id)}
            className={cn(
              "flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 font-extrabold text-ink shadow-md transition active:scale-95",
              emotionBg(opt.id),
              optionMark(phase, selectedId, opt.id, opt.correcta),
            )}
          >
            <span className="text-3xl md:text-4xl" aria-hidden>
              {opt.emoji}
            </span>
            <span className="text-xs tracking-wide md:text-sm">{opt.texto}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="play-options lamina-grid">
      {(sit.opciones as LaminaOption[]).map((opt, i) => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(opt.id)}
          className={cn("choice-card", optionMark(phase, selectedId, opt.id, opt.correcta))}
        >
          <span className="fit-pic">
            <img src={opt.imagen} alt={opt.alt} />
          </span>
          <span className="choice-cap">
            {String.fromCharCode(65 + i)}. {opt.texto}
          </span>
        </button>
      ))}
    </div>
  );
}

function optionMark(phase: PlayPhase, selectedId: string | null, id: string, correcta: boolean) {
  if (phase === "play") return "";
  const picked = selectedId === id && phase === "chosen" ? " is-picked" : "";
  if (correcta) return `is-right${picked}`;
  if (selectedId === id) return `is-wrong${picked}`;
  return "is-dim";
}

function emotionBg(id: EmotionOption["id"]) {
  if (id === "feliz") return "bg-emotion-feliz";
  if (id === "triste") return "bg-emotion-triste text-paper";
  if (id === "asustado") return "bg-emotion-asustado text-paper";
  return "bg-emotion-enojado text-paper";
}

function PauseModal({
  onResume,
  onSettings,
  onManual,
}: {
  onResume: () => void;
  onSettings: () => void;
  onManual: () => void;
}) {
  const goCover = useGameStore((s) => s.goCover);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo/70 p-6">
      <div className="w-full max-w-md rounded-xl bg-paper p-8 text-center">
        <h2 className="text-3xl font-extrabold text-indigo">Pausa</h2>
        <p className="mt-3 text-lg text-muted">El audio está detenido. Cuando quieran, continúan.</p>
        <div className="mt-6 flex flex-col gap-2">
          <button type="button" onClick={onResume} className="min-h-14 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper">
            Continuar
          </button>
          <button type="button" onClick={onSettings} className="min-h-12 rounded-xl bg-indigo/10 px-8 font-bold text-indigo">
            Configuración
          </button>
          <button type="button" onClick={onManual} className="min-h-12 rounded-xl bg-indigo/10 px-8 font-bold text-indigo">
            Cómo se juega
          </button>
          <button type="button" onClick={goCover} className="min-h-12 font-semibold text-muted underline">
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
