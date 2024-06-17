import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from './assets/Loader';
import Gym from './model/gym';

const App = () => {
  return (
    <section className='w-full h-screen relative'>
      <Canvas className='w-full h-screen bg-transparent'>
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          <Gym />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default App