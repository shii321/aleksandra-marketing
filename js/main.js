// ======================== MOBILE MENU FUNCTIONS ========================
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburger = document.querySelector('.hamburger');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    const isActive = mobileMenu.classList.contains('active');
    
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Update ARIA attributes
    toggleButton.setAttribute('aria-expanded', !isActive);
    overlay.setAttribute('aria-hidden', isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isActive ? 'hidden' : '';
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburger = document.querySelector('.hamburger');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    
    // Update ARIA attributes
    toggleButton.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    
    document.body.style.overflow = '';
}

function toggleServices() {
    const dropdown = document.querySelector('.services-dropdown');
    const arrow = document.querySelector('.services-arrow');
    const toggle = document.querySelector('.services-toggle');
    
    const isActive = dropdown.classList.contains('active');
    
    dropdown.classList.toggle('active');
    arrow.classList.toggle('active');
    
    // Update ARIA attributes
    toggle.setAttribute('aria-expanded', !isActive);
    dropdown.setAttribute('aria-hidden', isActive);
}

// ======================== ACTIVE SECTION TRACKING ========================
let ticking = false; // Для throttle

function updateActiveSection() {
    const sections = document.querySelectorAll('#about, #services, #portfolio, #contact');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-section]');
    
    let currentSection = '';
    const offset = 150;
    
    sections.forEach(section => {
        if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            if (sectionTop <= offset && sectionBottom > offset) {
                currentSection = section.id;
            }
        }
    });
    
    // Default to 'about' at the top of page
    if (window.scrollY < 100) {
        currentSection = 'about';
    }
    
    // Update all nav links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        const linkSection = link.getAttribute('data-section');
        link.classList.toggle('active', linkSection === currentSection);
    });
    
    ticking = false;
}

// Throttle scroll events for better performance
function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
    }
}

// ======================== EVENT LISTENERS ========================
window.addEventListener('scroll', requestTick);
window.addEventListener('load', updateActiveSection);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Click outside to close mobile menu
document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !toggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// ======================== SMOOTH SCROLL ========================
document.addEventListener('click', (e) => {
    // Check if clicked element is an anchor with hash
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.querySelector('.mobile-menu.active')) {
            closeMobileMenu();
        }
    }
});

// ======================== KEYBOARD NAVIGATION ========================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// ======================== INITIALIZE ========================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active section
    updateActiveSection();
    
    // Ensure mobile menu is closed on load
    closeMobileMenu();
});