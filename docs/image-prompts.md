# Catálogo de prompts de imagen

Este documento es un **catálogo de referencia**, no un script que se ejecuta automáticamente.
Cada fila corresponde a un `id` de placeholder usado en el código (`components/media/ImagePlaceholder`
o `components/media/BeforeAfterSlider`) o a un campo `*PlaceholderId` en `data/*.json`. Ningún comando
de este documento fue ejecutado durante este build — el dueño del sitio debe revisar cada prompt antes
de correrlo.

Todos los comandos se ejecutan desde la raíz del repo con:

```bash
python3 tools/image-gen/kie_image.py "<prompt>" --ref <referencia(s)> --size <1:1|3:2|2:3> --name <nombre>
```

`--size` está limitado a `1:1`, `3:2` o `2:3` por el propio CLI — los slots `full-bleed` y `large` del
sitio (aspect ratios más panorámicos como 21:9) usan `3:2` como la aproximación landscape más cercana
disponible; el recorte final a la proporción exacta del componente se hace en post-producción o
ajustando el `object-position` de la imagen.

## ⚠️ Aviso sobre `references/gun-shape_small.jpg`

Esta referencia es una captura de pantalla del sitio de un fabricante (**HANTEN CNC**), con su logo
visible en varias partes de la foto (encabezado de página, superpuesto en el cuerpo del equipo, e
íconos de chat flotantes). Usarla tal cual como `--ref` en un prompt de generación probablemente hará
que el modelo reproduzca ese logo de marca ajena — lo cual **viola directamente la regla de marca
blanca** del proyecto (nunca se nombra ni se muestra el fabricante OEM). Antes de usar esta imagen como
referencia de forma/silueta del equipo, hay que recortarla para eliminar todo el texto/logo "HANTENCNC"
y el chrome de la página, o reemplazarla por una foto propia sin marca de terceros. Los prompts de este
documento que sugieren esta referencia lo hacen solo para la silueta general del equipo — el prompt de
texto ya pide explícitamente "sin logotipos de terceros visibles".

## Regla de marca blanca (aplica a toda foto de la máquina)

Restauración Láser revende el equipo con marca blanca: cada unidad sale de fábrica con el logo de
Restauración Láser en el chasis y en la pantalla de control. **Nunca** se nombra al fabricante OEM
(fábrica china) en ningún prompt, alt text o copy. Todo prompt de fotografía de la máquina debe incluir
una instrucción explícita como "con el logo de Restauración Láser visible en el chasis y en la pantalla
de control, sin ningún logotipo de terceros visible en cuadro".

---

## Home (`/`)

### `home-hero`
- **Página:** Home — hero, columna derecha (full-bleed)
- **Aspect ratio:** 3:2 (`full-bleed`)
- **Alt text:** "Operador usando la máquina de limpieza láser Restauración Láser sobre una superficie metálica"
- **Prompt:** Fotografía de acción de un operador industrial usando una pistola láser de limpieza pulsada para eliminar óxido de una superficie metálica, chispas y humo mínimo, ambiente de taller profesional, luz natural, con el logo de Restauración Láser visible en el chasis del equipo y en la pantalla de control, sin ningún logotipo de terceros visible en cuadro.
```bash
python3 tools/image-gen/kie_image.py \
  "Fotografía de acción de un operador industrial usando una pistola láser de limpieza pulsada para eliminar óxido de una superficie metálica, chispas y humo mínimo, ambiente de taller profesional, luz natural, con el logo de Restauración Láser visible en el chasis del equipo y en la pantalla de control, sin ningún logotipo de terceros visible en cuadro" \
  --ref tools/image-gen/references/flat-beam-shape.png tools/image-gen/references/logo-shape.png \
  --size 3:2 --name home-hero
```

---

## Tecnología (`/tecnologia`)

### `tecnologia-hero`
- **Página:** Tecnología — hero (full-bleed)
- **Aspect ratio:** 3:2 (`full-bleed`)
- **Alt text:** "Máquina de limpieza láser Restauración Láser en un taller industrial"
- **Prompt:** Fotografía de producto/ambiente de la máquina de limpieza láser pulsada de Restauración Láser en un taller industrial ordenado, iluminación dramática lateral, el logo de Restauración Láser bien visible en el chasis y en la pantalla de control del equipo, sin ningún logotipo de terceros visible en cuadro.
```bash
python3 tools/image-gen/kie_image.py \
  "Fotografía de producto/ambiente de la máquina de limpieza láser pulsada de Restauración Láser en un taller industrial ordenado, iluminación dramática lateral, el logo de Restauración Láser bien visible en el chasis y en la pantalla de control del equipo, sin ningún logotipo de terceros visible en cuadro" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 3:2 --name tecnologia-hero
```

---

## Servicios (`/servicios`) — 9 pares antes/después

Cada servicio usa `BeforeAfterSlider`, que genera dos imágenes por servicio: `{beforeAfterPlaceholderId}-before`
y `{beforeAfterPlaceholderId}-after`. Tamaño grande de comparación (no thumbnail) — aspect 3:2.

### `service-oxido-before-after` (Remoción de óxido)
- **Alt:** "Antes/Después — Remoción de óxido"
- **Prompt (before):** Primer plano de una superficie metálica industrial cubierta de óxido avanzado, textura rugosa y corroída, luz natural de taller.
- **Prompt (after):** El mismo ángulo y superficie metálica, ahora completamente libre de óxido, metal limpio y uniforme, sin rayones.
```bash
python3 tools/image-gen/kie_image.py \
  "Primer plano de una superficie metálica industrial cubierta de óxido avanzado, textura rugosa y corroída, luz natural de taller" \
  --size 3:2 --name service-oxido-before-after-before

python3 tools/image-gen/kie_image.py \
  "El mismo ángulo y superficie metálica, ahora completamente libre de óxido, metal limpio y uniforme, sin rayones" \
  --size 3:2 --name service-oxido-before-after-after
```

### `service-pintura-before-after` (Remoción de pintura y recubrimientos)
- **Alt:** "Antes/Después — Remoción de pintura y recubrimientos"
- **Prompt (before):** Panel industrial con pintura vieja descascarada y recubrimiento desgastado, superficie irregular.
- **Prompt (after):** El mismo panel con la pintura y el recubrimiento completamente removidos, sustrato metálico limpio y listo para repintar.
```bash
python3 tools/image-gen/kie_image.py \
  "Panel industrial con pintura vieja descascarada y recubrimiento desgastado, superficie irregular" \
  --size 3:2 --name service-pintura-before-after-before

python3 tools/image-gen/kie_image.py \
  "El mismo panel con la pintura y el recubrimiento completamente removidos, sustrato metálico limpio y listo para repintar" \
  --size 3:2 --name service-pintura-before-after-after
```

### `service-grafiti-before-after` (Remoción de grafiti)
- **Alt:** "Antes/Después — Remoción de grafiti"
- **Prompt (before):** Muro de fachada comercial con grafiti de pintura en aerosol, colores vivos sobre concreto.
- **Prompt (after):** El mismo muro de fachada sin rastro de grafiti, superficie original de concreto restaurada.
```bash
python3 tools/image-gen/kie_image.py \
  "Muro de fachada comercial con grafiti de pintura en aerosol, colores vivos sobre concreto" \
  --size 3:2 --name service-grafiti-before-after-before

python3 tools/image-gen/kie_image.py \
  "El mismo muro de fachada sin rastro de grafiti, superficie original de concreto restaurada" \
  --size 3:2 --name service-grafiti-before-after-after
```

### `service-moho-before-after` (Remoción de moho y biofilm)
- **Alt:** "Antes/Después — Remoción de moho y biofilm"
- **Prompt (before):** Fachada exterior con manchas negras y verdosas de moho y biofilm acumulado.
- **Prompt (after):** La misma fachada exterior limpia, sin manchas de moho, color original visible.
```bash
python3 tools/image-gen/kie_image.py \
  "Fachada exterior con manchas negras y verdosas de moho y biofilm acumulado" \
  --size 3:2 --name service-moho-before-after-before

python3 tools/image-gen/kie_image.py \
  "La misma fachada exterior limpia, sin manchas de moho, color original visible" \
  --size 3:2 --name service-moho-before-after-after
```

### `service-grasa-before-after` (Remoción de grasa y aceite)
- **Alt:** "Antes/Después — Remoción de grasa y aceite"
- **Prompt (before):** Pieza de maquinaria industrial cubierta de grasa y residuo de aceite acumulado.
- **Prompt (after):** La misma pieza de maquinaria limpia, metal visible sin residuo de grasa ni aceite.
```bash
python3 tools/image-gen/kie_image.py \
  "Pieza de maquinaria industrial cubierta de grasa y residuo de aceite acumulado" \
  --size 3:2 --name service-grasa-before-after-before

python3 tools/image-gen/kie_image.py \
  "La misma pieza de maquinaria limpia, metal visible sin residuo de grasa ni aceite" \
  --size 3:2 --name service-grasa-before-after-after
```

### `service-moldes-before-after` (Limpieza de moldes de inyección)
- **Alt:** "Antes/Después — Limpieza de moldes de inyección"
- **Prompt (before):** Molde de inyección industrial con acumulación de residuo de plástico quemado en la cavidad.
- **Prompt (after):** El mismo molde de inyección con la cavidad completamente limpia, superficie de precisión pulida.
```bash
python3 tools/image-gen/kie_image.py \
  "Molde de inyección industrial con acumulación de residuo de plástico quemado en la cavidad" \
  --size 3:2 --name service-moldes-before-after-before

python3 tools/image-gen/kie_image.py \
  "El mismo molde de inyección con la cavidad completamente limpia, superficie de precisión pulida" \
  --size 3:2 --name service-moldes-before-after-after
```

### `service-madera-before-after` (Restauración de madera y teca)
- **Alt:** "Antes/Después — Restauración de madera y teca"
- **Prompt (before):** Mueble exterior de teca con barniz envejecido, manchas grises y desgaste por intemperie.
- **Prompt (after):** El mismo mueble de teca con el color natural de la madera restaurado, sin manchas.
```bash
python3 tools/image-gen/kie_image.py \
  "Mueble exterior de teca con barniz envejecido, manchas grises y desgaste por intemperie" \
  --size 3:2 --name service-madera-before-after-before

python3 tools/image-gen/kie_image.py \
  "El mismo mueble de teca con el color natural de la madera restaurado, sin manchas" \
  --size 3:2 --name service-madera-before-after-after
```

### `service-hollin-before-after` (Remoción de hollín)
- **Alt:** "Antes/Después — Remoción de hollín"
- **Prompt (before):** Superficie de chimenea o pared afectada por hollín negro tras un incendio.
- **Prompt (after):** La misma superficie sin hollín, material original visible y limpio.
```bash
python3 tools/image-gen/kie_image.py \
  "Superficie de chimenea o pared afectada por hollín negro tras un incendio" \
  --size 3:2 --name service-hollin-before-after-before

python3 tools/image-gen/kie_image.py \
  "La misma superficie sin hollín, material original visible y limpio" \
  --size 3:2 --name service-hollin-before-after-after
```

### `service-patrimonial-before-after` (Restauración patrimonial)
- **Alt:** "Antes/Después — Restauración patrimonial"
- **Prompt (before):** Escultura o fachada histórica de piedra con suciedad acumulada y pátina oscura.
- **Prompt (after):** La misma escultura o fachada histórica restaurada, detalle de piedra original visible.
```bash
python3 tools/image-gen/kie_image.py \
  "Escultura o fachada histórica de piedra con suciedad acumulada y pátina oscura" \
  --size 3:2 --name service-patrimonial-before-after-before

python3 tools/image-gen/kie_image.py \
  "La misma escultura o fachada histórica restaurada, detalle de piedra original visible" \
  --size 3:2 --name service-patrimonial-before-after-after
```

---

## Franquicias — línea de tiempo de apertura (`/franquicias`, `OnboardingTimeline`)

Cada paso de `data/onboarding-steps.json` usa una foto vertical (`aspect-[3/4]`) en la galería
horizontal. El `id` de placeholder se genera como `onboarding-{step.id}`.

### `onboarding-aplicacion-y-aprobacion`
- **Alt:** "Aplicación y aprobación"
- **Prompt:** Retrato vertical de una persona revisando el formulario de solicitud de franquicia en una laptop, ambiente de oficina luminoso.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato vertical de una persona revisando el formulario de solicitud de franquicia en una laptop, ambiente de oficina luminoso" \
  --size 2:3 --name onboarding-aplicacion-y-aprobacion
```

### `onboarding-firma-y-pago-inicial`
- **Alt:** "Firma y pago inicial"
- **Prompt:** Retrato vertical de dos personas dándose la mano tras firmar un contrato, ambiente profesional.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato vertical de dos personas dándose la mano tras firmar un contrato, ambiente profesional" \
  --size 2:3 --name onboarding-firma-y-pago-inicial
```

### `onboarding-produccion-envio-y-capacitacion`
- **Alt:** "Producción, envío y capacitación"
- **Prompt:** Retrato vertical de un franquiciado en una sesión de capacitación práctica con el equipo de marca propia Restauración Láser, logo visible en el chasis, sin logotipos de terceros.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato vertical de un franquiciado en una sesión de capacitación práctica con el equipo de marca propia Restauración Láser, logo visible en el chasis, sin logotipos de terceros" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 2:3 --name onboarding-produccion-envio-y-capacitacion
```

### `onboarding-entrega-e-instalacion`
- **Alt:** "Entrega e instalación"
- **Prompt:** Retrato vertical del equipo de marca propia Restauración Láser recién desempacado, listo para instalar, logo visible en el chasis.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato vertical del equipo de marca propia Restauración Láser recién desempacado, listo para instalar, logo visible en el chasis" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 2:3 --name onboarding-entrega-e-instalacion
```

### `onboarding-lanzamiento-oficial`
- **Alt:** "Lanzamiento oficial"
- **Prompt:** Retrato vertical de un franquiciado sonriente frente a su taller el día de apertura, ambiente celebratorio.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato vertical de un franquiciado sonriente frente a su taller el día de apertura, ambiente celebratorio" \
  --size 2:3 --name onboarding-lanzamiento-oficial
```

---

## Franquicias — páginas de franquiciado (`/[pais]/[ciudad]`)

### `franchisee-santa-ana-hero`
- **Página:** `/crc/santa-ana` — hero (full-bleed)
- **Alt:** "Franquicia Restauración Láser en Santa Ana"
- **Prompt:** Fotografía ambiental de la sede de Restauración Láser en Santa Ana, Costa Rica — fachada o interior de taller, equipo de marca propia visible, ambiente profesional y limpio.
```bash
python3 tools/image-gen/kie_image.py \
  "Fotografía ambiental de la sede de Restauración Láser en Santa Ana, Costa Rica — fachada o interior de taller, equipo de marca propia visible, ambiente profesional y limpio" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 3:2 --name franchisee-santa-ana-hero
```

### `franchisee-santa-ana-gallery-1` / `-2` / `-3`
- **Página:** `/crc/santa-ana` — galería (card, 4:3 → usar 3:2)
- **Alt:** "Trabajo realizado por Restauración Láser Santa Ana"
- **Prompt:** Foto de un proyecto de limpieza láser terminado en la zona de Santa Ana/Escazú — variar entre fachada, portón metálico y superficie de piedra.
```bash
python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de limpieza láser terminado en un portón metálico residencial en Santa Ana, Costa Rica, resultado impecable" \
  --size 3:2 --name franchisee-santa-ana-gallery-1

python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de limpieza láser terminado en una fachada comercial en Escazú, Costa Rica" \
  --size 3:2 --name franchisee-santa-ana-gallery-2

python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de limpieza láser terminado en una superficie de piedra decorativa en una propiedad residencial" \
  --size 3:2 --name franchisee-santa-ana-gallery-3
```

### `franchisee-curridabat-hero`
- **Página:** `/crc/curridabat` — hero (full-bleed)
- **Alt:** "Franquicia Restauración Láser en Curridabat"
- **Prompt:** Fotografía ambiental de la franquicia Restauración Láser en Curridabat, Costa Rica — interior de taller u operador trabajando, equipo de marca propia visible.
```bash
python3 tools/image-gen/kie_image.py \
  "Fotografía ambiental de la franquicia Restauración Láser en Curridabat, Costa Rica — interior de taller u operador trabajando, equipo de marca propia visible" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 3:2 --name franchisee-curridabat-hero
```

### `franchisee-curridabat-gallery-1` / `-2` / `-3`
- **Página:** `/crc/curridabat` — galería
- **Alt:** "Trabajo realizado por Restauración Láser Curridabat"
- **Prompt:** Foto de un proyecto de limpieza láser terminado en la zona de Curridabat/San Pedro — variar entre metal, grafiti y madera.
```bash
python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de remoción de óxido terminado en una estructura metálica industrial en Curridabat, Costa Rica" \
  --size 3:2 --name franchisee-curridabat-gallery-1

python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de remoción de grafiti terminado en un muro comercial en San Pedro, Costa Rica" \
  --size 3:2 --name franchisee-curridabat-gallery-2

python3 tools/image-gen/kie_image.py \
  "Foto de un proyecto de restauración de madera terminado en una terraza residencial" \
  --size 3:2 --name franchisee-curridabat-gallery-3
```

---

## Sobre Nosotros (`/sobre-nosotros`)

### `sobre-nosotros-hero`
- **Aspect ratio:** 3:2 (`full-bleed`)
- **Alt:** "Equipo de Restauración Láser trabajando en taller"
- **Prompt:** Fotografía del equipo de Restauración Láser trabajando en un taller industrial, ambiente colaborativo y profesional, luz natural.
```bash
python3 tools/image-gen/kie_image.py \
  "Fotografía del equipo de Restauración Láser trabajando en un taller industrial, ambiente colaborativo y profesional, luz natural" \
  --size 3:2 --name sobre-nosotros-hero
```

### `sobre-nosotros-taller`
- **Aspect ratio:** 3:2 (`large`)
- **Alt:** "Detalle de la máquina de limpieza láser Restauración Láser"
- **Prompt:** Primer plano del cabezal de la máquina de limpieza láser de marca propia Restauración Láser, detalle técnico, logo visible en el chasis, sin logotipos de terceros.
```bash
python3 tools/image-gen/kie_image.py \
  "Primer plano del cabezal de la máquina de limpieza láser de marca propia Restauración Láser, detalle técnico, logo visible en el chasis, sin logotipos de terceros" \
  --ref tools/image-gen/references/logo-shape.png \
  --size 3:2 --name sobre-nosotros-taller
```

---

## Testimonios — avatares (`data/testimonials.json`)

Actualmente los avatares se renderizan como un círculo de color placeholder (no una foto real) en
`TestimonialScrollCard` y en las páginas de franquiciado. Cuando haya fotos reales de clientes y
franquiciados (con su consentimiento), estos son los prompts sugeridos para retratos genéricos de
relleno — **no generar rostros que se hagan pasar por clientes reales sin su autorización explícita**.

### `testimonial-1-avatar` a `testimonial-5-avatar`
- **Aspect ratio:** 1:1
- **Alt:** "Retrato de [nombre del testimonio]"
- **Prompt genérico:** Retrato profesional de estudio, plano medio, fondo neutro, expresión amigable — variar género/edad por testimonio.
```bash
python3 tools/image-gen/kie_image.py \
  "Retrato profesional de estudio de una persona costarricense, plano medio, fondo neutro, expresión amigable" \
  --size 1:1 --name testimonial-1-avatar
# Repetir con --name testimonial-2-avatar … testimonial-5-avatar, variando género/edad en el prompt.
```

---

## Assets ya resueltos (no generados por IA)

- `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png`: generados por recorte/composición
  directa del logo (`public/logo/logo-shape.png` y `logo-full.png`) sobre el fondo de marca `#D9D9D9`
  — no requieren este flujo de generación por IA.
