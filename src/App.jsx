import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';
import CameraController from './assets/CameraController';
import About from './pages/About';
import QTEBar from './assets/MiniGame';
import Projects from './pages/Projects';

const Scene = ({ currentView, onCameraChange, cameraConfigs, onPopupTrigger, playAnimation, sliderPosition, playGame }) => {
  return (
    <>
      <CameraController currentView={currentView} cameraConfigs={cameraConfigs} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="sunset" />
      <Gym 
        onCameraChange={onCameraChange} 
        currentView={currentView} 
        onPopupTrigger={onPopupTrigger} 
        playAnimation={playAnimation}
      />
      <Sky />
      {playGame && (
        <QTEBar 
          position={[-8.7, 2, -11]} 
          rotation={[0, 0, 0]} 
          scale={[2, 0.5, 0.5]} 
          sliderPosition={sliderPosition}
          successZoneStart={0.3}
          successZoneEnd={0.7}
        />
      )}
    </>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('outside');
  const [activePopup, setActivePopup] = useState(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showGameResults, setShowGameResults] = useState(false);
  const [score, setScore] = useState(0);
  const [playGame, setPlayGame] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(1);
  const [canClick, setCanClick] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const cameraConfigs = {
    outside: { position: [0, 3, -23.5], rotation: [0, 180, 0], fov: 54, enableMouseFollow: false },
    reception: { position: [0, 2, -13.5], rotation: [0, 200, 0], fov: 60, enableMouseFollow: true },
    about: { position: [9.75, 1.5, -9.5], rotation: [-5, 0, 0], fov: 54, enableMouseFollow: true },
    projects: { position: [8.5, 2, 14], rotation: [-2, 0, 0], fov: 70, enableMouseFollow: true },
    skills: { position: [-10, 1.6, 1], rotation: [0, 90, 0], fov: 70, enableMouseFollow: true },
    game: { position: [-8.7, 2, -5], rotation: [0, 0, 0], fov: 60, enableMouseFollow: false },
  };

  useEffect(() => {
    let animationFrame;
    if (playGame && !isPaused) {
      const animate = () => {
        setSliderPosition((prev) => {
          const newPosition = prev + 0.02 * speed * direction;
          if (newPosition > 1 || newPosition < 0) {
            setDirection((prev) => -prev);
          }
          return Math.max(0, Math.min(1, newPosition));
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [playGame, speed, direction, isPaused]);

  const handleCameraChange = (destination) => {
    setCurrentView(destination);
    if (destination === 'game') setPlayGame(true);
  };

  const handlePopupTrigger = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClick = () => {
    if (!canClick || isPaused) return;

    if (sliderPosition >= 0.3 && sliderPosition <= 0.7) {
      setScore((prev) => prev + 1);
      setSpeed((prev) => prev * 1.02);
      setPlayAnimation(true);
      setCanClick(false);
      setIsPaused(true);
      setTimeout(() => {
        setCanClick(true);
        setPlayAnimation(false);
        setIsPaused(false);
      }, 1500);
    } else {
      handleGameOver(false);
    }
  };

  const handleStartGame = () => {
    setShowGameResults(false);
    setPlayGame(true);
    setScore(0);
    setSpeed(1);
    setSliderPosition(0);
    setDirection(1);
    setCanClick(true);
    setIsPaused(false);
  };

  const handleGameOver = () => {
    setShowGameResults(true);
    setPlayGame(false);
    setPlayAnimation(false);
    setIsPaused(false);
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
             playAnimation={playAnimation}
             onGameOver={handleGameOver}
             sliderPosition={sliderPosition}
             playGame={playGame}
          />
        </Suspense>
      </Canvas>
      {currentView === 'game' && !playGame && (
        <button
          style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      )}
      {currentView === 'game' && playGame && !isPaused && (
        <button
          style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: canClick ? 'white' : 'gray',
            border: 'none',
            borderRadius: '5px',
            cursor: canClick ? 'pointer' : 'not-allowed',
          }}
          onClick={handleClick}
          disabled={!canClick}
        >
          Click!
        </button>
      )}
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
      {activePopup && currentView !== 'projects' && (
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
      {activePopup && currentView !== 'about' && (
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
          <Projects activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}
      {showGameResults && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
          <p>Score: {score}</p>
          <button onClick={handleStartGame}>Play Again</button>
          <button onClick={() => {handleCameraChange('reception'), setShowGameResults(false)}}>Back to Reception</button>
        </div>
      )}
    </section>
  );
};

export default App;