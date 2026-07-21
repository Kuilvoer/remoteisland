import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

export default function GlobePage({ islands, p, onSelectIsland, onClose }) {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.15; // Slower rotation
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map islands to globe data format
  const globeData = islands.map(island => {
    return {
      lat: island.location?.lat || 0,
      lng: island.location?.lng || 0,
      size: 1.5,
      color: '#00FF41',
      name: island.name,
      island: island
    };
  }).filter(d => d.lat !== 0 || d.lng !== 0);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center fade-in bg-black">
      
      <div className="absolute top-32 left-8 z-40 pointer-events-none">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          Interactieve Wereldbol
        </h1>
        <p className="text-white/70 font-medium mt-2">Draai de bol en klik op een pin om een eiland te verkennen.</p>
      </div>

      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={globeData}
        objectThreeObject={(d) => {
          const group = new THREE.Group();
          
          // Use PhongMaterial for proper 3D shading
          const mat = new THREE.MeshPhongMaterial({ color: d.color, shininess: 50 });

          // Stick (cylinder)
          const stickGeo = new THREE.CylinderGeometry(0.15, 0.15, 3, 12);
          stickGeo.translate(0, 1.5, 0); // shift pivot to bottom
          const stick = new THREE.Mesh(stickGeo, mat);
          group.add(stick);

          // Sphere on top
          const sphereGeo = new THREE.SphereGeometry(0.7, 32, 32);
          const sphere = new THREE.Mesh(sphereGeo, mat);
          sphere.position.y = 3; // Top of stick
          group.add(sphere);

          return group;
        }}
        onObjectClick={(point) => onSelectIsland(point.island)}
        objectLabel={(d) => `
          <div class="bg-white/90 text-black px-4 py-2 rounded-xl border-2 font-bold text-sm shadow-xl" style="border-color: #00FF41">
            ${d.name}
          </div>
        `}
      />
    </div>
  );
}
