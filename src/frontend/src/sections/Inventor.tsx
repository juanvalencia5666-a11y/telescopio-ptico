import { Star } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface InventorProps {
  narrationState: NarrationState;
}

const INVENTORS = [
  {
    id: "lippershey",
    name: "Hans Lippershey",
    title: "El Pionero",
    years: "1570–1619",
    era: "1608 — Primera patente",
    country: "🇳🇱 Países Bajos",
    contribution:
      "Fabricante de anteojos en Middelburg, solicitó la primera patente de un telescopio de dos lentes que ampliaba los objetos tres veces. Aunque la patente le fue denegada por considerarse un invento que podía ser copiado fácilmente, su diseño fue el punto de partida de todo.",
    achievements: [
      "Primera patente (1608)",
      "Diseño refractor biconvexo",
      "Magnificación 3×",
    ],
    color: "oklch(0.7 0.25 260)",
    emoji: "🔭",
    gradient: "oklch(0.7 0.25 260)",
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    title: "El Revolucionario",
    years: "1564–1642",
    era: "1609 — El cielo revelado",
    country: "🇮🇹 Italia",
    contribution:
      "Tras escuchar del invento, Galileo construyó su propio telescopio y rápidamente lo mejoró hasta 20 aumentos. Fue el primero en usarlo sistemáticamente en astronomía: descubrió las lunas de Júpiter, demostró que la Luna tiene montañas y apoyó el modelo heliocéntrico de Copérnico.",
    achievements: [
      "Lunas de Júpiter (1610)",
      "Fases de Venus",
      "Superficie lunar",
      "Magnificación 20×",
      "Padre de la astronomía observacional",
    ],
    color: "oklch(0.75 0.22 50)",
    emoji: "⭐",
    gradient: "oklch(0.75 0.22 50)",
    featured: true,
  },
  {
    id: "newton",
    name: "Isaac Newton",
    title: "El Matemático",
    years: "1643–1727",
    era: "1668 — El reflector",
    country: "🇬🇧 Inglaterra",
    contribution:
      "Newton demostró que el vidrio dispersa la luz blanca en colores (aberración cromática), lo que degrada las imágenes en los refractores. Su solución fue reemplazar la lente objetiva por un espejo cóncavo, inventando el telescopio reflector que abrió el camino a los modernos observatorios.",
    achievements: [
      "Telescopio reflector (1668)",
      "Elimina aberración cromática",
      "Espejo parabólico",
      "Base del diseño moderno",
    ],
    color: "oklch(0.65 0.28 320)",
    emoji: "🌟",
    gradient: "oklch(0.65 0.28 320)",
  },
];

function InventorPortrait({
  emoji,
  color,
  featured,
}: { emoji: string; color: string; featured?: boolean }) {
  return (
    <div className="relative mx-auto w-28 h-28 mb-5">
      {featured && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ background: `${color.slice(0, -1)} / 0.15)` }}
        />
      )}
      <div
        className="relative w-full h-full rounded-full flex items-center justify-center text-5xl"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color.slice(0, -1)} / 0.2), ${color.slice(0, -1)} / 0.05))`,
          border: `2px solid ${color.slice(0, -1)} / 0.4)`,
          boxShadow: `0 0 30px ${color.slice(0, -1)} / 0.3), inset 0 0 20px ${color.slice(0, -1)} / 0.1)`,
        }}
      >
        {emoji}
      </div>
    </div>
  );
}

export default function Inventor({ narrationState }: InventorProps) {
  const isActive = narrationState.currentSectionId === "inventor";

  return (
    <section
      id="inventor"
      data-ocid="inventor.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.075 0.02 258)" }}
    >
      {/* Glowing nebula accents */}
      <div
        className="absolute top-1/4 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.75 0.22 50 / 0.06)" }}
      />
      <div
        className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.65 0.28 320 / 0.06)" }}
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
            <Star className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Los Inventores
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
          Tres mentes brillantes que, en el transcurso de apenas 60 años,
          pasaron de un anteojo de feria a una herramienta que cambiaría para
          siempre nuestra visión del cosmos.
        </motion.p>

        {/* Inventor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INVENTORS.map((inv, idx) => (
            <motion.div
              key={inv.id}
              data-ocid={`inventor.card.${idx + 1}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.14 }}
              className={`glassmorphic rounded-2xl p-6 text-center flex flex-col transition-smooth hover:scale-[1.02] relative overflow-hidden ${
                inv.featured ? "ring-1" : ""
              }`}
              style={
                inv.featured
                  ? {
                      borderColor: `${inv.color.slice(0, -1)} / 0.35)`,
                      boxShadow: `0 0 30px ${inv.color.slice(0, -1)} / 0.12)`,
                    }
                  : {}
              }
            >
              {inv.featured && (
                <div
                  className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${inv.color.slice(0, -1)} / 0.15)`,
                    color: inv.color,
                    border: `1px solid ${inv.color.slice(0, -1)} / 0.3)`,
                  }}
                >
                  Principal
                </div>
              )}

              <InventorPortrait
                emoji={inv.emoji}
                color={inv.color}
                featured={inv.featured}
              />

              <h3 className="font-display font-black text-lg text-foreground mb-1">
                {inv.name}
              </h3>
              <p
                className="font-mono text-xs mb-2"
                style={{ color: inv.color }}
              >
                {inv.title}
              </p>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                {inv.years} &nbsp;·&nbsp; {inv.country}
              </p>
              <div
                className="text-xs font-mono px-3 py-1 rounded-full inline-block mx-auto mb-4"
                style={{
                  background: `${inv.color.slice(0, -1)} / 0.1)`,
                  color: inv.color,
                  border: `1px solid ${inv.color.slice(0, -1)} / 0.25)`,
                }}
              >
                {inv.era}
              </div>

              <p className="text-xs text-muted-foreground font-body leading-relaxed mb-5 flex-1">
                {inv.contribution}
              </p>

              <div className="space-y-1.5">
                {inv.achievements.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 text-xs font-body text-left"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: inv.color }}
                    />
                    <span className="text-muted-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center max-w-2xl mx-auto"
        >
          <p className="font-display text-xl sm:text-2xl text-foreground/80 italic leading-relaxed mb-3">
            "La naturaleza es un libro escrito en el lenguaje de las
            matemáticas."
          </p>
          <cite className="text-sm font-mono text-muted-foreground not-italic">
            — Galileo Galilei, 1623
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
