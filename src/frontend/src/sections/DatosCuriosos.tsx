import { Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface DatosCuriososProps {
  narrationState: NarrationState;
}

const FACTS = [
  {
    id: "galileo-ciego",
    emoji: "😢",
    stat: "1638",
    statLabel: "Galileo queda ciego",
    desc: "Galileo Galilei perdió la vista a los 74 años, posiblemente por observar el Sol sin suficiente protección. Continuó dictando descubrimientos de memoria hasta su muerte en 1642.",
    color: "oklch(0.75 0.22 50)",
  },
  {
    id: "hubble-flaw",
    emoji: "🔧",
    stat: "2.2 mm",
    statLabel: "El error del Hubble",
    desc: "El espejo primario del Hubble fue pulido 2.2 mm demasiado plano. NASA envió una misión de servicio en 1993 para instalar COSTAR, esencialmente 'gafas correctoras' para el telescopio.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "webb-cost",
    emoji: "💰",
    stat: "10.000 M€",
    statLabel: "Costo del James Webb",
    desc: "El Telescopio Espacial James Webb costó 10.000 millones de dólares y tardó 25 años en desarrollarse. Su espejo plegable de 18 segmentos hexagonales de berilio dorado mide 6.5 metros.",
    color: "oklch(0.65 0.28 320)",
  },
  {
    id: "elt-mirror",
    emoji: "🪞",
    stat: "798",
    statLabel: "Segmentos del ELT",
    desc: "El Extremely Large Telescope (ELT) en Chile tendrá un espejo primario de 39 metros compuesto por 798 segmentos hexagonales de 1.4 m cada uno. Será el ojo más grande jamás construido.",
    color: "oklch(0.75 0.22 50)",
  },
  {
    id: "light-delay",
    emoji: "⏱️",
    stat: "13.800 Ma",
    statLabel: "El pasado más lejano visto",
    desc: "El Hubble Ultra Deep Field capturó galaxias formadas apenas 600 millones de años después del Big Bang. Ver lejos en el espacio equivale a ver atrás en el tiempo a una velocidad de 300.000 km/s.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "pluto",
    emoji: "🌑",
    stat: "76 años",
    statLabel: "Plutón descubierto",
    desc: "Plutón fue descubierto en 1930 por Clyde Tombaugh en el Observatorio Lowell usando un comparador de parpadeo entre fotografías telescópicas. Buscaba el hipotético Planeta X predicho por Percival Lowell.",
    color: "oklch(0.65 0.22 280)",
  },
  {
    id: "seeing",
    emoji: "🌬️",
    stat: "0.1–3.0″",
    statLabel: "Seeing típico en la Tierra",
    desc: "La turbulencia atmosférica limita la resolución a 0.5–2.0 arcseg bajo cielos promedio. Los mejores sitios del mundo (Mauna Kea, La Palma) logran seeing de 0.3–0.5″. El espacio elimina completamente este límite.",
    color: "oklch(0.65 0.28 320)",
  },
  {
    id: "newton-mirror",
    emoji: "⚗️",
    stat: "1668",
    statLabel: "Newton pulió el primer espejo",
    desc: "Newton fundió y pulió personalmente el espejo de especulum (cobre 70% + estaño 30%) de su primer telescopio reflector de 15 cm. El proceso duró meses de trabajo artesanal hasta conseguir una superficie parabólica precisa.",
    color: "oklch(0.75 0.22 50)",
  },
  {
    id: "dark-energy",
    emoji: "🌌",
    stat: "1998",
    statLabel: "Energía oscura descubierta",
    desc: "Observaciones telescópicas de supernovas tipo Ia en 1998 revelaron que el universo no solo se expande sino que se acelera. Este hallazgo — que ganó el Nobel en 2011 — implica la existencia de energía oscura, componiendo el 68% del cosmos.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "galaxies",
    emoji: "🌠",
    stat: "2 billones",
    statLabel: "Galaxias en el universo",
    desc: "Análisis del Hubble Ultra Deep Field en 2016 estimaron que el universo observable contiene al menos 2 billones (2×10¹²) de galaxias. Antes del Hubble, la cifra era de 200,000 millones. La imagen más profunda tomada abarca 13.200 Ma.",
    color: "oklch(0.65 0.28 320)",
  },
];

export default function DatosCuriosos({ narrationState }: DatosCuriososProps) {
  const isActive = narrationState.currentSectionId === "datos";

  return (
    <section
      id="datos"
      data-ocid="datos.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.058 0.02 260)" }}
    >
      {/* Decorative glows */}
      <div
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.75 0.22 50 / 0.06)" }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.7 0.25 260 / 0.05)" }}
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
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Datos Curiosos
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
          Cuatro siglos de astronomía telescópica están llenos de historias
          asombrosas: errores que se convirtieron en genialidades, hazañas de
          ingeniería colosales y descubrimientos que cambiaron nuestra visión
          del cosmos.
        </motion.p>

        {/* Facts grid — masonry-like with alternating column spans */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {FACTS.map((fact, idx) => (
            <motion.div
              key={fact.id}
              data-ocid={`datos.item.${idx + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="glassmorphic p-5 rounded-2xl break-inside-avoid hover:scale-[1.02] transition-smooth group relative overflow-hidden"
            >
              {/* Subtle gradient top stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${fact.color}, transparent)`,
                }}
              />

              {/* Emoji + stat */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    background: `${fact.color.slice(0, -1)} / 0.12)`,
                    border: `1px solid ${fact.color.slice(0, -1)} / 0.25)`,
                  }}
                >
                  {fact.emoji}
                </div>
                <div>
                  <p
                    className="font-display font-black text-lg leading-tight"
                    style={{ color: fact.color }}
                  >
                    {fact.stat}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground leading-tight">
                    {fact.statLabel}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {fact.desc}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-smooth"
                style={{
                  boxShadow: `inset 0 0 30px ${fact.color.slice(0, -1)} / 0.06)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
