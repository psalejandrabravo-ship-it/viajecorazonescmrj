import { Play, Clapperboard } from "lucide-react";
import { BrandMark } from "@/components/brand/Logo";
import { FullscreenButton } from "@/components/game/FullscreenButton";
import { enterFullscreen } from "@/lib/game/fullscreen";
import { unlockAudio } from "@/lib/audio/sfx";
import { warmupVoices } from "@/lib/audio/speech";
import { useGameStore } from "@/store/game-store";

export function WelcomeView() {
  const startPlay = useGameStore((s) => s.startPlay);
  const startVideo = useGameStore((s) => s.startVideo);
  const goCover = useGameStore((s) => s.goCover);

  function playNow() {
    unlockAudio();
    warmupVoices();
    startPlay();
  }

  function playVideo() {
    unlockAudio();
    warmupVoices();
    void enterFullscreen();
    startVideo();
  }

  return (
    <section className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-indigo text-cream">
      <img
        src="/assets/illustrations/backgrounds/portada.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo/75 via-indigo/60 to-indigo/90" />
      <div className="relative z-10 flex justify-end px-3 pt-3">
        <FullscreenButton light label />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden px-6 text-center">
        <BrandMark className="h-14 max-h-[16vh] w-auto shrink md:h-16" />
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold">Bienvenida</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-cream sm:text-4xl md:text-5xl">
            El viaje de los corazones
          </h1>
          <p className="text-sm text-cream/90 sm:text-base md:text-xl">Un viaje para mirar, comprender y cuidar.</p>
          <p className="text-sm text-cream/80">Pueden ver el video de Sofía y Lucas o empezar a jugar ahora.</p>
        </div>
      </div>
      <div className="relative z-10 flex shrink-0 flex-col items-center gap-3 px-4 pb-8">
        <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={playVideo}
            className="inline-flex h-14 min-w-52 items-center justify-center gap-2 rounded-xl bg-paper/15 px-6 text-base font-extrabold text-cream backdrop-blur-sm transition hover:bg-paper/25"
          >
            <Clapperboard className="size-5" aria-hidden />
            Reproducir video
          </button>
          <button
            type="button"
            onClick={playNow}
            className="inline-flex h-14 min-w-52 items-center justify-center gap-2 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper shadow-lg transition hover:brightness-110"
          >
            <Play className="size-5" aria-hidden />
            Jugar ahora
          </button>
        </div>
        <button
          type="button"
          onClick={goCover}
          className="text-sm font-semibold text-cream/80 underline-offset-4 hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    </section>
  );
}
