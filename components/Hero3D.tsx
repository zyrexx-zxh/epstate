"use client";

import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 4000;

function ParticleField() {
  const points = useRef<ComponentRef<typeof Points>>(null);
  const baseRotation = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // A flattened spherical shell of points reads as a drifting dust / deep-space
  // field rather than a solid ball once it catches the fog.
  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    const group = points.current;
    if (!group) return;

    if (!reducedMotion) {
      baseRotation.current += delta * 0.025;
    }

    // Slow autonomous drift, gently steered by cursor position — never a hard snap.
    const targetX = state.pointer.y * 0.15;
    const targetY = baseRotation.current + state.pointer.x * 0.15;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.03);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.03);
  });

  return (
    <Points ref={points} positions={positions}>
      <PointMaterial
        transparent
        color="#f6f5f1"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={["#000000", 8, 17]} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
