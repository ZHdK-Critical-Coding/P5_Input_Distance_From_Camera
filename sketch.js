// Distance From Camera
// Uses ml5.js faceMesh to estimate how far a viewer is from the display.
// The closer you are, the wider your face appears in the camera image.

let faceMesh;
let video;
let faces = [];

// --- Simple calibration -----------------------------------------------------
// Stand at a known distance, read the printed face width (px) from the console,
// then put both numbers here. Distance is just: K / faceWidthInPixels.
const KNOWN_DISTANCE = 60; // cm  (how far you stood)
const KNOWN_WIDTH = 90; // px  (face box width at that distance)
const K = KNOWN_DISTANCE * KNOWN_WIDTH;
// ----------------------------------------------------------------------------

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1 });
}

function setup() {
  createCanvas(448, 256);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceMesh.detectStart(video, (results) => (faces = results));
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let w = faces[0].box.width;
    let distance = K / w; // estimated distance in cm

    console.log("face width:", round(w), "px");

    fill(0, 180);
    noStroke();
    rect(0, 0, width, 28);
    fill(255);
    textSize(16);
    text(round(distance) + " cm", 10, 19);
  }
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  }
}
