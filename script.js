// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// ===== MOBILE NAVIGATION =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// ===== PORTFOLIO FILTERING =====
function initializePortfolioFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Get all categories for this item (space-separated)
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show item with animation
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide item with animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize all items as visible with animation
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Staggered animation on load
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// ===== SKILLS ANIMATION =====
const animateSkills = () => {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
};

// Check if skills section is in viewport
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORMSPREE CONTACT FORM =====
if (contactForm) {
    // Form validation functions
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;
        
        // Clear previous errors
        clearFormErrors();
        
        // Name validation
        if (!name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (!subject) {
            showFieldError('subject', 'Subject is required');
            isValid = false;
        } else if (subject.length < 3) {
            showFieldError('subject', 'Subject must be at least 3 characters');
            isValid = false;
        }
        
        // Message validation
        if (!message) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Add error class to field
        field.classList.add('error');
        field.classList.remove('success');
        
        // Create or update error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearFormErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');
        
        const fields = contactForm.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('error');
            field.classList.remove('success');
        });
    }
    
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function setLoadingState(loading) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Set loading state
        setLoadingState(true);
        
        try {
            // Submit form to Formspree
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                
                showFormMessage(
                    `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`,
                    'success'
                );
                
                // Reset form and clear errors
                contactForm.reset();
                clearFormErrors();
                
                // Mark all fields as success
                const fields = contactForm.querySelectorAll('input, textarea');
                fields.forEach(field => {
                    field.classList.add('success');
                });
                
            } else {
                // Server error
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage(
                'Oops! Something went wrong. Please try again later or contact me directly at waqaskhank128@gmail.com',
                'error'
            );
            
        } finally {
            // Reset loading state
            setLoadingState(false);
        }
    });
    
    // Real-time form validation on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Clear field-specific error
            const errorElement = this.closest('.form-group').querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            
            // Update field styling
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('blur', function() {
            // Validate field on blur
            const value = this.value.trim();
            
            if (!value && this.hasAttribute('required')) {
                this.classList.add('error');
                this.classList.remove('success');
            } else if (value) {
                // Field-specific validation
                if (this.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showFieldError(this.id, 'Please enter a valid email address');
                    }
                }
            }
        });
    });
}

// ===== FOOTER CURRENT YEAR =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== INITIALIZE EVERYTHING =====
window.addEventListener('DOMContentLoaded', () => {
    // Initialize skill bars with 0 width
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Initialize portfolio filtering
    initializePortfolioFilter();
    
    // Add scroll animation for portfolio items
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize scroll animation on load
    setTimeout(animateOnScroll, 500);
    
    // Add CSS for error messages if not present
    addErrorStyles();
});

// Function to animate items on scroll
function animateOnScroll() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        if (item.style.display !== 'none') {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        }
    });
}

// Function to add error message styles dynamically
function addErrorStyles() {
    if (!document.querySelector('#error-styles')) {
        const style = document.createElement('style');
        style.id = 'error-styles';
        style.textContent = `
            .error-message {
                color: #ef4444;
                font-size: 0.85rem;
                margin-top: 5px;
                display: none;
            }
            
            .dark-theme .error-message {
                color: #fca5a5;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ENHANCED SCROLL PERFORMANCE =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Clear the timeout if it has already been set
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Set a timeout to run after scrolling ends
    scrollTimeout = setTimeout(() => {
        // Back to top button
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Animate portfolio items on scroll
        animateOnScroll();
    }, 100);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Portfolio filter navigation
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const btnArray = Array.from(filterBtns);
    const currentIndex = btnArray.indexOf(activeFilter);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % btnArray.length;
        btnArray[nextIndex].click();
        btnArray[nextIndex].focus();
    }
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + btnArray.length) % btnArray.length;
        btnArray[prevIndex].click();
        btnArray[prevIndex].focus();
    }
    
    // Space/Enter to activate focused filter
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('filter-btn')) {
        e.preventDefault();
        document.activeElement.click();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===== TOUCH DEVICE SUPPORT =====
// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize animations on resize
        animateOnScroll();
    }, 250);
});

// ===== DIRECT CONTACT BUTTONS =====
document.addEventListener('click', (e) => {
    // WhatsApp button click tracking
    if (e.target.closest('.direct-contact-btn.whatsapp')) {
        console.log('WhatsApp contact initiated');
        // You can add analytics here
    }
    
    // Messenger button click tracking
    if (e.target.closest('.direct-contact-btn.messenger')) {
        console.log('Messenger contact initiated');
        // You can add analytics here
    }
    
    // Email link click tracking
    if (e.target.closest('a[href^="mailto:"]')) {
        console.log('Email link clicked');
        // You can add analytics here
    }
    
    // Phone link click tracking
    if (e.target.closest('a[href^="tel:"]')) {
        console.log('Phone link clicked');
        // You can add analytics here
    }
});

// ===== LOADING STATE FOR BUTTONS =====
// Initialize all buttons with loading state support
document.querySelectorAll('.btn[type="submit"]').forEach(btn => {
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    if (btnText && btnLoading) {
        btn.dataset.originalText = btnText.textContent;
    }
});