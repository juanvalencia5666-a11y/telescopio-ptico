import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import type { NarrationState } from "../types";

interface HistoriaProps {
  narrationState: NarrationState;
}

const TIMELINE = [
  {
    id: "lippershey",
    year: "1608",
    title: "La Primera Patente",
    who: "Hans Lippershey",
    country: "🇳🇱 Países Bajos",
    desc: "El óptico holandés Hans Lippershey presenta la primera solicitud de patente para un anteojo que 'hace que los objetos lejanos parezcan cercanos'. Su diseño refractor con dos lentes fue el punto de partida de una revolución.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "galileo",
    year: "1609",
    title: "El Cielo Revelado",
    who: "Galileo Galilei",
    country: "🇮🇹 Italia",
    desc: "Galileo mejora el diseño hasta 20× de aumento y lo apunta al cielo. Descubre las lunas de Júpiter, las fases de Venus, la superficie lunar con cráteres y la naturaleza estelar de la Vía Láctea. La astronomía nunca sería igual.",
    color: "oklch(0.75 0.22 50)",
  },
  {
    id: "newton",
    year: "1668",
    title: "El Telescopio Reflector",
    who: "Isaac Newton",
    country: "🇬🇧 Inglaterra",
    desc: "Newton resuelve la aberración cromática sustituyendo la lente objetiva por un espejo cóncavo de metal pulido. El telescopio reflector newtoniano establece los fundamentos del diseño moderno que aún usan la mayoría de observatorios.",
    color: "oklch(0.65 0.28 320)",
  },
  {
    id: "herschel",
    year: "1781",
    title: "Descubrimiento de Urano",
    who: "William Herschel",
    country: "🇩🇪 Alemania / 🇬🇧 UK",
    desc: "Con un reflector de 6 pulgadas de fabricación propia, Herschel descubre Urano — el primer planeta nuevo en la historia registrada — ampliando el Sistema Solar conocido más allá de Saturno.",
    color: "oklch(0.7 0.25 260)",
  },
  {
    id: "hubble",
    year: "1990",
    title: "Telescopio Espacial Hubble",
    who: "NASA / ESA",
    country: "🌍 Órbita terrestre",
    desc: "El Hubble, lanzado en órbita a 593 km de altitud, captura imágenes sin la distorsión de la atmósfera. Ha observado más de un millón de objetos y calculado la edad del universo con precisión: 13.800 millones de años.",
    color: "oklch(0.65 0.22 280)",
  },
  {
    id: "webb",
    year: "2021",
    title: "James Webb — La Nueva Era",
    who: "NASA / ESA / CSA",
    country: "🌌 Punto L2",
    desc: "El Telescopio Espacial James Webb, con espejo primario segmentado de 6,5 metros, observa en infrarrojo las primeras galaxias formadas 300 millones de años después del Big Bang. La frontera del universo observable se extiende.",
    color: "oklch(0.75 0.22 50)",
  },
];

export default function Historia({ narrationState }: HistoriaProps) {
  const isActive = narrationState.currentSectionId === "historia";

  return (
    <section
      id="historia"
      data-ocid="historia.section"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.065 0.018 260)" }}
    >
      {/* Decorative nebula glow */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "oklch(0.65 0.22 280 / 0.4)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div
            className="p-2 rounded-lg transition-smooth"
            style={{
              background: "oklch(0.65 0.22 280 / 0.15)",
              border: "1px solid oklch(0.65 0.22 280 / 0.3)",
              color: "oklch(0.65 0.22 280)",
              boxShadow: isActive
                ? "0 0 16px oklch(0.65 0.22 280 / 0.4)"
                : "none",
            }}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
            Historia del Telescopio
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
          Cuatro siglos de innovación continua: del modesto anteojo de un óptico
          holandés a los gigantescos observatorios orbitales que escudriñan los
          confines del universo.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "oklch(0.25 0.01 260)" }}
          />

          <div className="space-y-12">
            {TIMELINE.map((entry, idx) => (
              <motion.div
                key={entry.id}
                data-ocid={`historia.item.${idx + 1}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-10 ${
                  idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[28px] sm:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 -translate-y-0 top-1.5 z-10 transition-smooth"
                  style={{
                    borderColor: entry.color,
                    background: "oklch(0.065 0.018 260)",
                    boxShadow: `0 0 10px ${entry.color}`,
                  }}
                />

                {/* Year badge (desktop) */}
                <div
                  className={`hidden sm:flex w-[calc(50%-3rem)] shrink-0 ${
                    idx % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-mono font-bold self-start"
                    style={{
                      background: `${entry.color.slice(0, -1)} / 0.12)`,
                      border: `1px solid ${entry.color.slice(0, -1)} / 0.35)`,
                      color: entry.color,
                    }}
                  >
                    {entry.year}
                  </div>
                </div>

                {/* Card */}
                <div className="ml-12 sm:ml-0 sm:w-[calc(50%-3rem)] shrink-0">
                  <div
                    className="glassmorphic p-5 rounded-xl hover:scale-[1.01] transition-smooth"
                    style={{
                      borderColor: `${entry.color.slice(0, -1)} / 0.2)`,
                    }}
                  >
                    {/* Mobile year */}
                    <span
                      className="inline-flex sm:hidden items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold mb-3"
                      style={{
                        background: `${entry.color.slice(0, -1)} / 0.12)`,
                        border: `1px solid ${entry.color.slice(0, -1)} / 0.3)`,
                        color: entry.color,
                      }}
                    >
                      {entry.year}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mb-3">
                      {entry.who} &nbsp;·&nbsp; {entry.country}
                    </p>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {entry.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
