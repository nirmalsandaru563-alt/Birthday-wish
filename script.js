const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let arrowX = -100;
let arrowY = canvas.height / 2 + 100;
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let arrowSpeed = 15;
let animationFinished = false;

function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#e62e6b";
    ctx.beginPath();
    let d = size;
    ctx.moveTo(x, y + d / 4);
    ctx.quadraticCurveTo(x, y, x + d / 4, y);
    ctx.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
    ctx.quadraticCurveTo(x + d / 2, y, x + d * 3/4, y);
    ctx.quadraticCurveTo(x + d, y, x + d, y + d / 4);
    ctx.quadraticCurveTo(x + d, y + d / 2, x + d * 3/4, y + d * 3/4);
    ctx.lineTo(x + d / 2, y + d);
    ctx.lineTo(x + d / 4, y + d * 3/4);
    ctx.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawArrow(x, y) {
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Shaft
    ctx.moveTo(x - 80, y + 40);
    ctx.lineTo(x, y);
    // Arrowhead
    ctx.lineTo(x - 15, y - 5);
    ctx.moveTo(x, y);
    ctx.lineTo(x - 5, y - 15);
    ctx.stroke();
    ctx.restore();
}

let heartSize = 120;
let heartAlpha = 1;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw target heart in the center
    drawHeart(targetX - 60, targetY - 60, heartSize, heartAlpha);

    if (!animationFinished) {
        // Move arrow towards the heart
        arrowX += arrowSpeed;
        arrowY -= arrowSpeed * 0.5;
        drawArrow(arrowX, arrowY);

        // Check collision point
        if (arrowX >= targetX - 40) {
            animationFinished = true;
            // Fade out canvas animation smoothly
            canvas.style.transition = "opacity 1s";
            canvas.style.opacity = 0;
            
            // Trigger the Birthday Wish Card popup
            setTimeout(() => {
                document.querySelector('.wish').classList.add('is-in');
            }, 500);
            return;
        }
    }

    requestAnimationFrame(animate);
}

// Start animation loop after a short pause
setTimeout(animate, 800);
