
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

        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Нейротаргетинг",
        content: `
            <p>Стандартный ретаргетинг носит транзакционный характер; эмоциональный ретаргетинг — межличностный. Мы используем поведенческие сигналы, такие как повторные посещения без конверсии или глубокое погружение в сложный контент, чтобы определить эмоциональное состояние пользователя (замешательство, нерешительность или проблемы с доверием) и показывать рекламу, которая подтверждает и решает это конкретное чувство.
            </p>

            <h3>Картирование Точек Трения на Эмоциональные Состояния</h3>
            <p>Мы определяем конкретные действия на сайте (например, многократные клики по "Стоимость доставки" или просмотр политики возврата несколько раз) и сопоставляем их с психологическими состояниями, такими как "Тревога" или "Избегание Риска", для точного таргетинга.
            </p>
            
            <h3>Креатив "Признание Боли"</h3>
            <p>Рекламный текст специально разработан так, чтобы начинаться с признания вероятной болевой точки пользователя. Эта радикальная честность мгновенно вызывает доверие и взаимопонимание, в отличие от общих коммерческих предложений.
             `
    },
    2: {
        title: "Контроль Прибыльности (Profit Policing)",
        content: `
            <h3>Распознавание Моделей Оттока</h3>
            <p>Мы загружаем исторические данные об отмененных подписках или покупателях с высоким процентом возвратов в модель машинного обучения рекламной платформы, чтобы найти общие черты источника.
            </p>

            <h3>Исключение Аудитории 'Пожирателей Поддержки'</h3>
            <p>Пользователи, которые демонстрируют чрезмерное взаимодействие с разделами часто задаваемых вопросов (FAQ) и поддержки, но не совершили конверсию, добавляются во временный список исключения, перенаправляя бюджет на пользователей, демонстрирующих более плавное поведение с высоким намерением.
            </p>

            <h3>Исключение по Порогу LTV</h3>
            <p>Мы прекращаем таргетинг на похожие аудитории, полученные от первоначальных покупателей, и вместо этого фокусируемся на похожих аудиториях по LTV (пожизненной ценности). Любая аудитория, которая исторически опускается ниже минимально допустимого порога LTV, немедленно понижается в приоритете или полностью исключается.
            </p>   `
    },
    3: {
        title: "Проксимити-Маркетинг (Proximity Marketing)",
        content: `
            <h3>Создание Пользовательской Аудитории для Похожих Участников Мероприятий</h3>
            <p>До мероприятия мы выявляем общие характеристики (должности, интересы) прошлых посетителей, чтобы создать высококвалифицированную похожую аудиторию, которую можно использовать до, во время и после физического мероприятия.
            </p>

            <h3>Развертывание Рекламы в Реальном Времени в Часы Пиковой Активности</h3>
            <p>Реклама планируется к показу только в часы основного проведения мероприятия (например, с 9:00 до 17:00) и сопровождается текстом, основанным на срочности, гарантируя, что бюджет будет потрачен, когда цель, скорее всего, будет активной и восприимчивой.
            </p>

            <h3>Стратегия Последовательного Дальнейшего Контакта</h3>
            <p>После мероприятия целевые пользователи получают последующую рекламу, которая прямо ссылается на событие. Этот гиперперсональный подход обходит информационный шум конкурентов.
            </p>  `
    },
    4: {
        title: "Стратегия для Бесконечного Масштабирования Креатива",
        content: `
            <h3>Внедрение Творческого Цикла "Трех Столпов"</h3>
            <p>Мы классифицируем креативные материалы по трем основным столпам (Ориентированные на продукт, Отзывы/Социальное доказательство и Образовательные/Ценностные) и еженедельно ротируем распределение бюджета между этими столпами, чтобы обеспечить разнообразие сообщений.
            </p>

            <h3>Правила Автоматизации на Основе Частоты</h3>
            <p>Правила автоматизации настроены на приостановку любого набора объявлений, где 7-дневная частота превышает определенный порог (например, 3.0), и автоматическую активацию заранее определенного резервного набора объявлений с совершенно новыми креативными материалами и текстом.
            </p>

            <h3>Быстрая Итерация Низкоэффективных Переменных</h3>
            <p>Вместо того чтобы полностью отказываться от рекламы, мы заменяем только самую низкоэффективную переменную (например, заголовок или цвет изображения) и повторно тестируем новую комбинацию. Эта сфокусированная итерация минимизирует время на создание креативов, одновременно максимизируя прирост производительности.
            </p>   `
    }
    ,
    5: {
        title: "За Пределами Ленты (Beyond the Feed)",
        content: `
            <h3>Персонализированная Генерация Ссылок для Отслеживания</h3>
            <p>Мы внедряем систему, в которой общие ссылки автоматически привязываются к первоначальному рефереру или конкретному каналу, что позволяет нам создавать точные сегменты ретаргетинга на основе качества и источника реферального трафика.
            </p>

            <h3>Креатив Высокого Доверия для Реферальных Аудиторий</h3>
            <p>Рекламные объявления для ретаргетинга, показываемые сегменту "Темного Социального" трафика, используют креатив, который говорит об общем доверии, извлекая выгоду из установленной рекомендации.
            </p>

            <h3>Активация 'Реферального Цикла'</h3>
            <p>Выявляя пользователей, которые делятся контентом в большом объеме через личные каналы, мы активируем специальную кампанию, чтобы стимулировать их к конверсии, тем самым превращая органический частный обмен в предсказуемый, измеримый платный канал привлечения.
            </p>  `
    },
    6: {
        title: "Оптимизация Ставок в Соответствии с Уровнем Интереса Пользователя",
        content: `
            <h3>События Конверсии в Микро-Окне</h3>
            <p>Мы определяем конкретные, короткие временные рамки и настраиваем правила ставок с высоким приоритетом исключительно для пользователей, которые вызвали событие с высоким намерением в течение этого окна, используя агрессивный текст и уникальные предложения.
            </p>
            <h3>Многоуровневое Назначение Ставок для Оценок Намерения</h3>
            <p>Пользователи делятся на сегменты "Горячий", "Теплый" и "Холодный" в зависимости от их недавней активности и глубины взаимодействия. Ставки являются самыми высокими для "Горячего" сегмента и постепенно снижаются по мере того, как пользователь переходит в категорию "Холодный".
            </p>
            <h3>Перенаправление Пользователя (Failing the User Forward)</h3>
            <p>Если пользователь неоднократно попадает в "Горячий" сегмент, но никогда не совершает конверсию, он автоматически перемещается в другую кампанию по взращиванию лидов, сосредоточенную на образовательном контенте, предотвращая трату бюджета на постоянно нерешительного "браузера".
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
 