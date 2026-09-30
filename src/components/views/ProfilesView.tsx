import { useState } from "react";
import { BrandMark } from "@/components/brand/Logo";
import { TOTAL_SITUACIONES } from "@/data";
import { useGameStore } from "@/store/game-store";

export function ProfilesView() {
  const profiles = useGameStore((s) => s.profiles);
  const activeProfileId = useGameStore((s) => s.activeProfileId);
  const saveProfile = useGameStore((s) => s.saveProfile);
  const loadProfile = useGameStore((s) => s.loadProfile);
  const deleteProfile = useGameStore((s) => s.deleteProfile);
  const setScreen = useGameStore((s) => s.setScreen);
  const [name, setName] = useState("");

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <BrandMark />
        <h1 className="text-3xl font-extrabold text-indigo">Perfiles</h1>
        <p className="text-muted">
          Guarda el avance de un curso en este dispositivo. Puedes cambiar de sala sin mezclar el recorrido.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del perfil, por ejemplo Sala azul"
            maxLength={80}
            className="min-h-14 flex-1 rounded-xl border border-line bg-paper px-4 text-lg"
          />
          <button
            type="button"
            onClick={() => saveProfile(name)}
            className="min-h-14 rounded-xl bg-coral px-6 font-extrabold text-paper"
          >
            Guardar perfil
          </button>
        </div>

        {profiles.length === 0 ? (
          <p className="rounded-xl bg-paper px-4 py-6 text-muted">Todavía no hay perfiles guardados.</p>
        ) : (
          <ul className="space-y-3">
            {profiles.map((profile) => (
              <li
                key={profile.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-paper p-4 shadow-[inset_0_0_0_1px_var(--color-line)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-indigo">{profile.name}</p>
                  <p className="text-sm text-muted">
                    {profile.completed.length} / {TOTAL_SITUACIONES} situaciones
                    {profile.customize.courseName ? ` · ${profile.customize.courseName}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => loadProfile(profile.id)}
                  className="min-h-12 rounded-lg bg-indigo px-4 font-bold text-cream"
                >
                  {activeProfileId === profile.id ? "En uso" : "Cargar"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteProfile(profile.id)}
                  className="min-h-12 px-3 font-semibold text-muted underline"
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setScreen("cover")}
          className="min-h-14 self-start rounded-xl bg-indigo px-8 text-lg font-bold text-cream"
        >
          Volver
        </button>
      </div>
    </section>
  );
}