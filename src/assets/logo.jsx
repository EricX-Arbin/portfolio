import React, { useMemo } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// Extend THREE with ExtrudeGeometry
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

const fillMaterial = new THREE.MeshBasicMaterial({ color: "#F3FBFB" });
const strokeMaterial = new THREE.LineBasicMaterial({ color: "#00A5E6" });

const Logo = ({ svgPath, scale, tilt = -.3, ...props }) => {
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

        // Apply tilt to each shape
        mesh.rotation.x = tilt;
        lines.rotation.x = tilt;

        updateMap.push({ shape, mesh, lines });
        group.add(mesh, lines);
      });
    });

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    group.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    group.rotateX(-Math.PI / 2);
    group.rotateZ(Math.PI / 2);

    return group;
  }, [svgData, tilt]);

  return <primitive object={svgGroup} scale={scale} {...props} />;
};

export default Logo;
