
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

        // Add interactive like animation
        document.addEventListener('DOMContentLoaded', () => {
            const likeCount = document.querySelector('.like-count .counter');
            
            // Animate like count
            setTimeout(() => {
                let count = 1247;
                const increment = setInterval(() => {
                    count += Math.floor(Math.random() * 3) + 1;
                    likeCount.textContent = count.toLocaleString();
                    
                    if (count >= 1750) {
                        clearInterval(increment);
                    }
                }, 100);
            }, 3000);
            
            // Heart pulse on click
            const likeIcon = document.querySelector('.like-icon');
            likeIcon.addEventListener('click', () => {
                likeIcon.style.transform = 'scale(1.3)';
                likeIcon.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    likeIcon.style.transform = 'scale(1)';
                }, 100);
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
        title: "Поиск Партнеров на Смежных Рынках",
        content: `
            <p>
            Настоящий рост партнерских отношений происходит за счет выявления компаний, которые обслуживают того же клиента, но решают разные проблемы. Эта стратегия расширяет Ваш Общий Доступный Рынок (TAM) без прямой конкуренции.
            </p>

            <h3>Выявление Возможностей в «Белых Зонах»</h3>
            <p>
            Мы анализируем услуги, которые Ваш клиент покупает непосредственно до или сразу после покупки Вашего продукта. Эти услуги в «белых зонах» представляют собой идеальных партнеров для совместных продаж или маркетинга, которые уже пользуются доверием Вашего идеального клиента.
            </p>

            <h3>Ценностное Предложение «Совместного Решения»</h3>
            <p>
            Вместо продвижения отдельных продуктов друг друга, мы фокусируемся на создании единого, интегрированного совместного решения, которое охватывает весь рабочий процесс клиента. Это унифицированное предложение обеспечивает экспоненциально более высокую воспринимаемую ценность для конечного пользователя.
            </p>
            `
    },
    2: {
        title: "Точный Трекинг: Разработка Модели Мульти-Атрибуции для Партнерств",
        content: `
            <h3>Выделенные Партнерские Ссылки и Коды</h3>
            <p>
            Каждый партнер получает уникальные активы для отслеживания (ссылки, выделенные целевые страницы и уникальные поля кода в CRM), которые гарантируют правильную атрибуцию, независимо от того, когда произойдет окончательная продажа.
            </p>

            <h3>Интеграция CRM для Отслеживания Влияния</h3>
            <p>
            Мы настраиваем правила CRM для отслеживания не только *источника* лида, но и *влияния* партнера. Если на каком-либо этапе было задействовано контактное лицо партнера (например, совместный вебинар), это влияние регистрируется и оценивается.
            </p>

            <h3>90-Дневное Окно Конверсии</h3>
            <p>Чтобы упростить комиссионные и распределение доходов, мы устанавливаем четкие юридические и технические параметры, такие как 90-дневное окно конверсии, обеспечивая определенность для обеих сторон в отношении атрибутированных продаж и вознаграждения.
            </p>    `
    },
    3: {
        title: "Максимизация Веса Ссылок и Тематического Авторитета через Партнеров",
        content: `
            <h3>Совместные Исследования и Отчеты о Данных</h3>
            <p>Мы инициируем совместные исследовательские проекты, которые объединяют данные обеих компаний. Полученный совместный отчет генерирует значительный PR-шум и возможности для получения высококачественных ссылок от отраслевых изданий на оба домена.
            </p>

            <h3>Матрица Обмена Гостевыми Постами</h3>
            <p>Помимо простого гостевого постинга, мы структурируем соглашение о взаимном обмене ссылками, где партнеры пишут экспертный контент для блогов друг друга, специально нацеливаясь на высокоценные, неконкурентные ключевые слова для повышения тематической релевантности.
            </p>

            <h3>Автоматизация Перехода от Совместного Вебинара к Лиду</h3>
            <p>За совместным вебинаром следует автоматическая последовательность, которая сегментирует лиды на основе уровня вовлеченности и разделяет их в соответствии с заранее согласованными условиями, быстро превращая потребителей совместного контента в квалифицированные лиды для продаж.
            </p>    `
    },
    4: {
        title: "Больше, Чем Просто Комиссия",
        content: `
            <h3>Многоуровневая Система Вознаграждений</h3>
            <p>Мы устанавливаем четкие уровни производительности, основанные на квалифицированных лидах или полученном доходе. Более высокие уровни открывают лучшие ставки комиссии, выделенную поддержку, эксклюзивные фонды для совместного маркетинга и признание с высокой видимостью.
            </p>

            <h3>Ежемесячный Рейтинг и Признание</h3>
            <p>Публично видимый (внутренний) рейтинг, отслеживающий производительность партнеров, привносит соревновательную энергию. Лучшие получают очень желанное признание, такое как совместные кейсы, упоминания генерального директора или эксклюзивный доступ к мероприятиям.
            </p>

            <h3>Неденежные Партнерские Преимущества</h3>
            <p>Стимулы не всегда требуют наличных. Мы предлагаем стратегические неденежные вознаграждения, такие как приоритетный доступ к новым функциям продукта, выделенная инженерная поддержка или совместное обучение, углубляющие операционную связь.
            </p> `
    },
    5: {
        title: "Непрерывный Цикл Совместных Инноваций",
        content: `
            <h3>Официальный Консультативный Совет Партнеров (PAC)</h3>
            <p>Мы организуем регулярные встречи с ведущими стратегическими партнерами для обсуждения пробелов в текущем продукте и потенциальных интеграций. Этот официальный совет дает партнерам право голоса и гарантирует приверженность будущим совместным планам развития.
            </p>

            <h3>API Интеграция как Партнерская Метрика</h3>
            <p>Успех измеряется не только рефералами по продажам, но и глубиной и качеством технической интеграции. Надежная, бесшовная интеграция API становится ключевым показателем эффективности (KPI) для партнерской команды.
            </p>

            <h3>Ранний Доступ и Бета-Тестирование для Партнеров</h3>
            <p>Партнеры получают ранний доступ к новым функциям и участвуют в бета-тестировании. Это дает им преимущество в разработке комплементарных услуг или обучении своих отделов продаж, обеспечивая готовность к совместному решению к моменту запуска.
            </p>    `
    },
    6: {
        title: "Подход к Управлению Партнерским Портфелем на Основе Данных",
        content: `
            <h3>Определение Показателя Здоровья Партнерства</h3>
            <p>Мы внедряем многофакторный «Показатель Здоровья», основанный на трех KPI: Объем Лидов, Общий Доход и Частота Взаимодействия. Показатель ниже эталона в течение двух кварталов подряд инициирует формальный пересмотр. </p>

            <h3>Трехфазный Процесс Прекращения Сотрудничества</h3>
            <p>Расторжение альянса включает трехэтапный процесс: Анализ, План Оптимизации и Корректное Прекращение (Graceful Sunset).
            </p>

            <h3>Защита Общих Данных и ИС</h3>
            <p>Устанавливаются четкие юридические и технические протоколы для завершения партнерства, обеспечивающие безопасное и соответствующее нормам обращение с общими списками клиентов, интеллектуальной собственностью и учетными данными для предотвращения будущих конфликтов.
            </p>    `
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
 