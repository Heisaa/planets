const GRAV = 6.67428e-11;
const AU = (149.6e6 * 1000);
const SCALE = 250 / AU;
const TIME = 24 * 3600;
// const DIST = 40;

const planets = [];

class Planet {
  constructor(x, y, xSpeed, ySpeed, radius, mass) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.mass = mass;
  }

  getForces() {
    let xForce = 0;
    let yForce = 0;

    for (let i = 0, len = planets.length; i < len; i++) {
      const other = planets[i];

      if (this.x !== other.x && this.y !== other.y) {
        const xDistance = other.x - this.x;
        const yDistance = other.y - this.y;

        const angle = atan2(yDistance, xDistance);

        const distance = (sqrt(xDistance * xDistance + yDistance * yDistance));

        let force = 0;
        // if (distance > (this.radius + other.radius)) {
        force = GRAV * ((this.mass * other.mass) / (distance * distance));
        // }

        xForce += force * cos(angle);
        yForce += force * sin(angle);
      }
    }
    
    return [xForce, yForce];
  }

  setPos(forces) {
    const xForce = forces[0];
    const yForce = forces[1];

    this.xSpeed += (xForce / this.mass) * TIME;
    this.ySpeed += (yForce / this.mass) * TIME;

    this.x += this.xSpeed * TIME;
    this.y += this.ySpeed * TIME;
  }

  drawPlanet() {
    fill(255);
    const scaledX = this.x * SCALE;
    const scaledY = this.y * SCALE;
    circle(scaledX, scaledY, this.radius);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // for (let i = 0; i < 50; i ++) {
  //     planets.push(new Planet(random(windowWidth), random(windowHeight), 0, 0, 30, 1));
  // }

  // Sun
  planets.push(new Planet(0, 0, 0, 0, 50, 1.9891e30));
  // Venus
  planets.push(new Planet(0.723 * AU, 0, 0, -35.02 * 1000, 10, 4.868e24));
  // Earth
  planets.push(new Planet(-1 * AU, 0, 0, 29.783 * 1000, 20, 5.9736e20));
}

function draw() {
  const forces = [];
  for (let i = 0, len = planets.length; i < len; i++) {
    forces[i] = planets[i].getForces();
  }

  for (let i = 0, len = planets.length; i < len; i++) {
    planets[i].setPos(forces[i]);
  }

  background(0);
  
  translate((width / 2), (height / 2));
  
  for (let i = 0, len = planets.length; i < len; i++) {
    planets[i].drawPlanet();
  }

  console.log(`X = ${planets[0].x}`);
  console.log(`Y = ${planets[0].y}`);
}