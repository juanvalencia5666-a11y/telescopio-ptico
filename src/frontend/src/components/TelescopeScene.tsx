import { Html, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TelescopePart {
  name: string;
  desc: string;
  position: THREE.Vector3;
}

interface ShootingStarData {
  id: number;
  startPos: THREE.Vector3;
  speed: number;
  angle: number;
  tOffset: number;
  active: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TELESCOPE_BOUNDING_RADIUS = 2.2;
const TELESCOPE_CENTER = new THREE.Vector3(0, 0, 0);
const BASE_ROTATION_SPEED = 0.28;
const IMPULSE_DECAY = 0.93;

const TELESCOPE_PARTS: TelescopePart[] = [
  {
    name: "Objetivo Principal",
    desc: "Lente de gran apertura que capta la luz estelar",
    position: new THREE.Vector3(0.22, 1.78, -0.3),
  },
  {
    name: "Tubo Óptico",
    desc: "Cuerpo que alinea todos los componentes",
    position: new THREE.Vector3(0, 0.2, 0.3),
  },
  {
    name: "Ocular",
    desc: "Amplifica la imagen formada por el objetivo",
    position: new THREE.Vector3(-0.2, -1.65, 0.28),
  },
  {
    name: "Montura Ecuatorial",
    desc: "Sistema de ejes para rastrear objetos celestes",
    position: new THREE.Vector3(0, -2.0, 0),
  },
  {
    name: "Buscador",
    desc: "Telescopio auxiliar de campo amplio",
    position: new THREE.Vector3(0.38, 0.6, 0),
  },
  {
    name: "Enfocador",
    desc: "Ajuste micrométrico de la imagen",
    position: new THREE.Vector3(0.12, 0.05, 0.36),
  },
];

// ─── Nebula background CSS gradient ─────────────────────────────────────────

export function NebulaBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 15% 30%, oklch(0.42 0.22 280 / 0.45) 0%, transparent 65%),
          radial-gradient(ellipse 55% 45% at 85% 20%, oklch(0.38 0.28 320 / 0.4) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 50% 85%, oklch(0.35 0.2 40 / 0.35) 0%, transparent 65%),
          radial-gradient(ellipse 80% 40% at 30% 60%, oklch(0.3 0.18 260 / 0.3) 0%, transparent 70%),
          radial-gradient(ellipse 40% 60% at 75% 70%, oklch(0.25 0.15 300 / 0.25) 0%, transparent 60%),
          oklch(0.05 0.015 250)
        `,
        animation: "nebula-drift 28s ease-in-out infinite alternate",
      }}
    />
  );
}

// ─── Cosmic dust particles ────────────────────────────────────────────────────

function CosmicDust() {
  const points = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = -10 - Math.random() * 30;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!points.current) return;
    const posAttr = points.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < 200; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      if (arr[i * 3] > 20) arr[i * 3] = -20;
      if (arr[i * 3] < -20) arr[i * 3] = 20;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
      if (arr[i * 3 + 1] < -15) arr[i * 3 + 1] = 15;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={200}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c4b5fd"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Black Hole ───────────────────────────────────────────────────────────────

function BlackHole() {
  const groupRef = useRef<THREE.Group>(null);
  const disk1Ref = useRef<THREE.Mesh>(null);
  const disk2Ref = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (disk1Ref.current) disk1Ref.current.rotation.z = t * 0.18;
    if (disk2Ref.current) disk2Ref.current.rotation.z = -t * 0.12;
    if (outerGlowRef.current) {
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 1.3) * 0.05;
    }
    if (innerGlowRef.current) {
      const s = 1 + Math.sin(t * 0.9) * 0.03;
      innerGlowRef.current.scale.setScalar(s);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[-9, 3.5, -20]}>
      {/* Singularity — black sphere */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Inner hot accretion belt */}
      <mesh ref={innerGlowRef} rotation={[0.32, 0, 0]}>
        <torusGeometry args={[1.55, 0.12, 12, 80]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.92} />
      </mesh>

      {/* Main accretion disk */}
      <mesh rotation={[0.32, 0, 0]}>
        <torusGeometry args={[2.0, 0.34, 16, 100]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.76} />
      </mesh>

      {/* Outer plasma ring */}
      <mesh rotation={[0.32, 0, 0]}>
        <torusGeometry args={[2.55, 0.1, 8, 80]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.44} />
      </mesh>

      {/* Gravitational lensing glow rings — concentric */}
      <mesh ref={disk1Ref}>
        <circleGeometry args={[3.8, 64]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={disk2Ref}>
        <ringGeometry args={[3.0, 4.5, 64]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={outerGlowRef}>
        <ringGeometry args={[4.5, 7.0, 64]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light from accretion disk */}
      <pointLight color="#f97316" intensity={8} distance={18} />
    </group>
  );
}

// ─── Nebula Atmosphere Spheres ────────────────────────────────────────────────

function NebulaSphere({
  color,
  pos,
  size,
  speed,
}: {
  color: string;
  pos: [number, number, number];
  size: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.07}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ─── Telescope Part Hover Label ───────────────────────────────────────────────

function PartLabel({
  part,
  visible,
}: {
  part: TelescopePart;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <Html position={part.position} distanceFactor={8} zIndexRange={[10, 0]}>
      <div
        style={{
          background: "oklch(0.1 0.02 260 / 0.92)",
          border: "1px solid oklch(0.7 0.25 260 / 0.5)",
          borderRadius: "10px",
          padding: "8px 12px",
          minWidth: "160px",
          pointerEvents: "none",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 20px oklch(0.7 0.25 260 / 0.3)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "GeneralSans, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "oklch(0.7 0.25 260)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {part.name}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontFamily: "GeneralSans, sans-serif",
            fontSize: "10px",
            color: "oklch(0.78 0 0)",
            lineHeight: 1.4,
          }}
        >
          {part.desc}
        </p>
      </div>
    </Html>
  );
}

// ─── Telescope Model with collision physics ───────────────────────────────────

const TRIPOD_LEGS = [
  { key: "leg-a", rot: 0 },
  { key: "leg-b", rot: (2 / 3) * Math.PI * 2 },
  { key: "leg-c", rot: (4 / 3) * Math.PI * 2 },
];

interface TelescopeModelHandle {
  applyImpulse: (vx: number, vy: number, vz: number) => void;
}

const TelescopeModel = forwardRef<
  TelescopeModelHandle,
  {
    onCollision: () => void;
    onPartHover: (part: TelescopePart | null) => void;
    isActive: boolean;
  }
>(function TelescopeModel({ onCollision, onPartHover, isActive }, ref) {
  const groupRef = useRef<THREE.Group>(null);
  const velRef = useRef({ vy: 0, vx: 0, vz: 0 });
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    applyImpulse(vx: number, vy: number, vz: number) {
      velRef.current.vy += vy;
      velRef.current.vx += vx;
      velRef.current.vz += vz;
      onCollision();
    },
  }));

  const handlePartEnter = useCallback(
    (idx: number) => {
      setHoveredPart(idx);
      onPartHover(TELESCOPE_PARTS[idx]);
    },
    [onPartHover],
  );

  const handlePartLeave = useCallback(() => {
    setHoveredPart(null);
    onPartHover(null);
  }, [onPartHover]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const v = velRef.current;

    // Inertia decay
    velRef.current.vy *= IMPULSE_DECAY;
    velRef.current.vx *= IMPULSE_DECAY;
    velRef.current.vz *= IMPULSE_DECAY;

    const base = BASE_ROTATION_SPEED * delta;
    groupRef.current.rotation.y += base + v.vy * delta;
    groupRef.current.rotation.x += v.vx * delta;
    groupRef.current.rotation.z += v.vz * delta * 0.5;
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {/* Main telescope tube */}
      <mesh
        rotation={[0.3, 0, -0.18]}
        onPointerEnter={() => handlePartEnter(1)}
        onPointerLeave={handlePartLeave}
      >
        <cylinderGeometry args={[0.24, 0.31, 3.4, 32]} />
        <meshStandardMaterial color="#1e2d3d" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ring band on tube middle */}
      <mesh position={[0, 0, 0]} rotation={[0.3, 0, -0.18]}>
        <torusGeometry args={[0.26, 0.025, 8, 32]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0.12, 0.85, -0.15]} rotation={[0.3, 0, -0.18]}>
        <torusGeometry args={[0.26, 0.018, 8, 32]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* Objective housing ring */}
      <mesh
        position={[0.21, 1.72, -0.28]}
        rotation={[0.3, 0, -0.18]}
        onPointerEnter={() => handlePartEnter(0)}
        onPointerLeave={handlePartLeave}
      >
        <cylinderGeometry args={[0.32, 0.32, 0.2, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Glass lens face */}
      <mesh
        position={[0.225, 1.84, -0.295]}
        rotation={[0.3, 0, -0.18]}
        onPointerEnter={() => handlePartEnter(0)}
        onPointerLeave={handlePartLeave}
      >
        <circleGeometry args={[0.29, 32]} />
        <meshStandardMaterial
          color="#67e8f9"
          metalness={0.15}
          roughness={0.02}
          transparent
          opacity={0.78}
          emissive="#67e8f9"
          emissiveIntensity={isActive ? 0.6 : 0.2}
        />
      </mesh>

      {/* Lens inner glare ring */}
      <mesh position={[0.228, 1.844, -0.297]} rotation={[0.3, 0, -0.18]}>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshStandardMaterial
          color="#a5f3fc"
          transparent
          opacity={0.35}
          emissive="#67e8f9"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Dew shield / lens hood */}
      <mesh position={[0.24, 1.98, -0.32]} rotation={[0.3, 0, -0.18]}>
        <cylinderGeometry args={[0.305, 0.33, 0.28, 32]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Eyepiece tube */}
      <mesh
        position={[-0.2, -1.68, 0.24]}
        rotation={[0.3, 0, -0.18]}
        onPointerEnter={() => handlePartEnter(2)}
        onPointerLeave={handlePartLeave}
      >
        <cylinderGeometry args={[0.1, 0.16, 0.54, 16]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.82}
          roughness={0.18}
        />
      </mesh>

      {/* Eyepiece rubber eye guard */}
      <mesh position={[-0.215, -1.96, 0.26]} rotation={[0.3, 0, -0.18]}>
        <torusGeometry args={[0.1, 0.014, 8, 24]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.88}
        />
      </mesh>

      {/* Focus drawtube */}
      <mesh
        position={[0.07, 0.05, 0.35]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerEnter={() => handlePartEnter(5)}
        onPointerLeave={handlePartLeave}
      >
        <cylinderGeometry args={[0.072, 0.072, 0.22, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Focus knob (large) */}
      <mesh position={[0.1, 0.02, 0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 0.12, 12]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* Fine focus knob (small) */}
      <mesh position={[-0.04, 0.02, 0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.08, 10]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* Finderscope body */}
      <mesh
        position={[0.38, 0.6, -0.06]}
        rotation={[0.3, 0, 0]}
        onPointerEnter={() => handlePartEnter(4)}
        onPointerLeave={handlePartLeave}
      >
        <cylinderGeometry args={[0.045, 0.055, 0.9, 12]} />
        <meshStandardMaterial
          color="#374151"
          metalness={0.78}
          roughness={0.22}
        />
      </mesh>

      {/* Finderscope bracket */}
      <mesh position={[0.28, 0.55, 0.05]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.14, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#4b5563"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Equatorial mount head */}
      <mesh
        position={[0, -2.05, 0]}
        onPointerEnter={() => handlePartEnter(3)}
        onPointerLeave={handlePartLeave}
      >
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* RA axis arm */}
      <mesh position={[0.22, -2.0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.05, 0.5, 12]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.82}
          roughness={0.18}
        />
      </mesh>

      {/* Dec axis counter-weight shaft */}
      <mesh position={[0, -2.38, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.65, 8]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.78}
          roughness={0.22}
        />
      </mesh>

      {/* Counterweight */}
      <mesh position={[0, -2.72, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.18, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>

      {/* Tripod legs */}
      {TRIPOD_LEGS.map((leg) => {
        const angle = leg.rot;
        const r = 0.56;
        const px = Math.cos(angle) * r;
        const pz = Math.sin(angle) * r;
        const tiltAngle = Math.atan2(r, 0.72);
        return (
          <mesh
            key={leg.key}
            position={[px, -2.55, pz]}
            rotation={[tiltAngle, angle, 0]}
          >
            <cylinderGeometry args={[0.028, 0.022, 1.55, 8]} />
            <meshStandardMaterial
              color="#475569"
              metalness={0.65}
              roughness={0.35}
            />
          </mesh>
        );
      })}

      {/* Tripod feet */}
      {TRIPOD_LEGS.map((leg) => {
        const angle = leg.rot;
        const r = 0.9;
        const px = Math.cos(angle) * r;
        const pz = Math.sin(angle) * r;
        return (
          <mesh key={`foot-${leg.key}`} position={[px, -3.3, pz]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#64748b"
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        );
      })}

      {/* Tripod spreader ring */}
      <mesh position={[0, -2.8, 0]}>
        <torusGeometry args={[0.44, 0.018, 8, 32]} />
        <meshStandardMaterial
          color="#374151"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Part hover labels */}
      {TELESCOPE_PARTS.map((part, idx) => (
        <PartLabel key={part.name} part={part} visible={hoveredPart === idx} />
      ))}

      {/* Glow lights */}
      <pointLight
        position={[0.23, 1.85, -0.3]}
        color="#67e8f9"
        intensity={isActive ? 6 : 2.5}
        distance={5}
      />
      <pointLight
        position={[0, -2.8, 0]}
        color="#f97316"
        intensity={0.8}
        distance={3}
      />
    </group>
  );
});

// ─── Stable IDs for shooting star system ─────────────────────────────────────

const STAR_IDS = [
  "star-a",
  "star-b",
  "star-c",
  "star-d",
  "star-e",
  "star-f",
  "star-g",
  "star-h",
  "star-i",
  "star-j",
  "star-k",
  "star-l",
  "star-m",
] as const;
const TRAIL_IDS = [
  "trail-a",
  "trail-b",
  "trail-c",
  "trail-d",
  "trail-e",
  "trail-f",
  "trail-g",
  "trail-h",
  "trail-i",
  "trail-j",
  "trail-k",
  "trail-l",
  "trail-m",
] as const;
const FLASH_IDS = [
  "flash-a",
  "flash-b",
  "flash-c",
  "flash-d",
  "flash-e",
  "flash-f",
  "flash-g",
  "flash-h",
  "flash-i",
  "flash-j",
  "flash-k",
  "flash-l",
  "flash-m",
] as const;

// ─── Shooting stars with collision detection ──────────────────────────────────

function ShootingStarSystem({
  onHitTelescope,
}: {
  onHitTelescope: (angle: number) => void;
}) {
  const starsRef = useRef<ShootingStarData[]>(
    Array.from({ length: 13 }, (_, i) => ({
      id: i,
      startPos: new THREE.Vector3(
        -25 + Math.random() * 50,
        8 + Math.random() * 14,
        -32 + Math.random() * 20,
      ),
      speed: 0.22 + Math.random() * 0.4,
      angle: 0.55 + Math.random() * 0.4,
      tOffset: -(Math.random() * 7),
      active: true,
    })),
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(13).fill(null));
  const lineRefs = useRef<(THREE.Line | null)[]>(Array(13).fill(null));
  const flashRefs = useRef<(THREE.Mesh | null)[]>(Array(13).fill(null));
  const tRefs = useRef<number[]>(starsRef.current.map((s) => s.tOffset));
  const flashTimers = useRef<number[]>(Array(13).fill(-1));
  const hitSet = useRef<Set<number>>(new Set());

  const lineObjects = useMemo(
    () =>
      Array.from({ length: 13 }, () => {
        const positions = new Float32Array(6);
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: "#93c5fd",
          transparent: true,
          opacity: 0.7,
        });
        return new THREE.Line(geom, mat);
      }),
    [],
  );

  useFrame((_, delta) => {
    const stars = starsRef.current;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      tRefs.current[i] += delta;
      const t = tRefs.current[i];

      if (t < 0) {
        if (meshRefs.current[i]) meshRefs.current[i]!.visible = false;
        lineObjects[i].visible = false;
        continue;
      }

      const progress = t * star.speed;
      const dx = Math.cos(star.angle) * progress;
      const dy = -Math.sin(star.angle) * progress;

      const cx = star.startPos.x + dx;
      const cy = star.startPos.y + dy;
      const cz = star.startPos.z;

      if (meshRefs.current[i]) {
        meshRefs.current[i]!.position.set(cx, cy, cz);
        meshRefs.current[i]!.visible = progress < 18;
      }

      // Trail
      const posAttr = lineObjects[i].geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const tTrail = Math.max(0, progress - 3.2);
      arr[0] = star.startPos.x + Math.cos(star.angle) * tTrail;
      arr[1] = star.startPos.y - Math.sin(star.angle) * tTrail;
      arr[2] = cz;
      arr[3] = cx;
      arr[4] = cy;
      arr[5] = cz;
      posAttr.needsUpdate = true;
      lineObjects[i].visible = progress < 18 && progress > 0;

      // Flash timer decay
      if (flashTimers.current[i] > 0) {
        flashTimers.current[i] -= delta;
        if (flashRefs.current[i]) {
          const mat = flashRefs.current[i]!.material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, flashTimers.current[i] / 0.35);
          flashRefs.current[i]!.visible = flashTimers.current[i] > 0;
        }
      }

      // Collision detection with telescope bounding sphere
      const distToTelescope = Math.sqrt(
        cx * cx + (cy - 0) * (cy - 0) + cz * cz,
      );
      if (
        distToTelescope < TELESCOPE_BOUNDING_RADIUS + 0.3 &&
        !hitSet.current.has(i) &&
        progress < 18
      ) {
        hitSet.current.add(i);

        // Flash at collision point
        if (flashRefs.current[i]) {
          flashRefs.current[i]!.position.set(cx, cy, cz);
          flashTimers.current[i] = 0.45;
        }

        // Trigger impulse
        const impactAngle = Math.atan2(
          cy - TELESCOPE_CENTER.y,
          cx - TELESCOPE_CENTER.x,
        );
        onHitTelescope(impactAngle);

        // Reset this star
        tRefs.current[i] = -(2 + Math.random() * 5);
        star.startPos.set(
          -25 + Math.random() * 50,
          8 + Math.random() * 14,
          -32 + Math.random() * 20,
        );
        star.speed = 0.22 + Math.random() * 0.4;
        star.angle = 0.55 + Math.random() * 0.4;
        hitSet.current.delete(i);
      }

      // Reset naturally
      if (progress >= 18) {
        tRefs.current[i] = -(2 + Math.random() * 5);
        star.startPos.set(
          -25 + Math.random() * 50,
          8 + Math.random() * 14,
          -32 + Math.random() * 20,
        );
        star.speed = 0.22 + Math.random() * 0.4;
        star.angle = 0.55 + Math.random() * 0.4;
        hitSet.current.delete(i);
      }
    }
  });

  return (
    <>
      {STAR_IDS.map((sid, i) => (
        <mesh
          key={sid}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.052, 4, 4]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
      ))}
      {lineObjects.map((line, i) => (
        <primitive
          key={TRAIL_IDS[i]}
          object={line}
          ref={(el: THREE.Line | null) => {
            lineRefs.current[i] = el;
          }}
        />
      ))}
      {/* Flash meshes */}
      {FLASH_IDS.map((fid, i) => (
        <mesh
          key={fid}
          ref={(el) => {
            flashRefs.current[i] = el;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="#fde68a" transparent opacity={0} />
        </mesh>
      ))}
    </>
  );
}

// ─── Inner Three.js scene ─────────────────────────────────────────────────────

function TelescopeSceneInner({
  onPartHover,
  isActive,
}: {
  onPartHover: (part: TelescopePart | null) => void;
  isActive: boolean;
}) {
  const telescopeRef = useRef<TelescopeModelHandle | null>(null);
  const { camera } = useThree();

  // Set camera position once
  useFrame(() => {
    camera.position.set(0, 1.2, 9);
    camera.lookAt(0, 0, -3);
  });

  const handleHitTelescope = useCallback((angle: number) => {
    if (telescopeRef.current) {
      const vx = Math.sin(angle) * (1.5 + Math.random() * 1.2);
      const vy = Math.cos(angle) * (2.0 + Math.random() * 1.8);
      const vz = (Math.random() - 0.5) * 0.8;
      telescopeRef.current.applyImpulse(vx, vy, vz);
    }
  }, []);

  const handleCollision = useCallback(() => {
    // Additional visual feedback if needed
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} color="#3b4f6e" />
      <pointLight position={[-10, 10, -5]} color="#818cf8" intensity={4} />
      <pointLight position={[8, -4, -8]} color="#f97316" intensity={2.5} />
      <directionalLight position={[2, 8, 4]} intensity={0.5} color="#bae6fd" />
      <pointLight position={[0, 4, 3]} color="#67e8f9" intensity={1.2} />

      {/* Background stars */}
      <Stars
        radius={150}
        depth={80}
        count={8000}
        factor={4.5}
        saturation={0.9}
        fade
        speed={0.35}
      />

      {/* Nebula atmosphere */}
      <NebulaSphere
        color="#4f46e5"
        pos={[-10, 4, -22]}
        size={10}
        speed={0.03}
      />
      <NebulaSphere
        color="#db2777"
        pos={[11, -3, -20]}
        size={8}
        speed={0.025}
      />
      <NebulaSphere color="#f97316" pos={[2, -7, -30]} size={14} speed={0.02} />
      <NebulaSphere color="#8b5cf6" pos={[-5, 6, -18]} size={7} speed={0.04} />

      {/* Cosmic dust */}
      <CosmicDust />

      {/* Black hole */}
      <BlackHole />

      {/* Telescope */}
      <TelescopeModel
        ref={telescopeRef}
        onCollision={handleCollision}
        onPartHover={onPartHover}
        isActive={isActive}
      />

      {/* Shooting stars */}
      <ShootingStarSystem onHitTelescope={handleHitTelescope} />
    </>
  );
}

// ─── Public TelescopeScene component ─────────────────────────────────────────

interface TelescopeSceneProps {
  onPartHover?: (part: { name: string; desc: string } | null) => void;
  isActive?: boolean;
}

export default function TelescopeScene({
  onPartHover,
  isActive = false,
}: TelescopeSceneProps) {
  const handlePartHover = useCallback(
    (part: TelescopePart | null) => {
      onPartHover?.(part);
    },
    [onPartHover],
  );

  return (
    <Canvas
      camera={{ position: [0, 1.2, 9], fov: 52 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <TelescopeSceneInner onPartHover={handlePartHover} isActive={isActive} />
    </Canvas>
  );
}
