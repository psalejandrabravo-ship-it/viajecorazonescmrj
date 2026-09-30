import { z } from "zod";
import type { Customize, LogoMode, PersistedState, Profile, Settings } from "@/types/game";

export const STORAGE_KEY = "metodista-viaje-corazones";
export const SCHEMA_VERSION = 3 as const;

const settingsSchema = z.object({
  narrationMode: z.enum(["audio", "read", "both"]).default("read"),
  volumeMaster: z.number().min(0).max(1).default(0.8),
  volumeNarration: z.number().min(0).max(1).default(0.9),
  volumeSfx: z.number().min(0).max(1).default(0.75),
  volumeMusic: z.number().min(0).max(1).default(0.4),
  animations: z.boolean().default(true),
  particles: z.boolean().default(true),
  rhythm: z.union([z.literal("manual"), z.literal(3), z.literal(5), z.literal(8)]).default("manual"),
  scriptOpen: z.boolean().default(true),
});

const customizeSchema = z.object({
  schoolName: z.string().max(80).default(""),
  courseName: z.string().max(80).default(""),
  teacherName: z.string().max(80).default(""),
  logoDataUrl: z.string().nullable().default(null),
  logoMode: z.enum(["mirarim", "custom", "hidden"]).optional(),
  sessionDate: z.string().default(""),
});

const answerSchema = z.object({
  optionId: z.string(),
  correct: z.boolean(),
});

const profileSchema = z.object({
  id: z.string(),
  name: z.string().max(80),
  customize: customizeSchema,
  completed: z.array(z.number()),
  answers: z.record(z.string(), answerSchema),
  certificateDate: z.string().nullable(),
});

const v3Schema = z.object({
  schemaVersion: z.literal(3),
  completed: z.array(z.number()),
  answers: z.record(z.string(), answerSchema),
  settings: settingsSchema,
  customize: customizeSchema,
  profiles: z.array(profileSchema),
  activeProfileId: z.string().nullable(),
  certificateDate: z.string().nullable(),
  landscapeHintDismissed: z.boolean(),
  introSeen: z.boolean().default(false),
});

export const defaultSettings: Settings = {
  narrationMode: "read",
  volumeMaster: 0.8,
  volumeNarration: 0.9,
  volumeSfx: 0.75,
  volumeMusic: 0.4,
  animations: true,
  particles: true,
  rhythm: "manual",
  scriptOpen: true,
};

export function defaultCustomize(): Customize {
  return {
    schoolName: "Colegio Metodista Robert Johnson",
    courseName: "",
    teacherName: "",
    logoDataUrl: null,
    logoMode: "mirarim",
    sessionDate: new Date().toISOString().slice(0, 10),
  };
}

export const defaultPersisted: PersistedState = {
  schemaVersion: SCHEMA_VERSION,
  completed: [],
  answers: {},
  settings: defaultSettings,
  customize: defaultCustomize(),
  profiles: [],
  activeProfileId: null,
  certificateDate: null,
  landscapeHintDismissed: false,
  introSeen: false,
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeCustomize(input: {
  schoolName: string;
  courseName: string;
  teacherName: string;
  logoDataUrl: string | null;
  logoMode?: LogoMode;
  sessionDate: string;
}): Customize {
  return {
    schoolName: input.schoolName,
    courseName: input.courseName,
    teacherName: input.teacherName,
    logoDataUrl: input.logoDataUrl,
    logoMode: input.logoMode ?? (input.logoDataUrl ? "custom" : "mirarim"),
    sessionDate: input.sessionDate || todayIso(),
  };
}

function migrate(raw: unknown): PersistedState {
  if (!raw || typeof raw !== "object") return defaultPersisted;
  const data = raw as Record<string, unknown>;
  const version = data.schemaVersion;

  if (version === 3) {
    const parsed = v3Schema.safeParse(raw);
    if (!parsed.success) return defaultPersisted;
    return {
      ...parsed.data,
      introSeen: parsed.data.introSeen ?? false,
      settings: { ...defaultSettings, ...parsed.data.settings, scriptOpen: parsed.data.settings.scriptOpen },
      customize: normalizeCustomize(parsed.data.customize),
      profiles: parsed.data.profiles.map((profile) => ({
        ...profile,
        customize: normalizeCustomize(profile.customize),
      })),
    };
  }

  if (version === 1 || version === 2 || version === 4) {
    const oldSettings = (data.settings ?? {}) as Record<string, unknown>;
    const oldCustomize = (data.customize ?? {}) as Record<string, unknown>;
    const volume = typeof oldSettings.volumeMaster === "number" ? oldSettings.volumeMaster : typeof oldSettings.volume === "number" ? oldSettings.volume : 0.8;
    const courseName = typeof oldSettings.courseName === "string" ? oldSettings.courseName : typeof oldCustomize.courseName === "string" ? oldCustomize.courseName : "";
    const narrationMode =
      oldSettings.narrationMode === "audio" || oldSettings.narrationMode === "both" || oldSettings.narrationMode === "read"
        ? oldSettings.narrationMode
        : "read";
    const rhythm =
      oldSettings.rhythm === 3 || oldSettings.rhythm === 5 || oldSettings.rhythm === 8 || oldSettings.rhythm === "manual"
        ? oldSettings.rhythm
        : "manual";
    return {
      ...defaultPersisted,
      settings: {
        ...defaultSettings,
        narrationMode,
        volumeMaster: volume,
        volumeNarration: typeof oldSettings.volumeNarration === "number" ? oldSettings.volumeNarration : 0.9,
        volumeSfx: typeof oldSettings.volumeSfx === "number" ? oldSettings.volumeSfx : 0.75,
        volumeMusic: typeof oldSettings.volumeMusic === "number" ? oldSettings.volumeMusic : 0.4,
        animations: oldSettings.animations !== false,
        particles: oldSettings.particles !== false,
        rhythm,
        scriptOpen: oldSettings.scriptOpen !== false,
      },
      customize: {
        ...defaultCustomize(),
        schoolName: typeof oldCustomize.schoolName === "string" ? oldCustomize.schoolName : "",
        courseName,
        teacherName: typeof oldCustomize.teacherName === "string" ? oldCustomize.teacherName : "",
        logoDataUrl: typeof oldCustomize.logoDataUrl === "string" ? oldCustomize.logoDataUrl : null,
        logoMode: typeof oldCustomize.logoDataUrl === "string" ? "custom" : "mirarim",
      },
      landscapeHintDismissed: data.landscapeHintDismissed === true,
      introSeen: data.introSeen === true,
    };
  }

  return defaultPersisted;
}

export function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultPersisted;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPersisted;
    return migrate(JSON.parse(raw));
  } catch {
    return defaultPersisted;
  }
}

export function saveState(state: PersistedState): boolean {
  if (typeof window === "undefined") return false;
  try {
    const payload: PersistedState = { ...state, schemaVersion: SCHEMA_VERSION };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function isStorageAvailable(): boolean {
  try {
    const k = `${STORAGE_KEY}-probe`;
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function newProfile(name: string, customize: Customize): Profile {
  return {
    id: `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim().slice(0, 80) || "Grupo",
    customize: { ...customize },
    completed: [],
    answers: {},
    certificateDate: null,
  };
}
