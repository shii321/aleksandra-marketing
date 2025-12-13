// ============================================
// АВТООБНОВЛЯЮЩИЙСЯ ТАЙМЕР НА 15 ДНЕЙ
// ============================================

(function() {
    'use strict';

    // Константы
    const DAYS_DURATION = 15;
    const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    const CYCLE_DURATION = DAYS_DURATION * MILLISECONDS_IN_DAY;
    const BASE_DATE = new Date('2025-01-01T00:00:00Z').getTime();

    function formatNumber(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    function getCurrentCyclePosition() {
        const now = Date.now();
        const timeSinceBase = now - BASE_DATE;
        const positionInCycle = timeSinceBase % CYCLE_DURATION;
        const timeLeft = CYCLE_DURATION - positionInCycle;
        return timeLeft;
    }

    function updateTimer() {
        const timeLeft = getCurrentCyclePosition();
        const countdownElement = document.getElementById('countdown');
        const expiredElement = document.getElementById('expired');

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = formatNumber(days);
        if (hoursElement) hoursElement.textContent = formatNumber(hours);
        if (minutesElement) minutesElement.textContent = formatNumber(minutes);
        if (secondsElement) secondsElement.textContent = formatNumber(seconds);

        if (countdownElement) countdownElement.style.display = 'flex';
        if (expiredElement) expiredElement.style.display = 'none';
    }

    function initTimer() {
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimer);
    } else {
        initTimer();
    }
})();

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================

window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && hamburger && overlay) {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
};

window.closeMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && hamburger && overlay) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.toggleServices = function() {
    const dropdown = document.querySelector('.services-dropdown');
    const arrow = document.querySelector('.services-arrow');
    
    if (dropdown && arrow) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');
    }
};

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                e.preventDefault();
                const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
                const targetPosition = section.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (this.classList.contains('mobile-nav-link')) {
                    closeMobileMenu();
                }
            }
        });
    });
});

// ============================================
// АВТОМАТИЧЕСКИЙ СЛАЙДЕР УСЛУГ
// ============================================

(function() {
    'use strict';

    function initServicesSlider() {
        const sliderTrack = document.querySelector('.slider-track');
        
        if (sliderTrack) {
            const cards = sliderTrack.querySelectorAll('.service-card');
            
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                sliderTrack.appendChild(clone);
            });
            
            createSliderDots(cards.length);
        }
    }

    function createSliderDots(count) {
        const dotsContainer = document.querySelector('.slider-dots');
        
        if (dotsContainer) {
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = 'slider-dot';
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            }
            
            updateActiveDot(count);
        }
    }

    function updateActiveDot(totalSlides) {
        const dots = document.querySelectorAll('.slider-dot');
        const slideDuration = 40000 / totalSlides;
        
        setInterval(() => {
            const currentTime = Date.now();
            const currentSlide = Math.floor((currentTime % 40000) / slideDuration);
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicesSlider);
    } else {
        initServicesSlider();
    }
})();

// ============================================
// МОДАЛЬНЫЕ ОКНА ДЛЯ КЕЙСОВ
// ============================================

const cases = [
    {
        company: "KAIF",
        industry: "Sports & Spa",
        position: "Head of Sales & Marketing",
        location: "Phuket",
        description: `Led comprehensive business transformation for a multi-functional sports complex featuring gym, spa, restaurant, and fight club facilities.

        <strong>Key Achievements:</strong>
        • Assembled and trained sales team from scratch, improving conversion rates by 65%
        • Implemented CRM system automating 80% of sales processes and lead management
        • Organized large-scale sports and entertainment events, increasing brand awareness
        • Built strategic partnerships with travel agencies and fitness influencers
        • Integrated AI chatbot for customer service, reducing response time by 90%

        <strong>Services Used:</strong> Strategy, CRM, Event Marketing, Partnerships, AI Solutions`,
        metrics: "CRM Automation: 80% | Team Training: Complete | Sports Events: 12+"
    },
    {
        company: "SOHO Club",
        industry: "Iranian Restaurant & Night Club",
        position: "Sales & Marketing Manager", 
        location: "Phuket",
        description: `Complete brand launch and marketing strategy for Iranian cuisine restaurant with nightclub entertainment.

        <strong>Key Achievements:</strong>
        • Organized professional food photography sessions creating high-quality visual content
        • Developed complete brand identity including logo, color palette, and visual guidelines
        • Managed social media presence across all platforms with consistent branding
        • Built relationships with food influencers and industry partners
        • Oversaw website development from concept to launch

        <strong>Services Used:</strong> Content, Web Development, Strategy, Influencer Marketing`,
        metrics: "Brand Launch: Complete | Social Growth: 300% | Website: From Zero"
    },
    {
        company: "Lychee Studio", 
        industry: "Beauty Salon & Spa",
        position: "Sales Manager",
        location: "Phuket",
        description: `Sales optimization and team development for premium beauty salon and spa services.

        <strong>Key Achievements:</strong>
        • Built complete sales funnels from lead generation to retention
        • Boosted customer lifetime value through loyalty programs
        • Recruited and trained sales team on closing techniques
        • Implemented upsell strategies and personalized follow-ups
        • Developed pricing strategies for different market segments

        <strong>Services Used:</strong> Strategy, CRM, Email Marketing`,
        metrics: "Sales Funnel: Complete | LTV Increase: 45% | Team Training: 100%"
    },
    {
        company: "Vnail Studio",
        industry: "Beauty Salon Chain",
        position: "Manager | Sales | Marketing",
        location: "Russia",
        description: `Complete business digitization and CRM implementation across 4-location beauty salon chain.

        <strong>Key Achievements:</strong>
        • Implemented integrated CRM system across all 4 locations
        • Built and trained sales team with comprehensive processes
        • Digitized business operations from traditional to automated workflows
        • Created detailed sales funnels and conversion tracking systems
        • Established KPI dashboards for real-time performance monitoring

        <strong>Services Used:</strong> CRM, Strategy, Content, Sales Team Management`,
        metrics: "Locations: 4 salons | CRM Integration: 100% | Process Automation: 85%"
    },
    {
        company: "Unique Club",
        industry: "Premium Restaurant",
        position: "Ads Manager", 
        location: "Phuket",
        description: `Targeted advertising campaign management for upscale dining establishment.

        <strong>Key Achievements:</strong>
        • Created engaging copy tailored for different social media platforms
        • Designed visual creatives optimized for social media requirements
        • Generated unique tracking links for performance monitoring
        • Researched high-performing groups with relevant demographics
        • Analyzed engagement rates and optimized placement strategy

        <strong>Services Used:</strong> Targeted Advertising, Content`,
        metrics: "Ad Placements: 15+ platforms | Click-through: +40% | Tracking: 100% coverage"
    },
    {
        company: "GASTRONOM",
        industry: "Farm Meat Cafe & Production",
        position: "SMM & Marketing Manager",
        location: "Phuket",
        description: `Social media marketing and content strategy for farm-to-table meat production and cafe.

        <strong>Key Achievements:</strong>
        • Daily Instagram management with strategic content planning
        • Professional product photography and food styling
        • Created educational content about meat cuts and cooking methods
        • Developed brand voice for meat industry audience
        • Managed influencer collaborations with local chefs

        <strong>Services Used:</strong> Content, Strategy, Influencer Marketing`,
        metrics: "Content Created: 200+ posts | Engagement Growth: 180% | Chef Partnerships: 8"
    },
    {
        company: "Tropicana",
        industry: "Travel Agency",
        position: "Marketing Specialist",
        location: "Phuket", 
        description: `Multi-channel marketing strategy for travel agency serving international clients.

        <strong>Key Achievements:</strong>
        • Developed content strategies for multiple client industries
        • Managed multi-channel advertising campaigns across platforms
        • Coordinated influencer marketing with micro and macro bloggers
        • Built automated sales funnels with lead magnets and email sequences
        • Created affiliate marketing programs expanding revenue streams

        <strong>Services Used:</strong> Content, Targeted Advertising, Email Marketing, Strategy`,
        metrics: "Campaign Channels: 6+ | Influencer Partnerships: 25+ | Automation: 70%"
    },
    {
        company: "Hungry Monkey",
        industry: "Russian Home Cuisine Cafe", 
        position: "Event Marketing Manager",
        location: "Phuket",
        description: `Event marketing and entertainment coordination for cozy Russian cuisine cafe.

        <strong>Key Achievements:</strong>
        • Organized weekly karaoke nights with complete technical setup
        • Developed and conducted interactive quiz games and competitions
        • Coordinated movie screening events with projection and catering
        • Managed group gaming sessions and team-building activities
        • Created engaging atmospheres through lighting and music selection

        <strong>Services Used:</strong> Event Marketing, Content`,
        metrics: "Events Organized: 50+ | Attendance Growth: 120% | Customer Retention: 85%"
    },
    {
        company: "Siyai Brand",
        industry: "Premium Fashion Retail",
        position: "Sales & Marketing Manager",
        location: "Russia", 
        description: `Sales team management and marketing strategy for premium clothing store with personal styling services.

        <strong>Key Achievements:</strong>
        • Managed high-performing sales team with performance supervision
        • Developed marketing strategy with detailed buyer persona creation
        • Optimized CRM system with automation implementation
        • Created copywriting for social media and website conversion
        • Implemented weekly performance reporting with actionable insights

        <strong>Services Used:</strong> Strategy, CRM, Content, Sales Team Management`,
        metrics: "Sales Team: 8 people | CRM Automation: 75% | Conversion: +30%"
    }
];

let currentCaseIndex = 0;

const logoImages = [
    'https://i.ibb.co/zVTKxRp7/2568-07-31-09-38-16-photoaidcom-cropped.png',
    'https://i.ibb.co/JFttZ6zf/2568-07-31-09-39-55-photoaidcom-cropped-1.png',
    'https://i.ibb.co/LDDtwnMq/2568-07-31-09-38-56-photoaidcom-cropped.png',
    'https://i.ibb.co/QF3n8n2w/2568-07-31-09-39-01-photoaidcom-cropped.png',
    'https://i.ibb.co/Q7MZNq1b/2568-07-31-09-39-05-photoaidcom-cropped.png',
    'https://i.ibb.co/9HXQCvBt/2568-07-31-09-39-11-photoaidcom-cropped.png',
    'https://i.ibb.co/bMNzjP90/2568-07-31-09-39-17-photoaidcom-cropped.png',
    'https://i.ibb.co/8LQtzJxj/2568-07-31-09-39-55-photoaidcom-cropped.png',
    'https://i.ibb.co/LDyGRQz9/2568-07-27-08-37-48-photoaidcom-cropped.png'
];

window.openModal = function(index) {
    currentCaseIndex = index;
    const modal = document.getElementById('caseModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateModalContent();
        updateNavigationButtons();
    }
};

window.closeModal = function() {
    const modal = document.getElementById('caseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

function updateModalContent() {
    const case_ = cases[currentCaseIndex];
    const modalContent = document.getElementById('modalContent');
    const modal = document.querySelector('.modal-content');
    
    if (!modalContent || !modal) return;
    
    modal.classList.add('changing');
    
    setTimeout(() => {
        modalContent.innerHTML = `
            <img src="${logoImages[currentCaseIndex]}" class="modal-logo" alt="${case_.company} Logo">
            <h3 class="modal-company" id="modalCompany">${case_.company}</h3>
            <div class="modal-industry">${case_.industry}</div>
            <div class="modal-position">${case_.position} | ${case_.location}</div>
            <div class="modal-metrics">
                <h4>Key Results</h4>
                <p>${case_.metrics}</p>
            </div>
            <div class="modal-description">${case_.description}</div>
        `;
        modal.classList.remove('changing');
    }, 150);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentCaseIndex === 0;
    if (nextBtn) nextBtn.disabled = currentCaseIndex === cases.length - 1;
}

window.previousCase = function() {
    if (currentCaseIndex > 0) {
        currentCaseIndex--;
        updateModalContent();
        updateNavigationButtons();
    }
};

window.nextCase = function() {
    if (currentCaseIndex < cases.length - 1) {
        currentCaseIndex++;
        updateModalContent();
        updateNavigationButtons();
    }
};

// Закрытие модалки при клике вне её
window.addEventListener('click', function(event) {
    const modal = document.getElementById('caseModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Навигация по клавишам
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('caseModal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowLeft') {
            previousCase();
        } else if (event.key === 'ArrowRight') {
            nextCase();
        }
    }
});

// Accessibility для карточек кейсов
document.addEventListener('DOMContentLoaded', function() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach((card, index) => {
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
    });
    
    // Intersection Observer для анимаций
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });
        
        caseCards.forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    }
});