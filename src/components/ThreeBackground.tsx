"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050a14);
    scene.fog = new THREE.FogExp2(0x050a14, 0.008);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x2dd4bf, 0.6, 20);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    const backLight = new THREE.PointLight(0x0891b2, 0.4);
    backLight.position.set(-2, 1, -5);
    scene.add(backLight);

    // Central floating helix / medical cross mesh effect (abstract 3d)
    const group = new THREE.Group();
    const geometryRing = new THREE.TorusGeometry(1.8, 0.08, 64, 200);
    const materialRing = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x0f766e, emissiveIntensity: 0.5 });
    const ring = new THREE.Mesh(geometryRing, materialRing);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    
    const ring2 = new THREE.Mesh(geometryRing, materialRing);
    ring2.rotation.z = Math.PI / 3;
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);
    
    // central sphere
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x0a6e6a, emissiveIntensity: 0.8, roughness: 0.3, metalness: 0.7 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), coreMat);
    group.add(core);
    
    // floating particles
    const particleCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random() - 0.5) * 40;
        positions[i*3+1] = (Math.random() - 0.5) * 20;
        positions[i*3+2] = (Math.random() - 0.5) * 25 - 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x5eead4, size: 0.08, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particlesGeometry, particleMat);
    scene.add(particles);
    scene.add(group);
    
    // additional glowing small orbs
    const orbGroup = new THREE.Group();
    for (let i = 0; i < 60; i++) {
        const orbMat = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x14b8a6, emissiveIntensity: 0.3 });
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), orbMat);
        orb.userData = { speed: 0.005 + Math.random() * 0.01, radius: 2.5 + Math.random() * 1.5, angle: Math.random() * Math.PI * 2, yOffset: (Math.random() - 0.5) * 3 };
        orbGroup.add(orb);
    }
    scene.add(orbGroup);

    let animationFrameId: number;
    let time = 0;
    
    function animate3D() {
        animationFrameId = requestAnimationFrame(animate3D);
        time += 0.008;
        group.rotation.y = time * 0.3;
        group.rotation.x = Math.sin(time * 0.2) * 0.2;
        group.rotation.z = Math.cos(time * 0.25) * 0.15;
        
        particles.rotation.y = time * 0.02;
        particles.rotation.x = Math.sin(time * 0.1) * 0.1;
        
        orbGroup.children.forEach((orb) => {
            const data = orb.userData;
            const rad = data.radius;
            const angle = data.angle + time * data.speed * 2;
            const x = Math.cos(angle) * rad;
            const z = Math.sin(angle) * rad;
            orb.position.x = x;
            orb.position.z = z;
            orb.position.y = Math.sin(angle * 1.5) * 1.2 + data.yOffset;
        });
        
        camera.position.x += (0 - camera.position.x) * 0.03;
        camera.position.y += (1.2 - camera.position.y) * 0.03;
        camera.lookAt(0, 0.5, 0);
        renderer.render(scene, camera);
    }
    animate3D();
    
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="canvas-3d" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block'
      }} 
    />
  );
}
