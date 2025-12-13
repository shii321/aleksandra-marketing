
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
        title: "Разработка контента для когнитивного воздействия",
        content: `
            <p>Эта статья исследует, как применение базовых принципов когнитивной психологии и исследований отслеживания движения глаз может значительно улучшить понимание, запоминание и сохранение контента.</p>
            
            <h3>Использование эффекта Зейгарник</h3>
            <p>Разрабатывайте последовательный контент (например, многоэтапные формы или интерактивные викторины), чтобы использовать человеческую склонность запоминать незавершенные задачи, повышая вовлеченность через предвкушение.</p>
            
            <h3>Правило сканирования по F-паттерну</h3>
            <p>Стратегически размещайте самую важную информацию (заголовки, ключевые слова, призывы к действию) вдоль верхнего и левого полей, учитывая то, как пользователи естественным образом сканируют веб-страницы с большим количеством текста.</p>
              `
    },
    2: {
        title: "Проектирование пути к покупке",
        content: `
        <p>
        Этот материал фокусируется на том, как макет контента и структурный дизайн напрямую влияют на поведение пользователя, минимизируя трение и максимизируя вероятность конверсии.
        </p>
            <h3>Приоритет 'Над сгибом' (Above the Fold)</h3>
            <p>
            Зарезервируйте самое критическое пространство (видимое без прокрутки) для ценностного предложения, основного изображения и главного, высококонтрастного призыва к действию (CTA), делая цель мгновенно ясной.
            </p>

            <h3>Усиление CTA через повторение</h3>
            <p>
            Размещайте вторичные призывы к действию стратегически по всему контенту (например, после введения, в середине статьи и в заключении), чтобы предоставить удобные возможности для конверсии в нескольких точках принятия решения.
            </p>

            <h3>Использование направляющих сигналов</h3>
            <p>
            Используйте тонкие визуальные элементы — стрелки, градиенты, потоки отрицательного пространства или даже взгляд моделей на фотографиях — чтобы физически направить взгляд пользователя к следующему логическому фрагменту контента или кнопке CTA.
            </p>
            `
    },
    3: {
        title: "План роста: внедрение компонентной библиотеки контента",
        content: `
            <h3>Принципы атомарного дизайна</h3>
            <p>
            Организуйте элементы контента в атомы (кнопки, шрифты), молекулы (строка поиска, поле ввода) и организмы (полный раздел нижнего колонтитула) для быстрой сборки любой новой страницы или поста при сохранении универсальных стандартов бренда.
            </p>

            <h3>Централизованное руководство по стилю и тону голоса</h3>
            <p>
            Поддерживайте единый источник истины для визуальных руководств (цветовые коды, правила интервалов) и редакционного тона голоса контента, гарантируя, что каждая часть контента говорит одной и той же, последовательной индивидуальностью бренда.
            </p>

            <h3>Тестирование кросс-платформенной целостности</h3>
            <p>
            Используйте дизайн-систему, чтобы гарантировать, что все компоненты отображаются корректно и работают оптимально на различных платформах (веб, электронная почта, мобильное приложение, платная реклама), устраняя необходимость в индивидуальных исправлениях.
            </p>
             `
    },
    4: {
        title: "Превращение чисел в истории: Экспертный дизайн контента на основе данных",
        content: `
        <p>
        Дизайн — это мост между сложными данными и пониманием пользователя. Эта статья подробно описывает, как использовать лучшие визуальные практики, чтобы данные были не только точными, но и привлекательными и убедительными.
        </p>

            <h3>Выделение ключевой идеи</h3>
            <p>
            Используйте цветовой контраст и аннотации внутри диаграмм (например, яркий акцентный цвет для выигрышного показателя), чтобы мгновенно направить внимание зрителя к самому важному выводу, предотвращая визуальный беспорядок.
            </p>

            <h3>Выбор правильного типа диаграммы</h3>
            <p>Выбирайте инструменты визуализации, соответствующие отображаемой связи (например, гистограммы для сравнения, линейные графики для тенденций во времени, круговые диаграммы для пропорций), чтобы предотвратить неверное толкование и повысить ясность.
            </p>
            
            `
    },
    5: {
        title: "Инклюзивный контент: Соответствие стандартам WCAG для всеобщего охвата",
        content: `
        <p>
        Руководство по внедрению дизайнерских практик, которые гарантируют, что ваш контент пригоден для использования всеми людьми, включая тех, у кого есть нарушения зрения, слуха, когнитивные или двигательные нарушения.
         </p>

            <h3>Обеспечение адекватного цветового контраста</h3>
            <p>
            Строго придерживайтесь руководящих принципов WCAG 2.1 AA, поддерживая минимальный коэффициент контрастности 4.5:1 для обычного текста и 3:1 для крупного текста, чтобы обеспечить читаемость для пользователей с нарушениями зрения.
             </p>

            <h3>Описательный Alt-текст для всех визуальных элементов</h3>
            <p>Все изображения, диаграммы и декоративные элементы должны сопровождаться точным, описательным альтернативным текстом, чтобы их могли обрабатывать и понимать программы чтения с экрана и поисковые системы.
            </p>

            <h3>Четкие состояния фокуса и навигация с помощью клавиатуры</h3>
            <p>
            Убедитесь, что интерактивный контент (ссылки, кнопки, формы) четко выделен при навигации с помощью клавиатуры (состояние :focus) и доступен без мыши, что служит пользователям с двигательными нарушениями.
            </p>
            `
    },
    6: {
        title: "Оптимизация дизайна контента для мобильных пользователей",
        content: `
        <p>
        Поскольку большая часть веб-трафика поступает со смартфонов, подход mobile-first имеет важное значение. Эта стратегия диктует, что контент должен быть оптимизирован для скорости, сенсорного управления и линейного потребления.
        </p>

            <h3>Приоритет 'Удобных для большого пальца' зон</h3>
            <p>
            Размещайте основную навигацию и ключевые кнопки действий в «зоне большого пальца» (нижняя треть экрана) для легкого, естественного взаимодействия одной рукой.
            </p>

            <h3>Оптимизация размера и формата файла изображения</h3>
            <p>Сжимайте весь визуальный контент (используя современные форматы, такие как WebP) и используйте адаптивные теги изображений, чтобы загружать только соответствующий размер для устройства, что значительно сокращает время мобильной загрузки и потребление данных.
            </p>

            <h3>Линейный и вертикально расположенный поток контента</h3>
            <p>
            Разрабатывайте контент таким образом, чтобы он располагался вертикально и протекал линейно. Это гарантирует, что пользователь сохраняет контекст при прокрутке и исключает отвлекающие боковые панели или двухколоночные макеты, которые нарушают повествовательную нить на узких экранах.
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