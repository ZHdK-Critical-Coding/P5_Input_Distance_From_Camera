# P5.js: Camera Distance

[Deutsch](README_DE.md)

Estimates how far a viewer is from the screen using the webcam. ml5.js
`faceMesh` detects the face; the closer you are, the wider the face box
appears. The distance is calculated as `K / faceWidthInPixels` and shown in
cm – useful for installations that react to people approaching.

## Installation

Requirements: a webcam and a current browser (Chrome or Edge recommended).

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Allow camera access in the browser.
3. Press **f** to toggle fullscreen.

### Calibration

1. Stand at a known distance from the camera (e.g. 60 cm).
2. Read the printed `face width: … px` from the browser console.
3. Enter both values as `KNOWN_DISTANCE` and `KNOWN_WIDTH` at the top of
   `sketch.js`.

Libraries (loaded from a CDN in `index.html`): p5.js 1.11.0, ml5.js 1.x.

## Coding Help

- **`sketch.js` → calibration constants**: `KNOWN_DISTANCE` (cm) and
  `KNOWN_WIDTH` (px) define `K`. Adjust them for your camera.
- **`preload()`**: loads the ml5 `faceMesh` model, limited to one face
  (`maxFaces: 1`).
- **`setup()`**: creates a 448 × 256 canvas, starts the webcam with
  `createCapture(VIDEO)` and runs `faceMesh.detectStart()`, which keeps
  writing the results into `faces`.
- **`draw()`**: draws the video, takes `faces[0].box.width`, calculates the
  distance and prints it in a bar at the top. The face width is logged to
  the console every frame (for calibration) – remove the `console.log` once
  you are done.
- **`keyPressed()`**: toggles fullscreen with **f**. The canvas keeps its
  size of 448 × 256.
