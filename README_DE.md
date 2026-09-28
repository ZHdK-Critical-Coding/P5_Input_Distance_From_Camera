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

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Im Browser den Zugriff auf die Kamera erlauben.
3. Mit **f** den Vollbildmodus ein- und ausschalten.

### Kalibrierung

1. In einer bekannten Distanz zur Kamera stehen (z. B. 60 cm).
2. Die ausgegebene `face width: … px` in der Browser-Konsole ablesen.
3. Beide Werte oben in `sketch.js` als `KNOWN_DISTANCE` und `KNOWN_WIDTH`
   eintragen.

Bibliotheken (über ein CDN in `index.html` geladen): p5.js 1.11.0,
ml5.js 1.x.

## Coding-Hilfe

- **`sketch.js` → Kalibrierungskonstanten**: `KNOWN_DISTANCE` (cm) und
  `KNOWN_WIDTH` (px) ergeben `K`. Für die eigene Kamera anpassen.
- **`preload()`**: lädt das ml5-Modell `faceMesh`, beschränkt auf ein
  Gesicht (`maxFaces: 1`).
- **`setup()`**: erstellt eine Zeichenfläche von 448 × 256 Pixeln, startet
  die Webcam mit `createCapture(VIDEO)` und ruft `faceMesh.detectStart()`
  auf, das die Resultate laufend in `faces` schreibt.
- **`draw()`**: zeichnet das Video, liest `faces[0].box.width`, berechnet
  die Distanz und zeigt sie in einem Balken oben an. Die Gesichtsbreite
  wird in jedem Frame in die Konsole geschrieben (für die Kalibrierung) –
  das `console.log` danach entfernen.
- **`keyPressed()`**: schaltet mit **f** den Vollbildmodus um. Die
  Zeichenfläche behält ihre Grösse von 448 × 256 Pixeln.
