
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

         // Typing animation
        const textToType = "best restaurant near me";
        const typedTextElement = document.getElementById('typed-text');
        const autocompleteElement = document.getElementById('autocomplete');
        const searchResultsElement = document.getElementById('searchResults');
        
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < textToType.length) {
                typedTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                
                // Show autocomplete when we have typed enough
                if (charIndex >= 8) {
                    autocompleteElement.classList.add('show');
                }
                
                setTimeout(typeText, 150 + Math.random() * 100);
            } else {
                // Typing finished, hide autocomplete and show results
                setTimeout(() => {
                    autocompleteElement.classList.remove('show');
                    showSearchResults();
                }, 1500);
            }
        }
        
        function showSearchResults() {
            searchResultsElement.classList.add('show');
            
            // Animate result items
            const resultItems = document.querySelectorAll('.result-item');
            resultItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                    
                    // Highlight first result
                    if (index === 0) {
                        setTimeout(() => {
                            item.classList.add('highlight');
                        }, 500);
                    }
                }, parseInt(item.dataset.delay));
            });
        }
        
        // Start animation after page load
        setTimeout(() => {
            typeText();
        }, 2000);

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
        title: "Приоритизация SEO для Влияния на Конечную Прибыль",
        content: `
            <p>Большинство аудитов предоставляют длинный список проблем. Аудит, ориентированный на доход, фокусируется исключительно на проблемах (например, медленные Core Web Vitals на высококонверсионных страницах), которые напрямую ограничивают продажи, и масштабирует усилия на основе прогнозируемого ROI.
            </p>

            <h3>Сопоставление Технических Проблем со Стадиями Воронки</h3>
            <p>Мы сегментируем технический долг по его влиянию на путь пользователя: Обнаружение (Индексация/Бюджет Краулинга), Рассмотрение (Скорость Страницы/UX) и Конверсия (Удобство Использования на Мобильных Устройствах на страницах оформления заказа). Это напрямую связывает исправление с деньгами.
            </p>

            <h3>Расчет Альтернативной Стоимости Задержки</h3>
            <p>Для каждой критической технической ошибки мы количественно оцениваем упущенный доход на основе текущего трафика и коэффициентов конверсии. Это позволяет заинтересованным сторонам мгновенно увидеть стоимость невыполнения исправления, обеспечивая более быстрое выделение ресурсов.
            </p>

              `
    },
    2: {
        title: "Вся Экосистема Темы",
        content: `
            <h3>Построение Модели Контентного Хаба и Кластера</h3>
            <p>Мы разрабатываем всеобъемлющие страницы "Хабов", которые охватывают широкую тему, поддерживаемые множеством статей "Кластеров", глубоко прорабатывающих под-сущности. Сильная внутренняя перелинковка связывает эту экосистему, эффективно передавая авторитет.    </p>

            <h3>Продвинутая Идентификация Сущностей через NLP</h3>
            <p>Используя инструменты Обработки Естественного Языка (NLP), мы определяем конкретные сущности и семантические связи, которые использует лидирующий в рейтинге контент, гарантируя, что Ваш контент использует точный язык и контекст, требуемый алгоритмом.
            </p>

            <h3>Стратегия Википедии для Доверия к Бренду</h3>
            <p>Мы фокусируемся на получении цитирования и упоминаний от авторитетных, пользующихся высоким доверием внешних источников (подобно источникам Википедии), чтобы подтвердить авторитет и экспертность Вашего бренда в глазах поисковой системы, напрямую подпитывая сигнал E-A-T.
            </p>   `
    },
    3: {
        title: "Раскрытие Скорости и Возможности Сканирования",
        content: `
            <h3>Выбор Правильной Стратегии Рендеринга</h3>
            <p>Мы анализируем трафик, волатильность контента и намерения пользователя, чтобы определить, что является оптимальным путем для максимальной выгоды SEO: Рендеринг на Стороне Сервера (SSR) для динамического контента или Генерация Статических Сайтов (SSG) для высокоскоростного контента.
            </p>

            <h3>Измерение Времени до Индексации (TTI) и Задержки Гидрации</h3>
            <p>Традиционных метрик скорости недостаточно. Мы измеряем Время до Индексации (момент, когда контент становится доступным для Googlebot) и оптимизируем процесс гидрации, чтобы обеспечить, что интерактивность не ставит под угрозу первоначальное сканирование.
            </p>

            <h3>Критическая Роль Динамического Рендеринга как Запасного Варианта</h3>
            <p>Для сложных одностраничных приложений (SPA) мы внедряем динамический рендеринг, чтобы предоставить поисковым роботам предварительно отрендеренную, сканируемую версию контента, сохраняя при этом пользовательский опыт на стороне клиента.
            </p>  `
    },
    4: {
        title: "Искусство Максимизации Времени Пребывания и Минимизации Показателя Отказов",
        content: `
            <h3>Структура Сопоставления Намерения и Действия</h3>
            <p>Мы классифицируем ключевые слова по четырем основным намерениям (Действие, Знание, Переход, Покупка) и согласовываем тип контента, тон и Призыв к Действию (CTA) непосредственно с этим конкретным намерением, гарантируя немедленную релевантность после клика на результат поиска.
            </p>

            <h3>Оптимизация Области Над Сгибом для Мгновенной Ценности</h3>
            <p>Критические первые несколько секунд определяют Время Пребывания. Мы безжалостно оптимизируем контент, видимый "над сгибом", чтобы немедленно предоставить основной ответ или ценностное предложение, не давая пользователю прокрутить страницу вверх и нажать кнопку "Назад".
            </p>

            <h3>Анализ Функций SERP для Подсказок по Формату</h3>
            <p>Перед созданием контента мы анализируем текущий SERP на предмет доминирующих форматов (списки, таблицы, видео, калькуляторы). Имитация доминирующего формата сигнализирует Google, что Ваш контент структурирован так, как ожидают пользователи для этого запроса.
            </p>   `
    },
    5: {
        title: "Масштабирование Скорости Ссылок с Помощью Новостного Контента",
        content: `
            <h3>"Аналитическое Исследование" как Активируемый для Ссылок Ресурс</h3>
            <p>Мы проводим уникальные, собственные исследования или агрегируем существующие данные для создания защищаемого, достойного цитирования исследования. Этот ресурс становится основой для обращения к изданиям, ищущим свежие, оригинальные данные для цитирования.
            </p>

            <h3>Гипер-Целевое Обращение к Журналистам</h3>
            <p>Вместо массовых рассылок по электронной почте мы выявляем журналистов, которые недавно освещали точную тему нашего аналитического исследования. Обращение фокусируется исключительно на уникальной, новой ценности, которую данные предлагают их существующей аудитории.
            </p>

            <h3>Максимизация Релевантности Ссылок и Контроля Анкорного Текста</h3>
            <p>Несмотря на то, что ссылки "зарабатываются", стратегия направляет диалог таким образом, чтобы окружающий текст и анкорный текст, используемый цитирующим изданием, были контекстуально релевантны целевой денежной странице, максимизируя передаваемый ссылочный вес.
            </p>   `
    },
    6: {
        title: "Международное SEO",
        content: `
            <h3>Стратегическая Структура URL для Глобальных Рынков</h3>
            <p>Мы оцениваем компромиссы между Доменами Верхнего Уровня с Кодом Страны (ccTLD), гео-таргетированными поддоменами и подкаталогами для конкретных языков, выбирая структуру, которая наилучшим образом балансирует SEO-авторитет и административную сложность.
            </p>

            <h3>Аудит и Отладка Внедрения Hreflang</h3>
            <p>Самый большой сбой в международном SEO — это Hreflang. Мы проводим тщательные аудиты, чтобы обеспечить правильный синтаксис, двустороннюю адресацию и корректную обработку региональных вариаций (например, en-us против en-gb), включая обязательный тег x-default.
            </p>

            <h3>Локализованный Подбор Ключевых Слов и Намерение Поиска</h3>
            <p>Простого перевода недостаточно. Мы проводим исследование ключевых слов на родном языке на каждом целевом рынке, признавая, что поисковое поведение и намерения часто значительно различаются между странами, говорящими на одном базовом языке.
            </p>   `
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
