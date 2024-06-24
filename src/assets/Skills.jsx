import React, { useState, useRef, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import Logo from './logo';

const SkillDumbbell = ({ nodes, materials, position, rotation, onClick, canInteract, level, confidenceLevel, svgPath }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  const handlePointerOver = (event) => {
    if (canInteract) {
      event.stopPropagation();
      setHovered(true);
    }
  };

  const handlePointerOut = (event) => {
    if (canInteract) {
      event.stopPropagation();
      setHovered(false);
    }
  };

  const handleClick = (event) => {
    if (canInteract && onClick) {
      event.stopPropagation();
      onClick();
    }
  };

  const { progress } = useSpring({
    progress: hovered ? confidenceLevel / 100 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        progress: { value: 0 },
        color1: { value: new THREE.Color('gray') },
        color2: { value: new THREE.Color('limegreen') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float progress;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(color1, color2, step(vUv.x, progress));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  let dumbbellMesh;
  switch (level) {
    case 'Large':
      dumbbellMesh = (
        <mesh
          name="large_skill_dumbbell001"
          geometry={nodes.large_skill_dumbbell001.geometry}
          material={materials.rubber}
        />
      );
      break;
    case 'Medium':
      dumbbellMesh = (
        <mesh
          name="medium_skill_dumbbell001"
          geometry={nodes.medium_skill_dumbbell001.geometry}
          material={materials["red rubber"]}
        />
      );
      break;
    case 'Small':
      dumbbellMesh = (
        <mesh
          name="small_skill_db001"
          geometry={nodes.small_skill_db001.geometry}
          material={materials["yellow rubber"]}
        />
      );
      break;
    default:
      console.warn(`Unknown level: ${level}. Using default dumbbell.`);
      dumbbellMesh = (
        <mesh
          name="default_dumbbell"
          geometry={nodes.large_skill_dumbbell001.geometry}
          material={materials.rubber}
        />
      );
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {dumbbellMesh}
      <animated.mesh
        position={[.5, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        visible={hovered}
      >
        <planeGeometry args={[1, 0.15]} />
        <primitive object={shaderMaterial} attach="material" />
        <animated.primitive object={shaderMaterial} attach="material" uniforms-progress-value={progress} />
      </animated.mesh>
      <Logo svgPath={svgPath} scale={0.005} position={[0, 0, 0]} />
    </group>
  );
};

export default SkillDumbbell;
