import Footer from "./components/Footer";
import Header from "./components/Header";
import { useNarration } from "./hooks/useNarration";
import ComoFunciona from "./sections/ComoFunciona";
import Creacion from "./sections/Creacion";
import DatosCuriosos from "./sections/DatosCuriosos";
import HeroIntro from "./sections/HeroIntro";
import Historia from "./sections/Historia";
import Inventor from "./sections/Inventor";
import PartesTelescopo from "./sections/PartesTelescopo";
import Usos from "./sections/Usos";

export default function App() {
  const narration = useNarration();
  const { state } = narration;

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header narration={narration} />

      <main>
        {/* 1. Hero with full-screen 3D telescope */}
        <HeroIntro narration={narration} />

        {/* 2. Historia */}
        <Historia narrationState={state} />

        {/* 3. Creación */}
        <Creacion narrationState={state} />

        {/* 4. Inventor */}
        <Inventor narrationState={state} />

        {/* 5. Partes del Telescopio */}
        <PartesTelescopo narrationState={state} />

        {/* 6. Cómo Funciona */}
        <ComoFunciona narrationState={state} />

        {/* 7. Usos */}
        <Usos narrationState={state} />

        {/* 8. Datos Curiosos */}
        <DatosCuriosos narrationState={state} />
      </main>

      <Footer />
    </div>
  );
}
