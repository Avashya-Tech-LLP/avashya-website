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

// Password toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = togglePassword.querySelector('.eye-icon');
const eyeOffIcon = togglePassword.querySelector('.eye-off-icon');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    eyeIcon.classList.toggle('hidden');
    eyeOffIcon.classList.toggle('hidden');
});

// Login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Signing in...';

    // Simulate login (replace with actual authentication)
    setTimeout(() => {
        console.log('Login attempt:', { email, password, remember });

        // Simulate successful login
        alert('Login functionality will be connected to your authentication system.\n\nFor demo purposes, this would redirect to the platform dashboard.');

        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // In production, redirect to dashboard:
        // window.location.href = '/dashboard';
    }, 1500);
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const provider = btn.textContent.includes('Google') ? 'Google' : 'GitHub';
        alert(`${provider} authentication will be integrated with your OAuth provider.\n\nThis would redirect to ${provider} login.`);

        // In production, redirect to OAuth provider:
        // window.location.href = `/auth/${provider.toLowerCase()}`;
    });
});

// Demo Modal functionality (same as main site)
const demoModal = document.getElementById('demoModal');
const openDemoModalFromLogin = document.getElementById('openDemoModalFromLogin');
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

// Open modal when "Request Demo" link is clicked
if (openDemoModalFromLogin) {
    openDemoModalFromLogin.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
}

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

// Initialize EmailJS (only if you've configured it)
if (typeof emailjs !== 'undefined') {
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
} else {
    // EmailJS not loaded, just show success message
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('demo-first-name').value;

        alert(`Thank you, ${firstName}! We've received your demo request and will contact you within 24 hours.`);

        demoForm.reset();
        closeDemoModal();
    });
}

// Forgot password
document.querySelector('.forgot-password')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality will be integrated with your authentication system.\n\nThis would send a password reset email.');

    // In production, show password reset modal or redirect:
    // window.location.href = '/forgot-password';
});
