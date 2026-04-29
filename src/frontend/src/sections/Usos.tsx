import {
  Atom,
  Camera,
  Globe2,
  GraduationCap,
  Microscope,
  Shield,
  Telescope,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface UsosProps {
  narrationState: NarrationState;
}

interface UseCase {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
  Icon: LucideIcon;
  badge: string;
  stats: Array<{ label: string; value: string }>;
}

const USE_CASES: UseCase[] = [
  {
    id: "amateur",
    title: "Astronomía Amateur",
    subtitle: "Para todos",
    desc: "Millones de aficionados en todo el mundo observan planetas, cúmulos estelares, nebulosas y galaxias desde sus jardines o terrazas. Telescopios de 100–200 mm de apertura revelan los anillos de Saturno, las bandas de Júpiter y la superficie lunar con asombroso detalle.",
    color: "oklch(0.7 0.25 260)",
    Icon: Telescope,
    badge: "🏡 Uso personal",
    stats: [
      { label: "Usuarios globales", value: ">10M" },
      { label: "Objetos visibles", value: "~5000" },
    ],
  },
  {
    id: "investigacion",
    title: "Investigación Científica",
    subtitle: "Observatorios",
    desc: "Los grandes observatorios terrestres y espaciales emplean telescopios ópticos para cartografiar galaxias, medir la expansión del universo, estudiar exoplanetas mediante el método del tránsito y registrar eventos transitorios como supernovas y gammas.",
    color: "oklch(0.65 0.28 320)",
    Icon: Atom,
    badge: "🔬 Profesional",
    stats: [
      { label: "Exoplanetas encontrados", value: "5,600+" },
      { label: "Galaxias catalogadas", value: ">2M" },
    ],
  },
  {
    id: "educacion",
    title: "Educación",
    subtitle: "Escuelas y museos",
    desc: "Los planetarios y observatorios escolares usan telescopios para despertar la curiosidad científica. Observar la Luna en directo o seguir los satélites de Galileo orbitar Júpiter en tiempo real es la mejor introducción a la mecánica celeste.",
    color: "oklch(0.75 0.22 50)",
    Icon: GraduationCap,
    badge: "📚 Educativo",
    stats: [
      { label: "Planetarios mundiales", value: "3,500+" },
      { label: "Estudiantes al año", value: ">50M" },
    ],
  },
  {
    id: "fotografia",
    title: "Astrofotografía",
    subtitle: "Arte y ciencia",
    desc: "La combinación de telescopio óptico con cámaras CCD o CMOS enfriadas permite capturar colores que el ojo humano no percibe. Imágenes en banda estrecha (Hα, OIII, SII) revelan la estructura interna de nebulosas con detalle miliarcsegundo.",
    color: "oklch(0.65 0.22 280)",
    Icon: Camera,
    badge: "📸 Creativo",
    stats: [
      { label: "Resolución típica", value: "0.5″/px" },
      { label: "Exposición máx.", value: "20+ hrs" },
    ],
  },
  {
    id: "ciencia-ciudadana",
    title: "Ciencia Ciudadana",
    subtitle: "Tú puedes contribuir",
    desc: "Proyectos como Galaxy Zoo, SETI@home o la red de alerta de asteroides (ATLAS) usan observaciones de aficionados para tareas como clasificar galaxias, buscar asteroides potencialmente peligrosos o detectar variaciones de brillo en estrellas.",
    color: "oklch(0.7 0.25 260)",
    Icon: Globe2,
    badge: "🌍 Colaborativo",
    stats: [
      { label: "Voluntarios activos", value: ">200K" },
      { label: "Objetos clasificados", value: ">50M" },
    ],
  },
  {
    id: "defensa",
    title: "Vigilancia Espacial",
    subtitle: "Defensa planetaria",
    desc: "Redes de telescopios ópticos como Catalina Sky Survey y Pan-STARRS monitorizan continuamente el cielo en busca de objetos cercanos a la Tierra (NEO). La detección temprana de asteroides con décadas de antelación permite planificar misiones de desviación.",
    color: "oklch(0.65 0.28 320)",
    Icon: Shield,
    badge: "🛡️ Seguridad",
    stats: [
      { label: "NEOs catalogados", value: ">32,000" },
      { label: "Peligrosos conocidos", value: "~2,300" },
    ],
  },
  {
    id: "espectroscopia",
    title: "Espectroscopía",
    subtitle: "La química de las estrellas",
    desc: "Acoplando un espectrógrafo al telescopio se descompone la luz estelar en su espectro. Las líneas de absorción revelan la composición química, temperatura, velocidad de rotación y velocidad radial de estrellas y galaxias a millones de años luz.",
    color: "oklch(0.75 0.22 50)",
    Icon: Microscope,
    badge: "🧪 Analítico",
    stats: [
      { label: "Estrellas catalogadas", value: ">1 mil M" },
      { label: "Elementos detectados", value: ">90" },
    ],
  },
];

export default function Usos({ narrationState }: UsosProps) {
  const isActive = narrationState.currentSectionId === "usos";

  return (
    <section
      id="usos"
      data-ocid="usos.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.066 0.016 252)" }}
    >
      <div
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.7 0.25 260 / 0.06)" }}
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
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Usos del Telescopio
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
          className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed max-w-3xl mb-14"
        >
          Desde el jardín de un aficionado hasta el espacio profundo, el
          telescopio óptico sirve a la humanidad en formas que van mucho más
          allá de la contemplación del cielo.
        </motion.p>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((uc, idx) => (
            <motion.div
              key={uc.id}
              data-ocid={`usos.item.${idx + 1}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glassmorphic rounded-2xl p-5 flex flex-col hover:scale-[1.02] transition-smooth group relative overflow-hidden"
            >
              {/* Color accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-smooth group-hover:h-1"
                style={{ background: uc.color }}
              />

              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-4 mt-1">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: `${uc.color.slice(0, -1)} / 0.15)`,
                    border: `1px solid ${uc.color.slice(0, -1)} / 0.3)`,
                  }}
                >
                  <uc.Icon className="w-5 h-5" style={{ color: uc.color }} />
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${uc.color.slice(0, -1)} / 0.1)`,
                    color: uc.color,
                    border: `1px solid ${uc.color.slice(0, -1)} / 0.2)`,
                  }}
                >
                  {uc.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-foreground text-base mb-0.5">
                {uc.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mb-3">
                {uc.subtitle}
              </p>
              <p className="text-xs text-muted-foreground font-body leading-relaxed flex-1 mb-4">
                {uc.desc}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/30">
                {uc.stats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-mono font-bold text-sm"
                      style={{ color: uc.color }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-body leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
