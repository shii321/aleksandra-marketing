
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

        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                
                const frames = document.querySelectorAll('.frame');
                frames.forEach((frame, index) => {
                    const speed = 0.5 + (index * 0.1);
                    frame.style.transform = `translateX(${x * 10 * speed}px) translateY(${y * 10 * speed}px)`;
                });
            });
        }
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', function() {
                // Flash effect on click
                this.style.background = 'rgba(0, 242, 96, 0.2)';
                setTimeout(() => {
                    this.style.background = 'transparent';
                }, 300);
            });
        });

        // Optional: Random subtle animation
        function randomPulse() {
            const tags = document.querySelectorAll('.tag');
            const randomTag = tags[Math.floor(Math.random() * tags.length)];
            
            randomTag.style.transform = 'scale(1.05)';
            randomTag.style.borderColor = 'rgba(0, 242, 96, 0.5)';
            
            setTimeout(() => {
                randomTag.style.transform = '';
                randomTag.style.borderColor = '';
            }, 1000);
        }

        // Run random pulse every 3 seconds
        setInterval(randomPulse, 3000);
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

        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Designing Content for Cognitive Impact",
        content: `
            <p>This article explores how applying basic principles of cognitive psychology and eye-tracking research can drastically improve content comprehension, recall, and retention</p>
            
            <h3>Harnessing the Zeigarnik Effect</h3>
            <p>Design sequential content (like multi-step forms or interactive quizzes) to exploit the human tendency to remember uncompleted tasks, boosting engagement through anticipation.</p>
            
            <h3>The Rule of F-Pattern Scanning</h3>
            <p>Strategically place the most vital information (headlines, keywords, CTAs) along the top and left margins, acknowledging the way users naturally scan text-heavy web pages.</p>
              `
    },
    2: {
        title: "Designing the Path to Purchase",
        content: `
        <p>
        This piece focuses on how content layout and structural design directly influence user behavior, minimizing friction and maximizing the likelihood of a conversion.
        </p>
            <h3>Above the Fold Priority</h3>
            <p>
            Reserve the most critical space (visible without scrolling) for the value proposition, the primary image, and the main, high-contrast CTA, making the purpose clear instantly.
            </p>

            <h3>Reinforcing CTAs with Repetition</h3>
            <p>
            Place secondary calls-to-action strategically throughout the content (e.g., after the introduction, mid-article summary, and conclusion) to provide convenient opportunities for conversion at multiple decision points.
            </p>

            <h3>Leveraging Directional Cues</h3>
            <p>
            Utilize subtle visual elements—arrows, gradients, negative space flow, or even the gaze of models in photography—to physically guide the user's eye towards the next logical piece of content or the CTA button.
            </p>
            `
    },
    3: {
        title: "The Blueprint for Growth: Implementing a Component-Based Content Library",
        content: `
            <h3>Atomic Design Principles</h3>
            <p>
            Organize content elements into atoms (buttons, fonts), molecules (search bar, input field), and organisms (full footer section) for rapid assembly of any new page or post while maintaining universal brand standards.
            </p>

            <h3>Centralized Style and Voice Guide</h3>
            <p>
            Maintain a single source of truth for visual guidelines (color codes, spacing rules) and the content's editorial tone of voice, ensuring every piece of content speaks with the same, consistent brand personality.
            </p>

            <h3>Testing for Cross-Platform Integrity</h3>
            <p>
            Use the design system to ensure all components render correctly and perform optimally across diverse platforms (web, email, mobile app, paid ads), eliminating the need for custom fixes.
            </p>
             `
    },
    4: {
        title: "Turning Numbers into Narratives: Expert Data Content Design",
        content: `
        <p>
        Design is the bridge between complex data and user understanding. This article details how to use visual best practices to ensure data is not only accurate but also engaging and persuasive.
        </p>

            <h3>Highlighting the Key Insight</h3>
            <p>
            Utilize color contrast and annotation within charts (e.g., a bright accent color for the winning metric) to instantly direct the viewer's attention to the most important conclusion, preventing visual clutter.
            </p>

            <h3>Automated Email Marketing Excellence</h3>
            <p>Automated email marketing systems powered by AI achieve higher open rates and conversions by delivering the right message at the optimal time. Natural language processing helps craft compelling content that resonates with your audience.</p>
            
            <h3>Choosing the Right Chart Type</h3>
            <p>
            Select visualization tools appropriate for the relationship being shown (e.g., bar charts for comparison, line graphs for trends over time, pie charts for proportions) to prevent misinterpretation and enhance clarity.
            </p>
            `
    },
    5: {
        title: "Inclusive Content: Meeting WCAG Standards for Universal Reach",
        content: `
        <p>
        A guide to implementing design practices that ensure your content is usable by all individuals, including those with visual, auditory, cognitive, and motor impairments.
         </p>

            <h3>Ensuring Adequate Color Contrast</h3>
            <p>
            Adhere strictly to WCAG 2.1 AA guidelines, maintaining a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text to ensure readability for visually impaired users.
             </p>

            <h3>Descriptive Alt Text for All Visuals</h3>
            <p>All images, charts, and decorative elements must be supported by accurate, descriptive alternative text to be processed and understood by screen readers and search engines.
            </p>

            <h3>Clear Focus States and Keyboard Navigation</h3>
            <p>
            Ensure that interactive content (links, buttons, forms) is clearly highlighted when navigated by keyboard (:focus state) and can be accessed without a mouse, serving users with motor disabilities.
            </p>
            `
    },
    6: {
        title: "Optimizing Content Design for Mobile Users",
        content: `
        <p>
        With the majority of web traffic coming from smartphones, a mobile-first approach is essential. This strategy dictates that content must be optimized for speed, touch, and linear consumption.
        </p>

            <h3>Prioritizing Thumb-Friendly Zones</h3>
            <p>
            Place primary navigation and key action buttons within the "thumb zone" (the lower third of the screen) for effortless, natural, one-handed interaction.
            </p>

            <h3>Optimizing Image File Size and Format</h3>
            <p>Compress all visual content (using modern formats like WebP) and use responsive image tags to load only the appropriate size for the device, drastically reducing mobile load times and data consumption.
            </p>

            <h3>Linear and Stacked Content Flow</h3>
            <p>
            Design content to stack vertically and flow linearly. This ensures that the user maintains context while scrolling and eliminates distracting sidebars or two-column layouts that break the narrative thread on narrow screens.
            </p>
            `
    }
    

    
};

const slider = document.getElementById('articleSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modal = document.getElementById('articleModal');
const closeModalBtn = document.getElementById('closeModal');
const articleContent = document.getElementById('articleContent');
const dotsContainer = document.getElementById('sliderDots');

const cardCount = document.querySelectorAll('.article-card').length;
const isArticleMobile = window.innerWidth <= 768;
const dotsCount = isArticleMobile ? cardCount : cardCount - 2;

for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
}

window.addEventListener('resize', () => {
    const newIsArticleMobile = window.innerWidth <= 768;
    const currentDotsCount = dotsContainer.children.length;
    const neededDotsCount = newIsArticleMobile ? cardCount : cardCount - 2;
    
    if (currentDotsCount !== neededDotsCount) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < neededDotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(i));
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }
});

function updateDots() {
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function scrollToCard(index) {
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    slider.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

slider.addEventListener('scroll', updateDots);

prevBtn.addEventListener('click', () => {
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    const scrollLeft = slider.scrollLeft;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    
    if (currentIndex === 0) {
        scrollToCard(cardCount - 1);
    } else {
        slider.scrollBy({ left: -500, behavior: 'smooth' });
    }
});

nextBtn.addEventListener('click', () => {
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    if (scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        slider.scrollBy({ left: 500, behavior: 'smooth' });
    }
});

document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article');
        const article = articles[articleId];
        
        articleContent.innerHTML = `
            <h2>${article.title}</h2>
            ${article.content}
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > 75) {
        if (swipeDistance > 0) {
            if (scrollLeft >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const currentIndex = Math.round(scrollLeft / cardWidth);
                scrollToCard(currentIndex + 1);
            }
        } else {
            const currentIndex = Math.round(scrollLeft / cardWidth);
            if (currentIndex === 0) {
                scrollToCard(cardCount - 1);
            } else {
                scrollToCard(currentIndex - 1);
            }
        }
    }
}