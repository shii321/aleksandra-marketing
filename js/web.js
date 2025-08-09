
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
            const codeLines = document.querySelectorAll('.code-line');
            const cursor = document.getElementById('cursor');
            const codeEditor = document.getElementById('codeEditor');
            const websitePreview = document.getElementById('websitePreview');
            const previewElements = ['previewLogo', 'previewTitle', 'previewText', 'previewButton'];
            
            let currentLine = 0;
            
            // Function to type code lines
            function typeNextLine() {
                if (currentLine < codeLines.length) {
                    const line = codeLines[currentLine];
                    line.classList.add('visible');
                    
                    // Move cursor to end of current line
                    if (cursor.parentNode) {
                        cursor.parentNode.removeChild(cursor);
                    }
                    line.appendChild(cursor);
                    
                    currentLine++;
                    
                    // Continue typing
                    setTimeout(typeNextLine, 300);
                } else {
                    // All lines typed, show preview
                    setTimeout(showPreview, 500);
                }
            }
            
            // Function to show website preview
            function showPreview() {
                // Hide cursor
                cursor.style.display = 'none';
                
                // Fade out code editor
                codeEditor.classList.add('preview-mode');
                
                // Show website preview
                setTimeout(() => {
                    websitePreview.classList.add('visible');
                    
                    // Animate preview elements
                    previewElements.forEach(id => {
                        document.getElementById(id).classList.add('visible');
                    });
                    
                    // Reset animation after delay
                    setTimeout(resetAnimation, 5000);
                }, 300);
            }
            
            // Function to reset animation
            function resetAnimation() {
                // Hide preview
                websitePreview.classList.remove('visible');
                previewElements.forEach(id => {
                    document.getElementById(id).classList.remove('visible');
                });
                
                // Show code editor
                setTimeout(() => {
                    codeEditor.classList.remove('preview-mode');
                    cursor.style.display = 'inline-block';
                    
                    // Hide all code lines
                    codeLines.forEach(line => {
                        line.classList.remove('visible');
                    });
                    
                    // Reset and start again
                    currentLine = 0;
                    setTimeout(typeNextLine, 1000);
                }, 800);
            }
            
            // Start animation after delay
            setTimeout(typeNextLine, 1500);
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

        
