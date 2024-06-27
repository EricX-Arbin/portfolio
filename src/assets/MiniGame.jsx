import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const QTEBar = ({ position, rotation, scale, sliderPosition, successZoneStart, successZoneEnd }) => {
  const barRef = useRef();
  const sliderRef = useRef();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        successZoneStart: { value: successZoneStart },
        successZoneEnd: { value: successZoneEnd },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float successZoneStart;
        uniform float successZoneEnd;
        varying vec2 vUv;
        void main() {
          vec3 color = vec3(1.0, 0.0, 0.0); // Red for failure zone
          if (vUv.x >= successZoneStart && vUv.x <= successZoneEnd) {
            color = vec3(0.0, 1.0, 0.0); // Green for success zone
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, [successZoneStart, successZoneEnd]);

  useFrame(() => {
    if (sliderRef.current) {
      sliderRef.current.position.x = (sliderPosition - 0.5) * scale[0];
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={barRef} scale={scale}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
      <mesh ref={sliderRef} position={[0, 0, 0.06]}>
        <boxGeometry args={[0.05, 0.12, 0.02]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
};

export default QTEBar;