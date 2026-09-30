import { useEffect, useRef, useState } from "react";
import { Play, SkipForward } from "lucide-react";
import { BrandMark } from "@/components/brand/Logo";
import { enterFullscreen } from "@/lib/game/fullscreen";
import { useGameStore } from "@/store/game-store";

const SRC = "/assets/video/sofia-lucas.mp4";

export function VideoView() {
  const finishIntro = useGameStore((s) => s.finishIntro);
  const goWelcome = useGameStore((s) => s.goWelcome);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    let cancelled = false;
    void (async () => {
      try {
        await node.play();
      } catch {
        if (!cancelled) setNeedsPlay(true);
        return;
      }
      if (cancelled) return;
      await enterFullscreen(node);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function leaveVideoFullscreen() {
    const node = videoRef.current;
    try {
      if (document.fullscreenElement && document.fullscreenElement === node) {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }

  async function playNow() {
    setNeedsPlay(false);
    const node = videoRef.current;
    if (!node) return;
    try {
      await node.play();
      await enterFullscreen(node);
    } catch {
      setNeedsPlay(true);
    }
  }

  async function skipToPlay() {
    await leaveVideoFullscreen();
    finishIntro();
  }

  async function back() {
    await leaveVideoFullscreen();
    goWelcome();
  }

  return (
    <section className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-indigo text-cream">
      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3">
        <BrandMark className="h-12" />
        <p className="min-w-0 flex-1 truncate text-sm font-bold text-gold">Sofía y Lucas</p>
        <button
          type="button"
          onClick={() => void skipToPlay()}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-paper/15 px-4 text-sm font-extrabold text-cream"
        >
          <SkipForward className="size-4" aria-hidden />
          Saltar
        </button>
      </header>
      <div className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center px-4 pb-6">
        <div className="relative w-full overflow-hidden rounded-xl bg-ink shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <video
            ref={videoRef}
            className="aspect-video w-full bg-ink"
            src={SRC}
            controls
            playsInline
            onEnded={() => void skipToPlay()}
          />
          {needsPlay ? (
            <button
              type="button"
              onClick={() => void playNow()}
              className="absolute inset-0 grid place-items-center bg-ink/40"
              aria-label="Reproducir video"
            >
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-coral text-paper shadow-lg">
                <Play className="size-9 translate-x-0.5" fill="currentColor" />
              </span>
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center gap-3 pb-5">
        <button type="button" onClick={() => void back()} className="h-11 px-4 font-semibold text-cream/80 underline">
          Volver
        </button>
        <button
          type="button"
          onClick={() => void skipToPlay()}
          className="h-12 rounded-xl bg-coral px-8 text-base font-extrabold text-paper"
        >
          Continuar
        </button>
      </div>
    </section>
  );
}
