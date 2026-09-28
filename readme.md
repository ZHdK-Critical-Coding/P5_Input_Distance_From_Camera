# P5.js: Camera Distance

[Deutsch](README_DE.md)

Estimates how far a viewer is from the screen using the webcam. ml5.js
`faceMesh` detects the face; the closer you are, the wider the face box
appears. The distance is calculated as `K / faceWidthInPixels` and shown in
cm – useful for installations that react to people approaching.

## Installation

Requirements: a webcam and a current browser (Chrome or Edge recommended).

Libraries (loaded from a CDN in `index.html`): p5.js 1.11.0, ml5.js 1.x.

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Allow camera access in the browser.
3. Press **f** to toggle fullscreen. The video scales with the window.
4. Press **c** to show the measured face width (for calibration).

### Calibration

1. Stand at a known distance from the camera (e.g. 60 cm).
2. Press **c** and read the `face width: … px` shown in the bar at the
   top.
3. Enter both values as `KNOWN_DISTANCE` and `KNOWN_WIDTH` at the top of
   `sketch.js`.

## Coding Help

- **`sketch.js` → calibration constants**: `KNOWN_DISTANCE` (cm) and
  `KNOWN_WIDTH` (px) define `K`. Adjust them for your camera.
- **`preload()`**: loads the ml5 `faceMesh` model, limited to one face
  (`maxFaces: 1`).
- **`setup()`**: creates a full-window canvas, starts the webcam with
  `createCapture(VIDEO)` at a fixed size of 448 × 256 (so the calibration
  does not depend on the window size) and runs `faceMesh.detectStart()`, which keeps
  writing the results into `faces`.
- **`draw()`**: draws the video scaled to fit the window (aspect ratio
  kept), takes `faces[0].box.width`, calculates the distance and prints it
  in a bar at the top. If `calibrating` is on, the face width is shown too.
- **`windowResized()`**: resizes the canvas with the window (also in
  fullscreen).
- **`keyPressed()`**: toggles fullscreen with **f** and the calibration
  display with **c**.
