import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ConstructionFirm } from '../types/construction';

interface GlobeProps {
  constructionData: ConstructionFirm[];
  highlightedFirms: string[];
  onFirmClick: (firm: ConstructionFirm) => void;
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a simple earth-like texture
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.3, '#003366');
    gradient.addColorStop(0.7, '#004488');
    gradient.addColorStop(1, '#0066aa');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some land masses
    ctx.fillStyle = '#0a3d2e';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 30 + 10,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial map={earthTexture} />
    </Sphere>
  );
}

function ConstructionMarker({ 
  firm, 
  highlighted, 
  onClick 
}: { 
  firm: ConstructionFirm; 
  highlighted: boolean; 
  onClick: () => void;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lng to 3D coordinates
  const position = useMemo(() => {
    const lat = (firm.coordinates[1] * Math.PI) / 180;
    const lng = (firm.coordinates[0] * Math.PI) / 180;
    const radius = 2.1;
    
    const x = radius * Math.cos(lat) * Math.cos(lng);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lng);
    
    return [x, y, z] as [number, number, number];
  }, [firm.coordinates]);

  useFrame((state) => {
    if (markerRef.current && highlighted) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
    } else if (markerRef.current) {
      markerRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={markerRef} onClick={onClick}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color={highlighted ? '#00ffff' : '#ff6600'} 
          emissive={highlighted ? '#004444' : '#442200'} 
        />
      </mesh>
      {highlighted && (
        <Html distanceFactor={10}>
          <div className="bg-card border border-cyber-primary rounded px-2 py-1 text-xs text-cyber-primary min-w-[200px]">
            <div className="font-bold">{firm.name}</div>
            <div>Client: {firm.client}</div>
            <div>Region: {firm.region}</div>
            <div>Status: {firm.status}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Globe({ constructionData, highlightedFirms, onFirmClick }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0099ff" />
        
        <Earth />
        
        {constructionData.map((firm) => (
          <ConstructionMarker
            key={firm.id}
            firm={firm}
            highlighted={highlightedFirms.includes(firm.id)}
            onClick={() => onFirmClick(firm)}
          />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}