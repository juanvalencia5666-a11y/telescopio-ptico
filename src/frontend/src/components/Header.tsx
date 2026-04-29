import { Pause, Play, Square, Telescope, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { NarrationSpeed } from "../types";

interface NarrationState {
  isPlaying: boolean;
  currentSectionId: string | null;
  speed: NarrationSpeed;
  currentSectionTitle: string | null;
}

interface HeaderProps {
  narration: {
    state: NarrationState;
    togglePlay: () => void;
    stop: () => void;
    setSpeed: (speed: NarrationSpeed) => void;
  };
}

const SPEEDS: NarrationSpeed[] = [0.75, 1, 1.5, 2];

export default function Header({ narration }: HeaderProps) {
  const { state, togglePlay, stop, setSpeed } = narration;
  const { isPlaying, speed, currentSectionTitle } = state;
  const isActive =
    isPlaying ||
    (typeof window !== "undefined" && window.speechSynthesis?.paused);

  return (
    <header
      data-ocid="header"
      className="fixed top-0 left-0 right-0 z-50 glassmorphic border-b border-border/50"
      style={{ background: "oklch(0.08 0.02 250 / 0.85)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Telescope className="w-7 h-7 text-nebula-cyan" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight hidden sm:block">
            Telescopio <span className="text-nebula-cyan">Óptico</span>
          </span>
        </div>

        {/* Section indicator */}
        <div className="flex-1 flex justify-center">
          <AnimatePresence mode="wait">
            {currentSectionTitle ? (
              <motion.div
                key={currentSectionTitle}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                style={{
                  background: "oklch(0.7 0.25 260 / 0.15)",
                  border: "1px solid oklch(0.7 0.25 260 / 0.3)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-foreground/80 font-body truncate max-w-[180px]">
                  {currentSectionTitle}
                </span>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground font-body"
              >
                Explorador del Cosmos
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed buttons */}
          <div className="hidden sm:flex items-center gap-1 mr-1">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                data-ocid={`narration.speed.${String(s).replace(".", "_")}`}
                onClick={() => setSpeed(s)}
                className="px-2 py-1 rounded text-xs font-mono transition-smooth"
                style={
                  speed === s
                    ? {
                        background: "oklch(0.7 0.25 260 / 0.25)",
                        color: "oklch(0.7 0.25 260)",
                        border: "1px solid oklch(0.7 0.25 260 / 0.5)",
                      }
                    : {
                        background: "transparent",
                        color: "oklch(0.65 0 0)",
                        border: "1px solid oklch(0.25 0 0)",
                      }
                }
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Stop button */}
          {isActive && (
            <button
              type="button"
              data-ocid="narration.stop_button"
              onClick={stop}
              className="p-2 rounded-lg transition-smooth hover:bg-card"
              aria-label="Detener narración"
            >
              <Square className="w-4 h-4 text-muted-foreground" />
            </button>
          )}

          {/* Play/Pause button */}
          <motion.button
            type="button"
            data-ocid="narration.toggle_button"
            onClick={togglePlay}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-sm transition-smooth relative overflow-hidden"
            style={{
              background: isPlaying
                ? "oklch(0.65 0.28 320 / 0.2)"
                : "oklch(0.7 0.25 260 / 0.2)",
              border: isPlaying
                ? "1px solid oklch(0.65 0.28 320 / 0.5)"
                : "1px solid oklch(0.7 0.25 260 / 0.5)",
              color: isPlaying ? "oklch(0.65 0.28 320)" : "oklch(0.7 0.25 260)",
            }}
            aria-label={isPlaying ? "Pausar narración" : "Iniciar narración"}
          >
            {isPlaying && (
              <span
                className="absolute inset-0 rounded-xl animate-pulse"
                style={{ background: "oklch(0.65 0.28 320 / 0.05)" }}
              />
            )}
            {isPlaying ? (
              <Pause className="w-4 h-4 relative z-10" />
            ) : (
              <Play className="w-4 h-4 relative z-10" />
            )}
            <span className="relative z-10 hidden sm:inline">
              {isPlaying ? "Pausar" : "Narrar"}
            </span>
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 relative z-10 sm:hidden" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 relative z-10 sm:hidden" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
