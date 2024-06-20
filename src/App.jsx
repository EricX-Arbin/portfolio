import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';

const App = () => {
  const adjustGymForScreenSize = () =>{
    let screenScale = null;
    let screnPosition = [0, -6.5, -37];
    let rotation = [0.05, 3.15, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    }else{
      screenScale = [1,1,1];
    }

    return [screenScale, screnPosition, rotation]
  }

  const [gymScale, gymPosition, gymRotation] = adjustGymForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight skyColor/>
          <ambientLight />
          <hemisphereLight skyColor="#000000" groundColor="#000000" intensity={1}/>
          <Sky /> 
          {/* fix sky positions or what ever is the issue */}
          <Gym 
          position = {gymPosition}
          scale = {gymScale}
          rotation = {gymRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default App