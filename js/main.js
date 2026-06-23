document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugin Systems
    gsap.registerPlugin(ScrollTrigger);

    initStars();
    initCinematicHero();
    initScrollAnimations();
    initTimelineEngine();
    initAudioEngine();
    initStatsCounterEngine();
    initSecretEasterEgg();
    initConfettiEngine();
});

/* ==========================================================================
   Starfield Ambient FX Generation
   ========================================================================== */
function initStars() {
    const container = document.getElementById("starsContainer");
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Random placement parameters
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;

        container.appendChild(star);

        // Individual elegant starlight twinkling cycles
        gsap.to(star, {
            opacity: Math.random() * 0.7 + 0.2,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }
}

/* ==========================================================================
   Hero Visual Orchestration
   ========================================================================== */
function initCinematicHero() {
    const tl = gsap.timeline();

    tl.to(".hero-bg", {
        scale: 1.0,
        duration: 4,
        ease: "power2.out"
    })
    .from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "-=3")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1.8")
    .from(".gold-btn, .scroll-indicator", {
        opacity: 0,
        y: 10,
        duration: 1
    }, "-=1");
}

/* ==========================================================================
   ScrollTrigger Layout Sequences
   ========================================================================== */
function initScrollAnimations() {
    // Parallax Effect on Images
    gsap.utils.toArray(".parallax-img").forEach(img => {
        gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Reveal Chapters & Blocks Smoothly
    gsap.utils.toArray(".chapter-text-block, .reveal-frame").forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top stroke(85%)",
                toggleActions: "play none none none"
            }
        });
    });

    // Glassmorphism Smooth Cascade Stagger Reveal
    gsap.from(".love-card", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".cards-stack-container",
            start: "top 80%"
        }
    });

    // Elegant Structural Handwritten Typewriter Activation
    const letterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#letter",
            start: "top 60%",
            onEnter: () => startTypewriter()
        }
    });
}

/* ==========================================================================
   Interactive Timeline Framework
   ========================================================================== */
function initTimelineEngine() {
    // Drive timeline dynamic bar filling tracking scroll progress
    gsap.to(".timeline-progress-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 30%",
            end: "bottom 70%",
            scrub: true
        }
    });

    // Stagger visibility of distinct nodes
    gsap.utils.toArray(".timeline-item").forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            }
        });
    });
}

function toggleTimelineCard(cardElement) {
    const isActive = cardElement.classList.contains("active");
    
    // Close active blocks to retain clean composition space
    document.querySelectorAll(".timeline-card").forEach(card => {
        card.classList.remove("active");
        card.querySelector(".timeline-expand-content").style.maxHeight = null;
    });

    if (!isActive) {
        cardElement.classList.add("active");
        const content = cardElement.querySelector(".timeline-expand-content");
        content.style.maxHeight = content.scrollHeight + "px";
        
        // Refresh spatial anchors following DOM resizing
        setTimeout(() => { ScrollTrigger.refresh(); }, 500);
    }
}

/* ==========================================================================
   Advanced Letter Typewriter Core
   ========================================================================== */
const letterLines = [
    "Two years later, and I still find myself grateful for you.",
    "Thank you for your patience.",
    "Thank you for your laughter.",
    "Thank you for your support.",
    "Thank you for choosing us through good days and difficult ones.",
    "You have become one of the most beautiful parts of my life.",
    "If I had the chance to do it all over again, I would still choose you.",
    "Every single time.",
    "<br>Love,",
    "Edwin ❤️"
];

let logicalLineIndex = 0;
let characterIndex = 0;
let hasTypewriterFired = false;

function startTypewriter() {
    if (hasTypewriterFired) return;
    hasTypewriterFired = true;
    appendTypewriterContainer();
}

function appendTypewriterContainer() {
    const target = document.getElementById("typewriterTarget");
    
    if (logicalLineIndex < letterLines.length) {
        let currentLineText = letterLines[logicalLineIndex];
        
        if (currentLineText === "<br>Love,") {
            const br = document.createElement("br");
            target.appendChild(br);
            logicalLineIndex++;
            setTimeout(appendTypewriterContainer, 400);
            return;
        }

        const lineSpan = document.createElement("span");
        lineSpan.classList.add("typewriter-line");
        target.appendChild(lineSpan);

        const cursor = document.createElement("span");
        cursor.classList.add("cursor-blink");
        lineSpan.appendChild(cursor);

        typeCharacter(currentLineText, lineSpan, cursor);
    }
}

function typeCharacter(text, container, cursor) {
    if (characterIndex < text.length) {
        cursor.before(text.charAt(characterIndex));
        characterIndex++;
        setTimeout(() => typeCharacter(text, container, cursor), Math.random() * 30 + 20);
    } else {
        cursor.remove(); // Safely remove flashing cursor from completed line
        characterIndex = 0;
        logicalLineIndex++;
        setTimeout(appendTypewriterContainer, 600);
    }
}

/* ==========================================================================
   Statistical Counter Engine
   ========================================================================== */
function initStatsCounterEngine() {
    gsap.utils.toArray(".counter").forEach(counter => {
        const targetVal = parseInt(counter.getAttribute("data-target"), 10);
        
        gsap.to(counter, {
            innerText: targetVal,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%"
            }
        });
    });
}



// Chronological Array of Typographic Flash Elements
const romanticReasons = [
    "Your Catchy Energy ⚡",
    "Your Radiating Smile ✨",
    "Your Unstoppable Strength 💪",
    "Your Beautiful Heart ❤️",
    "Your Pure Kindness 🌸",
    "Your Magnetic Drive 🎯",
    "Your Continuous Support 🤝",
    "Your Irreplaceable Presence 🏡",
    "Your Effortless Grace 🕊️",
    "Everything About You 🌹"
];

let currentReasonIndex = 0;

function handleCanvasTap(event) {
    // 1. Cycle & Flash Text with a scale burst animation
    const textDisplay = document.getElementById("activeReasonDisplay");
    
    textDisplay.style.opacity = 0;
    textDisplay.style.transform = "scale(0.9)";
    
    setTimeout(() => {
        textDisplay.innerText = romanticReasons[currentReasonIndex];
        textDisplay.style.opacity = 1;
        textDisplay.style.transform = "scale(1)";
        
        // Loop back to index zero safely
        currentReasonIndex = (currentReasonIndex + 1) % romanticReasons.length;
    }, 150);

    // 2. Track mobile touch coordinates vs mouse click coordinates accurately
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
    const posX = clientX - rect.left;
    const posY = clientY - rect.top;

    // 3. Generate an explosion of micro-hearts
    const container = document.getElementById("particleContainer");
    const heartVariants = ["❤️", "💖", "✨", "💕", "🌸"];
    const burstCount = 6;

    for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement("span");
        heart.className = "floating-heart-vfx";
        heart.innerText = heartVariants[Math.floor(Math.random() * heartVariants.length)];
        
        // Calculate random structural spray trajectories
        const targetX = (Math.random() - 0.5) * 160;
        const targetY = (Math.random() - 0.8) * 160 - 40; // Bias upward motion
        const targetRotation = (Math.random() - 0.5) * 90;

        heart.style.left = `${posX}px`;
        heart.style.top = `${posY}px`;
        heart.style.setProperty('--tx', `${targetX}px`);
        heart.style.setProperty('--ty', `${targetY}px`);
        heart.style.setProperty('--rot', `${targetRotation}deg`);

        container.appendChild(heart);

        // Instantly garbage collect elements to keep app memory pristine
        setTimeout(() => {
            heart.remove();
        }, 800);
    }
}


/* ==========================================================================
   Luxury Modular Audio Management
   ========================================================================== */
function initAudioEngine() {
    const audio = document.getElementById("bgAudio");
    const toggleBtn = document.getElementById("audioToggleBtn");
    const volume = document.getElementById("volumeSlider");

    toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            toggleBtn.innerHTML = '<i class="fas fa-pause"></i><span class="pulse-ring"></span>';
        } else {
            audio.pause();
            toggleBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
    });

    volume.addEventListener("input", (e) => {
        audio.volume = e.target.value;
    });
}

/* ==========================================================================
   Global Modular Interactive Lightbox
   ========================================================================== */
function openLightbox(sourceUrl, mediaType) {
    const lightbox = document.getElementById("globalLightbox");
    const content = document.getElementById("lightboxContent");
    content.innerHTML = "";

    if (mediaType === 'image') {
        content.innerHTML = `<img src="${sourceUrl}" alt="Gallery View">`;
    } else if (mediaType === 'video') {
        content.innerHTML = `<video src="${sourceUrl}" controls autoplay class="modal-video"></video>`;
    }

    lightbox.style.display = "flex";
    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.4 });
}

function closeLightbox() {
    const lightbox = document.getElementById("globalLightbox");
    gsap.to(lightbox, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            lightbox.style.display = "none";
            document.getElementById("lightboxContent").innerHTML = "";
        }
    });
}

/* ==========================================================================
   Easter Egg Logical System
   ========================================================================== */
function initSecretEasterEgg() {
    let heartClickCounter = 0;
    const heartIcon = document.getElementById("secretHeartIcon");

    heartIcon.addEventListener("click", () => {
        heartClickCounter++;
        // Playful modern micro-pop scaling feedback
        gsap.fromTo(heartIcon, { scale: 1 }, { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });

        if (heartClickCounter === 5) {
            alert("You found the hidden message ❤️\nThank you for making my world brighter every day.");
            heartClickCounter = 0; // Reset counter safely
        }
    });
}

/* ==========================================================================
   Cinematic Confetti Engineering Framework
   ========================================================================== */
let canvas, ctx, pieces = [];
let runConfettiAnimation = false;

function initConfettiEngine() {
    canvas = document.getElementById("confettiCanvas");
    ctx = canvas.getContext("2d");
    
    window.addEventListener("resize", resizeConfettiCanvas);
    resizeConfettiCanvas();

    ScrollTrigger.create({
        trigger: "#finalMoment",
        start: "top 50%",
        onEnter: () => {
            runConfettiAnimation = true;
            generateConfettiPieces();
            animateConfetti();
        },
        onLeaveBack: () => {
            runConfettiAnimation = false;
        }
    });
}

function resizeConfettiCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

function generateConfettiPieces() {
    pieces = [];
    const colors = ["#D4AF37", "#F5E6A8", "#E8A4A4", "#FFFFFF"];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            wobble: Math.random() * 1,
            wobbleSpeed: Math.random() * 0.05
        });
    }
}

function animateConfetti() {
    if (!runConfettiAnimation) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
        p.y += p.speed;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.5;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(animateConfetti);
}

/* ==========================================================================
   Global Motion Routing Utility
   ========================================================================== */
function scrollToSection(selector) {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: selector,
        ease: "power4.inOut"
    });
}