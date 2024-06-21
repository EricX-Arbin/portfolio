import React, { useState, useCallback, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';

const CameraController = ({ position, rotation, fov, enableMouseFollow }) => {
  const { camera, size } = useThree();
  const mousePosition = useRef([0, 0]);
  const targetPosition = useRef(new THREE.Vector3(...position));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0, 'XYZ'));

  useFrame(() => {
    if (enableMouseFollow) {
      const offsetX = (mousePosition.current[0] - 0.5) * 0.1;
      const offsetY = (mousePosition.current[1] - 0.5) * 0.1;
      camera.position.lerp(new THREE.Vector3(
        targetPosition.current.x + offsetX,
        targetPosition.current.y - offsetY,
        targetPosition.current.z
      ), 0.1);
    } else {
      camera.position.lerp(targetPosition.current, 0.1);
    }
    
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.1);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.1);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.current.z, 0.1);
    
    camera.fov = fov;
    camera.updateProjectionMatrix();
  });

  React.useEffect(() => {
    const updateMousePosition = (e) => {
      mousePosition.current = [e.clientX / size.width, e.clientY / size.height];
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [size]);

  React.useEffect(() => {
    targetPosition.current.set(...position);
    targetRotation.current.set(
      THREE.MathUtils.degToRad(rotation[0]),
      THREE.MathUtils.degToRad(rotation[1]),
      THREE.MathUtils.degToRad(rotation[2])
    );
  }, [position, rotation]);

  return null;
};

const App = () => {
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  const cameraConfigs = [
    { position: [0, 10, 3.5], rotation: [-10, 0, 0], fov: 54, enableMouseFollow: true },
    { position: [0, 14, 2], rotation: [78, 0, 187], fov: 54, enableMouseFollow: true },
    { position: [9.5, 8, 2], rotation: [77, 0, 0], fov: 54, enableMouseFollow: true },
    { position: [10.8, -14, 2.3], rotation: [77, 0, 0], fov: 54, enableMouseFollow: true },
    { position: [-10, -0.3, 1.5], rotation: [77, 0, 90], fov: 54, enableMouseFollow: true },
    { position: [-8.7, 5.6, 2.9], rotation: [73, 0, 0], fov: 37, enableMouseFollow: true },
  ];

  const adjustGymForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [gymScale, gymPosition, gymRotation] = adjustGymForScreenSize();

  const handleCameraSwitch = useCallback((index) => {
    setCurrentCameraIndex(index);
  }, []);

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000 }}
      >
        <CameraController {...cameraConfigs[currentCameraIndex]} />
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={1} position={[1, 1, 1]} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
          <Sky />
          <Gym 
            position={gymPosition}
            scale={gymScale}
            rotation={gymRotation}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-4 flex space-x-2">
        {cameraConfigs.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCameraSwitch(index)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Camera {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default App;