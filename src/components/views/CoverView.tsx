import { BookOpen, Play, Settings, Users } from "lucide-react";
import { BrandMark } from "@/components/brand/Logo";
import { FullscreenButton } from "@/components/game/FullscreenButton";
import { TOTAL_SITUACIONES } from "@/data";
import { unlockAudio } from "@/lib/audio/sfx";
import { warmupVoices } from "@/lib/audio/speech";
import { useGameStore } from "@/store/game-store";

export function CoverView() {
  const setScreen = useGameStore((s) => s.setScreen);
  const startFromCover = useGameStore((s) => s.startFromCover);
  const startPlay = useGameStore((s) => s.startPlay);
  const completed = useGameStore((s) => s.completed);
  const allDone = completed.length >= TOTAL_SITUACIONES;

  function play() {
    unlockAudio();
    warmupVoices();
    if (allDone || completed.length > 0) {
      startPlay();
      return;
    }
    startFromCover();
  }

  return (
    <section className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-indigo text-cream">
      <img
        src="/assets/illustrations/backgrounds/portada.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo/70 via-indigo/55 to-indigo/85" />
      <div className="relative z-10 flex justify-end px-3 pt-3">
        <FullscreenButton light label />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden px-6 text-center">
        <BrandMark className="h-14 max-h-[18vh] w-auto shrink md:h-16" />
        <div className="max-w-3xl shrink space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-cream sm:text-4xl md:text-5xl">
            El viaje de los corazones
          </h1>
          <p className="text-sm text-cream/90 sm:text-base md:text-xl">Un viaje para mirar, comprender y cuidar.</p>
          <p className="text-sm font-semibold text-gold">
            {TOTAL_SITUACIONES} situaciones · para proyectar en la sala
          </p>
        </div>
      </div>
      <div className="relative z-10 flex shrink-0 flex-col items-center gap-2 px-4 pb-8">
        <div className="flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={play}
            className="inline-flex h-14 min-w-44 items-center justify-center gap-2 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper shadow-lg transition hover:brightness-110"
          >
            <Play className="size-5" aria-hidden />
            {completed.length && !allDone ? "Continuar" : "Jugar"}
          </button>
          {allDone ? (
            <button
              type="button"
              onClick={() => setScreen("certificate")}
              className="inline-flex h-14 min-w-44 items-center justify-center gap-2 rounded-xl bg-paper/15 px-6 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/25"
            >
              Ver certificado
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setScreen("profiles")}
            className="inline-flex h-14 min-w-44 items-center justify-center gap-2 rounded-xl bg-paper/15 px-6 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/25"
          >
            <Users className="size-5" aria-hidden />
            Perfiles
          </button>
          <button
            type="button"
            onClick={() => setScreen("howto")}
            className="inline-flex h-14 min-w-44 items-center justify-center gap-2 rounded-xl bg-paper/10 px-6 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/20"
          >
            <BookOpen className="size-5" aria-hidden />
            Cómo se juega
          </button>
          <button
            type="button"
            onClick={() => setScreen("settings")}
            className="inline-flex h-14 min-w-44 items-center justify-center gap-2 rounded-xl bg-paper/10 px-6 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/20"
          >
            <Settings className="size-5" aria-hidden />
            Configuración
          </button>
        </div>
        <button
          type="button"
          onClick={() => setScreen("about")}
          className="text-sm font-semibold text-cream/80 underline-offset-4 hover:underline"
        >
          Acerca de
        </button>
      </div>
    </section>
  );
}
