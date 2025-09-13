document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Interactive "Chaos to Order" Orb Animation
    const heroSection = document.querySelector('.hero');
    const canvas = document.getElementById('hero-canvas');
    if (canvas && heroSection) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let isOrganized = false;
        let mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const options = {
            particleColor: "rgba(141, 95, 241, 0.8)",
            particleAmount: 70,
            defaultRadius: 1.5,
            variantRadius: 1,
            chaoticSpeed: 0.6,
            organizedSpeed: 0.004,
            orbRadius: 150,
            lerpFactor: 0.04,
            linkRadius: 70,
            lineColor: "rgba(141, 95, 241, 0.3)"
        };

        if (window.innerWidth < 768) {
            options.particleAmount = 40;
            options.orbRadius = 100;
            options.linkRadius = 50;
        }

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                
                this.chaoticSpeedX = (Math.random() - 0.5) * options.chaoticSpeed;
                this.chaoticSpeedY = (Math.random() - 0.5) * options.chaoticSpeed;

                this.angle = Math.random() * Math.PI * 2;
                this.radius = options.defaultRadius + Math.random() * options.variantRadius;
                
                // For organized state: each particle gets a base distance and its own "breathing" rhythm
                this.baseDistanceFromCenter = options.orbRadius + (Math.random() - 0.5) * 60;
                // Primary, faster oscillation
                this.oscillationAngle = Math.random() * Math.PI * 2;
                this.oscillationSpeed = 0.01 + Math.random() * 0.02;
                // Secondary, slower and more subtle oscillation for more organic movement
                this.oscillationAngle2 = Math.random() * Math.PI * 2;
                this.oscillationSpeed2 = 0.005 + Math.random() * 0.01;
                // Each particle gets its own rotation speed
                this.ownOrganizedSpeed = options.organizedSpeed * (0.8 + Math.random() * 0.4);
                // Each particle gets its own follow-speed (lerp factor) for a more organic, loose feel
                this.ownLerpFactor = options.lerpFactor * (0.6 + Math.random() * 0.8); // Range from 60% to 140%
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = options.particleColor;
                ctx.fill();
            }

            update() {
                if (isOrganized) {
                    // "Breathe" effect: particles oscillate their distance from the center using two combined sine waves
                    this.oscillationAngle += this.oscillationSpeed;
                    this.oscillationAngle2 += this.oscillationSpeed2;
                    const oscillation1 = Math.sin(this.oscillationAngle) * 15; // Main oscillation
                    const oscillation2 = Math.sin(this.oscillationAngle2) * 8;  // Secondary oscillation
                    const currentDistanceFromCenter = this.baseDistanceFromCenter + oscillation1 + oscillation2;

                    const targetX = mouse.x + Math.cos(this.angle) * currentDistanceFromCenter;
                    const targetY = mouse.y + Math.sin(this.angle) * currentDistanceFromCenter;
                    
                    this.x += (targetX - this.x) * this.ownLerpFactor;
                    this.y += (targetY - this.y) * this.ownLerpFactor;

                    this.angle += this.ownOrganizedSpeed;
                } else {
                    this.x += this.chaoticSpeedX;
                    this.y += this.chaoticSpeedY;

                    if (this.x <= 0 || this.x >= canvas.width) {
                        this.chaoticSpeedX *= -1;
                        this.x = Math.max(0, Math.min(canvas.width, this.x)); // Clamp position
                    }
                    if (this.y <= 0 || this.y >= canvas.height) {
                        this.chaoticSpeedY *= -1;
                        this.y = Math.max(0, Math.min(canvas.height, this.y)); // Clamp position
                    }
                }
            }
        }

        function setup() {
            particles = [];
            for (let i = 0; i < options.particleAmount; i++) {
                particles.push(new Particle());
            }
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = window.requestAnimationFrame(loop);
        }

        function linkParticles() {
            const linkRadiusSquared = options.linkRadius * options.linkRadius;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const O = particles[i];
                    const T = particles[j];
                    const dx = O.x - T.x;
                    const dy = O.y - T.y;
                    const distanceSquared = dx * dx + dy * dy;

                    if (distanceSquared < linkRadiusSquared) {
                        const opacity = 1 - (distanceSquared / linkRadiusSquared);
                        ctx.strokeStyle = `rgba(141, 95, 241, ${opacity * 0.4})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(O.x, O.y);
                        ctx.lineTo(T.x, T.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            if (isOrganized) {
                linkParticles();
            }
            animationFrameId = window.requestAnimationFrame(loop);
        }

        heroSection.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseenter', () => { isOrganized = true; });
        heroSection.addEventListener('mouseleave', () => { isOrganized = false; });

        window.addEventListener('resize', () => {
            resizeCanvas();
            setup();
        });
        
        resizeCanvas();
        setup();
    }

    // ROI Calculator Logic
    const calculateBtn = document.getElementById('calculateBtn');
    const calculatorCtaContainer = document.getElementById('calculator-cta-container');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const employees = parseFloat(document.getElementById('employees').value) || 0;
            const hours = parseFloat(document.getElementById('hours').value) || 0;
            const cost = parseFloat(document.getElementById('cost').value) || 0;

            const weeklySavings = employees * hours * cost;
            const yearlySavings = weeklySavings * 52;

            const resultDiv = document.getElementById('result');
            const savingsSpan = document.getElementById('savings');
            
            if (yearlySavings > 0) {
                let currentSavings = 0;
                const step = yearlySavings / 100;
                const interval = setInterval(() => {
                    currentSavings += step;
                    if (currentSavings >= yearlySavings) {
                        savingsSpan.textContent = `₪${yearlySavings.toLocaleString('he-IL')}`;
                        clearInterval(interval);
                    } else {
                        savingsSpan.textContent = `₪${Math.ceil(currentSavings).toLocaleString('he-IL')}`;
                    }
                }, 10);
                resultDiv.style.display = 'inline-block';
                calculatorCtaContainer.style.display = 'block';
            } else {
                resultDiv.style.display = 'none';
                calculatorCtaContainer.style.display = 'none';
            }
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const popup = document.getElementById('success-popup');
    const fireworksContainer = document.querySelector('.fireworks-container');

    if (contactForm && popup) {
        let isSubmitting = false;
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value;
            let phone = document.getElementById('client-phone').value;
            if (isSubmitting) {
                return; // יציאה אם כבר מתבצעת שליחה
            }
            isSubmitting = true;

            // const phoneRegex = /^\d{10}$/;

            // if (!phoneRegex.test(phone)) {
            //     alert('מספר הטלפון אינו תקין. הוא חייב להכיל 10 ספרות בלבד, ללא רווחים או תווים אחרים.');
            //     isSubmitting = false;
            //     return; // עצירת שליחת הטופס
                
            // }

            if (phone.startsWith('0')) {
                phone = phone.substring(1);
                phone = `972${phone}`;
            }
            

            if (!document.getElementById('marketing-consent').checked) {
                alert('חובה לסמן אישור קבלת תוכן שיווקי');
                isSubmitting = false;
                return;
            }
            try {
                const response = await fetch('/api/clients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, status: 'New' }),
                });

                if (response.ok) {
                    popup.style.display = 'flex';
                    setTimeout(() => popup.classList.add('visible'), 10);
                    contactForm.reset();
                } else {
                    alert('שגיאה בשליחת הפנייה. אנא נסה שוב.');
                }
            } catch (error) {
                console.error('Error submitting contact form:', error);
                alert('שגיאה בשליחת הפנייה. אנא נסה שוב.');
            }
         finally {
            isSubmitting = false; // תמיד החזרת המשתנה למצב מנוטרל
        }
    });

        const closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click', () => {
            popup.classList.remove('visible');
            setTimeout(() => {
                popup.style.display = 'none';
                if (fireworksContainer) {
                    fireworksContainer.innerHTML = ''; // Clear fireworks on close
                }
            }, 500);
        });

        // Observer to trigger fireworks when popup becomes visible
        const popupObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('visible')) {
                        createFireworks();
                    }
                }
            }
        });

        popupObserver.observe(popup, { attributes: true });
    }
});
    function createFireworks() {
        const fireworksContainer = document.querySelector('.fireworks-container');
        if (!fireworksContainer) return;

        fireworksContainer.innerHTML = '';
        const particleCount = 150;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 200 + 50;
            const hue = Math.random() * 50 + 280;

            particle.style.setProperty('--color', `hsl(${hue}, 100%, 70%)`);
            
            // Set the final position
            particle.style.left = `${centerX + Math.cos(angle) * radius}px`;
            particle.style.top = `${centerY + Math.sin(angle) * radius}px`;

            // Stagger the animation for a natural effect
            particle.style.animationDelay = `${Math.random() * 0.3}s`;

            fireworksContainer.appendChild(particle);
        }
    }

    // --- Service Popup Logic ---
const serviceItems = document.querySelectorAll('.service-item[data-service]');
const servicePopup = document.getElementById('service-popup');

if (servicePopup) {
    const popupTitle = servicePopup.querySelector('#popup-title');
    const popupDescription = servicePopup.querySelector('#popup-description');
    const closePopupButton = servicePopup.querySelector('.close-popup');

    const openServicePopup = (service) => {
        // The 'translations' object is now globally available from translation.js
        if (!window.translations) {
            console.error('Translation data is not available.');
            return;
        }

        const lang = document.documentElement.lang || 'he';
        const titleKey = `popup_${service}_title`;
        const descKey = `popup_${service}_desc`;

        popupTitle.innerHTML = window.translations[lang][titleKey] || '';
        popupDescription.innerHTML = window.translations[lang][descKey] || '';

        servicePopup.style.display = 'flex';
        setTimeout(() => {
            servicePopup.classList.add('visible');
        }, 10);
    };

    const closeServicePopup = () => {
        servicePopup.classList.remove('visible');
        setTimeout(() => {
            servicePopup.style.display = 'none';
        }, 300); // Match CSS transition duration
    };

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const service = item.dataset.service;
            openServicePopup(service);
        });
    });

    closePopupButton.addEventListener('click', closeServicePopup);

    // Close when clicking the overlay
    servicePopup.addEventListener('click', (e) => {
        if (e.target === servicePopup) {
            closeServicePopup();
        }
    });
}
// --- End of Service Popup Logic ---
