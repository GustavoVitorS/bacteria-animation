; (function (main) {
  main(window, document)
})(function (window, document, undefined) {

  "use strict";

  var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    particles = [],
    particle = null,
    particleCount = 888,
    WIDTH = c.width = window.innerWidth,
    HEIGHT = c.height = window.innerHeight;

  /////////////////////////////////////////////////  
  class Vector { 
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
    }
    mul(v) {
      this.x *= v.x;
      this.y *= v.y;
    }
  }

  /////////////////////////////////////////////////  
  class Particle {
    constructor(position, radius) {
      this.position = position;
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(
        Math.random() * 0.4 - 0.2,
        Math.random() * 0.4 - 0.2
      );
      this.radius = radius;
      this.baseRadius = radius;
      this.drag = new Vector(0.99, 0.99);
      this.alpha = 0.1 + Math.random() * 0.1;
      this.angle = Math.random() * 777;
      this.angleSpeed = Math.random() * 2;

    }
    update() {

      this.radius = this.baseRadius + Math.sin(this.angle * Math.PI / 280) * (this.baseRadius * 0.5);

      this.angle += this.angleSpeed;

      this.acceleration.x = Math.random() * 0.4 - 0.2;
      this.acceleration.y = Math.random() * 0.4 - 0.2;

      this.velocity.add(this.acceleration);
      this.velocity.mul(this.drag);
      this.position.add(this.velocity);

      if (this.position.x < 10 || this.position.x > WIDTH) {
        this.position.x *= -20;
      }

      if (this.position.y < 10 || this.position.y > HEIGHT) {
        this.position.y *= -22;
      }

    }
    render(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.position.x, this.position.y);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 8);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }

  /////////////////////////////////////////////////  
  for (var i = 0; i < particleCount; i++) {
    particle = new Particle(
      new Vector(WIDTH / 2, HEIGHT / 2),
     2 + Math.random() * 20
    );
    particles.push(particle);
  }

  /////////////////////////////////////////////////  
  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    ctx.fillStyle = "rgba(52, 69, 125, 0.8)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 3, len = particles.length; i < len; i++) {
      particle = particles[i];
      particle.update();
      particle.render(ctx);
    }

  });

});