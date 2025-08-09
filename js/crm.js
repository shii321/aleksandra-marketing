
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

        // Animate progress bars
        window.addEventListener('load', () => {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 1000);
            });
        });

        function animateCircles() {
            const circles = document.querySelectorAll('.circle-progress');
            circles.forEach(circle => {
                const percent = circle.getAttribute('data-percent');
                const offset = 314 - (314 * percent / 100);
                
                // Принудительная перерисовка для мобильных браузеров
                circle.style.strokeDashoffset = '314';
                circle.offsetHeight; // Trigger reflow
                
                // Добавляем класс для анимации
                setTimeout(() => {
                    circle.classList.add('animated');
                    circle.style.strokeDashoffset = offset;
                }, 100);
            });
        }

        // Intersection Observer с улучшенной поддержкой для мобильных
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated-section')) {
                    entry.target.classList.add('animated-section');
                    animateCircles();
                }
            });
        }, observerOptions);

        // Запускаем наблюдение
        const casesSection = document.querySelector('.cases-section');
        if (casesSection) {
            observer.observe(casesSection);
        }

        // Fallback для старых браузеров и проблемных мобильных браузеров
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                const section = document.querySelector('.cases-section');
                if (section && !section.classList.contains('animated-section')) {
                    const rect = section.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        section.classList.add('animated-section');
                        animateCircles();
                    }
                }
            }, 100);
        });

        // Дополнительная проверка при загрузке страницы
        window.addEventListener('load', () => {
            setTimeout(() => {
                const section = document.querySelector('.cases-section');
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !section.classList.contains('animated-section')) {
                    section.classList.add('animated-section');
                    animateCircles();
                }
            }, 500);
        });

        function showMore() {
           // Показываем все скрытые строки
           const hiddenRows = document.querySelectorAll('.hidden-row');
           hiddenRows.forEach(row => {
               row.style.display = 'table-row';
           });
           
           // Скрываем кнопку Show More
           document.getElementById('showMoreRow').style.display = 'none';
           
           // Показываем кнопку Hide
           document.getElementById('hideRow').style.display = 'table-row';
       }

       function hideMore() {
           // Скрываем все строки с классом hidden-row
           const hiddenRows = document.querySelectorAll('.hidden-row');
           hiddenRows.forEach(row => {
               row.style.display = 'none';
           });
           
           // Скрываем кнопку Hide
           document.getElementById('hideRow').style.display = 'none';
           
           // Показываем кнопку Show More
           document.getElementById('showMoreRow').style.display = 'table-row';
           
           // Скролл обратно к таблице
           document.querySelector('.pricing-container').scrollIntoView({ 
               behavior: 'smooth' 
           });
       }

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
