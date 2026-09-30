import { create } from "zustand";
import { SITUACIONES, TOTAL_SITUACIONES, optionById, feedbackSpeech } from "@/data";
import {
  clearState,
  defaultCustomize,
  defaultPersisted,
  defaultSettings,
  isStorageAvailable,
  loadState,
  newProfile,
  saveState,
} from "@/lib/persistence/storage";
import type { ClassroomShare } from "@/lib/persistence/share";
import { playCorrect, playIncorrect, playNext, playStar, setMixer, unlockAudio } from "@/lib/audio/sfx";
import { speak, stopSpeech } from "@/lib/audio/speech";
import { burstConfetti } from "@/lib/game/celebrate";
import type {
  AnswerRecord,
  Customize,
  PersistedState,
  PlayPhase,
  Profile,
  Screen,
  Settings,
} from "@/types/game";

interface GameStore {
  screen: Screen;
  returnTo: Screen;
  situationIndex: number;
  phase: PlayPhase;
  selectedId: string | null;
  lastCorrect: boolean | null;
  paused: boolean;
  storageOk: boolean;
  speechOk: boolean;
  confirmReset: boolean;
  completed: number[];
  answers: Record<string, AnswerRecord>;
  settings: Settings;
  customize: Customize;
  profiles: Profile[];
  activeProfileId: string | null;
  certificateDate: string | null;
  landscapeHintDismissed: boolean;
  introSeen: boolean;
  shareNotice: string | null;
  hydrate: () => void;
  persist: () => void;
  setScreen: (screen: Screen) => void;
  openOverlay: (screen: Screen) => void;
  closeOverlay: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  updateCustomize: (patch: Partial<Customize>) => void;
  requestReset: () => void;
  cancelReset: () => void;
  confirmAndReset: () => void;
  startPlay: () => void;
  startFromCover: () => void;
  startVideo: () => void;
  finishIntro: () => void;
  goCover: () => void;
  goWelcome: () => void;
  togglePause: () => void;
  dismissLandscapeHint: () => void;
  beginSituation: (index: number) => void;
  choose: (choiceId: string) => void;
  revealExplain: () => void;
  afterFeedback: () => void;
  speakCurrent: () => void;
  saveProfile: (name: string) => void;
  loadProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  importClassroom: (share: ClassroomShare) => void;
  dismissShareNotice: () => void;
}

function applySharedCustomize(share: ClassroomShare, base: Customize): Customize {
  const next: Customize = {
    schoolName: share.schoolName,
    courseName: share.courseName,
    teacherName: share.teacherName,
    sessionDate: share.sessionDate || base.sessionDate,
    logoMode: share.logoIncluded ? share.logoMode : base.logoMode,
    logoDataUrl: base.logoDataUrl,
  };
  if (!share.logoIncluded) return next;
  if (share.logoMode === "custom" && share.logoDataUrl) next.logoDataUrl = share.logoDataUrl;
  return next;
}

function applyMixer(settings: Settings) {
  setMixer({
    master: settings.volumeMaster,
    sfx: settings.volumeSfx,
    music: settings.volumeMusic,
    narration: settings.volumeNarration,
  });
}

function snapshot(s: GameStore): PersistedState {
  return {
    schemaVersion: 3,
    completed: s.completed,
    answers: s.answers,
    settings: s.settings,
    customize: s.customize,
    profiles: s.profiles,
    activeProfileId: s.activeProfileId,
    certificateDate: s.certificateDate,
    landscapeHintDismissed: s.landscapeHintDismissed,
    introSeen: s.introSeen,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "cover",
  returnTo: "cover",
  situationIndex: 0,
  phase: "play",
  selectedId: null,
  lastCorrect: null,
  paused: false,
  storageOk: true,
  speechOk: true,
  confirmReset: false,
  completed: [],
  answers: {},
  settings: defaultSettings,
  customize: defaultCustomize(),
  profiles: [],
  activeProfileId: null,
  certificateDate: null,
  landscapeHintDismissed: false,
  introSeen: false,
  shareNotice: null,

  hydrate: () => {
    const loaded = loadState();
    set({
      completed: loaded.completed,
      answers: loaded.answers,
      settings: loaded.settings,
      customize: loaded.customize,
      profiles: loaded.profiles,
      activeProfileId: loaded.activeProfileId,
      certificateDate: loaded.certificateDate,
      landscapeHintDismissed: loaded.landscapeHintDismissed,
      introSeen: loaded.introSeen,
      storageOk: isStorageAvailable(),
      speechOk: typeof window !== "undefined" && "speechSynthesis" in window,
    });
    applyMixer(loaded.settings);
  },

  persist: () => {
    const ok = saveState(snapshot(get()));
    set({ storageOk: ok });
  },

  setScreen: (screen) => {
    stopSpeech();
    set({ screen, paused: false, confirmReset: false });
  },

  openOverlay: (screen) => {
    const current = get().screen;
    set({
      returnTo: current === "settings" || current === "howto" || current === "about" ? get().returnTo : current,
      screen,
    });
  },

  closeOverlay: () => set({ screen: get().returnTo, confirmReset: false }),

  updateSettings: (patch) => {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    applyMixer(settings);
    get().persist();
  },

  updateCustomize: (patch) => {
    set({ customize: { ...get().customize, ...patch } });
    get().persist();
  },

  requestReset: () => set({ confirmReset: true }),
  cancelReset: () => set({ confirmReset: false }),
  confirmAndReset: () => {
    const customize = get().customize;
    const settings = get().settings;
    const landscapeHintDismissed = get().landscapeHintDismissed;
    const profiles = get().profiles;
    clearState();
    stopSpeech();
    set({
      ...defaultPersisted,
      customize,
      settings,
      landscapeHintDismissed,
      profiles,
      introSeen: false,
      confirmReset: false,
      screen: "cover",
      situationIndex: 0,
      phase: "play",
      selectedId: null,
      lastCorrect: null,
      paused: false,
    });
    get().persist();
  },

  startFromCover: () => {
    unlockAudio();
    stopSpeech();
    const { completed } = get();
    if (completed.length >= TOTAL_SITUACIONES) {
      set({ screen: "certificate", paused: false });
      return;
    }
    if (completed.length > 0) {
      get().startPlay();
      return;
    }
    set({ screen: "welcome", paused: false });
  },

  startVideo: () => {
    unlockAudio();
    stopSpeech();
    set({ screen: "video", paused: false });
  },

  finishIntro: () => {
    set({ introSeen: true });
    get().persist();
    get().startPlay();
  },

  startPlay: () => {
    unlockAudio();
    stopSpeech();
    const { completed } = get();
    const firstIncomplete = SITUACIONES.findIndex((s) => !completed.includes(s.id));
    const index = firstIncomplete === -1 ? 0 : firstIncomplete;
    get().beginSituation(index);
    set({ screen: "play", paused: false });
  },

  goCover: () => {
    stopSpeech();
    set({ screen: "cover", paused: false, phase: "play" });
  },

  goWelcome: () => {
    stopSpeech();
    set({ screen: "welcome", paused: false });
  },

  togglePause: () => {
    const paused = !get().paused;
    if (paused) stopSpeech();
    set({ paused });
  },

  dismissLandscapeHint: () => {
    set({ landscapeHintDismissed: true });
    get().persist();
  },

  beginSituation: (index) => {
    const sit = SITUACIONES[index];
    if (!sit) return;
    stopSpeech();
    playNext();
    set({
      situationIndex: index,
      phase: "play",
      selectedId: null,
      lastCorrect: null,
      paused: false,
    });
  },

  choose: (choiceId) => {
    unlockAudio();
    const { phase, situationIndex } = get();
    if (phase !== "play") return;
    const sit = SITUACIONES[situationIndex];
    if (!sit) return;
    const choice = optionById(sit, choiceId);
    if (!choice) return;
    set({ phase: "chosen", selectedId: choiceId, lastCorrect: choice.correcta });
  },

  revealExplain: () => {
    const { phase, lastCorrect, settings } = get();
    if (phase !== "chosen") return;
    if (lastCorrect) {
      playCorrect();
      if (settings.particles) void burstConfetti();
    } else {
      playIncorrect();
    }
    set({ phase: "explain" });
  },

  afterFeedback: () => {
    const { situationIndex, selectedId, lastCorrect, completed, answers, certificateDate } = get();
    const sit = SITUACIONES[situationIndex];
    if (!sit || !selectedId || lastCorrect === null) return;

    const nextCompleted = completed.includes(sit.id) ? completed : [...completed, sit.id];
    const nextAnswers = {
      ...answers,
      [String(sit.id)]: { optionId: selectedId, correct: lastCorrect },
    };
    const allDone = nextCompleted.length >= TOTAL_SITUACIONES;
    const nextCert =
      allDone && !certificateDate ? new Date().toISOString().slice(0, 10) : certificateDate;

    set({ completed: nextCompleted, answers: nextAnswers, certificateDate: nextCert });
    get().persist();

    if (allDone && situationIndex >= TOTAL_SITUACIONES - 1) {
      playStar();
      set({ screen: "certificate", paused: false });
      return;
    }

    const nextIndex = situationIndex + 1;
    if (nextIndex < TOTAL_SITUACIONES) {
      get().beginSituation(nextIndex);
      set({ screen: "play" });
      return;
    }

    set({ screen: "certificate", paused: false });
  },

  speakCurrent: () => {
    const { situationIndex, phase, settings, selectedId } = get();
    const sit = SITUACIONES[situationIndex];
    if (!sit) return;
    unlockAudio();
    const volume = settings.volumeMaster * settings.volumeNarration;
    if (phase === "explain" || phase === "chosen") {
      const chosen = optionById(sit, selectedId);
      speak(chosen ? feedbackSpeech(chosen) : sit.pregunta, volume);
      return;
    }
    speak(sit.pregunta, volume);
  },

  saveProfile: (name) => {
    const { customize, completed, answers, certificateDate, profiles, activeProfileId } = get();
    const existing = profiles.find((p) => p.id === activeProfileId);
    const finalName = name.trim() || existing?.name || "";
    const nextCustomize = { ...customize, courseName: finalName };
    if (existing) {
      const updated: Profile = {
        ...existing,
        name: finalName || existing.name,
        customize: nextCustomize,
        completed: [...completed],
        answers: { ...answers },
        certificateDate,
      };
      set({
        customize: nextCustomize,
        profiles: profiles.map((p) => (p.id === existing.id ? updated : p)),
      });
    } else {
      const profile = newProfile(finalName, nextCustomize);
      profile.completed = [...completed];
      profile.answers = { ...answers };
      profile.certificateDate = certificateDate;
      set({
        customize: nextCustomize,
        profiles: [...profiles, profile],
        activeProfileId: profile.id,
      });
    }
    get().persist();
  },

  loadProfile: (id) => {
    const profile = get().profiles.find((p) => p.id === id);
    if (!profile) return;
    stopSpeech();
    set({
      activeProfileId: profile.id,
      customize: { ...profile.customize },
      completed: [...profile.completed],
      answers: { ...profile.answers },
      certificateDate: profile.certificateDate,
      screen: "cover",
      situationIndex: 0,
      phase: "play",
      selectedId: null,
      lastCorrect: null,
    });
    get().persist();
  },

  deleteProfile: (id) => {
    const profiles = get().profiles.filter((p) => p.id !== id);
    const activeProfileId = get().activeProfileId === id ? null : get().activeProfileId;
    set({ profiles, activeProfileId });
    get().persist();
  },

  importClassroom: (share) => {
    const { profiles, customize: current } = get();
    const match = profiles.find(
      (p) =>
        p.name === share.name &&
        p.customize.schoolName === share.schoolName &&
        p.customize.courseName === share.courseName,
    );
    if (match) {
      const merged = applySharedCustomize(share, match.customize);
      set({
        profiles: profiles.map((p) => (p.id === match.id ? { ...p, customize: merged } : p)),
        activeProfileId: match.id,
        customize: merged,
        completed: [...match.completed],
        answers: { ...match.answers },
        certificateDate: match.certificateDate,
        shareNotice: share.name,
        screen: "cover",
        situationIndex: 0,
        phase: "play",
        selectedId: null,
        lastCorrect: null,
        paused: false,
      });
    } else {
      const nextCustomize = applySharedCustomize(share, {
        ...current,
        logoDataUrl: null,
        logoMode: "mirarim",
      });
      const profile = newProfile(share.name, nextCustomize);
      set({
        profiles: [...profiles, profile],
        activeProfileId: profile.id,
        customize: nextCustomize,
        completed: [],
        answers: {},
        certificateDate: null,
        shareNotice: share.name,
        screen: "cover",
        situationIndex: 0,
        phase: "play",
        selectedId: null,
        lastCorrect: null,
        paused: false,
      });
    }
    get().persist();
  },

  dismissShareNotice: () => set({ shareNotice: null }),
}));
