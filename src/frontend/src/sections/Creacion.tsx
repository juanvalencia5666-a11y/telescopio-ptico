import { Settings } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface CreacionProps {
  narrationState: NarrationState;
}

const STEPS = [
  {
    id: "vidrio",
    num: "01",
    title: "Selección del Vidrio",
    desc: "Se elige vidrio óptico de borosilicato o crown glass con índice de refracción preciso (n ≈ 1.52). La pureza y homogeneidad del material son críticas para evitar aberraciones ópticas.",
    color: "oklch(0.7 0.25 260)",
    icon: "💎",
  },
  {
    id: "esmerilado",
    num: "02",
    title: "Esmerilado de Lentes",
    desc: "El disco de vidrio se desbasta con abrasivos progresivamente más finos. Para un objetivo de 100 mm se requieren semanas de pulido manual o días con máquinas CNC para alcanzar tolerancias de λ/4 de onda.",
    color: "oklch(0.75 0.22 50)",
    icon: "⚙️",
  },
  {
    id: "prueba",
    num: "03",
    title: "Prueba de Foucault",
    desc: "El test de Foucault detecta imperfecciones en la superficie cóncava usando una navaja que corta el foco del espejo. Las sombras revelan errores de hasta nanómetros que el pulidor corregirá.",
    color: "oklch(0.65 0.28 320)",
    icon: "🔬",
  },
  {
    id: "recubrimiento",
    num: "04",
    title: "Recubrimiento Reflectante",
    desc: "Los espejos se vaporizan con aluminio en cámaras de vacío a 10⁻⁶ torr. Una capa de 100 nm refleja el 88% de la luz visible. El coating de SiO₂ lo protege de la oxidación.",
    color: "oklch(0.65 0.22 280)",
    icon: "✨",
  },
  {
    id: "ensamblaje",
    num: "05",
    title: "Ensamblaje del Tubo",
    desc: "Las lentes o espejos se montan en el tubo con tolerancias de centésimas de milímetro. La alineación (colimación) es esencial: un desajuste de 0.1 mm degrada la imagen de manera significativa.",
    color: "oklch(0.7 0.25 260)",
    icon: "🔭",
  },
  {
    id: "montura",
    num: "06",
    title: "Montura y Seguimiento",
    desc: "La montura ecuatorial alinea uno de sus ejes con el Polo Norte Celeste. El motor de seguimiento compensa la rotación terrestre a una velocidad sidérea de 15°/hora para mantener los objetos fijos en el campo visual.",
    color: "oklch(0.75 0.22 50)",
    icon: "🌍",
  },
];

const TYPES = [
  {
    id: "refractor",
    name: "Refractor",
    icon: "🔵",
    desc: "Usa lentes de vidrio para doblar y enfocar la luz. Ideal para planetas y luna. Requiere mantenimiento mínimo.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "reflector",
    name: "Reflector",
    icon: "🔴",
    desc: "Usa espejos cóncavos. Sin aberración cromática. Mejor para objetos tenues como nebulosas y galaxias.",
    color: "oklch(0.65 0.28 320)",
  },
  {
    id: "cassegrain",
    name: "Catadióptrico",
    icon: "🟡",
    desc: "Combina lentes y espejos. Tubo compacto, larga focal. Versátil para uso astronómico profesional y aficionado.",
    color: "oklch(0.75 0.22 50)",
  },
];

// ─── SVG lens cross-section diagram ──────────────────────────────────────────

function LensDiagram() {
  return (
    <svg
      viewBox="0 0 400 160"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Diagrama de refracción en lente convexa"
    >
      <title>Diagrama de refracción en lente convexa</title>
      {/* Background */}
      <rect
        width="400"
        height="160"
        fill="oklch(0.08 0.02 260 / 0.6)"
        rx="12"
      />

      {/* Lens body */}
      <ellipse
        cx="200"
        cy="80"
        rx="14"
        ry="55"
        fill="oklch(0.7 0.25 260 / 0.25)"
        stroke="oklch(0.7 0.25 260)"
        strokeWidth="1.5"
      />

      {/* Incoming parallel rays */}
      {[30, 55, 80, 105, 130].map((y) => (
        <g key={`ray-${y}`}>
          <line
            x1="20"
            y1={y}
            x2="186"
            y2={y}
            stroke="oklch(0.75 0.22 50)"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />
          <line
            x1="214"
            y1={y}
            x2="300"
            y2="80"
            stroke="oklch(0.75 0.22 50)"
            strokeWidth="1.2"
          />
        </g>
      ))}

      {/* Focal point */}
      <circle cx="300" cy="80" r="5" fill="oklch(0.75 0.22 50)" />
      <circle
        cx="300"
        cy="80"
        r="12"
        fill="none"
        stroke="oklch(0.75 0.22 50 / 0.3)"
        strokeWidth="1"
      />

      {/* Labels */}
      <text
        x="20"
        y="150"
        fontSize="9"
        fill="oklch(0.7 0 0)"
        fontFamily="monospace"
      >
        Luz entrante paralela
      </text>
      <text
        x="192"
        y="150"
        fontSize="9"
        fill="oklch(0.7 0.25 260)"
        fontFamily="monospace"
      >
        Lente
      </text>
      <text
        x="286"
        y="150"
        fontSize="9"
        fill="oklch(0.75 0.22 50)"
        fontFamily="monospace"
      >
        Foco
      </text>

      {/* Optical axis */}
      <line
        x1="10"
        y1="80"
        x2="390"
        y2="80"
        stroke="oklch(0.3 0 0)"
        strokeWidth="0.8"
        strokeDasharray="6 4"
      />

      {/* Focal length arrow */}
      <line
        x1="214"
        y1="95"
        x2="298"
        y2="95"
        stroke="oklch(0.65 0.28 320 / 0.6)"
        strokeWidth="0.8"
        markerEnd="url(#arrow)"
      />
      <text
        x="240"
        y="110"
        fontSize="8"
        fill="oklch(0.65 0.28 320)"
        fontFamily="monospace"
      >
        focal
      </text>
    </svg>
  );
}

export default function Creacion({ narrationState }: CreacionProps) {
  const isActive = narrationState.currentSectionId === "creacion";

  return (
    <section
      id="creacion"
      data-ocid="creacion.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.07 0.016 255)" }}
    >
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.65 0.28 320 / 0.08)" }}
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
              background: "oklch(0.75 0.22 50 / 0.15)",
              border: "1px solid oklch(0.75 0.22 50 / 0.3)",
              color: "oklch(0.75 0.22 50)",
              boxShadow: isActive
                ? "0 0 16px oklch(0.75 0.22 50 / 0.4)"
                : "none",
            }}
          >
            <Settings className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Creación e Ingeniería
          </h2>
          {isActive && (
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.75 0.22 50)" }}
            />
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed max-w-3xl mb-14"
        >
          Construir un telescopio óptico es la fusión de física de ondas,
          metalurgia, óptica de precisión y mecánica de alta tolerancia. Cada
          componente es el resultado de siglos de refinamiento artesanal e
          industrial.
        </motion.p>

        {/* Lens diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 glassmorphic p-6 rounded-2xl"
        >
          <p className="text-xs font-mono text-muted-foreground text-center mb-4 tracking-wider uppercase">
            Principio de refracción — lente convexa
          </p>
          <LensDiagram />
        </motion.div>

        {/* Process steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              data-ocid={`creacion.step.${idx + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.09 }}
              className="glassmorphic p-5 rounded-xl group hover:scale-[1.02] transition-smooth relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 text-5xl opacity-5 leading-none select-none"
                style={{ color: step.color }}
              >
                {step.num}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{step.icon}</span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: step.color }}
                >
                  Paso {step.num}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground text-sm mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Telescope types */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-5">
            Tipos principales de telescopio óptico
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TYPES.map((type, idx) => (
              <motion.div
                key={type.id}
                data-ocid={`creacion.type.${idx + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="rounded-xl p-4 text-center transition-smooth hover:scale-[1.03]"
                style={{
                  background: `${type.color.slice(0, -1)} / 0.07)`,
                  border: `1px solid ${type.color.slice(0, -1)} / 0.25)`,
                }}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <h4
                  className="font-display font-bold text-sm mb-2"
                  style={{ color: type.color }}
                >
                  {type.name}
                </h4>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {type.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
