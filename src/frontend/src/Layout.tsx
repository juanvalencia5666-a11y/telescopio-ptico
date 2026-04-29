import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Atom,
  BookOpen,
  Cpu,
  Eye,
  Globe2,
  Lightbulb,
  Star,
  Telescope,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { NARRATION_SECTIONS } from "./hooks/useNarration";
import type { NarrationSpeed } from "./types";

interface NarrationControls {
  state: {
    isPlaying: boolean;
    currentSectionId: string | null;
    speed: NarrationSpeed;
    currentSectionTitle: string | null;
  };
  togglePlay: () => void;
  stop: () => void;
  setSpeed: (speed: NarrationSpeed) => void;
}

interface LayoutProps {
  narration: NarrationControls;
}

// ─── Three.js Helpers ───────────────────────────────────────────────────────

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const startPos = useMemo(
    () =>
      new THREE.Vector3(
        -20 + Math.random() * 40,
        8 + Math.random() * 10,
        -30 + Math.random() * 20,
      ),
    [],
  );
  const tRef = useRef(-(Math.random() * 5));

  useFrame((_, delta) => {
    if (!ref.current) return;
    tRef.current += delta;
    if (tRef.current < 0) return;
    const t = tRef.current * speed;
    ref.current.position.set(
      startPos.x + 0.6 * t,
      startPos.y - 0.7 * t,
      startPos.z,
    );
    ref.current.visible = t < 15;
    if (t > 15) {
      tRef.current = -(2 + Math.random() * 4);
      startPos.set(
        -20 + Math.random() * 40,
        8 + Math.random() * 10,
        -30 + Math.random() * 20,
      );
    }
  });

  return (
    <mesh ref={ref} position={[startPos.x, startPos.y, startPos.z]}>
      <sphereGeometry args={[0.04, 4, 4]} />
      <meshBasicMaterial color="#a0e8ff" />
    </mesh>
  );
}

function ShootingStarTrail() {
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const startPos = useMemo(
    () =>
      new THREE.Vector3(
        -20 + Math.random() * 40,
        8 + Math.random() * 10,
        -30 + Math.random() * 20,
      ),
    [],
  );
  const tRef = useRef(-(Math.random() * 5));

  const lineObj = useMemo(() => {
    const positions = new Float32Array(6);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: "#7dd3fc",
      transparent: true,
      opacity: 0.7,
    });
    return new THREE.Line(geom, mat);
  }, []);

  useFrame((_, delta) => {
    tRef.current += delta;
    if (tRef.current < 0) return;
    const t = tRef.current * speed;
    const posAttr = lineObj.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    arr[0] = startPos.x + 0.6 * (t - 2);
    arr[1] = startPos.y - 0.7 * (t - 2);
    arr[2] = startPos.z;
    arr[3] = startPos.x + 0.6 * t;
    arr[4] = startPos.y - 0.7 * t;
    arr[5] = startPos.z;
    posAttr.needsUpdate = true;
    lineObj.visible = t < 15 && t > 0;
    if (t > 15) {
      tRef.current = -(2 + Math.random() * 4);
      startPos.set(
        -20 + Math.random() * 40,
        8 + Math.random() * 10,
        -30 + Math.random() * 20,
      );
    }
  });

  return <primitive object={lineObj} />;
}

function NebulaSphere({
  color,
  pos,
  size,
}: {
  color: string;
  pos: [number, number, number];
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function BlackHole() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      ringRef.current.scale.set(s, s, s);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[7, 2, -15]}>
      <mesh>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={ringRef} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[1.8, 0.25, 16, 80]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.75} />
      </mesh>
      <mesh ref={glowRef}>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[1.45, 0.08, 8, 80]} />
        <meshBasicMaterial color="#fef3c7" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

const TRIPOD_POSITIONS: [number, number, number][] = [
  [Math.cos(0) * 0.5, -2.5, Math.sin(0) * 0.5],
  [Math.cos((2 / 3) * Math.PI) * 0.5, -2.5, Math.sin((2 / 3) * Math.PI) * 0.5],
  [Math.cos((4 / 3) * Math.PI) * 0.5, -2.5, Math.sin((4 / 3) * Math.PI) * 0.5],
];

function TelescopeModel({
  activeSectionId,
}: { activeSectionId: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [, forceUpdate] = useState(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    if (Math.random() < delta * 0.3) {
      groupRef.current.rotation.z += (Math.random() - 0.5) * 0.3;
      forceUpdate((n) => n + 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, -5]}>
      <mesh rotation={[0.3, 0, -0.2]}>
        <cylinderGeometry args={[0.22, 0.28, 3.2, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0.19, 1.65, -0.25]} rotation={[0.3, 0, -0.2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.21, 1.74, -0.27]} rotation={[0.3, 0, -0.2]}>
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial
          color="#67e8f9"
          metalness={0.3}
          roughness={0.05}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[-0.19, -1.62, 0.22]} rotation={[0.3, 0, -0.2]}>
        <cylinderGeometry args={[0.1, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.05, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.9, 0]}>
        <coneGeometry args={[0.18, 0.6, 4]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh
        key="leg-0"
        position={TRIPOD_POSITIONS[0]}
        rotation={[Math.atan2(0.5, 0.7), 0, 0]}
      >
        <cylinderGeometry args={[0.025, 0.02, 1.4, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh
        key="leg-1"
        position={TRIPOD_POSITIONS[1]}
        rotation={[Math.atan2(0.5, 0.7), (2 / 3) * Math.PI * 2, 0]}
      >
        <cylinderGeometry args={[0.025, 0.02, 1.4, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh
        key="leg-2"
        position={TRIPOD_POSITIONS[2]}
        rotation={[Math.atan2(0.5, 0.7), (4 / 3) * Math.PI * 2, 0]}
      >
        <cylinderGeometry args={[0.025, 0.02, 1.4, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      <pointLight
        position={[0.22, 1.8, -0.28]}
        color="#67e8f9"
        intensity={activeSectionId ? 4 : 1.5}
        distance={3}
      />
    </group>
  );
}

function CosmicScene({ activeSectionId }: { activeSectionId: string | null }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[-8, 8, -5]} color="#818cf8" intensity={3} />
      <pointLight position={[8, -4, -10]} color="#f97316" intensity={2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#e0f2fe" />
      <Stars
        radius={120}
        depth={60}
        count={5000}
        factor={4}
        saturation={0.8}
        fade
        speed={0.5}
      />
      <NebulaSphere color="#4f46e5" pos={[-8, 3, -20]} size={8} />
      <NebulaSphere color="#db2777" pos={[9, -2, -18]} size={6} />
      <NebulaSphere color="#f97316" pos={[0, -5, -25]} size={10} />
      <BlackHole />
      <TelescopeModel activeSectionId={activeSectionId} />
      <ShootingStarTrail key="trail-0" />
      <ShootingStarTrail key="trail-1" />
      <ShootingStarTrail key="trail-2" />
      <ShootingStarTrail key="trail-3" />
      <ShootingStarTrail key="trail-4" />
      <ShootingStarTrail key="trail-5" />
      <ShootingStarTrail key="trail-6" />
      <ShootingStarTrail key="trail-7" />
      <ShootingStar key="star-0" />
      <ShootingStar key="star-1" />
      <ShootingStar key="star-2" />
      <ShootingStar key="star-3" />
      <ShootingStar key="star-4" />
      <ShootingStar key="star-5" />
      <ShootingStar key="star-6" />
      <ShootingStar key="star-7" />
    </>
  );
}

// ─── Section Metadata ────────────────────────────────────────────────────────

const COLOR_CYAN = "oklch(0.7 0.25 260)";
const COLOR_VIOLET = "oklch(0.65 0.22 280)";
const COLOR_AMBER = "oklch(0.75 0.22 50)";
const COLOR_MAGENTA = "oklch(0.65 0.28 320)";
const COLOR_ORANGE = "oklch(0.55 0.22 25)";

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({
  title,
  color,
  icon,
  isActive,
}: {
  title: string;
  color: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3"
    >
      <div
        className="p-2 rounded-lg transition-smooth"
        style={{
          background: `${color.slice(0, -1)} / 0.15)`,
          border: `1px solid ${color.slice(0, -1)} / 0.3)`,
          color,
          boxShadow: isActive
            ? `0 0 16px ${color.slice(0, -1)} / 0.4)`
            : "none",
        }}
      >
        {icon}
      </div>
      <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
        {title}
      </h2>
      {isActive && (
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: color }}
        />
      )}
    </motion.div>
  );
}

function ContentSection({
  section,
  isActive,
  color,
  Icon,
  bgAlt,
  extraContent,
}: {
  section: { id: string; title: string; text: string };
  isActive: boolean;
  color: string;
  Icon: React.FC<{ className?: string }>;
  bgAlt: boolean;
  extraContent?: React.ReactNode;
}) {
  return (
    <section
      id={section.id}
      data-ocid={`${section.id}.section`}
      className="py-24 px-6"
      style={{
        background: bgAlt ? "oklch(0.07 0.015 260)" : "oklch(0.06 0.015 250)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title={section.title}
          color={color}
          icon={<Icon className="w-5 h-5" />}
          isActive={isActive}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed mt-6 max-w-3xl"
        >
          {section.text}
        </motion.p>
        {extraContent}
      </div>
    </section>
  );
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const TELESCOPE_PARTS = [
  {
    id: "objetivo",
    name: "Objetivo",
    desc: "Lente primaria de gran apertura que capta y concentra la luz estelar entrante.",
    spec: "Apertura: 70–200 mm",
    color: "oklch(0.7 0.25 260)",
    emoji: "🔭",
  },
  {
    id: "ocular",
    name: "Ocular",
    desc: "Lente que amplifica la imagen formada por el objetivo para el ojo del observador.",
    spec: "Focal: 4–40 mm",
    color: "oklch(0.65 0.28 320)",
    emoji: "👁️",
  },
  {
    id: "tubo",
    name: "Tubo Óptico",
    desc: "Cuerpo principal que aloja y alinea perfectamente todos los componentes ópticos.",
    spec: "Longitud focal: 400–2000 mm",
    color: "oklch(0.7 0.25 260)",
    emoji: "🪣",
  },
  {
    id: "montura",
    name: "Montura",
    desc: "Sistema de soporte y movimiento que permite apuntar y rastrear objetos celestes.",
    spec: "Az-El / Ecuatorial",
    color: "oklch(0.65 0.22 280)",
    emoji: "⚙️",
  },
  {
    id: "enfocador",
    name: "Enfocador",
    desc: "Mecanismo de precisión que ajusta la posición del ocular para nitidez perfecta.",
    spec: "Paso: 0.01 mm",
    color: "oklch(0.75 0.22 50)",
    emoji: "🎛️",
  },
  {
    id: "buscador",
    name: "Buscador",
    desc: "Telescopio auxiliar de campo amplio para localizar objetos antes del estudio detallado.",
    spec: "6×30 / 8×50 mm",
    color: "oklch(0.65 0.22 280)",
    emoji: "🎯",
  },
];

const NEBULA_TYPES = [
  {
    id: "emision",
    name: "Nebulosa de Emisión",
    emoji: "🌅",
    desc: "Gas ionizado por estrellas cercanas que brilla con luz propia.",
  },
  {
    id: "planetaria",
    name: "Nebulosa Planetaria",
    emoji: "💫",
    desc: "Capas expulsadas por estrellas moribundas en formas esféricas.",
  },
  {
    id: "reflexion",
    name: "Nebulosa de Reflexión",
    emoji: "🌌",
    desc: "Polvo que refleja la luz de estrellas adyacentes con tonos azules.",
  },
];

const AMAZING_FACTS = [
  {
    id: "anos",
    stat: "415",
    label: "Años de historia",
    desc: "Desde el primer telescopio en 1608 hasta los gigantes actuales.",
  },
  {
    id: "elt",
    stat: "39m",
    label: "ELT — Espejo más grande",
    desc: "El Extremely Large Telescope en construcción en Chile.",
  },
  {
    id: "hubble",
    stat: "13.8G",
    label: "Años luz observados",
    desc: "El límite observable del universo capturado por el Hubble.",
  },
  {
    id: "gtc",
    stat: "10.5m",
    label: "Gran Telescopio Canarias",
    desc: "El mayor telescopio óptico operativo en el mundo.",
  },
  {
    id: "galileo",
    stat: "1609",
    label: "Año del primer uso",
    desc: "Galileo apunta al cielo y revoluciona la astronomía.",
  },
  {
    id: "bh",
    stat: "2019",
    label: "Primera foto de agujero negro",
    desc: "El EHT captura la sombra de M87* en luz milimétrica.",
  },
];

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function Layout({ narration }: LayoutProps) {
  const { state } = narration;

  return (
    <div className="relative">
      <Header narration={narration} />

      {/* ── Hero Section ── */}
      <section
        id="intro"
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col"
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 55 }}
            gl={{ antialias: true }}
          >
            <CosmicScene activeSectionId={state.currentSectionId} />
          </Canvas>
        </div>

        {/* Hero overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm font-mono tracking-[0.3em] text-nebula-cyan uppercase mb-4 opacity-80">
              Desde 1609 · Galileo Galilei
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-foreground leading-none mb-6">
              Telescopio{" "}
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "1px oklch(0.7 0.25 260)",
                  textShadow: "0 0 40px oklch(0.7 0.25 260 / 0.5)",
                }}
              >
                Óptico
              </span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              La ventana de la humanidad hacia el cosmos — desde Galileo hasta
              los confines del universo observable
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              type="button"
              data-ocid="hero.narrate_button"
              onClick={narration.togglePlay}
              className="flex items-center gap-3 px-8 py-3.5 rounded-2xl font-body font-semibold text-base transition-smooth glow-cyan relative overflow-hidden"
              style={{
                background: "oklch(0.7 0.25 260 / 0.15)",
                border: "1px solid oklch(0.7 0.25 260 / 0.5)",
                color: "oklch(0.7 0.25 260)",
              }}
            >
              {state.isPlaying
                ? "⏸ Pausar narración"
                : "▶ Escuchar historia completa"}
            </button>
            <button
              type="button"
              data-ocid="hero.explore_button"
              onClick={() =>
                document
                  .getElementById("partes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-body font-medium text-base transition-smooth text-muted-foreground hover:text-foreground"
              style={{ border: "1px solid oklch(0.25 0.01 250)" }}
            >
              Explorar partes ↓
            </button>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <div
        className="relative z-10"
        style={{ background: "oklch(0.06 0.015 250)" }}
      >
        {/* Historia */}
        <ContentSection
          section={NARRATION_SECTIONS[1]}
          isActive={state.currentSectionId === NARRATION_SECTIONS[1].id}
          color={COLOR_VIOLET}
          Icon={BookOpen}
          bgAlt={false}
        />

        {/* Inventor */}
        <ContentSection
          section={NARRATION_SECTIONS[2]}
          isActive={state.currentSectionId === NARRATION_SECTIONS[2].id}
          color={COLOR_AMBER}
          Icon={Star}
          bgAlt
          extraContent={
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background: "oklch(0.75 0.22 50 / 0.08)",
                border: "1px solid oklch(0.75 0.22 50 / 0.2)",
              }}
            >
              <p className="text-xs font-mono text-foreground/60 mb-2">
                Datos del inventor
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Nacimiento", value: "15 feb 1564" },
                  { label: "Lugar", value: "Pisa, Italia" },
                  { label: "Telescopio", value: "1609" },
                  { label: "Magnificación", value: "3× → 20×" },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-xs text-muted-foreground font-body">
                      {d.label}
                    </p>
                    <p className="text-sm font-mono text-foreground/90">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* Partes */}
        <section id="partes" data-ocid="partes.section" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              title="Partes del Telescopio"
              color={COLOR_CYAN}
              icon={<Cpu className="w-5 h-5" />}
              isActive={state.currentSectionId === "partes"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {TELESCOPE_PARTS.map((part, i) => (
                <motion.div
                  key={part.id}
                  data-ocid={`partes.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glassmorphic p-5 hover:scale-[1.02] transition-smooth group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{
                        background: `${part.color.slice(0, -1)} / 0.15)`,
                        border: `1px solid ${part.color.slice(0, -1)} / 0.3)`,
                      }}
                    >
                      {part.emoji}
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm">
                      {part.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {part.desc}
                  </p>
                  <p
                    className="mt-3 text-xs font-mono opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{ color: part.color }}
                  >
                    {part.spec}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionamiento */}
        <ContentSection
          section={NARRATION_SECTIONS[4]}
          isActive={state.currentSectionId === NARRATION_SECTIONS[4].id}
          color={COLOR_MAGENTA}
          Icon={Eye}
          bgAlt
        />

        {/* Nebulosas */}
        <section
          id="nebulosas"
          data-ocid="nebulosas.section"
          className="relative py-24 px-6 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.65 0.22 280 / 0.4), transparent), radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.65 0.28 320 / 0.3), transparent)",
            }}
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading
              title="Nebulosas y Maravillas"
              color={COLOR_VIOLET}
              icon={<Atom className="w-5 h-5" />}
              isActive={state.currentSectionId === "nebulosas"}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed mt-6 max-w-3xl"
            >
              {NARRATION_SECTIONS[5].text}
            </motion.p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {NEBULA_TYPES.map((n, i) => (
                <motion.div
                  key={n.id}
                  data-ocid={`nebulosas.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glassmorphic p-4 text-center"
                >
                  <div className="text-3xl mb-2">{n.emoji}</div>
                  <h4 className="font-display font-bold text-sm text-foreground mb-1">
                    {n.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-body">
                    {n.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agujeros Negros */}
        <section
          id="agujeros-negros"
          data-ocid="agujeros_negros.section"
          className="relative py-24 px-6 overflow-hidden"
          style={{ background: "oklch(0.05 0.02 250)" }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ background: "oklch(0.55 0.22 25 / 0.08)" }}
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading
              title="Agujeros Negros"
              color={COLOR_ORANGE}
              icon={<Globe2 className="w-5 h-5" />}
              isActive={state.currentSectionId === "agujeros-negros"}
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed"
              >
                {NARRATION_SECTIONS[6].text}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square max-w-64 mx-auto"
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, #000 35%, oklch(0.55 0.22 25 / 0.8) 60%, oklch(0.75 0.22 50 / 0.4) 75%, transparent 90%)",
                  }}
                />
                <div
                  className="absolute inset-4 rounded-full animate-spin"
                  style={{
                    background:
                      "conic-gradient(transparent 60%, oklch(0.75 0.22 50 / 0.6) 75%, oklch(0.55 0.22 25 / 0.8) 85%, transparent 100%)",
                    animationDuration: "8s",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs font-mono text-foreground/40 text-center">
                    M87*
                    <br />
                    6.5 × 10⁹ M☉
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Usos */}
        <ContentSection
          section={NARRATION_SECTIONS[7]}
          isActive={state.currentSectionId === NARRATION_SECTIONS[7].id}
          color={COLOR_CYAN}
          Icon={Zap}
          bgAlt={false}
        />

        {/* Datos Fascinantes */}
        <section
          id="datos"
          data-ocid="datos.section"
          className="py-24 px-6"
          style={{ background: "oklch(0.05 0.02 260)" }}
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              title="Datos Fascinantes"
              color={COLOR_AMBER}
              icon={<Lightbulb className="w-5 h-5" />}
              isActive={state.currentSectionId === "datos"}
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AMAZING_FACTS.map((fact, i) => (
                <motion.div
                  key={fact.id}
                  data-ocid={`datos.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glassmorphic p-5 group hover:scale-[1.02] transition-smooth"
                >
                  <p
                    className="font-display font-black text-3xl mb-1"
                    style={{ color: COLOR_AMBER }}
                  >
                    {fact.stat}
                  </p>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">
                    {fact.label}
                  </p>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">
                    {fact.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
