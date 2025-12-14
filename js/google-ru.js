
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

        // Accordion functionality
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                // Close all cards
                document.querySelectorAll('.tool-card').forEach(c => {
                    c.classList.remove('expanded');
                });
                
                // Open clicked card if it wasn't already open
                if (!isExpanded) {
                    card.classList.add('expanded');
                }
            });
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
 
        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Стратегический Ввод Данных для Алгоритмического Успеха",
        content: `
            <p>
            Кампании Performance Max мощные, но непрозрачные. Успех заключается не в контроле алгоритма, а в мастерстве ввода данных: качество Ваших групп объектов, сигналов аудитории и фидов продуктов определяет прибыльность результата.
            </p>

            <h3>Ключевая Роль Сигналов Аудитории</h3>
            <p>
            PMax использует сигналы аудитории (пользовательские сегменты, прошлые покупатели) как ориентир, а не ограничение. Мы еженедельно оптимизируем эти сигналы, чтобы направить машину к Вашим наиболее ценным клиентам, радикально повышая эффективность фазы обучения.
            </p>

            <h3>Максимизация Прибыльности Групп Объектов</h3>
            <p>
            Вместо общих групп объектов, мы сегментируем их по темам, категориям продуктов или этапам воронки. Это позволяет нам выделять определенные бюджетные распределения и сообщения, которые мощно резонируют с конкретными намерениями клиентов.
            </p>

            `
    },
    2: {
        title: "Структурирование Кампаний Вокруг Пути Покупателя, а Не Просто Фраз",
        content: `
            <h3>Стратегия Фазы 'Знаю' (Know)</h3>
            <p>
            Ключевые слова здесь широкие ("что такое X"). Мы используем более низкие ставки и информационный рекламный текст, связанный с образовательным контентом блога. Это захватывает лидов на ранних этапах воронки, не перерасходуя средства на клики с низким намерением.
            </p>

            <h3>Стратегия Фазы 'Покупаю' (Buy)</h3>
            <p>
            Ключевые слова здесь конкретные ("купить товар X онлайн"). Мы используем высокие ставки, срочный рекламный текст прямого отклика и прямую ссылку на страницу оформления заказа, максимизируя возможность немедленной конверсии.
            </p>

            <h3>Динамическая Корректировка Ставок по Намерению</h3>
            <p>
            Изолируя группы намерений в отдельные кампании, мы можем применять продвинутые стратегии Smart Bidding (Целевая ROAS/CPA), адаптированные к ожидаемой ценности конверсии этого конкретного кластера пользователей, обеспечивая эффективность бюджета.
            </p>
             `
    },
    3: {
        title: "Продвинутое Манипулирование Фидом для ROAS",
        content: `
            <h3>Динамическое Дополнение Заголовков</h3>
            <p>
            Мы добавляем высокоценные модификаторы высокого намерения (например, "Бесплатная Доставка", "Люкс", "Дешево") к заголовкам товаров в зависимости от категории и сезонности, делая Ваше объявление выделяющимся среди конкурентов в результатах поиска.
            </p>

            <h3>Сегментация по Пользовательским Меткам для Назначения Ставок</h3>
            <p>
            Используя пользовательские метки (например, high_margin, slow_mover, seasonal_product), мы создаем гранулярные сегменты назначения ставок в структуре кампании, гарантируя, что мы агрессивно тратим только на те товары, которые приносят самую высокую прибыль.
            </p>

            <h3>Исключение Напрасных Расходов Через Правила Фида</h3>
           <p>
           Мы используем правила фида для подавления товаров с низким запасом, нулевой прибылью или исторически низкой конверсией до того, как они попадут в кампанию, гарантируя, что 100% бюджета сосредоточено на жизнеспособном инвентаре.
           </p>
             `
    },
    4: {
        title: "Почему Точные Данные о Продажах — Ваше Главное Преимущество",
        content: `
            <h3>Точное Отслеживание Офлайн-Конверсий</h3>
            <p>
            Критично для бизнесов с длительным циклом продаж или B2B компонентами. Мы отслеживаем лиды, сгенерированные онлайн, но закрытые офлайн, передавая эту истинную ценность обратно в Google Ads для превосходной оптимизации.
            </p>

            <h3>Улучшенная Производительность Smart Bidding</h3>
            <p>
            Когда алгоритмы Google получают более точные и всеобъемлющие данные о конверсиях, они становятся экспоненциально лучше в прогнозировании того, какие пользователи с наибольшей вероятностью совершат конверсию, что приводит к более высокому ROAS в масштабе.
            </p>

            <h3>Восстановление Данных с Соблюдением Конфиденциальности</h3>
           <p>
           Enhanced Conversions использует безопасное одностороннее хеширование данных клиентов, поддерживая полное соответствие современным стандартам конфиденциальности, восстанавливая при этом ценные сигналы данных, которые ранее были исключены из-за изменений в политике конфиденциальности.
           </p>`
    },
    5: {
        title: "Пользовательские Скрипты для Эффективности",
        content: `
            <h3>Автоматизированные Ограничители Бюджета</h3>
            <p>
            Скрипты используются для мониторинга ежедневных расходов по всем кампаниям и приостановки низкоэффективных ключевых слов или повышения ставок по высокоэффективным только тогда, когда дневной бюджет приближается к заданному порогу.
            </p>

            <h3>Продвинутый Мониторинг Показателя Качества (Quality Score)</h3>
            <p>
            Скрипт может быть настроен на пометку любого ключевого слова, чей Показатель Качества падает ниже критического уровня (например, 4/10), и автоматически добавлять его в пользовательский отчет или даже запускать конкретные действия по оптимизации.
            </p>

            <h3>Назначение Ставок на Основе Погоды и Времени</h3>
            <p>
            Для соответствующих отраслей (например, HVAC, мода) скрипты могут динамически корректировать ставки. Например, повышая ставки по ключевым словам, связанным с зонтами, только когда местный прогноз погоды предсказывает дождь.
            </p> `
    },
    6: {
        title: "Использование Намерений Поиска для Таргетинга Зрителей YouTube",
        content: `
            <h3>Ускоритель Ретаргетинга</h3>
            <p>
            Пользователи, которые искали общее "проблемное ключевое слово", но не совершили конверсию, немедленно добавляются в список аудитории YouTube. Затем им показывается видеообъявление, объясняющее Ваш продукт как решение, что значительно ускоряет их путь к покупке.
            </p>

            <h3>Конкурентное Завоевание через Видео</h3>
            <p>
            Мы создаем сегменты пользователей, которые искали точное название бренда конкурента, а затем показываем им видеообъявления на YouTube, подчеркивающие превосходные характеристики Вашего продукта, эффективно отбирая долю рынка.
            </p>

            <h3>Воронка на Основе Последовательности</h3>
            <p>
            Используя последовательный таргетинг видеообъявлений, мы гарантируем, что пользователь сначала увидит видео для осведомленности о бренде на YouTube, а затем, после поиска релевантных ключевых слов, ему будет показано видеообъявление прямого отклика, содержащее ограниченное по времени предложение.
            </p>  `
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