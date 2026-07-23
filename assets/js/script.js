// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==========================================
// ===== NAVIGATION & NAVBAR EFFECTS =======
// ==========================================
// Premium smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // GSAP styled smooth scroll
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: targetId,
                    offsetY: 80 // Account for fixed navbar
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = "0.8rem 2rem";
        nav.style.width = "95%";
    } else {
        nav.style.padding = "1rem 2rem";
        nav.style.width = "90%";
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}


// ==========================================
// ===== LIGHTBOX IMAGE VIEWER ==============
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox && lightboxImg && closeBtn) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}


// ==========================================
// ===== FLOATING MEMPHIS SHAPES GSAP ======
// ==========================================
// Continuous lơ lửng animations with spring physics using GSAP
function initFloatingShapes() {
    gsap.utils.toArray('.memphis-shape').forEach((shape, index) => {
        const randomX = gsap.utils.random(-30, 30);
        const randomY = gsap.utils.random(-40, 40);
        const randomRotate = gsap.utils.random(-30, 30);
        const randomDuration = gsap.utils.random(6, 10);
        const randomDelay = gsap.utils.random(0, 3);

        gsap.to(shape, {
            x: randomX,
            y: randomY,
            rotation: randomRotate,
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: randomDelay
        });
    });
}

// Generates additional floating shapes dynamically for extra visual richness
function createDynamicMemphisShapes() {
    const container = document.querySelector('.memphis-bg');
    if (!container) return;

    const colors = ['#FF3366', '#4ECDC4', '#FF6B35', '#7B68EE', '#FFD93D', '#FF6F91', '#00C9A7'];
    const shapeTypes = ['triangle', 'circle', 'square-outline', 'semicircle'];

    // Add 8 more random shapes dynamically
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = `memphis-shape ${shapeTypes[Math.floor(Math.random() * shapeTypes.length)]}`;
        shape.setAttribute('aria-hidden', 'true');

        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * -20; // Negative for staggered start
        const duration = 15 + Math.random() * 15;

        shape.style.top = `${top}%`;
        shape.style.left = `${left}%`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;

        if (shape.classList.contains('triangle')) {
            shape.style.borderBottomColor = color;
            const size = 15 + Math.random() * 25;
            shape.style.borderLeftWidth = `${size}px`;
            shape.style.borderRightWidth = `${size}px`;
            shape.style.borderBottomWidth = `${size * 1.73}px`;
        } else if (shape.classList.contains('circle')) {
            const size = 20 + Math.random() * 40;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.borderColor = color;
        } else if (shape.classList.contains('square-outline')) {
            const size = 15 + Math.random() * 30;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.borderColor = color;
            shape.style.transform = `rotate(${Math.random() * 45}deg)`;
        } else if (shape.classList.contains('semicircle')) {
            const size = 25 + Math.random() * 35;
            shape.style.width = `${size}px`;
            shape.style.height = `${size / 2}px`;
            shape.style.background = color;
        }

        container.appendChild(shape);
    }
    
    // Initialize continuous floating movement for all shapes
    initFloatingShapes();
}


// ==========================================
// ===== STAGGERED REVEAL SCROLLTRIGGER =====
// ==========================================
function initScrollAnimations() {
    // Fade & Slide in hero elements
    gsap.fromTo('.hero-content > *', 
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: "all"
        }
    );

    // Staggered reveal for skills
    gsap.fromTo('#skills .skill-category', 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: "all"
        }
    );

    // Staggered reveal for timeline experience
    gsap.fromTo('#experience .timeline-item', 
        { opacity: 0, x: -40 },
        {
            scrollTrigger: {
                trigger: '#experience',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: "all"
        }
    );

    // Staggered reveal for projects
    gsap.fromTo('#projects .project-card', 
        { opacity: 0, y: 60 },
        {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: "all"
        }
    );

    // Staggered reveal for hobbies section
    gsap.fromTo('#hobbies .glass-card', 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: '#hobbies',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: "all"
        }
    );

    // Fade in contact section card
    gsap.fromTo('#contact .glass-card', 
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 85%'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: "all"
        }
    );
}


// ==========================================
// ===== SPOTLIGHT HOVER EFFECT ============
// ==========================================
function initSpotlightHover() {
    document.querySelectorAll('.glass-card, .project-card, .timeline-content').forEach(card => {
        // Dynamically add spotlight overlay element
        const spotlight = document.createElement('div');
        spotlight.className = 'card-spotlight';
        card.appendChild(spotlight);

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}


// ==========================================
// ===== MAGNETIC BUTTON EFFECT =============
// ==========================================
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            // Calculate absolute distance from center of the button
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Pull button toward mouse coordinates (30% weight)
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            // Spring bounce back to original position
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });
}


// ==========================================
// ===== SKILL ITEMS HOVER BOUNCE ===========
// ==========================================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.15s ease';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});


// ==========================================
// ===== PROJECTS 3D COVERFLOW STAGE ========
// ==========================================
function initProjectsSlider() {
    const stage = document.querySelector('.projects-3d-stage');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (!stage) return;

    const slides = stage.querySelectorAll('.slide-item');
    const totalSlides = slides.length;
    let activeIndex = 0;

    function update3DPositions(index) {
        activeIndex = (index + totalSlides) % totalSlides;

        const leftIndex = (activeIndex - 1 + totalSlides) % totalSlides;
        const rightIndex = (activeIndex + 1) % totalSlides;

        slides.forEach((slide, idx) => {
            slide.classList.remove('pos-center', 'pos-left', 'pos-right');
            if (idx === activeIndex) {
                slide.classList.add('pos-center');
            } else if (idx === leftIndex) {
                slide.classList.add('pos-left');
            } else if (idx === rightIndex) {
                slide.classList.add('pos-right');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => update3DPositions(activeIndex - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => update3DPositions(activeIndex + 1));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => update3DPositions(index));
    });

    // Clicking on left or right peeking card directly rotates it to center!
    slides.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            if (index !== activeIndex) {
                update3DPositions(index);
            }
        });
    });

    // Touch swipe support
    let startX = 0;
    let isDragging = false;

    stage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        if (diffX < -40) {
            update3DPositions(activeIndex + 1);
        } else if (diffX > 40) {
            update3DPositions(activeIndex - 1);
        }
    }, { passive: true });

    // Initial state
    update3DPositions(0);
}


// ==========================================
// ===== GUIDED TOUR SYSTEM ================
// ==========================================
const tourSteps = [
    {
        target: '#home',
        title: '👋 Xin chào!',
        desc: 'Chào mừng bạn đến với portfolio của Huy Hưng! Mình sẽ dẫn bạn đi một vòng nhé. Cùng khám phá nào!',
        duration: 3000
    },
    {
        target: '#about',
        title: '🧑‍💻 Giới thiệu bản thân',
        desc: 'Đây là mục giới thiệu về mình — Kỹ sư Backend & AI với đam mê xây dựng hệ thống hiệu năng cao và tích hợp giải pháp AI thực tế.',
        duration: 3000
    },
    {
        target: '#skills',
        title: '🛠️ Kỹ năng chuyên môn',
        desc: 'Tất cả các công nghệ mình thành thạo: Python, FastAPI, Docker, CUDA, PostgreSQL, LLMs, và nhiều công cụ AI hiện đại khác!',
        duration: 3000
    },
    {
        target: '#experience',
        title: '💼 Kinh nghiệm làm việc',
        desc: 'Từ Mebisoft (AI Developer) đến ĐH Giao thông Vận tải TP.HCM — hành trình từ thiết kế hệ thống GenAI đến tối ưu hóa GPU inference.',
        duration: 3000
    },
    {
        target: '#projects',
        title: '🚀 Dự án nổi bật',
        desc: 'Khám phá các dự án thực tế: AI Chatbot thông minh, hệ thống Computer Vision phân tán, và Camera AI giám sát. Nhấn vào để xem chi tiết!',
        duration: 3000
    },
    {
        target: '#hobbies',
        title: '⚽ Sở thích & Đam mê',
        desc: 'Ngoài code, mình còn mê bóng đá, đọc sách kiến trúc hệ thống, và luôn tìm tòi các mô hình AI mới nhất!',
        duration: 3000
    },
    {
        target: '#contact',
        title: '📬 Liên hệ',
        desc: 'Muốn hợp tác hoặc trò chuyện? Gửi tin nhắn cho mình ngay tại đây nhé! Cảm ơn bạn đã ghé thăm portfolio! 🎉',
        duration: 3000
    }
];

let tourActive = false;
let tourCurrentStep = 0;
let tourTimerId = null;
let tourDimEl = null;

function startGuidedTour() {
    if (tourActive) return;
    tourActive = true;
    tourCurrentStep = 0;

    const overlay = document.getElementById('tour-overlay');
    const bubble = document.getElementById('tour-speech-bubble');
    const robot = document.getElementById('tour-robot-guide');
    overlay.style.display = 'block';

    // Create dim overlay
    if (!tourDimEl) {
        tourDimEl = document.createElement('div');
        tourDimEl.className = 'tour-dim-overlay';
        document.body.appendChild(tourDimEl);
    }
    setTimeout(() => tourDimEl.classList.add('active'), 50);

    // Robot flies in from bottom of screen
    gsap.set(robot, {
        left: window.innerWidth / 2 - 60,
        top: window.innerHeight + 100,
        opacity: 1
    });
    gsap.to(robot, {
        top: window.innerHeight / 2 - 80,
        duration: 1.0,
        ease: 'back.out(1.7)',
        onComplete: () => {
            // Start from top
            gsap.to(window, {
                duration: 0.6,
                scrollTo: { y: 0 },
                ease: 'power2.inOut',
                onComplete: () => {
                    runTourStep(0);
                }
            });
        }
    });
}

function stopGuidedTour() {
    tourActive = false;
    clearTimeout(tourTimerId);

    const overlay = document.getElementById('tour-overlay');
    const bubble = document.getElementById('tour-speech-bubble');
    const robot = document.getElementById('tour-robot-guide');

    bubble.classList.remove('visible');

    // Fly robot off screen
    gsap.to(robot, {
        y: -300,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
            overlay.style.display = 'none';
            gsap.set(robot, { clearProps: 'all' });
        }
    });

    // Remove dim
    if (tourDimEl) {
        tourDimEl.classList.remove('active');
    }

    // Remove highlights
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
}

function runTourStep(stepIndex) {
    if (!tourActive || stepIndex >= tourSteps.length) {
        stopGuidedTour();
        return;
    }

    tourCurrentStep = stepIndex;
    const step = tourSteps[stepIndex];
    const targetEl = document.querySelector(step.target);
    if (!targetEl) { runTourStep(stepIndex + 1); return; }

    const overlay = document.getElementById('tour-overlay');
    const robot = document.getElementById('tour-robot-guide');
    const bubble = document.getElementById('tour-speech-bubble');
    const titleEl = document.getElementById('tour-title');
    const descEl = document.getElementById('tour-desc');
    const counterEl = document.getElementById('tour-step-counter');
    const progressBar = document.getElementById('tour-progress-bar');

    // Hide bubble during transition
    bubble.classList.remove('visible');

    // Remove previous highlights
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));

    // Scroll to target section
    gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: step.target, offsetY: 80 },
        ease: 'power3.inOut',
        onComplete: () => {
            if (!tourActive) return;

            // Add highlight
            targetEl.classList.add('tour-highlight');

            // Calculate robot position — always within visible viewport
            const rect = targetEl.getBoundingClientRect();
            const viewW = window.innerWidth;
            const viewH = window.innerHeight;

            // Place robot at top-right of the visible section area
            const robotX = Math.min(Math.max(rect.right - 30, viewW * 0.5), viewW - 150);
            const robotY = Math.max(Math.min(rect.top + 20, viewH - 200), 80);

            // Animate robot flying to position
            gsap.to(robot, {
                left: robotX,
                top: robotY,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.4)',
                onStart: () => {
                    gsap.set(robot, { opacity: 1 });
                }
            });

            // Position bubble below robot, always inside viewport
            setTimeout(() => {
                if (!tourActive) return;

                // Prefer placing bubble to the LEFT of the robot
                let bubbleX = robotX - 300;
                let bubbleY = robotY + 130;

                // Clamp so bubble stays in viewport
                bubbleX = Math.max(16, Math.min(bubbleX, viewW - 380));
                bubbleY = Math.max(16, Math.min(bubbleY, viewH - 220));

                gsap.set(bubble, {
                    left: bubbleX,
                    top: bubbleY
                });

                // Update content
                titleEl.textContent = step.title;
                descEl.textContent = step.desc;
                counterEl.textContent = `${stepIndex + 1} / ${tourSteps.length}`;
                progressBar.style.width = `${((stepIndex + 1) / tourSteps.length) * 100}%`;

                bubble.classList.add('visible');
            }, 500);

            // Auto-advance to next step
            tourTimerId = setTimeout(() => {
                if (tourActive) {
                    runTourStep(stepIndex + 1);
                }
            }, step.duration);
        }
    });
}


// ==========================================
// ===== INITIALIZE ALL EFFECTS =============
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createDynamicMemphisShapes();
    initSpotlightHover();
    initMagneticButtons();
    initScrollAnimations();
    initProjectsSlider();
});
