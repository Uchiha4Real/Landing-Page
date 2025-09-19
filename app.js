// Aura Landing Page JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initSmoothScrolling();
    initScrollAnimations();
    init3DModels();
    initColorPicker();
    initTabs();
    initTestimonials();
    initForms();
    initHotspots();
});

// Header functionality
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling functionality - FIXED
function initSmoothScrolling() {
    // Handle CTA buttons with data-scroll-to attribute
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle navigation links - FIXED
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Map navigation links to actual section IDs
            let targetId = '';
            switch(href) {
                case '#auraphone':
                    targetId = 'spotlights';
                    break;
                case '#aurawatch':
                    targetId = 'spotlights';
                    break;
                case '#ecosystem':
                    targetId = 'synergy';
                    break;
                case '#specs':
                    targetId = 'specs';
                    break;
                default:
                    targetId = href.substring(1);
            }
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle all CTA buttons
    document.querySelectorAll('.btn-cta, .btn-primary').forEach(button => {
        if (!button.closest('form')) { // Exclude form submit buttons
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Determine target based on button context
                let targetElement;
                if (this.classList.contains('hero-cta')) {
                    targetElement = document.getElementById('synergy');
                } else {
                    targetElement = document.getElementById('final-cta');
                }
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute('data-aos')) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe synergy cards
    document.querySelectorAll('.synergy-card').forEach(card => {
        observer.observe(card);
    });

    // Observe spotlight sections
    document.querySelectorAll('.spotlight').forEach(spotlight => {
        observer.observe(spotlight);
    });
}

// 3D Models interaction - FIXED
function init3DModels() {
    const phoneModel = document.getElementById('phoneModel');
    const watchModel = document.getElementById('watchModel');
    
    function setupModel(model) {
        const modelDevice = model.querySelector('.model-device');
        let currentRotationX = 0;
        let currentRotationY = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        // Mouse events
        model.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            model.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            currentRotationY += deltaX * 0.5;
            currentRotationX -= deltaY * 0.5;

            // Limit rotation
            currentRotationX = Math.max(-45, Math.min(45, currentRotationX));

            modelDevice.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                model.style.cursor = 'grab';
            }
        });

        // Touch events for mobile
        model.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            currentRotationY += deltaX * 0.5;
            currentRotationX -= deltaY * 0.5;

            currentRotationX = Math.max(-45, Math.min(45, currentRotationX));

            modelDevice.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

            startX = touch.clientX;
            startY = touch.clientY;
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Initial transform setup
        modelDevice.style.transform = 'rotateX(0deg) rotateY(0deg)';
        modelDevice.style.transition = 'transform 0.1s ease-out';
    }

    if (phoneModel) setupModel(phoneModel);
    if (watchModel) setupModel(watchModel);
}

// Hotspots functionality - FIXED
function initHotspots() {
    const popup = document.getElementById('featurePopup');
    const popupTitle = popup.querySelector('.popup-title');
    const popupDescription = popup.querySelector('.popup-description');
    const closeBtn = popup.querySelector('.popup-close');

    const featureData = {
        camera: {
            title: 'Stellar Camera Array',
            description: '108MP sensor with AI-powered astrophotography mode. Capture the universe in stunning detail with our advanced computational photography system that rivals professional equipment.'
        },
        display: {
            title: 'Nebula Display Technology',
            description: '6.7" Dynamic AMOLED with CrystalClear 2.0 technology. Experience colors beyond reality with our quantum dot enhancement and 144Hz refresh rate for the smoothest interactions.'
        },
        crown: {
            title: 'Haptic Digital Crown',
            description: 'Precision control with intuitive haptic feedback. Navigate your digital world with the perfect blend of tactile and digital interaction, featuring 360-degree rotation detection.'
        },
        sensor: {
            title: 'Bio-Harmonic Sensor',
            description: 'Clinical-grade health monitoring with ECG, SpO2, and advanced biometric tracking. Your health, precisely measured with sensors that provide medical-grade accuracy in a consumer device.'
        }
    };

    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            const feature = this.getAttribute('data-feature');
            const data = featureData[feature];
            
            if (data) {
                popupTitle.textContent = data.title;
                popupDescription.textContent = data.description;
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    closeBtn.addEventListener('click', closePopup);

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// Color picker functionality - FIXED
function initColorPicker() {
    const colorOptions = document.querySelectorAll('.color-option');
    const phoneModel = document.querySelector('.auraphone-model .model-device');
    const watchModel = document.querySelector('.aurawatch-model .model-device');

    const colorMap = {
        silver: 'linear-gradient(145deg, #f8f8f8, #e0e0e0)',
        black: 'linear-gradient(145deg, #404040, #1a1a1a)',
        blue: 'linear-gradient(145deg, #3b82f6, #1e40af)'
    };

    colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get selected color
            const color = this.getAttribute('data-color');
            const gradient = colorMap[color];
            
            // Apply color to both models with animation
            if (phoneModel && gradient) {
                phoneModel.style.transition = 'background 0.5s ease';
                phoneModel.style.background = gradient;
            }
            if (watchModel && gradient) {
                watchModel.style.transition = 'background 0.5s ease';
                watchModel.style.background = gradient;
            }

            // Visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab + '-specs');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Testimonials carousel
function initTestimonials() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = 350 + 32; // card width + gap
    let isAutoScrolling = true;
    let autoScrollInterval;

    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
        isAutoScrolling = false;
    }

    // Button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevSlide();
        });
    }

    // Touch/mouse drag support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        stopAutoScroll();
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const endX = e.clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Touch events
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoScroll();
    });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Pause auto-scroll on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', () => {
        if (!isAutoScrolling) {
            isAutoScrolling = true;
            startAutoScroll();
        }
    });

    // Start auto-scroll
    startAutoScroll();
}

// Form handling
function initForms() {
    // Pre-order form
    const preorderForm = document.querySelector('.preorder-form');
    
    if (preorderForm) {
        preorderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneColor = document.getElementById('phone-color').value;
            const watchSize = document.getElementById('watch-size').value;
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                submitBtn.textContent = 'Order Confirmed! ✓';
                submitBtn.style.background = 'linear-gradient(45deg, #00f2ea, #ff00c1)';
                submitBtn.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                }, 3000);
            }, 2000);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        const submitBtn = newsletterForm.querySelector('button');
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (submitBtn && emailInput) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                
                if (!email) {
                    emailInput.style.borderColor = '#ff00c1';
                    emailInput.placeholder = 'Please enter your email';
                    return;
                }
                
                if (!isValidEmail(email)) {
                    emailInput.style.borderColor = '#ff00c1';
                    emailInput.value = '';
                    emailInput.placeholder = 'Please enter a valid email';
                    return;
                }
                
                const originalText = this.textContent;
                this.textContent = 'Subscribed ✓';
                this.style.background = '#00f2ea';
                this.style.color = '#0a0328';
                emailInput.value = '';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                    emailInput.placeholder = 'Get Aura Updates';
                    emailInput.style.borderColor = '';
                }, 3000);
            });
        }
    }
}

// Utility function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.particles');
    
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }

    // Add scroll-based animations for other elements
    const heroDevices = document.querySelectorAll('.hero-devices .device');
    heroDevices.forEach((device, index) => {
        const speed = scrolled * (0.1 + index * 0.05);
        device.style.transform = `translateY(${speed}px) rotateY(${scrolled * 0.1}deg)`;
    });
});

// Add enhanced hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('synergy-card')) {
        e.target.style.transform = 'translateY(-15px) scale(1.02)';
        e.target.style.boxShadow = '0 25px 50px rgba(0, 242, 234, 0.3)';
    }
    
    if (e.target.classList.contains('testimonial-card')) {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
        e.target.style.boxShadow = '0 20px 40px rgba(255, 0, 193, 0.3)';
    }
    
    if (e.target.classList.contains('spec-item')) {
        e.target.style.transform = 'translateY(-8px)';
        e.target.style.boxShadow = '0 15px 30px rgba(0, 242, 234, 0.2)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('synergy-card') || 
        e.target.classList.contains('testimonial-card') || 
        e.target.classList.contains('spec-item')) {
        
        e.target.style.transform = '';
        e.target.style.boxShadow = '';
    }
});

// Add loading animation for devices
function simulateDeviceLoad() {
    const devices = document.querySelectorAll('.device, .model-device');
    
    devices.forEach((device, index) => {
        device.style.opacity = '0';
        device.style.transform = 'translateY(50px) rotateY(-10deg)';
        
        setTimeout(() => {
            device.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            device.style.opacity = '1';
            device.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 300 + 800);
    });
}

// Initialize device loading animation
setTimeout(simulateDeviceLoad, 500);

// Add performance optimization for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            break;
        case 'ArrowDown':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
            break;
        case ' ':
            if (e.target === document.body) {
                e.preventDefault();
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }
            break;
    }
});

// Add intersection observer for performance optimization
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Activate expensive animations
            if (element.classList.contains('stellar-chip')) {
                element.style.animation = 'chipPulse 2s ease-in-out infinite';
            }
            if (element.classList.contains('device-screen')) {
                element.style.animation = 'screenGlow 3s ease-in-out infinite alternate';
            }
        } else {
            // Pause expensive animations when out of view
            if (element.classList.contains('stellar-chip')) {
                element.style.animation = 'none';
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe performance-heavy elements
document.querySelectorAll('.stellar-chip, .device-screen').forEach(element => {
    performanceObserver.observe(element);
});

console.log('🌟 Aura landing page initialized successfully with all features working!');