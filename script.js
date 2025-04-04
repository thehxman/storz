// Import chat sequences
import chatSequences from './chat-sequences.js';

document.addEventListener('DOMContentLoaded', () => {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.textContent.toLowerCase();
            if (lang === 'english') {
                window.location.href = 'index.html';
            } else if (lang === 'español') {
                window.location.href = 'index-es.html';
            }
        });
    });

    // Initialize carousel
    const carousel = {
        container: document.querySelector('.carousel-container'),
        slides: document.querySelectorAll('.carousel-slide'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('.carousel-slide').length,
        stepItems: document.querySelectorAll('.step-item'),
        autoPlayDelay: 5000, // 5 seconds between slides
        timer: null,

        init() {
            if (!this.container || this.slides.length === 0) return;
            
            // Show first slide
            this.showSlide(0);
            
            // Add click listeners to step items
            this.stepItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    const step = item.dataset.step;
                    const targetSlide = Array.from(this.slides).findIndex(
                        slide => slide.dataset.step === step
                    );
                    if (targetSlide !== -1) {
                        this.showSlide(targetSlide);
                    }
                });
            });

            // Start autoplay
            this.startAutoPlay();

            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        },

        showSlide(index) {
            // Remove active class from all slides
            this.slides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to current slide
            this.slides[index].classList.add('active');
            
            // Update current slide index
            this.currentSlide = index;

            // Update active step
            const currentStep = this.slides[index].dataset.step;
            this.stepItems.forEach(item => {
                if (item.dataset.step === currentStep) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        },

        nextSlide() {
            const next = (this.currentSlide + 1) % this.totalSlides;
            this.showSlide(next);
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

    // Initialize carousel
    carousel.init();

    // Chat animation setup
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
            // When current sequence ends, switch to the next sequence after a delay
            setTimeout(() => {
                chatContainer.innerHTML = ''; // Clear the container
                currentSequenceIndex = (currentSequenceIndex + 1) % sequences.length;
                messageIndex = 0;
                addChatItem(chatSequences[sequences[currentSequenceIndex]][0]);
            }, 5000); // Wait 5 seconds before switching sequences
        }
    }

    // Stats counter animation function
    function animateCounter(statElement) {
        const target = parseInt(statElement.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Will take 50 steps to reach target
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

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

    // Create a single IntersectionObserver for all animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to all animated elements
                entry.target.classList.add('animate-in');
                
                // Handle carousel visibility
                if (entry.target.classList.contains('image-carousel')) {
                    carousel.startAutoPlay();
                }
                
                // Handle stats animation
                if (entry.target.classList.contains('stat-card')) {
                    const statElement = entry.target.querySelector('h3[data-target]');
                    if (statElement) {
                        animateCounter(statElement);
                    }
                }
            } else {
                // Stop carousel when it goes out of view
                if (entry.target.classList.contains('image-carousel')) {
                    carousel.stopAutoPlay();
                }
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all animated elements
    document.querySelectorAll('.hero-content, .stat-card, .feature-card, .problem-point, .highlight, .solution h2, .cta-section, .step-item, .image-carousel').forEach(el => {
        animationObserver.observe(el);
    });

    // Start chat animation
    setTimeout(() => addChatItem(chatSequences[sequences[currentSequenceIndex]][0]), 1000);

    // Phone floating animation
    const phone = document.querySelector('.floating-phone');
    if (phone) {
        phone.style.transform = 'translateY(-50%)';
        phone.classList.add('animate-float');
    }

    // Arrow animation with device motion and mouse movement
    const problemImage = document.querySelector('.problem-image');
    const arrowImage = document.querySelector('.dashboard-image');
    
    if (problemImage && arrowImage) {
        // Mouse movement effect
        problemImage.addEventListener('mousemove', (e) => {
            const rect = problemImage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            arrowImage.style.transform = `
                translate(${x * 20}px, ${y * 20}px)
                rotate(${x * 5}deg)
            `;
        });

        // Reset position when mouse leaves
        problemImage.addEventListener('mouseleave', () => {
            arrowImage.style.transform = 'translate(0, 0) rotate(0deg)';
        });

        // Device motion effect
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

    // Add intersection observer for stats intro animation
    const statsIntro = document.querySelector('.stats-intro');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (statsIntro) {
        observer.observe(statsIntro);
    }
}); 