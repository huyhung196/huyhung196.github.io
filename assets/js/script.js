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
// ===== INITIALIZE ALL EFFECTS =============
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createDynamicMemphisShapes();
    initSpotlightHover();
    initMagneticButtons();
    initScrollAnimations();
});
