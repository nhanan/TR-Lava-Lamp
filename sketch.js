// Marching Squares Cave Generation
// Coding in the Cabana
// The Coding Train / David Snyder
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// https://editor.p5js.org/codingtrain/sketches/z4U3Luf7o

let tr;

function preload() {
  tr = loadImage('ThirdRepublic_Logo White.png');
}

let map;
let cols,
  rows,
  scl,
  fillpercent,
  index = 0;
let grid;

let noiseScale = 0.04;
let openSimplex;
let vertices = [];
let tris = [];

let c;
function setup() {
  
  // randomSeed(1);
  c = createCanvas(windowWidth, windowHeight);
  openSimplex = openSimplexNoise(random(42));
  generatemap();
  generatemesh(map, scl);
  pickColor();
}

function generatemap() {
  scl = 10;
  cols = floor(height / scl);
  rows = floor(width / scl);
  map = create2DArray(rows, cols);
  fillpercent = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        map[i][j] = 1;
      } else
        map[i][j] =
          openSimplex.noise3D(
            i * noiseScale,
            j * noiseScale,
            radians(frameCount)
          ) < fillpercent
            ? 1
            : 0;
    }
  }
}

function smoothing(times) {
  for (let k = 0; k < times; k++) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = countNeighbors(i, j);
        if (count > 4) {
          map[i][j] = 1;
        } else if (count < 4) {
          map[i][j] = 0;
        }
      }
    }
  }
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(100);


  generatemap();
  generatemesh(map, scl);
  stroke(0);
  fill(0);
  for (let i = 0; i < tris.length - 2; i += 3) {
    const a = vertices[int(tris[i])];
    const b = vertices[int(tris[i + 1])];
    const c = vertices[int(tris[i + 2])];
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
  }
  if (counter < 300) {
  }
  counter++;
  tint(r, g, b);
  imageMode(CENTER);
  image(tr, (width / 2), (height / 2));
}
let counter = 0;

function colourChange(){
  
}

function mousePressed() {
  console.log('hello');
  pickColor();
}

function countNeighbors(x, y) {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < cols) {
        if (i != x || j != x) {
          count += map[i][j];
        }
      } else count++;
    }
  }
  return count;
}

function create2DArray(rows, cols) {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
}
