// ================================
// 📦 Import Chat Sequences (Shared Across Page)
// ================================
import chatSequences from './chat-sequences.js';

document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // 🌐 General: Language Switcher
    // ================================
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.textContent.toLowerCase();
            if (lang === 'english') window.location.href = 'index.html';
            else if (lang === 'español') window.location.href = 'es.html';
        });
    });

    // ================================
    // 🧠 General: Hide benefit paragraphs on page load
    // ================================
    document.querySelectorAll('.benefit-content p').forEach(p => {
        p.style.display = 'none';
        p.style.maxHeight = '0';
        p.style.opacity = '0';
        p.style.visibility = 'hidden';
    });

    // ================================
    // 🧠 General: Intersection Observer Setup for .animate-in elements
    // ================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // 📽️ Hero: Start carousel if visible
                if (entry.target.classList.contains('image-carousel')) {
                    carousel.startAutoPlay();
                }

                // 📊 Stats: Start stat counter if visible
                if (entry.target.classList.contains('stat-card')) {
                    const statElement = entry.target.querySelector('h3[data-target]');
                    if (statElement) animateCounter(statElement);
                }
            } else {
                if (entry.target.classList.contains('image-carousel')) {
                    carousel.stopAutoPlay();
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(
        '.hero-content, .stat-card, .feature-card, .problem-point, .highlight, .benefit h2, .cta-section, .step-item, .image-carousel, .problem-container, .stats-intro, .problem-header, .section-header, .mobile-group'
    ).forEach(el => animationObserver.observe(el));

    // ================================
    // 🦸 Hero Section: Carousel Logic
    // ================================
    const carousel = {
        container: document.querySelector('.carousel-container'),
        slides: document.querySelectorAll('.carousel-slide'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('.carousel-slide').length,
        stepItems: document.querySelectorAll('.step-item'),
        autoPlayDelay: 5000,
        timer: null,

        init() {
            if (!this.container || this.slides.length === 0) return;
            this.showSlide(0);

            // Add event listeners for step items
            this.stepItems.forEach((item) => {
                item.addEventListener('click', () => {
                    const step = item.dataset.step;
                    const targetSlide = Array.from(this.slides).findIndex(
                        slide => slide.dataset.step === step
                    );
                    if (targetSlide !== -1) this.showSlide(targetSlide);
                });
            });

            // Start autoplay and add pause on hover
            this.startAutoPlay();
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());

            // Pause on mobile touch
            this.container.addEventListener('touchstart', () => this.stopAutoPlay());
            this.container.addEventListener('touchend', () => this.startAutoPlay());
        },

        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.slides[index].classList.add('active');
            this.currentSlide = index;

            const currentStep = this.slides[index].dataset.step;
            this.stepItems.forEach(item => {
                item.classList.toggle('active', item.dataset.step === currentStep);
            });
        },

        nextSlide() {
            this.showSlide((this.currentSlide + 1) % this.totalSlides);
        },

        startAutoPlay() {
            if (this.timer) this.stopAutoPlay();
            this.timer = setInterval(() => this.nextSlide(), this.autoPlayDelay);
        },

        stopAutoPlay() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    };
    // Make carousel available globally
    window.carousel = carousel;
    carousel.init();

    // ================================
    // 📱 Hero Section: Floating Phone Animation
    // ================================
    const phone = document.querySelector('.floating-phone');
    if (phone) {
        phone.style.transform = 'translateY(-50%)';
        phone.classList.add('animate-float');
    }

    // ================================
    // 📊 Stats Section: Stat Card Counter Animation
    // ================================
    function animateCounter(statElement) {
        const target = parseInt(statElement.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const stepTime = 2000 / 50;

        function updateCounter() {
            if (current < target) {
                current += increment;
                statElement.textContent = Math.round(current) + '%';
                setTimeout(updateCounter, stepTime);
            } else {
                statElement.textContent = target + '%';
            }
        }

        updateCounter();
    }

    // ================================
    // 📊 Stats Section: Reveal Intro Heading
    // ================================
    const statsIntro = document.querySelector('.stats-intro');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (statsIntro) observer.observe(statsIntro);

    // ================================
    // 💬 Chat Section: Looping Chat & Product Animation
    // ================================
    const chatContainer = document.querySelector('.messages-wrapper');
    const sequences = ['groceryList', 'spaghetti', 'gardening'];
    let currentSequenceIndex = 0;
    let messageIndex = 0;

    function addChatItem(item) {
        if (item.type === 'message') {
            const messageEl = document.createElement('div');
            messageEl.classList.add('message', item.class, 'typing');
            messageEl.textContent = item.content;
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(20px)';
            chatContainer.appendChild(messageEl);

            setTimeout(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateY(0)';
                messageEl.style.transition = 'all 0.3s ease-out';
            }, 100);
        } else if (item.type === 'product') {
            const productEl = document.createElement('div');
            productEl.classList.add('product-card');
            productEl.innerHTML = `
                <div class="product-icon">${item.content.icon}</div>
                <div class="product-info">
                    <span class="product-name">${item.content.name}</span>
                    <span class="product-price">${item.content.price}</span>
                    <span class="product-location">${item.content.location}</span>
                </div>
            `;
            productEl.style.opacity = '0';
            productEl.style.transform = 'translateY(20px)';
            chatContainer.appendChild(productEl);

            setTimeout(() => {
                productEl.style.opacity = '1';
                productEl.style.transform = 'translateY(0)';
                productEl.style.transition = 'all 0.3s ease-out';
            }, 100);
        }

        messageIndex++;
        const currentSequence = chatSequences[sequences[currentSequenceIndex]];

        if (messageIndex < currentSequence.length) {
            setTimeout(() => addChatItem(currentSequence[messageIndex]), currentSequence[messageIndex].delay);
        } else {
            setTimeout(() => {
                chatContainer.innerHTML = '';
                currentSequenceIndex = (currentSequenceIndex + 1) % sequences.length;
                messageIndex = 0;
                addChatItem(chatSequences[sequences[currentSequenceIndex]][0]);
            }, 5000);
        }
    }

    setTimeout(() => addChatItem(chatSequences[sequences[currentSequenceIndex]][0]), 1000);

    // ================================
    // 📉 Problem Section: Dashboard Image Movement (Mouse + Device)
    // ================================
    const problemImage = document.querySelector('.problem-image');
    const arrowImage = document.querySelector('.dashboard-image');

    if (problemImage && arrowImage) {
        problemImage.addEventListener('mousemove', (e) => {
            const rect = problemImage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            arrowImage.style.transform = `
                translate(${x * 20}px, ${y * 20}px)
                rotate(${x * 5}deg)
            `;
        });

        problemImage.addEventListener('mouseleave', () => {
            arrowImage.style.transform = 'translate(0, 0) rotate(0deg)';
        });

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', (e) => {
                const x = e.accelerationIncludingGravity.x * 2;
                const y = e.accelerationIncludingGravity.y * 2;

                arrowImage.style.transform = `
                    translate(${x}px, ${y}px)
                    rotate(${x}deg)
                `;
            });
        }
    }

    // ================================
    // 💡 Scroll Reveal for All Sections (Benefits, solution, Problem)
    // ================================
    function initScrollReveal() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const elements = document.querySelectorAll(
            '.stat-card, .problemtext-item, .step-group, .benefit-item, .problem-header'
        );

        elements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    initScrollReveal();

    // ================================
    // 📏 Responsive Fixes: Reinit ScrollReveal on Resize
    // ================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.remove('revealed'));
            initScrollReveal();
        }, 250);
    });

    // ================================
    // 📋 Problem Section: Toggle Expandable Items
    // ================================
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if this item is already expanded
            const isExpanded = item.classList.contains('expanded');

            // Close other items when clicking a new item
            problemItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });

            // Toggle the current item
            if (isExpanded) {
                // Close this item if it's already expanded
                item.classList.remove('expanded');
            } else {
                // Open this item if it's not expanded
                item.classList.add('expanded');
            }
        });
    });

    // ================================
    // 🎁 Benefits Section: Toggle Expandable Items (Accordion)
    // ================================
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if this item is already expanded
            const isExpanded = item.classList.contains('expanded');

            // Close other items when clicking a new item
            benefitItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    // Hide paragraph for other items
                    const paragraph = otherItem.querySelector('.benefit-content p');
                    otherItem.classList.remove('expanded');
                    paragraph.style.maxHeight = '0';
                    paragraph.style.opacity = '0';

                    // Use setTimeout to allow the transition to complete before hiding
                    setTimeout(() => {
                        paragraph.style.display = 'none';
                        paragraph.style.visibility = 'hidden';
                    }, 300); // Match this to your transition duration
                }
            });

            // Toggle the current item
            if (isExpanded) {
                // Close this item if it's already expanded
                const paragraph = item.querySelector('.benefit-content p');
                item.classList.remove('expanded');
                paragraph.style.maxHeight = '0';
                paragraph.style.opacity = '0';

                // Use setTimeout to allow the transition to complete before hiding
                setTimeout(() => {
                    paragraph.style.display = 'none';
                    paragraph.style.visibility = 'hidden';
                }, 300);
            } else {
                // Open this item if it's not expanded
                item.classList.add('expanded');
                const paragraph = item.querySelector('.benefit-content p');
                paragraph.style.display = 'block';
                paragraph.style.visibility = 'visible';

                // Use setTimeout to allow the display change to take effect first
                setTimeout(() => {
                    paragraph.style.maxHeight = '200px';
                    paragraph.style.opacity = '1';
                }, 10);
            }
        });
    });

});
