"use client";

import { useRef, useMemo, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function WireGrid() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    const mx = pointer.x * 9;
    const my = pointer.y * 9;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const z =
        Math.sin(x * 0.5 + t * 0.5) * 0.8 +
        Math.cos(y * 0.5 + t * 0.4) * 0.8 +
        (1.4 * Math.sin(dist * 0.85 - t * 1.7)) / (dist + 1.4);
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    mesh.current.geometry.computeVertexNormals();
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.1, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[34, 34, 56, 56]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

function CentralKnot() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime * 0.11;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, t + pointer.y * 0.2, 0.04);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, t * 1.5 + pointer.x * 0.2, 0.04);
  });
  return (
    <mesh ref={mesh} position={[0, 0.3, 0]}>
      <torusKnotGeometry args={[2.6, 0.7, 240, 30]} />
      <meshBasicMaterial wireframe color="#f6f5f1" transparent opacity={0.065} />
    </mesh>
  );
}

function FloatingOrb({
  position, size, speed, phase, ico,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  phase: number;
  ico: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.x = t * speed + phase;
    mesh.current.rotation.y = t * speed * 1.4 + phase;
    mesh.current.rotation.z = t * speed * 0.6;
    mesh.current.position.y = position[1] + Math.sin(t * 0.55 + phase) * 0.4;
  });
  return (
    <mesh ref={mesh} position={position}>
      {ico ? <icosahedronGeometry args={[size, 1]} /> : <octahedronGeometry args={[size]} />}
      <meshBasicMaterial wireframe color="#f6f5f1" transparent opacity={0.18} />
    </mesh>
  );
}

function Ring() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.elapsedTime * 0.07;
    mesh.current.rotation.z = clock.elapsedTime * 0.04;
  });
  return (
    <mesh ref={mesh} position={[0, 0, -4]}>
      <torusGeometry args={[5.5, 0.04, 3, 120]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<ComponentRef<typeof Points>>(null);
  const drift = useRef(0);
  const positions = useMemo(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 4.5 + Math.random() * 9;
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
    drift.current += delta * 0.025;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, drift.current + pointer.x * 0.3, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.2, 0.04);
  });
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#f6f5f1" size={0.07} sizeAttenuation depthWrite={false} opacity={0.75} />
    </Points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1.8, 13], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
        <fog attach="fog" args={["#000000", 11, 28]} />
        <WireGrid />
        <Ring />
        <CentralKnot />
        <FloatingOrb position={[-6, 1, -3]} size={1.2} speed={0.2} phase={0} ico />
        <FloatingOrb position={[6, 0.5, -2]} size={0.9} speed={0.17} phase={2.1} ico={false} />
        <FloatingOrb position={[-2.5, -1, -6]} size={0.65} speed={0.26} phase={4.2} ico />
        <FloatingOrb position={[4, 2, -5]} size={0.75} speed={0.22} phase={1.5} ico={false} />
        <Particles />
      </Canvas>
    </div>
  );
}
