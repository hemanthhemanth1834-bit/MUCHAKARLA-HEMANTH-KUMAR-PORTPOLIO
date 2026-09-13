import { Suspense, lazy, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneErrorBoundary } from './ErrorBoundary';
import { useAdaptiveQuality, usePrefersReducedMotion } from '../hooks';

function Core({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y += reduced ? 0 : 0.0035;
      mesh.current.rotation.x = Math.sin(t * 0.25) * 0.12;
      const s = 1 + Math.sin(t * 1.6) * 0.025;
      mesh.current.scale.setScalar(reduced ? 1 : s);
    }
    if (glow.current) {
      const g = glow.current.material as THREE.MeshBasicMaterial;
      g.opacity = 0.16 + Math.sin(t * 1.6) * 0.05;
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.05, 3]} />
        <meshStandardMaterial
          color="#0b1e42"
          emissive="#1d5cff"
          emissiveIntensity={0.85}
          roughness={0.25}
          metalness={0.75}
          wireframe={false}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.14} />
      </mesh>
      {/* halo */}
      <mesh ref={glow} scale={1.45}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#2f7bff" transparent opacity={0.16} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function NodeField({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color('#5cc8ff');
    const cB = new THREE.Color('#8b5cf6');
    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() < 0.65 ? cA : cB;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(() => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += 0.0009;
      ref.current.rotation.x += 0.0004;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rings({ reduced }: { reduced: boolean }) {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (g1.current) {
      g1.current.rotation.z += 0.0022;
      g1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.08;
    }
    if (g2.current) {
      g2.current.rotation.z -= 0.0016;
      g2.current.rotation.y = Math.sin(t * 0.22) * 0.25;
    }
    if (g3.current) g3.current.rotation.z += 0.001;
  });
  return (
    <group>
      <group ref={g1} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.1, 0.012, 12, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.75} />
        </mesh>
      </group>
      <group ref={g2} rotation={[Math.PI / 1.8, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[2.65, 0.01, 12, 128]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
        </mesh>
      </group>
      <group ref={g3} rotation={[Math.PI / 2.1, -0.3, 0.4]}>
        <mesh>
          <torusGeometry args={[3.15, 0.008, 12, 128]} />
          <meshBasicMaterial color="#2f7bff" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/** Orbiting satellite nodes with connecting light trails. */
function Satellites({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const sats = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        radius: 2.5 + (i % 3) * 0.45,
        speed: 0.12 + (i % 4) * 0.03,
        size: 0.05 + (i % 3) * 0.02,
        y: Math.sin(i * 1.7) * 0.8,
        color: i % 2 === 0 ? '#22d3ee' : '#a78bfa',
      })),
    [],
  );
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      const s = sats[i]!;
      const a = s.angle + (reduced ? 0 : t * s.speed);
      child.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.6 + i) * 0.15, Math.sin(a) * s.radius);
    });
    if (!reduced) g.rotation.y += 0.0006;
  });
  return (
    <group ref={group}>
      {sats.map((s, i) => (
        <mesh key={i} position={[Math.cos(s.angle) * s.radius, s.y, Math.sin(s.angle) * s.radius]}>
          <sphereGeometry args={[s.size, 16, 16]} />
          <meshBasicMaterial color={s.color} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    if (reduced) return;
    const { pointer } = state;
    vec.set(pointer.x * 0.7, pointer.y * 0.45, 6.4);
    state.camera.position.lerp(vec, 0.035);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const quality = useAdaptiveQuality();
  const reduced = usePrefersReducedMotion();
  const nodeCount = quality === 'low' ? 220 : quality === 'medium' ? 420 : 650;
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 4, 5]} intensity={60} color="#2f7bff" />
      <pointLight position={[-5, -3, 4]} intensity={30} color="#22d3ee" />
      <pointLight position={[0, 5, -4]} intensity={20} color="#8b5cf6" />
      <Core reduced={reduced} />
      <NodeField count={nodeCount} reduced={reduced} />
      {quality !== 'low' && <Rings reduced={reduced} />}
      {quality === 'high' && <Satellites reduced={reduced} />}
      <Rig reduced={reduced} />
    </>
  );
}

const AIOrbCanvas = lazy(() =>
  Promise.resolve({
    default: function OrbCanvas() {
      return (
        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 46 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          aria-hidden
        >
          <Scene />
        </Canvas>
      );
    },
  }),
);

export function AIOrb() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <AIOrbCanvas />
        </Suspense>
      </SceneErrorBoundary>
      {/* readability veil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at 50% 46%, rgba(4,7,15,0.55), rgba(4,7,15,0.18) 55%, transparent 78%)',
        }}
      />
    </div>
  );
}
