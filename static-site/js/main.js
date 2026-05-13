// Navigation scroll effect
const nav = document.getElementById('navigation');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Demo Modal functionality
const demoModal = document.getElementById('demoModal');
const openDemoModalBtn = document.getElementById('openDemoModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const demoForm = document.getElementById('demoForm');

function openDemoModal() {
    demoModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeDemoModal() {
    demoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

// Open modal when button is clicked
openDemoModalBtn.addEventListener('click', openDemoModal);

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', closeDemoModal);

// Close modal when overlay is clicked
modalOverlay.addEventListener('click', closeDemoModal);

// Close modal when Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !demoModal.classList.contains('hidden')) {
        closeDemoModal();
    }
});

// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
    });
})();

// Handle demo form submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = demoForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const formData = {
        firstName: document.getElementById('demo-first-name').value,
        lastName: document.getElementById('demo-last-name').value,
        email: document.getElementById('demo-email').value,
        company: document.getElementById('demo-company').value,
        teamSize: document.getElementById('demo-team-size').value,
        role: document.getElementById('demo-role').value,
        useCase: document.getElementById('demo-use-case').value || 'Not provided',
        timeline: document.getElementById('demo-timeline').value
    };

    // Prepare email template parameters
    const emailParams = {
        to_email: 'varun.k@avashya.tech',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company,
        team_size: formData.teamSize,
        role: formData.role,
        use_case: formData.useCase,
        timeline: formData.timeline,
        reply_to: formData.email
    };

    console.log('Demo request submitted:', formData);

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
        .then(function(response) {
            console.log('Email sent successfully:', response.status, response.text);

            // Show success message
            alert(`Thank you, ${formData.firstName}! We've received your demo request and will contact you at ${formData.email} within 24 hours.`);

            // Reset form and close modal
            demoForm.reset();
            closeDemoModal();

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        })
        .catch(function(error) {
            console.error('Failed to send email:', error);

            // Show error message
            alert('Sorry, there was an error submitting your request. Please try again or contact us directly at varun.k@avashya.tech');

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };

    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your interest! We will get back to you within 24 hours.');

    // Reset form
    contactForm.reset();

    // In a real implementation, you would send this data to a server
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.section-header, .problem-card, .service-content, .feature-card, ' +
        '.aidlc-card, .platform-feature, .contact-content, .contact-form-wrapper'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add fade-in animation to elements as they scroll into view
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll(
        '.value-prop-card, .problem-card, .metric-item, ' +
        '.aidlc-card, .metric-card, .platform-feature'
    );

    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
});

// Add visible class when element is in view
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], div[id="framework"]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--color-primary);
        position: relative;
    }

    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
    }

    .mobile-nav-link.active {
        color: var(--color-primary);
        font-weight: 600;
        position: relative;
        padding-left: 1rem;
    }

    .mobile-nav-link.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 70%;
        background: var(--color-primary);
        border-radius: 2px;
    }
`;
document.head.appendChild(activeStyle);
