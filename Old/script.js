class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(241,241,241,.3)';
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    connect(circles) {
        circles.forEach(circle => {
            const distance = Math.sqrt((circle.x - this.x) ** 2 + (circle.y - this.y) ** 2);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(circle.x, circle.y);
                ctx.strokeStyle = 'rgba(137,142,153,0.3)';
                ctx.stroke();
            }
        });
    }
}

let canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let circles = [];

for (let i = 0; i < 100; i++) {
    let radius = Math.random() * 2 + 13;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1/6;
    let dy = (Math.random() - 0.5) * 1/6;
    circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // First connect all circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].connect(circles);
    }

    // Then draw all circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].draw(ctx);
        circles[i].update();
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

animate();

animate();

