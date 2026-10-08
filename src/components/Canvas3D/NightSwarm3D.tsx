import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';

interface NightSwarm3DProps {
  onPhaseChange?: (phase: 'happy' | 'name' | 'disperse') => void;
}

export const NightSwarm3D: React.FC<NightSwarm3DProps> = ({ onPhaseChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState<'Happy Birthday' | 'Pani Thiru Mozhi' | 'Night Sky Stars'>('Happy Birthday');

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0518, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer with mobile pixel ratio guard
    const isMobile = width < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Moonlight & Ambient Lights
    const moonLight = new THREE.PointLight(0xd8b4fe, 3, 25);
    moonLight.position.set(0, 6, 6);
    scene.add(moonLight);

    const goldLight = new THREE.PointLight(0xffd166, 2.5, 20);
    goldLight.position.set(-4, -2, 4);
    scene.add(goldLight);

    const ambLight = new THREE.AmbientLight(0xffe6f2, 1.0);
    scene.add(ambLight);

    // Helper: Generate Text Point Targets on 2D Canvas
    const generateTextPoints = (text: string, count: number): THREE.Vector3[] => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (!ctx) return [];

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 42px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 300, 100);

      const imgData = ctx.getImageData(0, 0, 600, 200);
      const points: THREE.Vector3[] = [];

      for (let y = 0; y < 200; y += 4) {
        for (let x = 0; x < 600; x += 4) {
          const index = (y * 600 + x) * 4;
          if (imgData.data[index + 3] > 128) {
            const px = (x - 300) * 0.022;
            const py = (100 - y) * 0.022;
            const pz = (Math.random() - 0.5) * 0.5;
            points.push(new THREE.Vector3(px, py, pz));
          }
        }
      }

      // Fill remaining points randomly
      while (points.length < count) {
        const randIndex = Math.floor(Math.random() * Math.max(1, points.length));
        const base = points[randIndex] || new THREE.Vector3(0, 0, 0);
        points.push(base.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, 0)));
      }

      return points.slice(0, count);
    };

    const particleCount = 450;
    const happyPoints = generateTextPoints('Happy Birthday', particleCount);
    const namePoints = generateTextPoints('Pani Thiru Mozhi', particleCount);

    // Create Butterfly Meshes
    const butterflies: Array<{
      mesh: THREE.Group;
      leftWing: THREE.Mesh;
      rightWing: THREE.Mesh;
      targetPos: THREE.Vector3;
      velocity: THREE.Vector3;
      wingSpeed: number;
    }> = [];

    const colors = BIRTHDAY_CONFIG.butterflyColors.map((c) => new THREE.Color(c));

    for (let i = 0; i < particleCount; i++) {
      const bGroup = new THREE.Group();

      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.quadraticCurveTo(0.2, 0.3, 0.3, 0.15);
      wingShape.quadraticCurveTo(0.25, -0.15, 0, 0);

      const wingGeo = new THREE.ShapeGeometry(wingShape);
      const color = colors[i % colors.length];

      const wingMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.scale.set(0.4, 0.4, 0.4);

      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.scale.set(-0.4, 0.4, 0.4);

      bGroup.add(leftWing);
      bGroup.add(rightWing);

      // Random initial position in sky
      bGroup.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );

      scene.add(bGroup);

      butterflies.push({
        mesh: bGroup,
        leftWing,
        rightWing,
        targetPos: happyPoints[i] || bGroup.position.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        wingSpeed: 12 + Math.random() * 10,
      });
    }

    // Sequence timer: 0s-5s -> "Happy Birthday", 5s-10s -> "Pani Thiru Mozhi", 10s+ -> Disperse
    let phaseTime = 0;
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      phaseTime += delta;

      // Phase Switch Logic
      if (phaseTime < 5) {
        if (currentText !== 'Happy Birthday') {
          setCurrentText('Happy Birthday');
          if (onPhaseChange) onPhaseChange('happy');
        }
        butterflies.forEach((b, idx) => {
          if (happyPoints[idx]) b.targetPos.copy(happyPoints[idx]);
        });
      } else if (phaseTime < 11) {
        if (currentText !== 'Pani Thiru Mozhi') {
          setCurrentText('Pani Thiru Mozhi');
          if (onPhaseChange) onPhaseChange('name');
        }
        butterflies.forEach((b, idx) => {
          if (namePoints[idx]) b.targetPos.copy(namePoints[idx]);
        });
      } else {
        if (currentText !== 'Night Sky Stars') {
          setCurrentText('Night Sky Stars');
          if (onPhaseChange) onPhaseChange('disperse');
        }
        // Disperse into night sky
        butterflies.forEach((b) => {
          b.targetPos.set(
            (Math.sin(time + b.mesh.id) * 8) + (Math.random() - 0.5) * 4,
            (Math.cos(time * 0.8 + b.mesh.id) * 5) + (Math.random() - 0.5) * 3,
            (Math.sin(time * 0.5) * 4)
          );
        });
      }

      // Update Butterfly positions & wing flapping with banking orientation
      butterflies.forEach((b) => {
        const prevPos = b.mesh.position.clone();
        b.mesh.position.lerp(b.targetPos, 0.05);

        // Add subtle hover noise float
        b.mesh.position.y += Math.sin(time * 2 + b.mesh.id) * 0.003;

        const moveVec = b.mesh.position.clone().sub(prevPos);
        if (moveVec.lengthSq() > 0.00001) {
          const targetRotY = Math.atan2(moveVec.x, moveVec.z);
          const targetRotZ = -moveVec.x * 2.5;
          b.mesh.rotation.y = THREE.MathUtils.lerp(b.mesh.rotation.y, targetRotY, 0.1);
          b.mesh.rotation.z = THREE.MathUtils.lerp(b.mesh.rotation.z, targetRotZ, 0.1);
        }

        const distToTarget = b.mesh.position.distanceTo(b.targetPos);
        const dynamicFlapSpeed = b.wingSpeed + distToTarget * 3;
        const flap = Math.sin(time * dynamicFlapSpeed) * 0.9;
        b.leftWing.rotation.y = flap;
        b.rightWing.rotation.y = -flap;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onPhaseChange]);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center relative">
      <div ref={mountRef} className="w-full h-[400px] sm:h-[500px]" />
      <div className="absolute bottom-2 px-4 py-1 rounded-full glass-panel text-xs text-amber-200/90 font-mono tracking-wider">
        Formation: {currentText}
      </div>
    </div>
  );
};
