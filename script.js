const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center positioning coordinates
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const heartSize = 100;

// Arrow starting position (bottom-left)
let arrowX = -50;
let arrowY = canvas.height + 50;
const targetX = centerX;
const targetY = centerY;

// Calculate precise angle towards the heart center
const angle = Math.atan2(targetY - arrowY, targetX - arrowX);
const speed = 18;

let animationFinished = false;

function drawHeart(x, y, size) {
    ctx.save();
    ctx.fillStyle = "#ff4d6d";
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

function drawArrow(x, y, currentAngle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(currentAngle);
    
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    
    // Shaft
    ctx.moveTo(-70, 0);
    ctx.lineTo(10, 0);
    // Arrowhead
    ctx.lineTo(0, -8);
    ctx.moveTo(10, 0);
    ctx.lineTo(0, 8);
    
    ctx.stroke();
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the heart precisely at the absolute center
    drawHeart(centerX - heartSize / 2, centerY - heartSize / 2, heartSize);

    if (!animationFinished) {
        // Move arrow along the calculated angle vector directly to center
        arrowX += Math.cos(angle) * speed;
        arrowY += Math.sin(angle) * speed;
        
        drawArrow(arrowX, arrowY, angle);

        // Check if arrow reaches the center target zone
        const distance = Math.hypot(targetX - arrowX, targetY - arrowY);
        if (distance < 15) {
            animationFinished = true;
            
            // Fade out the canvas quickly
            canvas.style.transition = "opacity 0.4s ease";
            canvas.style.opacity = 0;
            
            // Trigger the full-screen wish screen pulling up from the bottom
            setTimeout(() => {
                document.querySelector('.wish').classList.add('is-in');
            }, 300);
            return;
        }
    }

    requestAnimationFrame(animate);
}

// Start animation loop after a short pause
setTimeout(animate, 800);
