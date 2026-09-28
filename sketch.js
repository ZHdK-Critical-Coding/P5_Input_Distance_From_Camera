// Distance From Camera
// Uses ml5.js faceMesh to estimate how far a viewer is from the display.
// The closer you are, the wider your face appears in the camera image.

let faceMesh;
let video;
let faces = [];
let calibrating = false; // press "c" to show the face width for calibration

// --- Simple calibration -----------------------------------------------------
// Press "c", stand at a known distance and read the face width (px) shown on
// screen, then put both numbers here. Distance is just: K / faceWidthInPixels.
const KNOWN_DISTANCE = 60; // cm  (how far you stood)
const KNOWN_WIDTH = 90; // px  (face box width at that distance)
const K = KNOWN_DISTANCE * KNOWN_WIDTH;
// ----------------------------------------------------------------------------

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1 });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // The video keeps a fixed size, so the calibration stays the same
  // no matter how big the window is.
  video = createCapture(VIDEO);
  video.size(448, 256);
  video.hide();
  faceMesh.detectStart(video, (results) => (faces = results));
}

function draw() {
  background(0);

  // Scale the video to fit the window, keeping its aspect ratio
  let s = min(width / video.width, height / video.height);
  let vw = video.width * s;
  let vh = video.height * s;
  image(video, (width - vw) / 2, (height - vh) / 2, vw, vh);

  if (faces.length > 0) {
    let w = faces[0].box.width;
    let distance = K / w; // estimated distance in cm

    let label = round(distance) + " cm";
    if (calibrating) {
      label += "   (face width: " + round(w) + " px)";
    }

    fill(0, 180);
    noStroke();
    rect(0, 0, width, 28);
    fill(255);
    textSize(16);
    text(label, 10, 19);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  }
  if (key === "c" || key === "C") {
    calibrating = !calibrating;
  }
}
