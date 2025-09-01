// ======================== MOBILE MENU FUNCTIONS ========================
        function toggleMobileMenu() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const overlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const overlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            
            document.body.style.overflow = '';
        }

        function toggleServices() {
            const dropdown = document.querySelector('.services-dropdown');
            const arrow = document.querySelector('.services-arrow');
            
            dropdown.classList.toggle('active');
            arrow.classList.toggle('active');
        }

        // ======================== ACTIVE SECTION TRACKING ========================
        function updateActiveSection() {
            const sections = document.querySelectorAll('#about, #contact, #contact-form, #contacts');
            const navLinks = document.querySelectorAll('.nav-link[data-section]');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-section]');
            
            let currentSection = '';
            const offset = 150;
            
            sections.forEach(section => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top;
                    const sectionBottom = rect.bottom;
                    
                    // Для футера (контактов) используем более мягкие условия
                    if (section.id === 'contact' || section.id === 'contacts' || section.id === 'contact-form') {
                        // Если дошли до низа страницы или футер виден
                        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 || 
                            (sectionTop <= window.innerHeight && sectionBottom > 0)) {
                            currentSection = 'contact';
                        }
                    } else if (sectionTop <= offset && sectionBottom > offset) {
                        currentSection = section.id;
                    }
                }
            });
            
            // Update desktop nav links
            navLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                if (linkSection === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Update mobile nav links
            mobileNavLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                if (linkSection === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // ======================== EVENT LISTENERS ========================
        window.addEventListener('scroll', updateActiveSection);
        window.addEventListener('load', updateActiveSection);

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        document.addEventListener('click', (e) => {
            const mobileMenu = document.querySelector('.mobile-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (!mobileMenu.contains(e.target) && !toggle.contains(e.target) && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // ======================== SMOOTH SCROLL ========================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        function updateCountdown() {
            // Дата окончания: 1 октября 2025, 00:00:00
            const endDate = new Date('2025-10-01T00:00:00').getTime();
            const now = new Date().getTime();
            const timeLeft = endDate - now;

            // Если время истекло
            if (timeLeft < 0) {
                document.getElementById('countdown').style.display = 'none';
                document.getElementById('expired').style.display = 'block';
                return;
            }

            // Вычисляем дни, часы, минуты, секунды
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Обновляем элементы с добавлением нуля для чисел < 10
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // Обновляем таймер каждую секунду
        updateCountdown(); // Запускаем сразу
        setInterval(updateCountdown, 1000);

        class OfferAnimation {
            constructor() {
                this.playButton = document.getElementById('playButton');
                this.playIcon = this.playButton.querySelector('.play-icon');
                this.counterDisplay = this.playButton.querySelector('.counter-display');
                this.counterDisplay = this.playButton.querySelector('.counter-display');
                this.discountText = document.querySelector('.discount-text');
                this.hiddenContent = document.getElementById('hiddenContent');
                this.starsContainer = document.querySelector('.stars-container');
                
                this.isAnimating = false;
                this.init();
            }

            init() {
                this.playButton.addEventListener('click', () => {
                    if (!this.isAnimating) {
                        this.startAnimation();
                    }
                });
            }

            async startAnimation() {
                if (this.isAnimating) return; // Защита от повторного запуска
                
                this.isAnimating = true;
                this.playButton.classList.add('used'); // Отключаем повторные клики
                
                // 1. Мигание кнопки
                await this.blinkButton();
                
                // 2. Показать текст скидки и начать счетчик
                this.showDiscountText();
                
                // 3. Анимация счетчика
                await this.animateCounter();
                
                // 4. Эффект сверкания + звездочки
                await this.sparkleEffect();
                
                // 5. Показать контент
                await this.revealContent();
                
                // Анимация завершена, но кнопка остается неактивной
            }

            blinkButton() {
                return new Promise(resolve => {
                    this.playButton.classList.add('blinking');
                    setTimeout(() => {
                        this.playButton.classList.remove('blinking');
                        this.showDiscountText();
                        this.playIcon.style.display = 'none';
                        this.counterDisplay.style.display = 'block';
                        resolve();
                    }, 1500); // 5 миганий за 1.5 секунды
                });
            }

            showLoading() {
                return new Promise(resolve => {
                    this.playIcon.style.display = 'none';
                    this.counterDisplay.style.display = 'block';
                    resolve();
                });
            }

            showDiscountText() {
                this.discountText.classList.add('visible');
            }

            animateCounter() {
                return new Promise(resolve => {
                    // Последовательность как в описании
                    const sequence = [0, 1, 2, 5, 6, 7, 10, 11, 15, 15, 15, 16, 17, 20, 21, 25, 25, 25, 28, 30];
                    const timings = [0, 200, 400, 600, 900, 1200, 1500, 1800, 2100, 2100, 2600, 2900, 3200, 3500, 3800, 4100, 4100, 4600, 4900, 5300];
                    
                    let index = 0;
                    
                    const updateCounter = () => {
                        if (index < sequence.length) {
                            this.counterDisplay.textContent = sequence[index] + '%';
                            
                            // Эффект увеличения при смене числа
                            this.counterDisplay.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                this.counterDisplay.style.transform = 'scale(1)';
                            }, 100);
                            
                            index++;
                            
                            if (index < sequence.length) {
                                setTimeout(updateCounter, timings[index] - timings[index - 1]);
                            } else {
                                resolve();
                            }
                        }
                    };
                    
                    updateCounter();
                });
            }

            sparkleEffect() {
                return new Promise(resolve => {
                    // Сверкание кнопки
                    this.playButton.classList.add('sparkling');
                    
                    // Создание звездочек
                    this.createStars();
                    
                    setTimeout(() => {
                        this.playButton.classList.remove('sparkling');
                        resolve();
                    }, 2500);
                });
            }

            createStars() {
                const starCount = 12;
                
                for (let i = 0; i < starCount; i++) {
                    setTimeout(() => {
                        const star = document.createElement('div');
                        star.className = 'star';
                        star.innerHTML = `<svg viewBox="0 -11 509.06667 509" xmlns="http://www.w3.org/2000/svg"><path d="m408.535156 486.566406-154-96.398437-154 96.398437 36.265625-179.332031-136.800781-119.867187 183.199219-19.601563 71.335937-167.7304688 71.332032 167.7304688 183.199218 19.601563-136.800781 119.867187zm-154-121.601562 123.332032 77.203125-28.800782-142.800781 109.46875-96-147.335937-15.734376-56.664063-133.066406-56.667968 133.199219-147.199219 15.734375 109.464843 96-28.933593 142.667969zm0 0" fill="#00F260"></path></svg>`;
                        
                        // Случайная позиция
                        star.style.left = Math.random() * 100 + '%';
                        star.style.top = Math.random() * 100 + '%';
                        
                        this.starsContainer.appendChild(star);
                        
                        // Удаление звездочки после анимации
                        setTimeout(() => {
                            star.remove();
                        }, 2000);
                    }, i * 200);
                }
            }

            revealContent() {
                return new Promise(resolve => {
                    // Показать контейнер
                    this.hiddenContent.classList.add('visible');
                    
                    // Анимация карточек по очереди
                    const cards = this.hiddenContent.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                            card.style.animationDelay = index * 0.2 + 's';
                        }, 1000 + index * 200);
                    });
                    
                    setTimeout(resolve, 2000);
                });
            }
        }

        // Запуск после загрузки страницы
        window.addEventListener('load', () => {
            new OfferAnimation();
        });

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
                    <div class="modal-company">${case_.company}</div>
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