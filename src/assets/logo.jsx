import React, { useMemo } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// Extend THREE with ExtrudeGeometry
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

const fillMaterial = new THREE.MeshBasicMaterial({ color: "#F3FBFB" });
const strokeMaterial = new THREE.LineBasicMaterial({ color: "#00A5E6" });

const Logo = ({ svgPath, scale = 0.01, ...props }) => {
  const svgData = useLoader(SVGLoader, svgPath);
  const svgGroup = useMemo(() => {
    const group = new THREE.Group();
    const updateMap = [];

    svgData.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const meshGeometry = new THREE.ExtrudeGeometry(shape, {
          depth: 1,
          bevelEnabled: false,
        });
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
        const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
        const lines = new THREE.LineSegments(linesGeometry, strokeMaterial);

        updateMap.push({ shape, mesh, lines });
        group.add(mesh, lines);
      });
    });

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    // Offset all of group's elements, to center them
    group.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    group.rotateX(-Math.PI / 2);

    return group;
  }, [svgData]);

  return <primitive object={svgGroup} scale={scale} {...props} />;
};

export default Logo;
