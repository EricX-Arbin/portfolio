import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const CameraController = ({ currentView, cameraConfigs }) => {
  const { camera, size } = useThree();
  const mousePosition = useRef([0, 0]);
  const targetPosition = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler());

  useEffect(() => {
    const config = cameraConfigs[currentView];
    if (config) {
      gsap.to(targetPosition.current, {
        x: config.position[0],
        y: config.position[1],
        z: config.position[2],
        duration: 2,
      });
      gsap.to(targetRotation.current, {
        x: THREE.MathUtils.degToRad(config.rotation[0]),
        y: THREE.MathUtils.degToRad(config.rotation[1]),
        z: THREE.MathUtils.degToRad(config.rotation[2]),
        duration: 2,
      });
      camera.fov = config.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, currentView, cameraConfigs]);

  useFrame(() => {
    const config = cameraConfigs[currentView];
    if (config && config.enableMouseFollow) {
      const offsetX = (mousePosition.current[0] - 0.5) * 0.1;
      const offsetY = (mousePosition.current[1] - 0.5) * 0.1;
      camera.position.lerp(
        new THREE.Vector3(
          targetPosition.current.x + offsetX,
          targetPosition.current.y - offsetY,
          targetPosition.current.z
        ),
        0.1
      );
    } else {
      camera.position.lerp(targetPosition.current, 0.1);
    }
    
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.1);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.1);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.current.z, 0.1);
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mousePosition.current = [e.clientX / size.width, e.clientY / size.height];
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [size]);

  return null;
};

export default CameraController;