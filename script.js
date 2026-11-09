function checkPassword() {
    const correctPassword = "1.11.26"; 
    
    const input = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (input === correctPassword) {
        window.location.href = "game.html";
    } else {
        errorMsg.style.display = "block";
        document.getElementById("passwordInput").value = "";
    }
}

const correctAnswers = {
    1: "26.03.08",   
    2: "упал с неба",  
    3: "да"   
};

function checkStep(step) {
    let userAnswer = document.getElementById("q" + step).value.toLowerCase().trim();
    const errorMsg = document.getElementById("quiz-error");

    if (userAnswer.includes(correctAnswers[step])) {
        errorMsg.style.display = "none";
        document.getElementById("box-q" + step).style.display = "none";
        
        if (step === 1) {
            document.getElementById("box-q2").style.display = "block";
        } else if (step === 2) {
            document.getElementById("box-q3").style.display = "block";
        } else if (step === 3) {
            window.location.href = "love.html";
        }
    } else {
        errorMsg.style.display = "block";
    }
}

if (document.getElementById("heartCanvas")) {
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 10 + 5, // Сделал их чуть меньше, чтобы смотрелись аккуратнее
        speedY: Math.random() * 1.5 + 0.5, // Плавнее летят вверх
        opacity: Math.random() * 0.5 + 0.5,
        flickerSpeed: Math.random() * 0.05 + 0.01 // Скорость мерцания
    };
}

function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    
    ctx.shadowBlur = 15; 
    ctx.shadowColor = "#ff0000"; 
    
    ctx.fillStyle = "#ff4d4d"; 
    ctx.beginPath();
    let topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (particles.length < 100) {
        particles.push(createHeart());
    }

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.y -= p.speedY;
        
        p.opacity += p.flickerSpeed;
        if (p.opacity > 1 || p.opacity < 0.2) {
            p.flickerSpeed = -p.flickerSpeed; // Меняем направление мерцания
        }

        drawHeart(p.x, p.y, p.size, p.opacity);

        if (p.y < -20) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();
}