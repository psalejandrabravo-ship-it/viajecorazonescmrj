import { BrandMark } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";

const steps = [
  "Antes de proyectar, pulsa Pantalla completa para ocultar la barra del navegador.",
  "Al pulsar Jugar aparece una bienvenida. El video de Sofía y Lucas es opcional: pueden verlo o empezar a jugar ahora.",
  "El grupo mira la ilustración y las alternativas. A un lado quedan solo las preguntas de reflexión para ti.",
  "Hay 12 situaciones, una detrás de otra. Al pulsar Continuar aparece la siguiente, sin portada en el medio.",
  "Tres formas de responder: elegir una de 3 láminas, decir SÍ o NO, o nombrar una de 4 emociones.",
  "El grupo vota con los dedos o los pulgares. Tú pulsas la opción de la mayoría. No hay puntaje ni perdedores.",
  "Al responder se ve la ilustración de la situación y el porqué. Pulsa Continuar. No hay que repetir.",
  "La voz suena solo cuando pulsas el ícono. Los sonidos de acierto y error se oyen al elegir.",
];

export function HowToView() {
  const closeOverlay = useGameStore((s) => s.closeOverlay);
  const setScreen = useGameStore((s) => s.setScreen);
  const startPlay = useGameStore((s) => s.startPlay);
  const returnTo = useGameStore((s) => s.returnTo);
  const fromPause = returnTo === "play";

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <BrandMark />
        <h1 className="text-3xl font-extrabold text-indigo md:text-4xl">Cómo se juega</h1>
        <p className="text-lg text-muted">Esta guía es para la persona educadora. El grupo no necesita leer.</p>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4 rounded-xl bg-paper p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo text-lg font-extrabold text-cream">
                {i + 1}
              </span>
              <p className="pt-1 text-lg">{step}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          {fromPause ? (
            <button
              type="button"
              onClick={() => closeOverlay()}
              className="min-h-14 rounded-xl bg-indigo px-8 text-lg font-bold text-cream"
            >
              Volver
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => startPlay()}
                className="min-h-14 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper"
              >
                Empezar el viaje
              </button>
              <button
                type="button"
                onClick={() => setScreen("cover")}
                className="min-h-14 rounded-xl bg-indigo px-8 text-lg font-bold text-cream"
              >
                Volver
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
