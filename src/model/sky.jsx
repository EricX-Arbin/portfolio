import React from 'react';
import * as THREE from 'three';
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from 'three';
import starScene from './stars.glb'

const Stars = () => {
    const sky = useGLTF(starScene);
    sky.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshBasicMaterial({
            color: 'white',
            opacity: 0.5
          });
        }
    });

    return (
        <mesh>
            <primitive object = {sky.scene} />
        </mesh>
    )
}


const SkySphere = () => {
    return (
        <mesh>
            <sphereGeometry args={[500, 32, 32]} />
            <meshBasicMaterial color="black" side={THREE.BackSide} />
        </mesh>
    );
};

const Sky = () => {
    return (
        <>
            <Stars />
            <SkySphere />
            
        </>
    );
}

export default Sky;
