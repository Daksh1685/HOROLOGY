"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function LuxuryObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
        <meshPhysicalMaterial 
          color="#cfa864"
          metalness={1}
          roughness={0.15}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-5, -10, -5]} angle={0.25} penumbra={1} intensity={1} color="#cfa864" />
        <LuxuryObject />
        <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.3} color="#cfa864" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
