"use client";

import { useRef, useMemo, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 3500;

function WireGrid() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    const mx = pointer.x * 6;
    const my = pointer.y * 6;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const z =
        Math.sin(x * 0.6 + t * 0.5) * 0.5 +
        Math.cos(y * 0.6 + t * 0.4) * 0.5 +
        (0.8 * Math.sin(dist * 1.0 - t * 1.8)) / (dist + 1.2);
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    mesh.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[26, 26, 42, 42]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<ComponentRef<typeof Points>>(null);
  const drift = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    drift.current += delta * 0.035;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      drift.current + pointer.x * 0.25,
      0.04
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.18,
      0.04
    );
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#f6f5f1"
        size={0.065}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1.5, 11], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
      >
        <fog attach="fog" args={["#000000", 12, 24]} />
        <WireGrid />
        <Particles />
      </Canvas>
    </div>
  );
}
