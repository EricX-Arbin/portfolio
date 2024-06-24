import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';
import CameraController from './assets/CameraController';
import About from './pages/About';

const Scene = ({ currentView, onCameraChange, cameraConfigs, onPopupTrigger }) => {
  return (
    <>
      <CameraController currentView={currentView} cameraConfigs={cameraConfigs} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="sunset" />
      <Gym onCameraChange={onCameraChange} currentView={currentView} onPopupTrigger={onPopupTrigger} />
      <Sky />
    </>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('outside');
  const [activePopup, setActivePopup] = useState(null);

  const cameraConfigs = {
    outside: { position: [0, 3, -23.5], rotation: [0, 180, 0], fov: 54, enableMouseFollow: false },
    reception: { position: [0, 2, -13.5], rotation: [0, 200, 0], fov: 60, enableMouseFollow: true },
    about: { position: [9.75, 1.5, -9.5], rotation: [-5, 0, 0], fov: 54, enableMouseFollow: true },
    projects: { position: [8.5, 2, 14], rotation: [-2, 0, 0], fov: 70, enableMouseFollow: true },
    skills: { position: [-10, 2, 1], rotation: [0, 90, 0], fov: 70, enableMouseFollow: true },
    game: { position: [-8.7, 2, -5], rotation: [0, 0, 0], fov: 60, enableMouseFollow: false },
  };

  const handleCameraChange = (destination) => {
    setCurrentView(destination);
  };

  const handlePopupTrigger = (popupType) => { 
    setActivePopup(popupType);
  };

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000, position: [0, 0, 0], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>
          <Scene 
            currentView={currentView} 
            onCameraChange={handleCameraChange}
            cameraConfigs={cameraConfigs}
            onPopupTrigger={handlePopupTrigger}
          />
        </Suspense>
      </Canvas>
      {currentView !== 'reception' && currentView !== 'outside' && (
        <button
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => handleCameraChange('reception')}
        >
          Back to Reception
        </button>
      )}
      {activePopup && (
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #333',
          borderRadius: '10px',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <About activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}
    </section>
  );
};

export default App;