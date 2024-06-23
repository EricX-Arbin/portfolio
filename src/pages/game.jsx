import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const BenchPressGame = () => {
  const characterRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const barRef = useRef();
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'gameOver'
  const [armPosition, setArmPosition] = useState(0);
  const [barPosition, setBarPosition] = useState(0);

  useFrame((state, delta) => {
    if (gameState === 'playing') {
      // Move the bar
      setBarPosition((prev) => (prev + delta * 0.5) % 1);

      // Move arms based on user input
      if (state.mouse.y > 0) {
        setArmPosition(Math.min(armPosition + delta * 2, 1));
      } else {
        setArmPosition(Math.max(armPosition - delta * 2, 0));
      }

      // Update arm positions
      leftArmRef.current.rotation.x = -Math.PI / 2 + armPosition * Math.PI / 2;
      rightArmRef.current.rotation.x = -Math.PI / 2 + armPosition * Math.PI / 2;

      // Check for score
      if (Math.abs(armPosition - barPosition) < 0.1) {
        setScore((prev) => prev + 1);
      }

      // Move bar with arms
      barRef.current.position.y = 1.5 + armPosition * 0.5;
    }
  });

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = () => {
    setGameState('gameOver');
  };

  return (
    <group>
      {/* Character */}
      <group ref={characterRef} position={[0, 0, 0]}>
        {/* Body */}
        <Box args={[1, 1.5, 0.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="blue" />
        </Box>
        {/* Head */}
        <Sphere args={[0.25]} position={[0, 1.75, 0]}>
          <meshStandardMaterial color="tan" />
        </Sphere>
        {/* Left Arm */}
        <Box ref={leftArmRef} args={[0.25, 1, 0.25]} position={[-0.6, 1.25, 0]}>
          <meshStandardMaterial color="tan" />
        </Box>
        {/* Right Arm */}
        <Box ref={rightArmRef} args={[0.25, 1, 0.25]} position={[0.6, 1.25, 0]}>
          <meshStandardMaterial color="tan" />
        </Box>
      </group>

      {/* Barbell */}
      <Box ref={barRef} args={[2, 0.1, 0.1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="gray" />
      </Box>

      {/* Game UI */}
      <Html position={[0, 3, 0]}>
        <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px' }}>
          {gameState === 'idle' && <button onClick={startGame}>Start Game</button>}
          {gameState === 'playing' && <div>Score: {score}</div>}
          {gameState === 'gameOver' && (
            <>
              <div>Game Over! Score: {score}</div>
              <button onClick={startGame}>Play Again</button>
            </>
          )}
        </div>
      </Html>
    </group>
  );
};

export default BenchPressGame;