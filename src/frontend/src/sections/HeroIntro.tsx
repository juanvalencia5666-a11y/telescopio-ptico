import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import TelescopeScene, { NebulaBackground } from "../components/TelescopeScene";
import type { NarrationSpeed, NarrationState } from "../types";

// ─── Shooting Star simple (for decorative fill behind content) ────────────────

function ShootingStar({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Line | null>(null);
  const tRef = useRef(-delay);
  const speed = useMemo(() => 0.28 + Math.random() * 0.35, []);
  const start = useMemo(
    () =>
      new THREE.Vector3(
        -22 + Math.random() * 44,
        7 + Math.random() * 12,
        -28 + Math.random() * 18,
      ),
    [],
  );

  const lineObj = useMemo(() => {
    const positions = new Float32Array(6);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: "#7dd3fc",
      transparent: true,
      opacity: 0.65,
    });
    return new THREE.Line(geom, mat);
  }, []);

  useFrame((_, delta) => {
    tRef.current += delta;
    if (tRef.current < 0) return;
    const t = tRef.current * speed;

    if (ref.current) {
      ref.current.position.set(start.x + 0.55 * t, start.y - 0.65 * t, start.z);
      ref.current.visible = t < 14;
    }

    const posAttr = lineObj.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const tTrail = Math.max(0, t - 2.5);
    arr[0] = start.x + 0.55 * tTrail;
    arr[1] = start.y - 0.65 * tTrail;
    arr[2] = start.z;
    arr[3] = start.x + 0.55 * t;
    arr[4] = start.y - 0.65 * t;
    arr[5] = start.z;
    posAttr.needsUpdate = true;
    lineObj.visible = t < 14 && t > 0;

    if (t > 14) {
      tRef.current = -(2 + Math.random() * 5);
      start.set(
        -22 + Math.random() * 44,
        7 + Math.random() * 12,
        -28 + Math.random() * 18,
      );
    }
  });

  return (
    <>
      <mesh ref={ref} position={[start.x, start.y, start.z]}>
        <sphereGeometry args={[0.045, 4, 4]} />
        <meshBasicMaterial color="#a0e8ff" />
      </mesh>
      <primitive object={lineObj} ref={trailRef} />
    </>
  );
}

// ─── Simple ambient scene for the content-area mini canvas (optional) ─────────

function NebulaSphere({
  color,
  pos,
  size,
}: { color: string; pos: [number, number, number]; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.018) * 0.12;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.075}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function BlackHoleMini() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.14;
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.75) * 0.028;
      ringRef.current.scale.set(s, s, s);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.14 + Math.sin(state.clock.elapsedTime * 1.1) * 0.045;
    }
  });

  return (
    <group ref={groupRef} position={[7.5, 2.5, -16]}>
      <mesh>
        <circleGeometry args={[1.3, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={ringRef} rotation={[0.28, 0, 0]}>
        <torusGeometry args={[1.9, 0.28, 16, 80]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.72} />
      </mesh>
      <mesh ref={glowRef}>
        <circleGeometry args={[3.0, 64]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0.28, 0, 0]}>
        <torusGeometry args={[1.5, 0.07, 8, 80]} />
        <meshBasicMaterial color="#fef3c7" transparent opacity={0.88} />
      </mesh>
    </group>
  );
}

// ─── Hero Intro Section ───────────────────────────────────────────────────────

interface HeroIntroProps {
  narration: {
    state: NarrationState;
    togglePlay: () => void;
    stop: () => void;
    setSpeed: (speed: NarrationSpeed) => void;
  };
}

export default function HeroIntro({ narration }: HeroIntroProps) {
  const { state, togglePlay } = narration;

  return (
    <section
      id="intro"
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col"
    >
      {/* Nebula CSS gradient background */}
      <NebulaBackground />

      {/* Full-screen 3D TelescopeScene */}
      <div className="absolute inset-0">
        <TelescopeScene isActive={!!state.currentSectionId} />
      </div>

      {/* Bottom fade overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, transparent 10%, oklch(0.05 0.015 250 / 0.6) 75%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-nebula-cyan uppercase mb-5 opacity-75">
            Desde 1609 &middot; Galileo Galilei &middot; Italia
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-foreground leading-none mb-4 drop-shadow-2xl">
            El Universo{" "}
            <span
              className="block text-transparent"
              style={{
                WebkitTextStroke: "1.5px oklch(0.7 0.25 260)",
                textShadow:
                  "0 0 60px oklch(0.7 0.25 260 / 0.5), 0 0 120px oklch(0.7 0.25 260 / 0.2)",
              }}
            >
              al Alcance
            </span>
          </h1>
          <p className="font-display text-xl sm:text-2xl text-nebula-magenta font-semibold mb-3 opacity-90">
            de tus Ojos
          </p>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mt-4">
            El telescopio óptico: cuatro siglos de maravilla científica que
            transformaron nuestra comprensión del cosmos y nuestro lugar en él.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            data-ocid="hero.narrate_button"
            onClick={togglePlay}
            className="flex items-center gap-3 px-8 py-3.5 rounded-2xl font-body font-semibold text-base transition-smooth relative overflow-hidden glow-cyan"
            style={{
              background: "oklch(0.7 0.25 260 / 0.15)",
              border: "1.5px solid oklch(0.7 0.25 260 / 0.6)",
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
                .getElementById("historia")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-body font-medium text-base transition-smooth text-muted-foreground hover:text-foreground"
            style={{ border: "1px solid oklch(0.22 0.01 250)" }}
          >
            Explorar historia ↓
          </button>
        </motion.div>

        {/* Hover hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground tracking-widest whitespace-nowrap"
        >
          ✦ Pasa el cursor sobre el telescopio para ver sus partes
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 9, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.6,
            ease: "easeInOut",
          }}
        >
          <div className="w-5 h-9 rounded-full border border-border/40 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full bg-muted-foreground/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Keep these exports for any legacy usage
export { ShootingStar, NebulaSphere };
export type { HeroIntroProps };

// ─── Standalone mini canvas scene (legacy, used by Layout if needed) ──────────

export function HeroScene({ isActive: _isActive }: { isActive: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 55 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.12} />
      <pointLight position={[-9, 9, -5]} color="#818cf8" intensity={3.5} />
      <pointLight position={[9, -5, -10]} color="#f97316" intensity={2.2} />
      <directionalLight
        position={[0, 10, 5]}
        intensity={0.45}
        color="#e0f2fe"
      />
      <Stars
        radius={130}
        depth={65}
        count={6000}
        factor={4.2}
        saturation={0.85}
        fade
        speed={0.4}
      />
      <NebulaSphere color="#4f46e5" pos={[-9, 3.5, -22]} size={9} />
      <NebulaSphere color="#db2777" pos={[10, -2, -19]} size={7} />
      <NebulaSphere color="#f97316" pos={[0, -6, -28]} size={12} />
      <BlackHoleMini />
      <ShootingStar key="s0" delay={0.0} />
      <ShootingStar key="s1" delay={0.7} />
      <ShootingStar key="s2" delay={1.4} />
      <ShootingStar key="s3" delay={2.1} />
      <ShootingStar key="s4" delay={2.8} />
    </Canvas>
  );
}
