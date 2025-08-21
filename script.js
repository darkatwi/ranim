const messages = [
    "You’re my favorite person ❤️",
    "You make my heart smile 😊",
    "Forever isn’t long enough with you 💕",
    "My safe place is in your arms 🤗",
    "You’re the reason I believe in love 💖",
    "You’re my today and all of my tomorrows 🌹",
    "Every moment with you is my favorite 💫",
    "You are my happy place 🏡❤️",
    "With you, the world feels right 🌍✨",
    "I’m so lucky to call you mine 🍀",
    "You’re my sunshine on cloudy days ☀️",
    "You’re my greatest adventure 🌎💌",
    "Home is wherever I’m with you 🏠💖",
    "You’re the best part of my day 🌟",
    "You’re my heart’s favorite song 🎵❤️",
    "You make life sweeter than candy 🍬",
    "I’d choose you in every lifetime 🔄❤️",
    "You’re my one in a million 🌌",
    "My heart beats for you, always 💓",
    "You + Me = Forever ♾️💞",
    "I love you more than pizza 🍕 (and that’s a lot!)",
    "You’re my perfect person 🥰",
    "Can’t stop thinking about you 🧠💗",
    "You make my soul smile 😍"
];

let isTyping = false;  // flag to prevent overlapping typings

function typeMessage(text) {
    if (isTyping) return;  // ignore new calls while typing

    isTyping = true;
    const messageElement = document.getElementById("message");
    messageElement.textContent = "";
    let index = 0;

    function type() {
        if (index < text.length) {
            messageElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 40);
        } else {
            isTyping = false;  // done typing, allow next
        }
    }

    type();
}

document.body.addEventListener("click", (e) => {
    // If clicking on envelope or modal, ignore message change
    if (e.target.closest('#envelopeBtn') || e.target.closest('#letterModal') || e.target.closest('#galleryModal')) return;

    if (!isTyping) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        typeMessage(randomMessage);
    }
});

// Floating hearts animation
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.alpha = 1;
}

Heart.prototype.draw = function () {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
        this.x - this.size, this.y + this.size / 3,
        this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
        this.x + this.size / 2, this.y - this.size / 2,
        this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
};

Heart.prototype.update = function () {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.alpha -= 0.01;
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.alpha <= 0) {
            hearts.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
    if (e.target.closest('#envelopeBtn') || e.target.closest('#letterModal') || e.target.closest('#galleryModal')) return;
    for (let i = 0; i < 5; i++) {
        hearts.push(new Heart(e.clientX, e.clientY));
    }
});

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Envelope and letter modal functionality
const envelopeBtn = document.getElementById("envelopeBtn");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

envelopeBtn.addEventListener("click", () => {
    letterModal.style.display = "flex";
});

closeLetter.addEventListener("click", () => {
    letterModal.style.display = "none";
});

// Camera and gallery modal functionality
const cameraBtn = document.getElementById("cameraBtn");
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const prevPhotoBtn = document.getElementById("prevPhoto");
const nextPhotoBtn = document.getElementById("nextPhoto");
const closeGalleryBtn = document.getElementById("closeGallery");

// Gallery photos array
const galleryPhotos = [
    { src: "pho1.jpg", caption: "Happy birthday to the reason i smile a little more everyday" },
    { src: "pho2.jpg", caption: "growing older, growing closer" },
    { src: "pho3.jpg", caption: "you're proof that wishes comes true" },
    { src: "pho4.jpg", caption: "celebrating you today, and loving you always" },
    { src: "pho5.jpg", caption: "to the one who makes my world softer, safer,better" },
    { src: "pho6.jpg", caption: "another chapter of you, and i cant wait to read it all" },

];

let currentPhotoIndex = 0;

function showPhoto(index) {
    const photo = galleryPhotos[index];
    galleryImage.src = photo.src;
    galleryCaption.textContent = photo.caption;
}

cameraBtn.addEventListener("click", () => {
    currentPhotoIndex = 0;
    showPhoto(currentPhotoIndex);
    galleryModal.style.display = "flex";
});

prevPhotoBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    showPhoto(currentPhotoIndex);
});

nextPhotoBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    showPhoto(currentPhotoIndex);
});

closeGalleryBtn.addEventListener("click", () => {
    galleryModal.style.display = "none";
});
