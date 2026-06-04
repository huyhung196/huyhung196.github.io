// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .timeline-item, .project-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
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

// Lightbox logic
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

// ===== MEMPHIS PARALLAX EFFECT =====
// Subtle parallax on floating Memphis shapes when scrolling
const memphisShapes = document.querySelectorAll('.memphis-shape');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            memphisShapes.forEach((shape, index) => {
                const speed = 0.02 + (index % 5) * 0.01;
                const direction = index % 2 === 0 ? 1 : -1;
                const yOffset = scrollY * speed * direction;
                shape.style.transform = `translateY(${yOffset}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// ===== DYNAMIC MEMPHIS SHAPES GENERATOR =====
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
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', createDynamicMemphisShapes);

// ===== SKILL ITEMS HOVER BOUNCE =====
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.15s ease';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});
