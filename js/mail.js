
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

        document.addEventListener('DOMContentLoaded', () => {
            // Animate email cards appearing with slide effects
            const emailCards = document.querySelectorAll('.email-card');
            
            emailCards.forEach((card, index) => {
                const delay = parseInt(card.dataset.delay);
                setTimeout(() => {
                    card.classList.add('visible', 'animate');
                }, delay);
            });

            // Add click interaction to email cards
            emailCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('div');
                    const rect = this.getBoundingClientRect();
                    
                    ripple.classList.add('click-ripple');
                    ripple.style.width = ripple.style.height = '30px';
                    ripple.style.left = (e.clientX - rect.left - 15) + 'px';
                    ripple.style.top = (e.clientY - rect.top - 15) + 'px';
                    
                    this.appendChild(ripple);
                    
                    // Add click effect to card
                    this.classList.add('clicked');
                    
                    // Remove effects after animation
                    setTimeout(() => {
                        ripple.remove();
                        this.classList.remove('clicked');
                    }, 600);
                });
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const serviceCards = document.querySelectorAll('.service-card');
            const envelope = document.getElementById('envelope');
            const deliveredText = document.getElementById('deliveredText');
            const benefitsContainer = document.getElementById('benefitsContainer');
            
            // Animate service cards appearing
            serviceCards.forEach((card, index) => {
                const appearDelay = parseInt(card.dataset.delay);
                const collectDelay = parseInt(card.dataset.collectDelay);
                
                // Card appears
                setTimeout(() => {
                    card.classList.add('appear');
                }, appearDelay);
                
                // Card collects into envelope
                setTimeout(() => {
                    card.classList.add('collect');
                }, collectDelay);
            });
            
            // After all cards collected, make envelope glow
            setTimeout(() => {
                envelope.classList.add('glowing');
                setTimeout(() => {
                    deliveredText.classList.add('show');
                }, 500);
            }, 5500); // After last card flies up
            
            // Show benefits
            setTimeout(() => {
                benefitsContainer.classList.add('show');
            }, 3500);
            
            // Intersection Observer for replay animation when scrolling
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Reset and replay animation
                        serviceCards.forEach(card => {
                            card.classList.remove('appear', 'collect');
                        });
                        envelope.classList.remove('glowing');
                        deliveredText.classList.remove('show');
                        benefitsContainer.classList.remove('show');
                        
                        // Restart animation sequence
                        setTimeout(() => {
                            serviceCards.forEach((card, index) => {
                                const appearDelay = parseInt(card.dataset.delay);
                                const collectDelay = parseInt(card.dataset.collectDelay);
                                
                                setTimeout(() => {
                                    card.classList.add('appear');
                                }, appearDelay);
                                
                                setTimeout(() => {
                                    card.classList.add('collect');
                                }, collectDelay);
                            });
                            
                            setTimeout(() => {
                                envelope.classList.add('glowing');
                                setTimeout(() => {
                                    deliveredText.classList.add('show');
                                }, 500);
                            }, 5500);
                            
                            setTimeout(() => {
                                benefitsContainer.classList.add('show');
                            }, 3500);
                        }, 100);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.envelope-container'));
        });

        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });

            // Toggle current FAQ
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.classList.remove('active');
            } else {
                faqItem.classList.add('active');
                faqAnswer.classList.add('active');
            }
        }

        
