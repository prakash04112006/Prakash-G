export type PageId = 'loader' | 'page1' | 'page2' | 'page6' | 'page7' | 'page8';

export interface PageInfo {
  id: PageId;
  title: string;
  icon: string;
}

export interface ButterflyData {
  id: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  color: string;
  speed: number;
  wingSpeed: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

export interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
}
