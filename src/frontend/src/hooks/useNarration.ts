import { useCallback, useEffect, useRef, useState } from "react";
import type {
  NarrationSection,
  NarrationSpeed,
  NarrationState,
} from "../types";

export const NARRATION_SECTIONS: NarrationSection[] = [
  {
    id: "intro",
    title: "Introducción",
    text: "Bienvenido al fascinante mundo del Telescopio Óptico. Durante siglos, este instrumento ha sido la ventana de la humanidad hacia el cosmos, permitiéndonos contemplar estrellas lejanas, planetas majestuosos y galaxias que desafían la imaginación.",
  },
  {
    id: "historia",
    title: "Historia",
    text: "El telescopio óptico nació a principios del siglo XVII. En 1608, Hans Lippershey, un fabricante de lentes holandés, patentó el primer diseño. Sin embargo, fue Galileo Galilei quien en 1609 lo perfeccionó y lo apuntó al cielo, revolucionando para siempre nuestra comprensión del universo. Observó las lunas de Júpiter, las fases de Venus y la Vía Láctea compuesta de estrellas individuales.",
  },
  {
    id: "creacion",
    title: "Creación",
    text: "La creación del telescopio óptico fue un proceso gradual impulsado por artesanos de lentes en los Países Bajos. La combinación de una lente convexa objetiva y una lente ocular permitió por primera vez ampliar imágenes distantes. Galileo mejoró el diseño original aumentando la potencia de aumento y la claridad óptica, construyendo personalmente sus instrumentos con vidrio esmerilado y monturas de latón.",
  },
  {
    id: "inventor",
    title: "El Inventor",
    text: "Galileo Galilei, nacido en Pisa en 1564, es considerado el padre de la astronomía observacional. Su telescopio refractor inicial apenas magnificaba tres veces, pero con mejoras sucesivas llegó a magnificar veinte veces. Sus descubrimientos destruyeron el modelo geocéntrico del universo y apoyaron la teoría heliocéntrica de Copérnico, costándole el arresto domiciliario por la Inquisición.",
  },
  {
    id: "partes",
    title: "Partes del Telescopio",
    text: "El telescopio óptico está compuesto por varias partes esenciales. El objetivo o lente primario capta y concentra la luz. El ocular amplifica la imagen formada. El tubo óptico aloja y alinea todos los componentes. La montura permite apuntar y seguir objetos celestes. El buscador facilita la localización inicial. El enfocador ajusta la nitidez de la imagen con precisión micrométrica.",
  },
  {
    id: "como-funciona",
    title: "Cómo Funciona",
    text: "Un telescopio refractor utiliza lentes para doblar y concentrar la luz. La lente objetiva, de gran diámetro, capta la mayor cantidad de luz posible. Esta luz converge en el punto focal donde se forma una imagen. El ocular actúa como una lupa que amplifica esa imagen. Cuanto mayor sea el diámetro del objetivo, mayor será la resolución y la capacidad de captar objetos tenues.",
  },
  {
    id: "nebulosas",
    title: "Nebulosas y Maravillas",
    text: "Con el telescopio óptico podemos contemplar nebulosas, nubes de gas y polvo interestelar donde nacen nuevas estrellas. La Nebulosa de Orión, visible a simple vista como una mancha difusa, revela mediante el telescopio una violenta nursería estelar llena de colores vibrantes. Las nebulosas planetarias son los últimos suspiros de estrellas moribundas, expulsando capas externas en patrones esféricos de asombrosa belleza.",
  },
  {
    id: "agujeros-negros",
    title: "Agujeros Negros",
    text: "Aunque los agujeros negros no emiten luz visible, los telescopios ópticos nos permiten detectar sus efectos gravitacionales. Observamos estrellas que orbitan objetos invisibles de masa colosal. El lente gravitacional distorsiona la luz de galaxias lejanas creando arcos y anillos luminosos. En 2019, el Telescopio de Horizonte de Eventos capturó la primera imagen de la sombra de un agujero negro en la galaxia M87.",
  },
  {
    id: "usos",
    title: "Usos Modernos",
    text: "Hoy los telescopios ópticos sirven para catalogar asteroides que podrían impactar la Tierra, estudiar la variabilidad de estrellas, buscar planetas extrasolares mediante el método del tránsito, monitorear cometas y rastrear objetos del Sistema Solar. Los grandes observatorios como el Very Large Telescope en Chile poseen espejos de ocho metros y óptica adaptativa para compensar la turbulencia atmosférica.",
  },
  {
    id: "datos",
    title: "Datos Fascinantes",
    text: "El Telescopio Espacial Hubble, en órbita desde 1990, ha capturado imágenes a más de 13 mil millones de años luz de distancia. El Gran Telescopio de Canarias tiene un espejo segmentado de diez metros y medio de diámetro. El futuro Telescopio Extremadamente Grande, en construcción en Chile, tendrá un espejo primario de 39 metros, siendo capaz de detectar la luz de planetas similares a la Tierra.",
  },
];

export function useNarration() {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    currentSectionId: null,
    speed: 1,
    currentSectionTitle: null,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const sectionQueueRef = useRef<NarrationSection[]>([]);
  const currentIndexRef = useRef(0);
  const isCancelledRef = useRef(false);

  const speakSection = useCallback(
    (section: NarrationSection, speed: NarrationSpeed) => {
      if (isCancelledRef.current) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(section.text);
      utterance.lang = "es-ES";
      utterance.rate = speed;
      utterance.pitch = 1.05;
      utteranceRef.current = utterance;

      setState((prev) => ({
        ...prev,
        isPlaying: true,
        currentSectionId: section.id,
        currentSectionTitle: section.title,
      }));

      // Scroll section into view
      const el = document.getElementById(section.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      utterance.onend = () => {
        if (isCancelledRef.current) return;
        const next = currentIndexRef.current + 1;
        if (next < sectionQueueRef.current.length) {
          currentIndexRef.current = next;
          setTimeout(() => {
            speakSection(sectionQueueRef.current[next], speed);
          }, 600);
        } else {
          setState((prev) => ({
            ...prev,
            isPlaying: false,
            currentSectionId: null,
            currentSectionTitle: null,
          }));
        }
      };

      utterance.onerror = () => {
        if (!isCancelledRef.current) {
          setState((prev) => ({ ...prev, isPlaying: false }));
        }
      };

      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  const play = useCallback(() => {
    isCancelledRef.current = false;
    sectionQueueRef.current = NARRATION_SECTIONS;
    currentIndexRef.current = 0;
    speakSection(NARRATION_SECTIONS[0], state.speed);
  }, [state.speed, speakSection]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const stop = useCallback(() => {
    isCancelledRef.current = true;
    window.speechSynthesis.cancel();
    setState({
      isPlaying: false,
      currentSectionId: null,
      speed: state.speed,
      currentSectionTitle: null,
    });
  }, [state.speed]);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else if (window.speechSynthesis.paused) {
      resume();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause, resume]);

  const setSpeed = useCallback(
    (speed: NarrationSpeed) => {
      setState((prev) => ({ ...prev, speed }));
      if (state.isPlaying || window.speechSynthesis.paused) {
        const idx = currentIndexRef.current;
        stop();
        setTimeout(() => {
          isCancelledRef.current = false;
          sectionQueueRef.current = NARRATION_SECTIONS;
          currentIndexRef.current = idx;
          speakSection(NARRATION_SECTIONS[idx], speed);
        }, 200);
      }
    },
    [state.isPlaying, stop, speakSection],
  );

  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  return { state, togglePlay, stop, setSpeed };
}
