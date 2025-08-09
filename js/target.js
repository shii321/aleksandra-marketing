
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

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Animation sequence
            const stages = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'];
            const lines = ['line1', 'line2', 'line3', 'line4'];
            const progressBar = document.getElementById('progressBar');
            
            let currentStage = 0;
            
            // Check if all elements exist before starting animation
            function checkElements() {
                const allElementsExist = stages.every(id => document.getElementById(id) !== null) &&
                                       lines.every(id => document.getElementById(id) !== null) &&
                                       progressBar !== null;
                
                return allElementsExist;
            }
            
            function animateStage() {
                if (!checkElements()) {
                    console.log('Elements not ready, retrying...');
                    setTimeout(animateStage, 100);
                    return;
                }
                
                if (currentStage < stages.length) {
                    // Activate current stage
                    const stageElement = document.getElementById(stages[currentStage]);
                    if (stageElement) {
                        stageElement.classList.add('active');
                    }
                    
                    // Update progress bar
                    if (progressBar) {
                        progressBar.style.width = ((currentStage + 1) / stages.length) * 100 + '%';
                    }
                    
                    // Activate connecting line (except for last stage)
                    if (currentStage < lines.length) {
                        setTimeout(() => {
                            const lineElement = document.getElementById(lines[currentStage]);
                            if (lineElement) {
                                lineElement.classList.add('active');
                            }
                        }, 300);
                    }
                    
                    currentStage++;
                    setTimeout(animateStage, 1200);
                } else {
                    // Animation complete, restart after pause
                    setTimeout(resetAnimation, 3000);
                }
            }
            
            function resetAnimation() {
                // Reset all elements
                stages.forEach(stageId => {
                    const element = document.getElementById(stageId);
                    if (element) {
                        element.classList.remove('active');
                    }
                });
                
                lines.forEach(lineId => {
                    const element = document.getElementById(lineId);
                    if (element) {
                        element.classList.remove('active');
                    }
                });
                
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
                
                currentStage = 0;
                
                // Restart animation
                setTimeout(animateStage, 1000);
            }
            
            // Start animation after elements are ready
            setTimeout(() => {
                if (checkElements()) {
                    animateStage();
                } else {
                    // Retry if elements aren't ready
                    setTimeout(animateStage, 500);
                }
            }, 1000);
        });

        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Закрываем все другие FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });

            // Переключаем текущий FAQ
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.classList.remove('active');
            } else {
                faqItem.classList.add('active');
                faqAnswer.classList.add('active');
            }
        }
 