/* Cravina Skincare - Main JavaScript File */

// =============================================================================
// MOBILE MENU FUNCTIONALITY
// =============================================================================

function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('show');
            }
        });
    }
}

// =============================================================================
// HEADER SCROLL EFFECT
// =============================================================================

function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(253, 242, 248, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #fdf2f8, #fef7f0)';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

// =============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================================================
// FAQ ACCORDION FUNCTIONALITY
// =============================================================================

function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Close all other open FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        if (otherAnswer && otherIcon) {
                            otherAnswer.classList.remove('active');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current FAQ
                if (answer && icon) {
                    answer.classList.toggle('active');
                    if (answer.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }
}

// =============================================================================
// CONTACT FORM FUNCTIONALITY
// =============================================================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic validation
            if (!formObject.fullName || !formObject.email || !formObject.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Show success message
                successMessage.classList.add('show');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);

                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }
}

// =============================================================================
// NOTIFICATION SYSTEM
// =============================================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 300px;
        font-family: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;

    // Set colors based on type
    if (type === 'error') {
        notification.style.background = '#fee';
        notification.style.color = '#c33';
        notification.style.borderLeft = '4px solid #c33';
    } else if (type === 'success') {
        notification.style.background = '#efe';
        notification.style.color = '#363';
        notification.style.borderLeft = '4px solid #363';
    } else {
        notification.style.background = '#eef';
        notification.style.color = '#336';
        notification.style.borderLeft = '4px solid #336';
    }

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    `;
    closeBtn.addEventListener('click', () => notification.remove());

    // Add to document
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
function addNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// =============================================================================
// IMAGE LAZY LOADING (OPTIONAL ENHANCEMENT)
// =============================================================================

function initLazyLoading() {
    // Only initialize if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// =============================================================================
// SCROLL TO TOP FUNCTIONALITY
// =============================================================================

function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;

    // Add hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.background = '#e55a2b';
    });
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.background = '#ff6b35';
    });

    // Add click functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    document.body.appendChild(scrollToTopBtn);
}

// =============================================================================
// FORM ENHANCEMENTS
// =============================================================================

function initFormEnhancements() {
    // Add floating labels to form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// =============================================================================
// ANIMATION ON SCROLL (OPTIONAL ENHANCEMENT)
// =============================================================================

function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .team-member, .testimonial-card, .benefit-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            animationObserver.observe(element);
        });

        // Add CSS for animation
        if (!document.querySelector('#scroll-animations')) {
            const style = document.createElement('style');
            style.id = 'scroll-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cravina website loaded successfully!');
    
    // Initialize core functionality
    initMobileMenu();
    initHeaderScrollEffect();
    initSmoothScrolling();
    initFAQAccordion();
    initContactForm();
    initFormEnhancements();
    
    // Add notification styles
    addNotificationStyles();
    
    // Initialize optional enhancements only if user doesn't prefer reduced motion
    if (!prefersReducedMotion()) {
        initScrollToTop();
        initScrollAnimations();
        initLazyLoading();
    }
});

// Handle page visibility changes (for performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible again, resume any paused animations or processes
        console.log('Page is now visible');
    } else {
        // Page is hidden, pause unnecessary processes
        console.log('Page is now hidden');
    }
});

// Handle window resize (debounced for performance)
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on window resize
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('show');
    }
}, 250));

// =============================================================================
// ERROR HANDLING
// =============================================================================

// Global error handler
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send error reports to your analytics service here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the error from being logged to console
});