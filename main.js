const GRAV = 0.0001;
const TIME = 5;
const DIST = 40;

let planets = [];

class Planet {
    constructor(x, y, xSpeed, ySpeed, radius, mass) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.radius = radius;
        this.mass = mass;

        planets.push(this);
    }

    getForces() {
        let xForce = 0;
        let yForce = 0;

        for (let i = 0; i < planets.length; i++) {
            let other = planets[i];
            if (this.x != other.x && this.y != other.y) {
                
                let xDistance = other.x - this.x;
                let yDistance = other.y - this.y;

                let angle = atan2(y, x)
            }
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    new Planet(64,64,0,0,5,5);
}

function draw() {
    background(0);
    console.log(planets[0].x)
}