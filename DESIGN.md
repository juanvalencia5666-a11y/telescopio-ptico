# Telescopio Óptico — Experiencia 3D Cósmica

## Propósito
Showcase interactivo en 3D del telescopio óptico dentro de una atmósfera cósmica realista inmersiva, con narración en voz española, modelo 3D dinámico y partículas celestes interactivas.

## Tono
Maximalismo inmersivo grounded en realismo. Grandeza cósmica sin artificio. Científico y poético.

## Paleta de Color (OKLCH)

| Token | Valor OKLCH | Propósito |
|-------|---|---|
| background | 0.08 0 0 | Vacío infinito, negro profundo |
| primary (Cyan Nebula) | 0.7 0.25 260 | Acentos luminosos principales |
| secondary (Magenta) | 0.65 0.28 320 | Acentos cálidos en agujeros negros |
| nebula-orange | 0.55 0.22 40 | Secciones de nebulosa cálida |
| card (Deep Space) | 0.12 0.03 250 | Paneles flotantes con tono azul |
| glow-core | 0.75 0.32 260 | Núcleos de vórtices brillantes |

## Tipografía
- **Display**: Fraunces (serif elegante, sofisticación cósmica para títulos)
- **Body**: GeneralSans (claridad, descripciones)
- **Mono**: GeistMono (elementos técnicos, datos)

## Estructura de Zonas
1. **Hero Canvas**: Viewport completo con modelo 3D telescopio y capas cósmicas animadas
2. **Overlay UI**: Paneles flotantes con efecto glassmorphic para descripciones de partes
3. **Control Panel**: Panel inferior con narración y controles de audio
4. **Header Mínimo**: Título en estilo cósmico

## Lenguaje de Forma
- Bordes redondeados suaves en tarjetas (16px)
- Círculos y elipses crujientes para cuerpos celestes
- Glassmorphism con backdrop blur en overlays
- Indicadores angulares para partes del telescopio
- Partículas de polvo cósmico animadas respondiendo a la posición del ratón

## Diferenciación
1. **Modelo 3D hero**: Telescopio es el centro focal interactivo (no solo fondo)
2. **Tooltips interactivos**: Hover sobre partes muestra descripciones en español
3. **Capas de fondo con parallax**: Nebulosa, partículas, agujeros negros (profundidad visual)
4. **Narración de voz integrada**: Audio automático y controlable
5. **Partículas cósmicas dinámicas**: Responden a posición del mouse y colisiones estelares

## Componentes Clave
- Canvas 3D (Three.js/R3F) como componente raíz
- Glassmorphic info cards con bordeados mínimos
- Audio player con ícono Lucide
- Tooltip dinámico vinculado al hover de partes 3D
- Fondo paraláctico de nebulosa
- Agujeros negros con vórtices animados

## Animaciones & Motion
- Transición suave de CSS: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Rotación lenta del telescopio (idle)
- Colisiones de estrellas disparadas aceleran rotación (impacto físico)
- Pulso sutil en acentos de neón (cyan/magenta)
- Parallax en capas de fondo
- Entrada de fade + scale en paneles info

## Restricciones
- Mantener contraste mínimo 4.5:1 para texto en vacío cósmico (blanco sobre negro profundo)
- Animaciones limitadas a 60fps (optimización para 3D)
- Descripciones de partes máx 2 líneas en tooltips
- Solo acentos en cyan/magenta (no arcoíris)
- Glassmorphism sin exceso (bordes sutiles, blur moderado)

## Detalle de Firma
Glow animado radial alrededor de agujeros negros — cyan pulsa lentamente mientras magenta gira, creando efecto de vórtice hipnotizante. Los acentos de glow coinciden con colisiones de estrellas.
