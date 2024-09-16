import { create } from "zustand";
import { persist } from "zustand/middleware";

type Frame = {
  img: string;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: [number, number, number];
  uuid: string;
};
type Store = {
  frames: Frame[];
  addFrame: (frame: Frame) => void;
  removeFrame: (uuid: string) => void;
  updateFrame: (frame: Frame) => void;
  selectedImage?: string;
  selectImage: (img?: string) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create(
  persist<Store>(
    (set) => ({
      selectedImage: undefined,
      selectImage: (img) => set({ selectedImage: img }),
      frames: [],
      addFrame: (frame) =>
        set((state) => ({ frames: [...state.frames, frame] })),
      removeFrame: (uuid) =>
        set((state) => ({
          frames: state.frames.filter((frame) => frame.uuid !== uuid),
        })),
      updateFrame: (frame) =>
        set((state) => ({
          frames: state.frames.map((f) => (f.uuid === frame.uuid ? frame : f)),
        })),
    }),
    {
      name: "3d-art-galery",
    },
  ),
);
