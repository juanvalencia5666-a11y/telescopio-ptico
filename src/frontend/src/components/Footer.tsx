import { Stars, Telescope } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "telescopio-optico",
  )}`;

  return (
    <footer
      data-ocid="footer"
      className="relative border-t border-border/30 overflow-hidden"
      style={{ background: "oklch(0.06 0.02 250)" }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.7 0.25 260 / 0.6), transparent)",
        }}
      />
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.7 0.25 260 / 0.04)" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Telescope className="w-5 h-5 text-nebula-cyan" strokeWidth={1.5} />
            <div>
              <p className="font-display font-semibold text-foreground/90 text-sm">
                Telescopio Óptico
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Explorando el universo desde 1609
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-body">
              © {year} · Contenido educativo astronómico
            </p>
            <p className="text-xs text-muted-foreground/60 font-body mt-1">
              Construido con amor usando{" "}
              <a
                href={`https://caffeine.ai?${utm}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nebula-cyan hover:text-primary transition-smooth underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          {/* Cosmic note */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-body">
            <Stars className="w-3.5 h-3.5 text-nebula-cyan/60" />
            <span>
              El universo tiene 93 mil millones de años luz de diámetro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
