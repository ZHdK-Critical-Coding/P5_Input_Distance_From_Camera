# P5.js: Camera Distance

[English](readme.md)

Schätzt mit der Webcam, wie weit eine Person vom Bildschirm entfernt ist.
ml5.js `faceMesh` erkennt das Gesicht; je näher man ist, desto breiter
erscheint die Gesichtsbox. Die Distanz wird als `K / faceWidthInPixels`
berechnet und in cm angezeigt – nützlich für Installationen, die auf sich
nähernde Personen reagieren.

## Installation

Voraussetzungen: eine Webcam und ein aktueller Browser (Chrome oder Edge
empfohlen).

Bibliotheken (über ein CDN in `index.html` geladen): p5.js 1.11.0,
ml5.js 1.x.

## Ausführen

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Im Browser den Zugriff auf die Kamera erlauben.
3. Mit **f** den Vollbildmodus ein- und ausschalten. Das Video passt sich
   der Fenstergrösse an.
4. Mit **c** die gemessene Gesichtsbreite einblenden (für die
   Kalibrierung).

### Kalibrierung

1. In einer bekannten Distanz zur Kamera stehen (z. B. 60 cm).
2. **c** drücken und die `face width: … px` im Balken oben ablesen.
3. Beide Werte oben in `sketch.js` als `KNOWN_DISTANCE` und `KNOWN_WIDTH`
   eintragen.

## Coding-Hilfe

- **`sketch.js` → Kalibrierungskonstanten**: `KNOWN_DISTANCE` (cm) und
  `KNOWN_WIDTH` (px) ergeben `K`. Für die eigene Kamera anpassen.
- **`preload()`**: lädt das ml5-Modell `faceMesh`, beschränkt auf ein
  Gesicht (`maxFaces: 1`).
- **`setup()`**: erstellt eine fensterfüllende Zeichenfläche, startet die
  Webcam mit `createCapture(VIDEO)` in einer festen Grösse von 448 × 256
  Pixeln (damit die Kalibrierung nicht von der Fenstergrösse abhängt) und
  ruft `faceMesh.detectStart()`
  auf, das die Resultate laufend in `faces` schreibt.
- **`draw()`**: zeichnet das Video passend ins Fenster (Seitenverhältnis
  bleibt erhalten), liest `faces[0].box.width`, berechnet die Distanz und
  zeigt sie in einem Balken oben an. Ist `calibrating` eingeschaltet, wird
  zusätzlich die Gesichtsbreite angezeigt.
- **`windowResized()`**: passt die Zeichenfläche an die Fenstergrösse an
  (auch im Vollbildmodus).
- **`keyPressed()`**: schaltet mit **f** den Vollbildmodus und mit **c**
  die Kalibrierungsanzeige um.
