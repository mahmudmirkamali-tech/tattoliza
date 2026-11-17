import { create } from "zustand";

export type Motif = "bloom" | "moon" | "vine" | "seed" | "wave";
export type Zone = "collar" | "wrist" | "rib" | "ankle" | "nape";

export const MOTIFS: { id: Motif; fa: string; en: string }[] = [
  { id: "bloom", fa: "شکوفه", en: "Bloom" },
  { id: "moon", fa: "هلال", en: "Crescent" },
  { id: "vine", fa: "تاک", en: "Vine" },
  { id: "seed", fa: "دانه", en: "Seed" },
  { id: "wave", fa: "موج", en: "Wave" },
];

export const ZONES: { id: Zone; fa: string; whisper: string }[] = [
  { id: "collar", fa: "ترقوه", whisper: "جایی که نفس دیده می‌شود" },
  { id: "nape", fa: "پس‌گردن", whisper: "رازی فقط برای خودت" },
  { id: "rib", fa: "پهلو", whisper: "زیر پارچه، کنار قلب" },
  { id: "wrist", fa: "مچ", whisper: "خطی که هر روز می‌بینی" },
  { id: "ankle", fa: "مچ پا", whisper: "قدمی که سبک‌تر می‌شود" },
];

type Booking = {
  name: string;
  handle: string;
  note: string;
  motif: Motif;
  zone: Zone;
  at: string;
};

type State = {
  entered: boolean;
  motif: Motif;
  zone: Zone;
  stitch: number;
  panel: "loom" | "reserve" | "done" | "essay" | "mirror";
  name: string;
  handle: string;
  note: string;
  sizeCm: number;
  ink: number;
  enter: () => void;
  setMotif: (m: Motif) => void;
  setZone: (z: Zone) => void;
  setField: (k: "name" | "handle" | "note", v: string) => void;
  setSize: (n: number) => void;
  setInk: (n: number) => void;
  openReserve: () => void;
  openEssay: () => void;
  openMirror: () => void;
  backToLoom: () => void;
  submit: () => void;
};

const KEY = "tattoolizza-waitlist";

export const useAtelier = create<State>((set, get) => ({
  entered: false,
  motif: "bloom",
  zone: "collar",
  stitch: 0,
  panel: "loom",
  name: "",
  handle: "",
  note: "",
  sizeCm: 4,
  ink: 0.85,
  enter: () => set({ entered: true, stitch: 1 }),
  setMotif: (motif) => set({ motif, stitch: get().stitch + 1 }),
  setZone: (zone) => set({ zone, stitch: get().stitch + 1 }),
  setField: (k, v) => set({ [k]: v }),
  setSize: (sizeCm) => set({ sizeCm }),
  setInk: (ink) => set({ ink }),
  openReserve: () => set({ panel: "reserve" }),
  openEssay: () => set({ panel: "essay" }),
  openMirror: () => set({ panel: "mirror" }),
  backToLoom: () => set({ panel: "loom" }),
  submit: () => {
    const s = get();
    const row: Booking = {
      name: s.name.trim() || "بی‌نام",
      handle: s.handle.trim(),
      note: s.note.trim(),
      motif: s.motif,
      zone: s.zone,
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(KEY) || "[]") as Booking[];
      localStorage.setItem(KEY, JSON.stringify([row, ...prev].slice(0, 20)));
    } catch {
      /* ignore quota */
    }
    set({ panel: "done" });
  },
}));
