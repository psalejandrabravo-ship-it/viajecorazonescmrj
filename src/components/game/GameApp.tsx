import { useEffect } from "react";
import { CoverView } from "@/components/views/CoverView";
import { WelcomeView } from "@/components/views/WelcomeView";
import { HowToView } from "@/components/views/HowToView";
import { SettingsView } from "@/components/views/SettingsView";
import { PlayView } from "@/components/views/PlayView";
import { CertificateView } from "@/components/views/CertificateView";
import { ProfilesView } from "@/components/views/ProfilesView";
import { AboutView } from "@/components/views/AboutView";
import { VideoView } from "@/components/views/VideoView";
import { LandscapeHint } from "@/components/game/LandscapeHint";
import { InstitutionCredit } from "@/components/brand/InstitutionCredit";
import { warmupVoices } from "@/lib/audio/speech";
import { preloadSfx, unlockAudio } from "@/lib/audio/sfx";
import { useGameStore } from "@/store/game-store";

export function GameApp() {
  const screen = useGameStore((s) => s.screen);
  const hydrate = useGameStore((s) => s.hydrate);
  const persist = useGameStore((s) => s.persist);
  const onDark = screen === "cover" || screen === "welcome" || screen === "video";

  useEffect(() => {
    hydrate();
    warmupVoices();
    const onFirst = () => {
      unlockAudio();
      void preloadSfx();
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    const onHide = () => {
      if (document.visibilityState === "hidden") persist();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [hydrate, persist]);

  let view = <CoverView />;
  switch (screen) {
    case "welcome":
      view = <WelcomeView />;
      break;
    case "video":
      view = <VideoView />;
      break;
    case "howto":
      view = <HowToView />;
      break;
    case "settings":
      view = <SettingsView />;
      break;
    case "play":
      view = <PlayView />;
      break;
    case "certificate":
      view = <CertificateView />;
      break;
    case "profiles":
      view = <ProfilesView />;
      break;
    case "about":
      view = <AboutView />;
      break;
    default:
      view = <CoverView />;
  }

  return (
    <>
      {view}
      {screen === "play" || screen === "certificate" ? null : <InstitutionCredit light={onDark} fixed />}
      <LandscapeHint />
    </>
  );
}
