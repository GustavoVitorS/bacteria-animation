; (function (main) {
  main(window, document)
})(function (window, document, undefined) {

  "use strict";

  var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    particles = [],
    particle = null,
    particleCount = 400,
    WIDTH = c.width = window.innerWidth,
    HEIGHT = c.height = window.innerHeight;

  /////////////////////////////////////////////////  
  var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  Vector.prototype = {
    constructor: Vector,
    add: function (v) {
      this.x += v.x;
      this.y += v.y;
    },
    sub: function (v) {
      this.x -= v.x;
      this.y -= v.y;
    },
    mul: function (v) {
      this.x *= v.x;
      this.y *= v.y;
    }
  };

  /////////////////////////////////////////////////  
  var Particle = function (position, radius) {
    this.position = position;
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(
      Math.random() * 0.4 - 0.2,
      Math.random() * 0.4 - 0.2
    );
    this.radius = radius;
    this.baseRadius = radius;
    this.drag = new Vector(0.98, 0.98);
    this.alpha = 0.2 + Math.random() * 0.8;
    this.angle = Math.random() * 560;
    this.angleSpeed = Math.random() * 2;

  };

  Particle.prototype = {
    constructor: Particle,
    update: function () {

      this.radius = this.baseRadius + Math.sin(this.angle * Math.PI / 180) * (this.baseRadius * 0.5);

      this.angle += this.angleSpeed;

      this.acceleration.x = Math.random() * 0.4 - 0.2;
      this.acceleration.y = Math.random() * 0.4 - 0.2;

      this.velocity.add(this.acceleration);
      this.velocity.mul(this.drag);
      this.position.add(this.velocity);

      if (this.position.x < 0 || this.position.x > WIDTH) {
        this.position.x *= -2;
      }

      if (this.position.y < 0 || this.position.y > HEIGHT) {
        this.position.y *= -2;
      }


    },
    render: function (ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.position.x, this.position.y);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  };

  /////////////////////////////////////////////////  
  for (var i = 0; i < particleCount; i++) {
    particle = new Particle(
      new Vector(WIDTH / 2, HEIGHT / 2),
      1 + Math.random() * 10
    );
    particles.push(particle);
  }

  /////////////////////////////////////////////////  
  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    ctx.fillStyle = "rgba(52, 69, 125, 0.8)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0, len = particles.length; i < len; i++) {
      particle = particles[i];
      particle.update();
      particle.render(ctx);
    }

  });

});