import { create } from "zustand";
import { persist } from "zustand/middleware";

type Frame = {
  img: string;
  rotation?: [number, number, number, string];
  position?: [number, number, number];
  scale?: [number, number, number];
  uuid: string;
};
type Store = {
  selected?: string;
  setSelected: (uuid?: string) => void;
  mode?: "rotate" | "translate" | "scale";
  setMode: (mode: "rotate" | "translate" | "scale") => void;
  frames: Frame[];
  addFrame: (frame: Frame) => void;
  removeFrame: (uuid: string) => void;
  updateFrame: (frame: Frame) => void;
  selectImage: (img?: string) => void;
  selectedImage?: string;
};

const defaultFrames = [
  {
    uuid: "13e3908c-734d-453b-bf13-6d48f83dfa8f",
    position: [-0.14718035212084435, 3.9768409153285655, 14.000000000000002],
    rotation: [
      -3.141592653589793,
      -0.005009249506036405,
      -3.141592653589793,
      "XYZ",
    ],
    img: "9.jpg",
    scale: [0.4254648159891823, 0.6952683247425107, 0.4254648159891823],
  },
  {
    uuid: "cf312ace-5d16-492d-b41a-6699b71b186f",
    position: [4.637049113724126, 3.9232516499142296, 14],
    rotation: [
      -3.141592653589793,
      0.017615169206794318,
      -3.141592653589793,
      "XYZ",
    ],
    img: "10.jpg",
    scale: [0.41512844053606945, 0.6965370734605179, 0.41512844053606945],
  },
  {
    uuid: "ca706f9d-8fb9-4d6a-b67a-228cdf090309",
    position: [-3.999999999999999, 3.7783336101770937, 9.737963735473748],
    rotation: [
      -3.1415926535897865,
      1.5538695649735814,
      3.1415926535897865,
      "XYZ",
    ],
    img: "5.jpg",
    scale: [0.359727064269023, 0.6125662465223122, 0.6125662465223122],
  },
  {
    uuid: "ca9d4b7b-0a1a-4bcb-832c-52f26ae1f48c",
    position: [-3.999999999999999, 4.14394546643152, -1.0437554671920157],
    rotation: [
      -5.8206415490661484e-15,
      1.5521834258331018,
      5.9992085038032035e-15,
      "XYZ",
    ],
    img: "4.jpg",
    scale: [0.41060636418299334, 0.9969746237480347, 0.41060636418299334],
  },
  {
    uuid: "3eb43201-bfe7-444c-90ea-1c05f6ef8eb2",
    position: [-4, 3.760631063576472, -5.964948838589541],
    rotation: [
      -3.1415926535897825,
      1.5596086923611256,
      3.141592653589783,
      "XYZ",
    ],
    img: "3.jpg",
    scale: [0.32154591442548197, 0.5325680426598651, 0.7205306555575679],
  },
  {
    uuid: "4a327411-970c-4bb2-b430-4899aaf6447e",
    position: [1.999244389651381, 4.4080176806195, -10.041148600676074],
    rotation: [0, 0.0030191000986717485, 0, "XYZ"],
    img: "11.jpg",
    scale: [1.688119643091801, 0.8892663252560281, 1],
  },
  {
    uuid: "f45396a3-32c2-4e01-93e8-24ab74951110",
    position: [15.108477980343256, 3.836325732748862, -10.04932587741182],
    rotation: [
      3.141592653589793,
      0.006411291928154808,
      3.141592653589793,
      "XYZ",
    ],
    img: "12.jpg",
    scale: [0.8004840096368455, 0.6232426306623154, 0.7166003428541814],
  },
  {
    uuid: "b8157382-8655-49b8-acef-378c03fab335",
    position: [25.34077938010461, 3.9594071996055615, -10.000000000000002],
    rotation: [
      -3.1404971465885714,
      0.012090022752489401,
      -3.1288564462456394,
      "XYZ",
    ],
    img: "13.jpg",
    scale: [0.6420036124985802, 0.7399264274206859, 0.6420036124985802],
  },
  {
    uuid: "f9e0cbfe-587d-4db7-94d5-26a35a33dfb9",
    position: [31.929175765266876, 4.0840632185700425, -3.895803789978972],
    rotation: [
      3.141592653589792,
      -1.5650854292828833,
      3.141592653589792,
      "XYZ",
    ],
    img: "14.jpg",
    scale: [1.4758553584297704, 1, 1],
  },
  {
    uuid: "18da04b1-ad7b-4a45-b8d2-78a88296ffac",
    position: [32, 4.239569111961755, 6.191115692006379],
    rotation: [
      -3.00339429519549,
      -1.564278708279329,
      -2.9900205240160065,
      "XYZ",
    ],
    img: "1.jpg",
    scale: [0.49811426388347974, 0.8905629857868612, 1.043610199704159],
  },
  {
    uuid: "15f3aaae-8713-42b4-a58f-5988669fd68f",
    position: [31.963326089752755, 4.2377224511279135, 10.109449526050527],
    rotation: [
      6.9443667547015245e-15,
      -1.5634825802140881,
      6.941899941140648e-15,
      "XYZ",
    ],
    img: "2.jpg",
    scale: [0.5205171864875049, 0.87298765566204, 0.9467350118612674],
  },
  {
    uuid: "a4582e22-ed2f-4bd2-bd5e-efef4a665318",
    position: [-3.999999999999999, 3.8310507231520834, 4.415435013440661],
    rotation: [
      -3.8441575987988395e-15,
      1.5502581403121436,
      4.059433397284023e-15,
      "XYZ",
    ],
    img: "7.jpg",
    scale: [0.5377496332203717, 0.5377496332203717, 0.5377496332203717],
  },
  {
    uuid: "735a0623-b31c-4a06-833f-54e76ae0b2d4",
    position: [11.40479816844969, 4.157441309509622, 13.999999999999996],
    rotation: [
      -3.141592653589793,
      0.00008886872119250386,
      -3.141592653589793,
      "XYZ",
    ],
    img: "8.jpg",
    scale: [0.5393420332261708, 0.8062240178116872, 1.306146207239998],
  },
] as Frame[];
// Create your store, which includes both state and (optionally) actions
export const useStore = create(
  persist<Store>(
    (set) => ({
      selected: undefined,
      setSelected: (uuid) => set({ selected: uuid }),
      mode: "translate",
      setMode: (mode) => set({ mode }),
      selectedImage: undefined,
      selectImage: (img) => set({ selectedImage: img }),
      frames: defaultFrames,
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
