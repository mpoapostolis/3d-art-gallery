import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Room } from "../../components/scene";
import Ecctrl from "ecctrl";
import { useStore } from "../../lib/store";
import clsx from "clsx";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  // Optional animation key map
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
];

export function Editor() {
  const store = useStore();
  return (
    <div className="grid h-screen grid-cols-[20vw_1fr]">
      <div className="h-full bg-black">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              onClick={() =>
                store.selectImage(
                  store.selectedImage === `${i}.jpg` ? undefined : `${i}.jpg`,
                )
              }
              key={i}
              className={clsx("grid p-4  place-items-center", {
                "border border-yellow-100": store.selectedImage === `${i}.jpg`,
              })}
            >
              <img src={`/${i}.jpg`} />
            </div>
          ))}
        </div>
      </div>
      <Canvas style={{ backgroundColor: "#555555" }} className="w-full h-full">
        <OrbitControls />

        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <Physics>
          <RigidBody type="fixed" colliders="trimesh">
            <Room editor />
          </RigidBody>

          <KeyboardControls map={keyboardMap}>
            <Ecctrl
              maxVelLimit={10}
              camCollision={false} // disable camera collision detect (useless in FP mode)
              camInitDis={-0.01} // camera intial position
              camMinDis={-0.01} // camera zoom in closest position
              camFollowMult={1000} // give a big number here, so the camera follows the target (character) instantly
              camLerpMult={1000} // give a big number here, so the camera lerp to the followCam position instantly
              turnVelMultiplier={1} // Turning speed same as moving speed
              turnSpeed={100} // give it big turning speed to prevent turning wait time
              mode="CameraBasedMovement" // character's rotation will follow camera's rotation in this mode
            >
              <pointLight position={[0, 2, 0]} intensity={50} color="#fff" />
            </Ecctrl>
          </KeyboardControls>
          <ambientLight />
        </Physics>
      </Canvas>
    </div>
  );
}
