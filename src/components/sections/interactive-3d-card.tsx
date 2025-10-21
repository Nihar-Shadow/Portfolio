"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// ID Card component with lanyard
interface IDCardProps {
  flipped: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
  stretchX: number;
  stretchY: number;
}

const IDCard = ({ flipped, onClick, onPointerOver, onPointerOut, stretchX, stretchY }: IDCardProps) => {
  const cardRef = useRef<THREE.Group>(null);
  const lanyardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load textures
  const [cardTexture, profilePicture] = useTexture(["/nihar.png", "/nihar.png"]);
  
  // Create back texture with QR code and info
  const backTexture = new THREE.CanvasTexture(createBackTexture());
  
  // Animation for card swinging
  useFrame((state) => {
    if (cardRef.current && !flipped) {
      // Gentle swinging motion - physics-based pendulum effect
      const time = state.clock.getElapsedTime();
      const swingAmplitude = 0.15;
      const swingFrequency = 0.8;
      const dampingFactor = Math.exp(-0.2 * time); // Damping over time
      
      cardRef.current.rotation.y = Math.sin(time * swingFrequency) * swingAmplitude * dampingFactor;
      cardRef.current.rotation.x = Math.sin(time * 0.5) * 0.05 * dampingFactor;
      
      // Restore swing on mouse movement
      if (state.mouse.x !== 0 || state.mouse.y !== 0) {
        cardRef.current.rotation.y += state.mouse.x * 0.1;
        cardRef.current.rotation.x -= state.mouse.y * 0.1;
      }
    }
    
    // Animate lanyard with slight delay for realistic physics
    if (lanyardRef.current && cardRef.current) {
      lanyardRef.current.rotation.y = cardRef.current.rotation.y * 0.7;
      lanyardRef.current.rotation.x = cardRef.current.rotation.x * 0.7;
    }
  });
  
  // Animation for card flip, stretch, and glow
  const { rotation, scale, emissiveIntensity } = useSpring({
    rotation: flipped ? [0, Math.PI, 0] : [0, 0, 0],
    scale: [1 + stretchX * 0.5, 1 + stretchY * 0.5, 1],
    emissiveIntensity: hovered ? 0.5 : 0,
    config: { mass: 1, tension: 180, friction: 12 }
  });
  
  // Handle hover state
  const handlePointerOver = () => {
    setHovered(true);
    onPointerOver();
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    onPointerOut();
  };
  
  return (
    <group>
      {/* Lanyard */}
      <mesh ref={lanyardRef} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* ID Card */}
      <animated.group 
        ref={cardRef}
        position={[0, 0, 0]}
        rotation={rotation as any}
        scale={scale as any}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Front of card */}
        <mesh position={[0, 0, 0.01]} castShadow receiveShadow>
          <planeGeometry args={[1, 1.5]} />
          <animated.meshStandardMaterial 
            map={profilePicture} 
            roughness={0.2}
            metalness={0.1}
            emissive="#00ff00"
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        
        {/* Back of card */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
          <planeGeometry args={[1, 1.5]} />
          <meshStandardMaterial 
            map={backTexture}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Card edges with glow effect */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.02, 1.52, 0.05]} />
          <animated.meshStandardMaterial 
            color="#ffffff" 
            transparent={true}
            opacity={0.2}
            roughness={0.1}
            metalness={0.8}
            emissive="#00ff00"
            emissiveIntensity={emissiveIntensity as any}
          />
        </mesh>
      </animated.group>
    </group>
  );
};

// Helper function to create back texture
function createBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 533;
  const ctx = canvas.getContext('2d');
  
  // Background
  if (ctx) ctx.fillStyle = '#111111';
  if (ctx) ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text
  if (ctx) {
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Nihar Pradhan', canvas.width/2, 100);
  
    ctx.fillStyle = '#cccccc';
    ctx.font = '18px monospace';
    
    ctx.fillText('CyberSecurity Analyst', canvas.width/2, 140);
  
    ctx.fillStyle = '#888888';
    ctx.font = '16px monospace';
    ctx.fillText('nihar@example.com', canvas.width/2, 200);
    ctx.fillText('github.com/nihar', canvas.width/2, 230);
  }
  
  // Enhanced QR code placeholder with more realistic pattern
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(canvas.width/2 - 75, 300, 150, 150);
    ctx.fillStyle = '#000000';
    
    // Position detection patterns (the three large squares in corners)
    // Top-left
    ctx.fillRect(canvas.width/2 - 75, 300, 30, 30);
    ctx.fillRect(canvas.width/2 - 65, 310, 10, 10);
    
    // Top-right
    ctx.fillRect(canvas.width/2 + 45, 300, 30, 30);
    ctx.fillRect(canvas.width/2 + 55, 310, 10, 10);
    
    // Bottom-left
    ctx.fillRect(canvas.width/2 - 75, 420, 30, 30);
    ctx.fillRect(canvas.width/2 - 65, 430, 10, 10);
    
    // Random data pattern
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(
            canvas.width/2 - 60 + i * 20, 
            315 + j * 20, 
            15, 15
          );
        }
      }
    }
  }
  
  return canvas;
}

// Arrow component for stretching
interface ArrowProps {
  position: [number, number, number];
  rotation: [number, number, number];
  direction: 'horizontal' | 'vertical';
  onDrag: (amount: number) => void;
}

const Arrow = ({ position, rotation, direction, onDrag }: ArrowProps) => {
  const arrowRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const startPos = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  
  const { scale, glow } = useSpring({
    scale: hovered ? 1.2 : 1,
    glow: hovered ? 0.5 : 0,
    config: { duration: 200 }
  });
  
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    startPos.current = { x: e.point.x, y: e.point.y };
  };
  
  const handlePointerUp = () => {
    setDragging(false);
  };
  
  const handlePointerMove = (e: any) => {
    if (dragging) {
      const currentPos = { x: e.point.x, y: e.point.y };
      const delta = direction === 'horizontal' 
        ? currentPos.x - startPos.current.x 
        : currentPos.y - startPos.current.y;
      onDrag(delta * 2);
    }
  };
  
  useEffect(() => {
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  
  return (
    <animated.mesh
      position={position}
      rotation={rotation}
      ref={arrowRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      scale={scale as any}
    >
      <coneGeometry args={[0.1, 0.2, 16]} />
      <animated.meshStandardMaterial 
        transparent={true}
        opacity={0}
        emissive="#00ff00"
        emissiveIntensity={glow}
      />
    </animated.mesh>
  );
};

// Fix for R3F data-orchids-name error
function fixR3FDataAttributes() {
  if (typeof THREE.Object3D !== 'undefined') {
    (THREE.Object3D.prototype as any).setAttribute = function() { return this; };
  }
}

// Main component
const Interactive3DCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [stretchX, setStretchX] = useState(0);
  const [stretchY, setStretchY] = useState(0);
  const [hovered, setHovered] = useState(false);
  
  // Apply R3F fix on component mount
  useEffect(() => {
    fixR3FDataAttributes();
  }, []);
  
  // Spring back when not dragging
  useEffect(() => {
    if (stretchX !== 0) {
      const timer = setTimeout(() => {
        setStretchX(stretchX * 0.8);
        if (Math.abs(stretchX) < 0.01) setStretchX(0);
      }, 16);
      return () => clearTimeout(timer);
    }
  }, [stretchX]);
  
  useEffect(() => {
    if (stretchY !== 0) {
      const timer = setTimeout(() => {
        setStretchY(stretchY * 0.8);
        if (Math.abs(stretchY) < 0.01) setStretchY(0);
      }, 16);
      return () => clearTimeout(timer);
    }
  }, [stretchY]);
  
  return (
    <>
      <div className="w-full h-[500px] relative">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={['#111']} />
          <fog attach="fog" args={['#111', 5, 20]} />
          
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[5, 5, 5]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
          />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          
          <group position={[0, 0, 0]}>
            <IDCard 
              flipped={flipped}
              onClick={() => setFlipped(!flipped)}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              stretchX={stretchX}
              stretchY={stretchY}
            />
            
            {/* Horizontal stretch arrow */}
            <Arrow 
              position={[1.5, 0, 0]} 
              rotation={[0, 0, 0]} 
              direction="horizontal"
              onDrag={(amount) => setStretchX(amount)}
            />
            
            {/* Vertical stretch arrow */}
            <Arrow 
              position={[0, -2, 0]} 
              rotation={[0, 0, Math.PI/2]} 
              direction="vertical"
              onDrag={(amount) => setStretchY(amount)}
            />
            
            {/* Shadow */}
            <mesh 
              receiveShadow 
              position={[0, -2, -1]} 
              rotation={[-Math.PI/2, 0, 0]}
            >
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.2} />
            </mesh>
          </group>
          
          <Environment preset="city" />
        </Canvas>
        
        {/* Interactive indicator */}
        <div className="absolute bottom-2 right-2 text-green-500 text-xs font-mono">
          [Interactive 3D Card]
        </div>
      </div>
    </>
  );
};

export default Interactive3DCard;