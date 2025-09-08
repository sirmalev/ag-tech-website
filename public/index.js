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

    // Advanced "Neural Flow" Canvas Animation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        const options = {
            particleColor: "rgb(141, 95, 241)",
            lineColor: "rgb(141, 95, 241)",
            particleAmount: 30,
            defaultRadius: 1.5,
            variantRadius: 1,
            defaultSpeed: 0.3,
            variantSpeed: 0.5,
            linkRadius: 180,
        };

        if (window.innerWidth > 768) {
            options.particleAmount = 60;
        }
        if (window.innerWidth > 1200) {
            options.particleAmount = 80;
        }

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = options.defaultRadius + Math.random() * options.variantRadius;
                this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
                this.directionAngle = Math.floor(Math.random() * 360);
                this.vector = {
                    x: Math.cos(this.directionAngle) * this.speed,
                    y: Math.sin(this.directionAngle) * this.speed
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = options.particleColor;
                ctx.fill();
            }

            update() {
                this.border();
                this.x += this.vector.x;
                this.y += this.vector.y;
            }

            border() {
                if (this.x >= canvas.width || this.x <= 0) {
                    this.vector.x *= -1;
                }
                if (this.y >= canvas.height || this.y <= 0) {
                    this.vector.y *= -1;
                }
                if (this.x > canvas.width) this.x = canvas.width;
                if (this.y > canvas.height) this.y = canvas.height;
                if (this.x < 0) this.x = 0;
                if (this.y < 0) this.y = 0;
            }
        }

        function setup() {
            particles = [];
            for (let i = 0; i < options.particleAmount; i++) {
                particles.push(new Particle());
            }
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(loop);
        }

        function linkParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const O = particles[i];
                    const T = particles[j];
                    const distance = Math.sqrt(
                        (O.x - T.x) * (O.x - T.x) +
                        (O.y - T.y) * (O.y - T.y)
                    );
                    if (distance < options.linkRadius) {
                        const opacity = 1 - (distance / options.linkRadius);
                        ctx.strokeStyle = `rgba(141, 95, 241, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(O.x, O.y);
                        ctx.lineTo(T.x, T.y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }
        
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(particles.length === 0) {
                setup();
            }
            linkParticles();
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = window.requestAnimationFrame(loop);
        }

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

            const phoneRegex = /^\d{10}$/;

            if (!phoneRegex.test(phone)) {
                alert('מספר הטלפון אינו תקין. הוא חייב להכיל 10 ספרות בלבד, ללא רווחים או תווים אחרים.');
                isSubmitting = false;
                return; // עצירת שליחת הטופס
                
            }

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