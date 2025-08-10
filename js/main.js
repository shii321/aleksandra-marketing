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


        // Only run animations when section is in view
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('in-view');
            });
        }

        if ('IntersectionObserver' in window) {
            const serviceItems = document.querySelectorAll('.service-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            serviceItems.forEach(item => {
                item.style.animationPlayState = 'paused';
                observer.observe(item);
            });
        }

   
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
            'https://i.ibb.co/zVTKxRp7/2568-07-31-09-38-16-photoaidcom-cropped.png',     // KAIF
            'https://i.ibb.co/JFttZ6zf/2568-07-31-09-39-55-photoaidcom-cropped-1.png',   // SOHO
            'https://i.ibb.co/LDDtwnMq/2568-07-31-09-38-56-photoaidcom-cropped.png',     // Lychee
            'https://i.ibb.co/QF3n8n2w/2568-07-31-09-39-01-photoaidcom-cropped.png',     // Vnail
            'https://i.ibb.co/Q7MZNq1b/2568-07-31-09-39-05-photoaidcom-cropped.png',     // Unique
            'https://i.ibb.co/9HXQCvBt/2568-07-31-09-39-11-photoaidcom-cropped.png',     // GASTRONOM
            'https://i.ibb.co/bMNzjP90/2568-07-31-09-39-17-photoaidcom-cropped.png',     // Tropicana
            'https://i.ibb.co/8LQtzJxj/2568-07-31-09-39-55-photoaidcom-cropped.png',     // Hungry Monkey
            'https://i.ibb.co/LDyGRQz9/2568-07-27-08-37-48-photoaidcom-cropped.png'      // Siyai
        ];

        function openModal(index) {
            currentCaseIndex = index;
            document.getElementById('caseModal').style.display = 'block';
            updateModalContent();
            updateNavigationButtons();
        }

        function closeModal() {
            document.getElementById('caseModal').style.display = 'none';
        }

        function updateModalContent() {
            const case_ = cases[currentCaseIndex];
            const modalContent = document.getElementById('modalContent');
            const modal = document.querySelector('.modal-content');
            
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
            document.getElementById('prevBtn').disabled = currentCaseIndex === 0;
            document.getElementById('nextBtn').disabled = currentCaseIndex === cases.length - 1;
        }

        function previousCase() {
            if (currentCaseIndex > 0) {
                currentCaseIndex--;
                updateModalContent();
                updateNavigationButtons();
            }
        }

        function nextCase() {
            if (currentCaseIndex < cases.length - 1) {
                currentCaseIndex++;
                updateModalContent();
                updateNavigationButtons();
            }
        }

        window.onclick = function(event) {
            const modal = document.getElementById('caseModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('caseModal');
            if (modal.style.display === 'block') {
                if (event.key === 'Escape') {
                    closeModal();
                } else if (event.key === 'ArrowLeft') {
                    previousCase();
                } else if (event.key === 'ArrowRight') {
                    nextCase();
                }
            }
        });

        // Keyboard accessibility for case cards
        document.querySelectorAll('.case-card').forEach((card, index) => {
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                }
            });
        });

        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const cards = document.querySelectorAll('.case-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            cards.forEach(card => {
                card.style.animationPlayState = 'paused';
                observer.observe(card);
            });
        }

         // ============ CONFIGURATION ============
        // Replace with your Google Apps Script URL
        const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrzoS74TXvLSI3Av41jqGOAqKahyjmHL2kr0at1KMSUq7_R32f51M2L5EFpO0RDad0/exec';

        // Calculator Data
        let calculatorData = {
            goals: [],
            otherGoal: '',
            budget: 2000,
            services: [],
            serviceCosts: {},
            otherService: '',
            teamSize: '',
            roi: '',
            leads: '',
            conversion: '',
            name: '',
            phone: '',
            email: ''
        };

        let currentQuestion = 1;
        let totalQuestions = 8;
        let selectedServices = [];

        // Service names mapping - Aleksandra's services
        const serviceNames = {
            'strategy': 'Marketing Strategy',
            'content': 'Content Marketing',
            'web': 'Web Development',
            'seo': 'SEO Services',
            'google': 'Google Ads',
            'social': 'Social Media',
            'email': 'Email Marketing',
            'influencer': 'Influencer Marketing',
            'ecommerce': 'E-commerce',
            'crm': 'CRM Systems',
            'ai': 'AI Solutions'
        };

        // Aleksandra's competitive prices
        const ourPrices = {
            'strategy': 300,
            'content': 500,
            'web': 450,
            'seo': 300,
            'google': 200,
            'social': 100,
            'email': 600,
            'influencer': 100,
            'ecommerce': 800,
            'crm': 400,
            'ai': 600
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateProgress();
            setupBudgetSlider();
            setupServiceCheckboxes();
        });

        // Budget Slider
        function setupBudgetSlider() {
            const slider = document.getElementById('budgetSlider');
            const value = document.getElementById('budgetValue');
            
            slider.addEventListener('input', function() {
                calculatorData.budget = parseInt(this.value);
                value.textContent = `$${parseInt(this.value).toLocaleString()}/month`;
            });
        }

        // Service Checkboxes
        function setupServiceCheckboxes() {
            const otherInput = document.getElementById('otherInput');
            const otherGoalInput = document.getElementById('otherGoal');
            
            // Setup other goal input
            otherGoalInput.addEventListener('input', function() {
                calculatorData.otherGoal = this.value.trim();
                const hasGoals = calculatorData.goals.length > 0 || this.value.trim();
                document.getElementById('nextBtn1').disabled = !hasGoals;
            });
            
            // Setup other service input
            otherInput.addEventListener('input', function() {
                calculatorData.otherService = this.value;
                const hasServices = selectedServices.length > 0 || (document.getElementById('other').checked && this.value.trim());
                document.getElementById('nextBtn3').disabled = !hasServices;
            });
        }

        // Goal Selection (Multiple)
        function selectGoalMultiple(goal) {
            if (!calculatorData.goals.includes(goal)) {
                calculatorData.goals.push(goal);
                event.target.classList.add('selected');
            } else {
                calculatorData.goals = calculatorData.goals.filter(g => g !== goal);
                event.target.classList.remove('selected');
            }
            
            // Check if custom goal is entered
            const otherGoal = document.getElementById('otherGoal').value.trim();
            const hasGoals = calculatorData.goals.length > 0 || otherGoal;
            
            document.getElementById('nextBtn1').disabled = !hasGoals;
        }

        // Toggle Service
        function toggleService(serviceValue) {
            const checkbox = document.getElementById(serviceValue);
            const item = checkbox.closest('.checkbox-item');
            const otherInput = document.getElementById('otherInput');
            
            if (serviceValue === 'other') {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                    otherInput.style.display = 'block';
                    item.classList.add('selected');
                    setTimeout(() => otherInput.focus(), 100);
                } else {
                    otherInput.style.display = 'none';
                    otherInput.value = '';
                    item.classList.remove('selected');
                }
            } else {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                    item.classList.add('selected');
                    selectedServices.push(serviceValue);
                } else {
                    item.classList.remove('selected');
                    const index = selectedServices.indexOf(serviceValue);
                    if (index > -1) {
                        selectedServices.splice(index, 1);
                    }
                }
            }
            
            calculatorData.services = selectedServices;
            const hasServices = selectedServices.length > 0 || (document.getElementById('other').checked && otherInput.value.trim());
            document.getElementById('nextBtn3').disabled = !hasServices;
        }

        // Team Size
        function selectTeamSize(size) {
            calculatorData.teamSize = size;
            document.querySelectorAll('#questionTeam .option-btn').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('nextBtnTeam').disabled = false;
        }

        // ROI Selection
        function selectROI(roi) {
            calculatorData.roi = roi;
            document.querySelectorAll('#questionROI .option-btn').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('nextBtnROI').disabled = false;
        }

        // Leads Selection
        function selectLeads(leads) {
            calculatorData.leads = leads;
            document.querySelectorAll('#questionLeads .option-btn').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('nextBtnLeads').disabled = false;
        }

        // Conversion Selection
        function selectConversion(conversion) {
            calculatorData.conversion = conversion;
            document.querySelectorAll('#questionConversion .option-btn').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('nextBtnConversion').disabled = false;
        }

        // Progress Bar
        function updateProgress() {
            let actualTotal;
            
            if (currentQuestion <= 3) {
                actualTotal = 8;
            } else {
                actualTotal = 8 + selectedServices.length;
            }
            
            let progress;
            if (currentQuestion >= actualTotal + 1) {
                progress = 100;
                document.getElementById('progressText').innerHTML = `Complete <span class="progress-complete">Thank you!</span>`;
            } else {
                progress = (currentQuestion / actualTotal) * 100;
                document.getElementById('progressText').textContent = `${currentQuestion} of ${actualTotal}`;
            }
            
            document.getElementById('progressFill').style.width = Math.min(progress, 100) + '%';
        }

        // Navigation
        function nextQuestion() {
            document.querySelector('.calculator').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            setTimeout(() => {
                if (currentQuestion === 3) {
                    createDynamicQuestions();
                    totalQuestions = 8 + selectedServices.length;
                }
                
                const current = document.querySelector('.question.active');
                current.classList.remove('active');
                
                if (currentQuestion === 3 && selectedServices.length > 0) {
                    currentQuestion = 4;
                    document.getElementById('dynamicQuestion1').classList.add('active');
                } else if (currentQuestion >= 4 && currentQuestion < 4 + selectedServices.length) {
                    currentQuestion++;
                    if (currentQuestion < 4 + selectedServices.length) {
                        document.getElementById(`dynamicQuestion${currentQuestion - 3}`).classList.add('active');
                    } else {
                        document.getElementById('questionTeam').classList.add('active');
                    }
                } else {
                    currentQuestion++;
                    const nextQuestionMap = {
                        2: 'question2',
                        3: 'question3',
                        [4 + selectedServices.length]: 'questionTeam',
                        [5 + selectedServices.length]: 'questionROI',
                        [6 + selectedServices.length]: 'questionLeads',
                        [7 + selectedServices.length]: 'questionConversion'
                    };
                    
                    const nextId = nextQuestionMap[currentQuestion];
                    if (nextId) {
                        document.getElementById(nextId).classList.add('active');
                    }
                }
                
                updateProgress();
            }, 300);
        }

        function prevQuestion() {
            document.querySelector('.calculator').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            setTimeout(() => {
                const current = document.querySelector('.question.active');
                current.classList.remove('active');
                
                currentQuestion--;
                
                if (currentQuestion === 3) {
                    document.getElementById('question3').classList.add('active');
                } else if (currentQuestion >= 4 && currentQuestion < 4 + selectedServices.length) {
                    document.getElementById(`dynamicQuestion${currentQuestion - 3}`).classList.add('active');
                } else {
                    const prevQuestionMap = {
                        1: 'question1',
                        2: 'question2',
                        [4 + selectedServices.length]: 'questionTeam',
                        [5 + selectedServices.length]: 'questionROI',
                        [6 + selectedServices.length]: 'questionLeads',
                        [7 + selectedServices.length]: 'questionConversion'
                    };
                    
                    const prevId = prevQuestionMap[currentQuestion];
                    if (prevId) {
                        document.getElementById(prevId).classList.add('active');
                    }
                }
                
                updateProgress();
            }, 300);
        }

        // Dynamic Questions Creation
        function createDynamicQuestions() {
            const container = document.getElementById('dynamicQuestions');
            container.innerHTML = '';
            
            selectedServices.forEach((service, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.id = `dynamicQuestion${index + 1}`;
                
                questionDiv.innerHTML = `
                    <h3>Current ${serviceNames[service]} spending?</h3>
                    <div class="question-subtitle">Your monthly investment in ${serviceNames[service].toLowerCase()}</div>
                    <div class="slider-container">
                        <div class="slider-wrapper">
                            <input type="range" min="50" max="5000" value="500" class="slider" id="slider${service}">
                            <div class="slider-labels">
                                <span>$50</span>
                                <span>$5,000</span>
                            </div>
                        </div>
                        <div class="slider-value" id="value${service}">$500/month</div>
                    </div>
                    <div class="navigation-buttons">
                        <button class="btn-secondary btn" onclick="prevQuestion()">Back</button>
                        <button class="btn" onclick="nextQuestion()">Next</button>
                    </div>
                `;
                
                container.appendChild(questionDiv);
                
                setTimeout(() => {
                    const slider = document.getElementById(`slider${service}`);
                    const valueDisplay = document.getElementById(`value${service}`);
                    
                    slider.addEventListener('input', function() {
                        calculatorData.serviceCosts[service] = parseInt(this.value);
                        valueDisplay.textContent = `$${parseInt(this.value).toLocaleString()}/month`;
                    });
                    
                    calculatorData.serviceCosts[service] = 500;
                }, 100);
            });
        }

        // Show Lead Form
        function showLeadForm() {
            document.querySelector('.calculator').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            setTimeout(() => {
                const current = document.querySelector('.question.active');
                current.classList.remove('active');
                document.getElementById('leadForm').classList.add('active');
                currentQuestion++;
                updateProgress();
            }, 300);
        }

        // Calculate Result
        async function calculateResult() {
            const nameInput = document.getElementById('userName');
            const phoneInput = document.getElementById('userPhone');
            const emailInput = document.getElementById('userEmail');
            
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            
            // Reset error styles
            nameInput.classList.remove('error');
            phoneInput.classList.remove('error');
            
            let hasError = false;
            
            if (!name) {
                nameInput.classList.add('error');
                hasError = true;
            }
            
            if (!phone) {
                phoneInput.classList.add('error');
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // Show loading
            document.getElementById('loadingDiv').style.display = 'block';
            document.getElementById('leadFormButtons').style.display = 'none';
            
            calculatorData.name = name;
            calculatorData.phone = phone;
            calculatorData.email = email;
            
            let totalCurrentCost = 0;
            let totalOurCost = 0;
            
            selectedServices.forEach(service => {
                const currentCost = calculatorData.serviceCosts[service] || 0;
                const ourCost = ourPrices[service] || 0;
                
                totalCurrentCost += currentCost;
                totalOurCost += ourCost;
            });
            
            const savings = totalCurrentCost - totalOurCost;
            const savingsPercent = totalCurrentCost > 0 ? Math.round((savings / totalCurrentCost) * 100) : 0;
            
            // Send to Google Sheets
            try {
                await sendToGoogleSheets(savings, savingsPercent, totalCurrentCost, totalOurCost);
                console.log('✅ Data sent successfully');
            } catch (error) {
                console.error('❌ Error sending data:', error);
            }
            
            // Hide loading
            document.getElementById('loadingDiv').style.display = 'none';
            
            // Show result
            showResult(savings, savingsPercent, totalCurrentCost, totalOurCost);
        }

        // Send to Google Sheets
        async function sendToGoogleSheets(savings, savingsPercent, currentCost, ourCost) {
            const data = {
                timestamp: new Date().toLocaleString('en-US'),
                name: calculatorData.name,
                phone: calculatorData.phone,
                email: calculatorData.email,
                goals: calculatorData.goals,
                otherGoal: calculatorData.otherGoal,
                budget: calculatorData.budget,
                services: calculatorData.services,
                otherService: calculatorData.otherService,
                serviceCosts: calculatorData.serviceCosts,
                teamSize: calculatorData.teamSize,
                roi: calculatorData.roi,
                leads: calculatorData.leads,
                conversion: calculatorData.conversion,
                currentCost: currentCost,
                ourCost: ourCost,
                savings: savings,
                savingsPercent: savingsPercent
            };
            
            if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
                console.warn('⚠️ Google Apps Script URL not configured');
                return;
            }
            
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'no-cors'
            });
            
            console.log('???? Lead captured');
        }

        // Show Result
        function showResult(savings, savingsPercent, currentCost, ourCost) {
            const current = document.querySelector('.question.active');
            current.classList.remove('active');
            
            const resultDiv = document.getElementById('result');
            
            if (savings > 0) {
                resultDiv.innerHTML = `
                    <div class="result">
                        <h3>Excellent News!</h3>
                        <p>Working with me, your marketing investment would be:</p>
                        <div class="result-savings">$${ourCost.toLocaleString()}</div>
                        <p><strong>Your monthly savings: <span style="color: #00F260; text-shadow: 0 0 20px rgba(0, 242, 96, 0.8);">$${savings.toLocaleString()}</span></strong></p>
                        <p>That's <span style="color: #00F260; text-shadow: 0 0 20px rgba(0, 242, 96, 0.8);">${savingsPercent}%</span> less than you pay now!</p>
                        <a href="https://wa.me/66823207917?text=Hi%20Aleksandra!%20I%20just%20calculated%20my%20potential%20savings%20of%20$${savings}%20per%20month.%20I%27d%20like%20to%20discuss%20working%20together." class="whatsapp-btn">
                            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                            </svg>
                            Let's discuss your savings!
                        </a>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="expensive-result">
                        <h3>My services might cost more initially</h3>
                        <p>But here's what you get with premium freelance marketing:</p>
                        <p>✓ Personal attention from an experienced consultant</p>
                        <p>✓ Custom strategies for Southeast Asian markets</p>
                        <p>✓ Direct communication, no account managers</p>
                        <p>✓ Flexible packages tailored to your needs</p>
                        <a href="https://wa.me/66823207917?text=Hi%20Aleksandra!%20I%27d%20like%20to%20discuss%20how%20your%20premium%20marketing%20services%20can%20help%20my%20business%20grow." class="whatsapp-btn">
                            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                            </svg>
                            Get my free marketing audit
                        </a>
                        <p><strong>Free bonus:</strong> I'll analyze your current marketing and find optimization opportunities!</p>
                    </div>
                `;
            }
            
            resultDiv.classList.add('active');
            currentQuestion++;
            updateProgress();
        }

        
