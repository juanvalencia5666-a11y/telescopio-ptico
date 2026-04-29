import { Eye } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface ComoFuncionaProps {
  narrationState: NarrationState;
}

const PRINCIPLES = [
  {
    id: "refraccion",
    title: "Refracción",
    emoji: "🔵",
    color: "oklch(0.7 0.25 260)",
    desc: "La luz cambia de velocidad al pasar de un medio a otro (aire → vidrio). Este cambio de velocidad provoca un cambio de dirección proporcional al índice de refracción del material. La ley de Snell describe este comportamiento: n₁·sin(θ₁) = n₂·sin(θ₂).",
  },
  {
    id: "reflexion",
    title: "Reflexión",
    emoji: "🔴",
    color: "oklch(0.65 0.28 320)",
    desc: "Un espejo cóncavo parabólico refleja todos los rayos paralelos hacia el mismo punto focal. A diferencia de las lentes, los espejos no producen aberración cromática porque reflejan todas las longitudes de onda por igual, independientemente de su color.",
  },
  {
    id: "magnificacion",
    title: "Magnificación",
    emoji: "🟡",
    color: "oklch(0.75 0.22 50)",
    desc: "La amplificación total = focal del objetivo ÷ focal del ocular. Un telescopio de 1200 mm con ocular de 10 mm amplifica 120×. Doblar la magnificación cuadruplica el área cubierta pero reduce el brillo aparente por 4, requiriendo mayor apertura.",
  },
  {
    id: "focal",
    title: "Distancia Focal",
    emoji: "🟣",
    color: "oklch(0.65 0.22 280)",
    desc: "La distancia focal determina la escala de imagen en el plano focal. Una focal larga (f/10–f/15) da imágenes de alta magnificación ideales para planetas. Una focal corta (f/4–f/6) captura campos amplios perfectos para nebulosas y cúmulos.",
  },
  {
    id: "apertura",
    title: "Apertura y F/Ratio",
    emoji: "⭕",
    color: "oklch(0.7 0.25 260)",
    desc: "La apertura (diámetro del objetivo) determina cuánta luz se recoge: duplicar el diámetro cuadruplica el área colectora. El cociente focal (f/ratio) = focal/apertura. Los telescopios rápidos (f/4) son más compactos pero requieren oculares de mayor calidad.",
  },
  {
    id: "seeing",
    title: "Seeing Atmosférico",
    emoji: "🌫️",
    color: "oklch(0.75 0.22 50)",
    desc: "La turbulencia del aire crea variaciones de temperatura que refractan irregularmente la luz, limitando la resolución máxima alcanzable. El índice de Antoniadi (I–V) mide la estabilidad atmosférica. Los observatorios de altitud o el espacio evitan este límite.",
  },
];

// ─── Animated light path SVG ──────────────────────────────────────────────────

function LightPathDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl glassmorphic p-6">
      <p className="text-xs font-mono text-muted-foreground text-center mb-4 tracking-wider uppercase">
        Trayectoria de la luz — telescopio refractor
      </p>
      <svg
        viewBox="0 0 480 180"
        className="w-full"
        role="img"
        aria-label="Trayectoria de la luz en un telescopio refractor"
      >
        <title>Trayectoria de la luz en un telescopio refractor</title>
        {/* Background */}
        <rect width="480" height="180" fill="transparent" />

        {/* Optical axis */}
        <line
          x1="10"
          y1="90"
          x2="470"
          y2="90"
          stroke="oklch(0.25 0 0)"
          strokeWidth="0.8"
          strokeDasharray="6 4"
        />

        {/* Incoming parallel rays */}
        {[55, 70, 90, 110, 125].map((y) => (
          <g key={`in-${y}`}>
            <motion.line
              x1="20"
              y1={y}
              x2="120"
              y2={y}
              stroke="oklch(0.75 0.22 50 / 0.7)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (y - 55) * 0.08 }}
            />
          </g>
        ))}

        {/* Objective lens */}
        <ellipse
          cx="125"
          cy="90"
          rx="8"
          ry="42"
          fill="oklch(0.7 0.25 260 / 0.2)"
          stroke="oklch(0.7 0.25 260)"
          strokeWidth="2"
        />
        <text
          x="125"
          y="145"
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.7 0.25 260)"
          fontFamily="monospace"
        >
          Objetivo
        </text>

        {/* Converging rays to focal point */}
        {[55, 70, 90, 110, 125].map((y, rayIdx) => (
          <motion.line
            key={`conv-y${y}`}
            x1="133"
            y1={y}
            x2="290"
            y2="90"
            stroke="oklch(0.75 0.22 50 / 0.6)"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + rayIdx * 0.06 }}
          />
        ))}

        {/* Focal point */}
        <circle cx="290" cy="90" r="5" fill="oklch(0.75 0.22 50)" />
        <motion.circle
          cx="290"
          cy="90"
          r="14"
          fill="none"
          stroke="oklch(0.75 0.22 50 / 0.3)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
        <text
          x="290"
          y="115"
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.75 0.22 50)"
          fontFamily="monospace"
        >
          Foco
        </text>

        {/* Diverging rays after focal point */}
        {[55, 70, 90, 110, 125].map((y, rayIdx) => (
          <motion.line
            key={`div-y${y}`}
            x1="290"
            y1="90"
            x2="375"
            y2={y}
            stroke="oklch(0.75 0.22 50 / 0.45)"
            strokeWidth="1.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 1.0 + rayIdx * 0.05 }}
          />
        ))}

        {/* Eyepiece lens */}
        <ellipse
          cx="378"
          cy="90"
          rx="6"
          ry="35"
          fill="oklch(0.65 0.28 320 / 0.2)"
          stroke="oklch(0.65 0.28 320)"
          strokeWidth="2"
        />
        <text
          x="378"
          y="138"
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.65 0.28 320)"
          fontFamily="monospace"
        >
          Ocular
        </text>

        {/* Parallel exit rays */}
        {[63, 77, 90, 103, 117].map((y, rayIdx) => (
          <motion.line
            key={`exit-y${y}`}
            x1="384"
            y1={y}
            x2="460"
            y2={y}
            stroke="oklch(0.7 0.25 260 / 0.6)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.3 + rayIdx * 0.05 }}
          />
        ))}

        {/* Eye symbol */}
        <text
          x="466"
          y="94"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          👁️
        </text>

        {/* Focal length annotation */}
        <line
          x1="133"
          y1="160"
          x2="290"
          y2="160"
          stroke="oklch(0.4 0.01 260)"
          strokeWidth="0.8"
        />
        <text
          x="211"
          y="172"
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.5 0 0)"
          fontFamily="monospace"
        >
          Distancia focal
        </text>
      </svg>
    </div>
  );
}

export default function ComoFunciona({ narrationState }: ComoFuncionaProps) {
  const isActive = narrationState.currentSectionId === "como-funciona";

  return (
    <section
      id="como-funciona"
      data-ocid="como_funciona.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.06 0.016 255)" }}
    >
      <div
        className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.65 0.28 320 / 0.07)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div
            className="p-2 rounded-lg transition-smooth"
            style={{
              background: "oklch(0.65 0.28 320 / 0.15)",
              border: "1px solid oklch(0.65 0.28 320 / 0.3)",
              color: "oklch(0.65 0.28 320)",
              boxShadow: isActive
                ? "0 0 16px oklch(0.65 0.28 320 / 0.4)"
                : "none",
            }}
          >
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Cómo Funciona
          </h2>
          {isActive && (
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.65 0.28 320)" }}
            />
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed max-w-3xl mb-12"
        >
          El telescopio óptico domina dos fenómenos de la física de ondas: la
          refracción y la reflexión de la luz. Comprender estos principios
          revela por qué los grandes telescopios pueden ver objetos 10 millones
          de veces más tenues que el ojo humano.
        </motion.p>

        {/* Light path diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <LightPathDiagram />
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRINCIPLES.map((p, idx) => (
            <motion.div
              key={p.id}
              data-ocid={`como_funciona.item.${idx + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glassmorphic p-5 rounded-xl hover:scale-[1.02] transition-smooth group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{p.emoji}</span>
                <h3 className="font-display font-bold text-sm text-foreground">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {p.desc}
              </p>
              <div
                className="mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: p.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Formula card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 glassmorphic p-6 rounded-2xl"
        >
          <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider uppercase">
            Fórmulas fundamentales
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                formula: "M = F_obj / F_oc",
                label: "Magnificación",
                color: "oklch(0.75 0.22 50)",
              },
              {
                formula: "P_lim = 13.3 − 2.5·log(D²)",
                label: "Magnitud límite",
                color: "oklch(0.7 0.25 260)",
              },
              {
                formula: 'α = 116 / D(mm)"',
                label: "Resolución angular",
                color: "oklch(0.65 0.28 320)",
              },
            ].map((f) => (
              <div
                key={f.label}
                className="text-center p-3 rounded-xl"
                style={{
                  background: `${f.color.slice(0, -1)} / 0.07)`,
                  border: `1px solid ${f.color.slice(0, -1)} / 0.2)`,
                }}
              >
                <p
                  className="font-mono text-sm font-bold mb-1"
                  style={{ color: f.color }}
                >
                  {f.formula}
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
