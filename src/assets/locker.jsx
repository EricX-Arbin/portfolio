import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Locker = ({ nodes, materials, position, rotation, onClick, canInteract}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const leftDoorRefs = useRef([]);
  const rightDoorRefs = useRef([]);

  useFrame(() => {
    if (!groupRef.current || !canInteract) return;

    leftDoorRefs.current.forEach((door) => {
      if (door && door.rotation) {
        const targetRotation = hovered ? Math.PI / 2 : 0;
        door.rotation.z += (targetRotation - door.rotation.z) * 0.1;
      }
    });

    rightDoorRefs.current.forEach((door) => {
      if (door && door.rotation) {
        const targetRotation = hovered ? -Math.PI / 2 : 0;
        door.rotation.z += (targetRotation - door.rotation.z) * 0.1;
      }
    });
  });

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

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh geometry={nodes.gym_model_062015.geometry} material={materials.weights} />
      <mesh geometry={nodes.gym_model_062015_1.geometry} material={materials.metal} />
      <mesh geometry={nodes.gym_model_062015_2.geometry} material={materials.rubber} />
      
      <group ref={el => rightDoorRefs.current[0] = el} position={[0.592, 0.324, -0.09]}>
        <mesh geometry={nodes.gym_model_067010.geometry} material={materials['metal.038']} />
        <mesh geometry={nodes.gym_model_067010_1.geometry} material={materials['rubber.042']} />
      </group>
      
      <group ref={el => leftDoorRefs.current[0] = el} position={[-0.592, 0.324, -0.09]}>
        <mesh geometry={nodes.gym_model_066012.geometry} material={materials['metal.038']} />
        <mesh geometry={nodes.gym_model_066012_1.geometry} material={materials['rubber.042']} />
      </group>
      
      <group ref={el => rightDoorRefs.current[1] = el} position={[0.592, 0.324, -1.068]}>
        <mesh geometry={nodes.gym_model_065012.geometry} material={materials['metal.038']} />
        <mesh geometry={nodes.gym_model_065012_1.geometry} material={materials['rubber.042']} />
      </group>
      
      <group ref={el => leftDoorRefs.current[1] = el} position={[-0.592, 0.324, -1.068]}>
        <mesh geometry={nodes.gym_model_064012.geometry} material={materials['metal.038']} />
        <mesh geometry={nodes.gym_model_064012_1.geometry} material={materials['rubber.042']} />
      </group>
    </group>
  );
};

export default Locker;