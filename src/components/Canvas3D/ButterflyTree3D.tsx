import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundEngine } from '../../utils/audio';

export const ButterflyTree3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 450;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0a2a, 0.03);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 2, 9);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // Disable shadows for high 60fps performance on mobile
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffe6f2, 1.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd166, 3.5, 22);
    pointLight.position.set(2, 5, 4);
    scene.add(pointLight);

    const pinkLight = new THREE.PointLight(0xf472b6, 2.5, 18);
    pinkLight.position.set(-3, 3, -1);
    scene.add(pinkLight);

    // 1. Build Trunk and Main Tree Branches
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.7, 5, 12);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.9,
      metalness: 0.1,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0;
    treeGroup.add(trunk);

    // Branch Generator Helper
    const createBranch = (x: number, y: number, z: number, rx: number, ry: number, rz: number, length: number, radius: number) => {
      const bGeo = new THREE.CylinderGeometry(radius * 0.5, radius, length, 8);
      const bMesh = new THREE.Mesh(bGeo, trunkMat);
      bMesh.position.set(x, y, z);
      bMesh.rotation.set(rx, ry, rz);
      treeGroup.add(bMesh);
    };

    createBranch(0.8, 2.0, 0, 0.2, 0, -0.6, 3, 0.25);
    createBranch(-0.8, 1.8, 0.2, -0.2, 0, 0.6, 2.8, 0.25);
    createBranch(0, 2.5, -0.8, -0.6, 0, 0, 2.5, 0.22);
    createBranch(0.5, 3.2, 0.4, 0.4, 0.5, -0.4, 2.2, 0.18);
    createBranch(-0.6, 3.0, -0.4, -0.3, -0.5, 0.5, 2.0, 0.18);

    // 2. Leaf Butterflies on Tree
    const butterflyCount = 120;
    interface ButterflyItem {
      meshGroup: THREE.Group;
      leftWing: THREE.Mesh;
      rightWing: THREE.Mesh;
      basePos: THREE.Vector3;
      wingSpeed: number;
      isFlyingAway: boolean;
      targetPos: THREE.Vector3;
      flightProgress: number;
      flightAngle: number;
      flightRadius: number;
      flightHeight: number;
      flightSpeed: number;
      takeoffThreshold: number;
    }

    const butterfliesData: ButterflyItem[] = [];
    const colors = BIRTHDAY_CONFIG.butterflyColors.map((c) => new THREE.Color(c));

    // Shared geometry for smooth rendering
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(0.25, 0.35, 0.4, 0.2);
    wingShape.quadraticCurveTo(0.35, -0.2, 0, 0);
    const wingGeo = new THREE.ShapeGeometry(wingShape);

    for (let i = 0; i < butterflyCount; i++) {
      const bGroup = new THREE.Group();
      const randomColor = colors[i % colors.length];

      const wingMat = new THREE.MeshStandardMaterial({
        color: randomColor,
        emissive: randomColor,
        emissiveIntensity: 0.35,
        side: THREE.DoubleSide,
        roughness: 0.3,
      });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.scale.set(0.65, 0.65, 0.65);

      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.scale.set(-0.65, 0.65, 0.65);

      bGroup.add(leftWing);
      bGroup.add(rightWing);

      // Position in canopy around branches
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 2.2;

      const bx = r * Math.sin(phi) * Math.cos(theta);
      const by = 2.5 + r * Math.cos(phi);
      const bz = r * Math.sin(phi) * Math.sin(theta);

      const basePos = new THREE.Vector3(bx, by, bz);
      bGroup.position.copy(basePos);
      bGroup.rotation.set(Math.random() * 0.4, Math.random() * Math.PI * 2, Math.random() * 0.4);

      scene.add(bGroup);

      butterfliesData.push({
        meshGroup: bGroup,
        leftWing,
        rightWing,
        basePos,
        wingSpeed: 8 + Math.random() * 10,
        isFlyingAway: false,
        targetPos: basePos.clone(),
        flightProgress: 0,
        flightAngle: (i / butterflyCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
        flightRadius: 10 + Math.random() * 16,
        flightHeight: 10 + Math.random() * 16,
        flightSpeed: 0.015 + Math.random() * 0.02,
        takeoffThreshold: (i / butterflyCount) * 0.4,
      });
    }

    // 3. Blooming Flowers around Roots
    const rootFlowerGroup = new THREE.Group();
    rootFlowerGroup.position.set(0, -2.4, 0);
    scene.add(rootFlowerGroup);

    const flowerGeo = new THREE.DodecahedronGeometry(0.09);
    for (let f = 0; f < 25; f++) {
      const flower = new THREE.Mesh(
        flowerGeo,
        new THREE.MeshStandardMaterial({
          color: colors[f % colors.length],
          emissive: colors[f % colors.length],
          emissiveIntensity: 0.4,
        })
      );
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.6 + Math.random() * 2.0;
      flower.position.set(Math.cos(angle) * dist, 0.05, Math.sin(angle) * dist);
      rootFlowerGroup.add(flower);
    }

    // 4. Glowing Ambient Floating Particles
    const particleCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      pPos[p] = (Math.random() - 0.5) * 12;
      pPos[p + 1] = (Math.random() - 0.5) * 8 + 2;
      pPos[p + 2] = (Math.random() - 0.5) * 10;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffd166,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(pGeo, pMat);
    scene.add(particleSystem);

    // Scroll & Flight Control State
    let isSwarmReleased = false;
    let targetScrollFactor = 0;
    let currentScrollFactor = 0;
    let soundPlayed = false;

    // Trigger ALL butterflies to fly away into the sky
    const triggerSwarmFlight = () => {
      isSwarmReleased = true;
      if (!soundPlayed) {
        soundEngine.playSparkle();
        soundEngine.playBreeze();
        soundEngine.playMagicChime();
        soundPlayed = true;
      }

      butterfliesData.forEach((b, i) => {
        b.isFlyingAway = true;
        b.wingSpeed = 22 + Math.random() * 16; // rapid energetic flapping
        const spreadAngle = (i / butterflyCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
        const radius = 10 + Math.random() * 18;
        const height = 12 + Math.random() * 16;
        b.targetPos.set(
          Math.cos(spreadAngle) * radius,
          height,
          Math.sin(spreadAngle) * radius
        );
      });
    };

    const resetSwarmToTree = () => {
      isSwarmReleased = false;
      soundPlayed = false;
      butterfliesData.forEach((b) => {
        b.isFlyingAway = false;
        b.wingSpeed = 8 + Math.random() * 10;
        b.flightProgress = 0;
      });
    };

    // Scroll listeners to trigger flight on downward scrolling
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(150, (document.documentElement.scrollHeight - window.innerHeight) * 0.7);
      targetScrollFactor = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (scrollY > 20) {
        if (!isSwarmReleased) {
          triggerSwarmFlight();
        }
      } else if (scrollY < 8 && isSwarmReleased) {
        resetSwarmToTree();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        if (!isSwarmReleased) {
          triggerSwarmFlight();
        }
        targetScrollFactor = Math.min(1, targetScrollFactor + 0.15);
      } else if (e.deltaY < -20 && window.scrollY < 12 && isSwarmReleased) {
        resetSwarmToTree();
      }
    };

    let touchStartY = 0;
    const onTouchStartWindow = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMoveWindow = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 15) {
          // Swiping up on screen = scrolling down the page
          if (!isSwarmReleased) {
            triggerSwarmFlight();
          }
          targetScrollFactor = Math.min(1, targetScrollFactor + 0.12);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStartWindow, { passive: true });
    window.addEventListener('touchmove', onTouchMoveWindow, { passive: true });

    const dom = renderer.domElement;
    dom.style.touchAction = 'pan-y'; // Allows native vertical scrolling across the 3D canvas
    const handlePointerDown = () => {
      triggerSwarmFlight();
    };

    dom.addEventListener('click', handlePointerDown);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smoothly interpolate scroll factor
      currentScrollFactor = THREE.MathUtils.lerp(currentScrollFactor, targetScrollFactor, 0.08);

      // Tree gentle swaying motion
      treeGroup.rotation.z = Math.sin(time * 0.6) * 0.02;
      treeGroup.rotation.y = Math.cos(time * 0.4) * 0.015;

      // Animate Butterflies
      butterfliesData.forEach((b, idx) => {
        const flap = Math.sin(time * b.wingSpeed + idx * 0.3) * 0.85;
        b.leftWing.rotation.y = flap;
        b.rightWing.rotation.y = -flap;

        if (b.isFlyingAway) {
          // Spiraling ascent away from the tree into the celestial sky, amplified by scrolling down
          b.flightProgress += delta * (0.32 + currentScrollFactor * 0.4);
          b.flightAngle += delta * (0.8 + (idx % 3) * 0.35);

          const curRadius = THREE.MathUtils.lerp(1.8, b.flightRadius + currentScrollFactor * 4, Math.min(b.flightProgress, 1));
          const curHeight = THREE.MathUtils.lerp(b.basePos.y, b.flightHeight + currentScrollFactor * 6, Math.min(b.flightProgress, 1));

          const prevPos = b.meshGroup.position.clone();
          b.meshGroup.position.x = Math.cos(b.flightAngle) * curRadius;
          b.meshGroup.position.y = curHeight + Math.sin(time * 3 + idx) * 0.5;
          b.meshGroup.position.z = Math.sin(b.flightAngle) * curRadius;

          // Banking and forward alignment
          const moveVec = b.meshGroup.position.clone().sub(prevPos);
          if (moveVec.lengthSq() > 0.0001) {
            const targetRotY = Math.atan2(moveVec.x, moveVec.z);
            const targetRotX = -moveVec.y * 1.5;
            b.meshGroup.rotation.y = THREE.MathUtils.lerp(b.meshGroup.rotation.y, targetRotY, 0.15);
            b.meshGroup.rotation.x = THREE.MathUtils.lerp(b.meshGroup.rotation.x, targetRotX, 0.1);
          }
        } else {
          // Gentle resting flutter on tree branches
          b.meshGroup.position.lerp(b.basePos, 0.06);
          b.meshGroup.rotation.x = THREE.MathUtils.lerp(b.meshGroup.rotation.x, 0, 0.06);
          b.meshGroup.rotation.z = THREE.MathUtils.lerp(b.meshGroup.rotation.z, 0, 0.06);
        }
      });

      // Slowly rotate ambient particles
      particleSystem.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStartWindow);
      window.removeEventListener('touchmove', onTouchMoveWindow);
      dom.removeEventListener('click', handlePointerDown);
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[380px] sm:min-h-[450px] cursor-pointer touch-manipulation" />;
};
