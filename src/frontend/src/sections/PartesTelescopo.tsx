import { Cpu } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { NarrationState } from "../types";

interface PartesTelescopoProps {
  narrationState: NarrationState;
}

const PARTES = [
  {
    id: "objetivo",
    name: "Lente Objetivo",
    shortName: "Objetivo",
    spec: "Apertura: 70–300 mm",
    desc: "La lente primaria de gran diámetro que capta la mayor cantidad de luz estelar posible. Su apertura determina la resolución angular y la capacidad de detectar objetos de baja magnitud. Un objetivo de 150 mm puede resolver estrellas dobles separadas solo 0.77″.",
    color: "oklch(0.7 0.25 260)",
    emoji: "🔵",
    svgX: 295,
    svgY: 80,
  },
  {
    id: "ocular",
    name: "Lente Ocular",
    shortName: "Ocular",
    spec: "Focal: 4–40 mm",
    desc: "El ocular actúa como una lupa que amplifica la imagen formada en el foco del objetivo. La magnificación total es la distancia focal del objetivo dividida entre la del ocular. Un ocular de 10 mm en un telescopio de 1000 mm de focal da 100×.",
    color: "oklch(0.65 0.28 320)",
    emoji: "👁️",
    svgX: 75,
    svgY: 80,
  },
  {
    id: "tubo",
    name: "Tubo Óptico",
    shortName: "Tubo",
    spec: "Long. focal: 400–2000 mm",
    desc: "El cuerpo principal que aloja y mantiene en perfecta alineación el objetivo y el ocular. Puede ser de aluminio anodizado, fibra de carbono o acero. El interior está pintado de negro mate para absorber la luz difusa que degradaría el contraste.",
    color: "oklch(0.7 0.25 260)",
    emoji: "🔷",
    svgX: 183,
    svgY: 48,
  },
  {
    id: "montura",
    name: "Montura",
    shortName: "Montura",
    spec: "Ecuatorial / Alt-Az",
    desc: "El sistema mecánico que soporta el tubo y permite apuntarlo a cualquier parte del cielo. La montura ecuatorial tiene un eje alineado con el Polo Celeste, permitiendo rastrear objetos con un solo motor a velocidad sidérea (1 vuelta cada 23h 56m).",
    color: "oklch(0.65 0.22 280)",
    emoji: "⚙️",
    svgX: 183,
    svgY: 120,
  },
  {
    id: "enfocador",
    name: "Enfocador",
    shortName: "Enfocador",
    spec: "Paso: 0.01 mm",
    desc: "Mecanismo de cremallera o Crayford que desplaza el ocular con precisión micrométrica para enfocar la imagen con nitidez perfecta. Los enfocadores motorizados con codificador óptico permiten enfoque automático y repetible.",
    color: "oklch(0.75 0.22 50)",
    emoji: "🎛️",
    svgX: 110,
    svgY: 48,
  },
  {
    id: "buscador",
    name: "Buscador",
    shortName: "Buscador",
    spec: "6×30 / 8×50 mm",
    desc: "Telescopio auxiliar de campo amplio (5–8°) montado en paralelo al tubo principal. Permite localizar el objeto celeste deseado antes de observar con el alto aumento del tubo principal. Los 'red dot finders' proyectan un punto rojo en el cielo.",
    color: "oklch(0.65 0.22 280)",
    emoji: "🎯",
    svgX: 260,
    svgY: 48,
  },
];

// ─── Telescope diagram SVG ────────────────────────────────────────────────────

function TelescopeDiagram({
  activePartId,
  onPartHover,
}: {
  activePartId: string | null;
  onPartHover: (id: string | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 370 160"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Diagrama del telescopio con partes etiquetadas"
    >
      <title>Diagrama del telescopio con partes etiquetadas</title>
      {/* Main tube */}
      <rect
        x="60"
        y="62"
        width="250"
        height="36"
        rx="18"
        fill={
          activePartId === "tubo"
            ? "oklch(0.7 0.25 260 / 0.35)"
            : "oklch(0.18 0.04 260)"
        }
        stroke={
          activePartId === "tubo"
            ? "oklch(0.7 0.25 260)"
            : "oklch(0.3 0.04 260)"
        }
        strokeWidth="1.5"
        className="cursor-pointer transition-all duration-200"
        onMouseEnter={() => onPartHover("tubo")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Objective lens (right) */}
      <ellipse
        cx="308"
        cy="80"
        rx="10"
        ry="20"
        fill={
          activePartId === "objetivo"
            ? "oklch(0.7 0.25 260 / 0.5)"
            : "oklch(0.7 0.25 260 / 0.2)"
        }
        stroke="oklch(0.7 0.25 260)"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover("objetivo")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Eyepiece/focuser (left) */}
      <rect
        x="50"
        y="72"
        width="16"
        height="16"
        rx="3"
        fill={
          activePartId === "ocular"
            ? "oklch(0.65 0.28 320 / 0.5)"
            : "oklch(0.65 0.28 320 / 0.2)"
        }
        stroke="oklch(0.65 0.28 320)"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover("ocular")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Focuser knob */}
      <rect
        x="105"
        y="98"
        width="20"
        height="10"
        rx="2"
        fill={
          activePartId === "enfocador"
            ? "oklch(0.75 0.22 50 / 0.5)"
            : "oklch(0.75 0.22 50 / 0.2)"
        }
        stroke="oklch(0.75 0.22 50)"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover("enfocador")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Finder scope */}
      <rect
        x="220"
        y="48"
        width="50"
        height="12"
        rx="6"
        fill={
          activePartId === "buscador"
            ? "oklch(0.65 0.22 280 / 0.5)"
            : "oklch(0.65 0.22 280 / 0.15)"
        }
        stroke="oklch(0.65 0.22 280)"
        strokeWidth="1.2"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover("buscador")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Mount / tripod */}
      <line
        x1="185"
        y1="98"
        x2="165"
        y2="145"
        stroke="oklch(0.45 0.06 260)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="185"
        y1="98"
        x2="185"
        y2="145"
        stroke="oklch(0.45 0.06 260)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="185"
        y1="98"
        x2="205"
        y2="145"
        stroke="oklch(0.45 0.06 260)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse
        cx="185"
        cy="98"
        rx="10"
        ry="8"
        fill={
          activePartId === "montura"
            ? "oklch(0.65 0.22 280 / 0.5)"
            : "oklch(0.25 0.04 280)"
        }
        stroke="oklch(0.65 0.22 280)"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover("montura")}
        onMouseLeave={() => onPartHover(null)}
      />

      {/* Labels */}
      <text
        x="308"
        y="115"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.7 0.25 260)"
        fontFamily="monospace"
      >
        Obj.
      </text>
      <text
        x="58"
        y="115"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.65 0.28 320)"
        fontFamily="monospace"
      >
        Ocular
      </text>
      <text
        x="115"
        y="120"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.75 0.22 50)"
        fontFamily="monospace"
      >
        Enfoc.
      </text>
      <text
        x="245"
        y="43"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.65 0.22 280)"
        fontFamily="monospace"
      >
        Buscador
      </text>
      <text
        x="185"
        y="155"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.65 0.22 280)"
        fontFamily="monospace"
      >
        Montura
      </text>
      <text
        x="185"
        y="80"
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.7 0.25 260 / 0.7)"
        fontFamily="monospace"
      >
        Tubo óptico
      </text>
    </svg>
  );
}

export default function PartesTelescopo({
  narrationState,
}: PartesTelescopoProps) {
  const isActive = narrationState.currentSectionId === "partes";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activePart = PARTES.find((p) => p.id === hoveredId) ?? null;

  return (
    <section
      id="partes"
      data-ocid="partes.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.068 0.018 262)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.7 0.25 260 / 0.04)" }}
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
              background: "oklch(0.7 0.25 260 / 0.15)",
              border: "1px solid oklch(0.7 0.25 260 / 0.3)",
              color: "oklch(0.7 0.25 260)",
              boxShadow: isActive
                ? "0 0 16px oklch(0.7 0.25 260 / 0.4)"
                : "none",
            }}
          >
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Partes del Telescopio
          </h2>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed max-w-3xl mb-10"
        >
          Cada componente cumple una función óptica o mecánica precisa. Pasa el
          cursor sobre el diagrama o las tarjetas para descubrir los detalles de
          cada parte.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Diagram column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphic p-6 rounded-2xl"
          >
            <p className="text-xs font-mono text-muted-foreground text-center mb-4 tracking-wider uppercase">
              Telescopio refractor — hover para detalles
            </p>
            <TelescopeDiagram
              activePartId={hoveredId}
              onPartHover={setHoveredId}
            />

            {/* Active part info */}
            <div
              className="mt-4 p-3 rounded-xl transition-smooth min-h-[64px]"
              style={{
                background: activePart
                  ? `${activePart.color.slice(0, -1)} / 0.08)`
                  : "oklch(0.12 0.02 260 / 0.4)",
                border: activePart
                  ? `1px solid ${activePart.color.slice(0, -1)} / 0.25)`
                  : "1px solid oklch(0.2 0.01 260)",
              }}
            >
              {activePart ? (
                <>
                  <p
                    className="text-xs font-mono font-bold mb-1"
                    style={{ color: activePart.color }}
                  >
                    {activePart.name} — {activePart.spec}
                  </p>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">
                    {activePart.desc.slice(0, 120)}…
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground font-body italic">
                  Pasa el cursor sobre el diagrama para ver detalles
                </p>
              )}
            </div>
          </motion.div>

          {/* Parts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTES.map((part, idx) => (
              <motion.div
                key={part.id}
                data-ocid={`partes.item.${idx + 1}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredId(part.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="glassmorphic p-4 rounded-xl cursor-default transition-smooth hover:scale-[1.02] group"
                style={
                  hoveredId === part.id
                    ? {
                        borderColor: `${part.color.slice(0, -1)} / 0.4)`,
                        boxShadow: `0 0 16px ${part.color.slice(0, -1)} / 0.15)`,
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{
                      background: `${part.color.slice(0, -1)} / 0.15)`,
                      border: `1px solid ${part.color.slice(0, -1)} / 0.3)`,
                    }}
                  >
                    {part.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-foreground text-xs leading-tight">
                      {part.name}
                    </h3>
                    <p
                      className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-smooth"
                      style={{ color: part.color }}
                    >
                      {part.spec}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-3">
                  {part.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
