import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';

const BenchPressGame = ({ nodes, materials, onGameOver, highScore, onStartGame, isGameActive, characterRef, barbellRef }) => {
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [barPosition, setBarPosition] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'gameOver'
  const { actions } = useAnimations(nodes.character3.animations, characterRef);

  useEffect(() => {
    if (actions.BenchPress) {
      actions.BenchPress.play();
      actions.BenchPress.paused = true;
    }
  }, [actions]);

  useEffect(() => {
    if (isGameActive) {
      startGame();
    } else {
      setGameState('idle');
    }
  }, [isGameActive]);

  useFrame((state, delta) => {
    if (gameState !== 'playing') return;

    // Move the bar
    setBarPosition((prev) => {
      const newPosition = prev + delta * gameSpeed;
      return newPosition > 1 ? 0 : newPosition;
    });

    // Animate character and barbell
    if (isLifting) {
      if (actions.BenchPress) {
        actions.BenchPress.paused = false;
        actions.BenchPress.time += delta;
        if (actions.BenchPress.time > actions.BenchPress.getClip().duration) {
          actions.BenchPress.time = 0;
        }
      }
      barbellRef.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.1 + 1.664;
    } else {
      if (actions.BenchPress) {
        actions.BenchPress.paused = true;
      }
      barbellRef.current.position.y = 1.664;
    }
  });

  const handleClick = () => {
    if (gameState !== 'playing') return;

    if (barPosition > 0.4 && barPosition < 0.6) {
      setScore((prev) => prev + 1);
      setGameSpeed((prev) => prev * 1.1);
      setIsLifting(true);
      setTimeout(() => setIsLifting(false), 500);
    } else {
      setGameState('gameOver');
      onGameOver(score);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setGameSpeed(1);
    onStartGame();
  };

  return (
    <>
      {gameState === 'playing' && (
        <>
          <sprite
            position={[-8.7, 3, -10.726]}
            scale={[2, 0.2, 1]}
            onClick={handleClick}
          >
            <spriteMaterial attach="material" color="#cccccc" />
          </sprite>
          <sprite
            position={[-8.7 + (barPosition * 2 - 1), 3, -10.725]}
            scale={[0.1, 0.3, 1]}
          >
            <spriteMaterial attach="material" color="#ff0000" />
          </sprite>
          <sprite position={[-8.7, 3.5, -10.726]} scale={[1, 0.5, 1]}>
            <spriteMaterial attach="material">
              <canvasTexture attach="map" image={(() => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 256;
                canvas.height = 128;
                ctx.fillStyle = 'white';
                ctx.font = '32px Arial';
                ctx.fillText(`Score: ${score}`, 10, 64);
                return canvas;
              })()} />
            </spriteMaterial>
          </sprite>
        </>
      )}

      {/* Score Popup */}
      <Html position={[-8.7, 2, -10.726]}>
        <div style={{
          display: gameState === 'gameOver' ? 'block' : 'none',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2>{score > highScore ? 'New High Score!' : 'Game Over'}</h2>
          <p>Your Score: {score}</p>
          <p>High Score: {Math.max(score, highScore)}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      </Html>
    </>
  );
};

export default BenchPressGame;