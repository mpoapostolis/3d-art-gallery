/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";

import {
  Box,
  Html,
  TransformControls,
  TransformControlsProps,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useStore } from "../../lib/store";
const Img = (props: { src: string }) => {
  const colorMap = useLoader(THREE.TextureLoader, props.src);
  return <meshStandardMaterial side={THREE.DoubleSide} map={colorMap} />;
};
type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    roof: THREE.MeshStandardMaterial;
    wall: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
  };
};
export function Room(
  props: JSX.IntrinsicElements["group"] & { editor?: boolean },
) {
  const { nodes, materials } = useGLTF("/galery.glb") as GLTFResult;
  const circleRef = useRef<THREE.Mesh>(null);
  const store = useStore();
  const [mode, setMode] = useState<TransformControlsProps["mode"]>("translate");

  const [selected, setSelected] = useState<string | undefined | null>(null);
  return (
    <>
      {store.frames.map((v, i) => {
        return props.editor ? (
          // @ts-ignore
          <TransformControls
            mode={mode}
            onClick={() => {
              setSelected(v.uuid);
              store.selectImage(undefined);
              if (mode === "translate") setMode("rotate");
              if (mode === "rotate") setMode("scale");
              if (mode === "scale") setMode("translate");
            }}
            showX={v.uuid === selected}
            showY={v.uuid === selected}
            showZ={v.uuid === selected}
            key={i}
            position={v.position}
            rotation={v.rotation}
            scale={[1, 1, 1]}
            enabled={selected === v.uuid}
          >
            {selected === v.uuid && (
              <Html className="flex gap-3 w-fit">
                <button
                  className="py-2 px-4 bg-white rounded-lg"
                  onClick={() => {
                    store.removeFrame(v.uuid);
                  }}
                >
                  Delete
                </button>
                <button
                  className="py-2 px-4 bg-white rounded-lg"
                  onClick={() => setSelected(undefined)}
                >
                  Close
                </button>
              </Html>
            )}
            <Box args={[4, 4, 0.2]}>
              <Img src={v.img} />
            </Box>
          </TransformControls>
        ) : (
          <Box position={v.position} rotation={v.rotation} args={[4, 4, 0.2]}>
            <Img src={v.img} />
          </Box>
        );
      })}
      {store.selectedImage && (
        <Box args={[4, 4, 0.2]} ref={circleRef}>
          <Img src={store.selectedImage} />
        </Box>
      )}
      <group
        {...props}
        onPointerMove={({ intersections }) => {
          // @ts-ignore
          const point = intersections?.at(0)?.point;
          if (!point) return;
          // @ts-ignore
          circleRef.current.position.z = point.z;
          // @ts-ignore
          circleRef.current.position.x = point.x;
          // @ts-ignore
          circleRef.current.position.y = point.y;
          // @ts-ignore
          circleRef.current.lookAt(0, point.y, 0);
        }}
        onDoubleClick={() => {
          const uuid = new THREE.Object3D().uuid;
          if (!circleRef.current) return;
          const [x, y, z] = circleRef.current.position.toArray();
          const [rx, ry, rz] = circleRef.current.rotation.toArray();
          if (!store.selectedImage) return;
          store.selectImage(undefined);
          store.addFrame({
            uuid,
            position: [x, y, z],
            rotation: [rx, ry, rz],
            img: store.selectedImage,
          });
        }}
        castShadow
        scale={1.5}
        dispose={null}
        position={[2, 1.5, 2]}
      >
        <group position={[0, 1.5, 0]} scale={[1, 1, 1.2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_3.geometry}
            material={materials.floor}
          />
        </group>
        <group
          position={[9, 1.5, -3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1.2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_3.geometry}
            material={materials.floor}
          />
        </group>
        <group
          position={[9, 1.5, 3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1.2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials.floor}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/galery.glb");
