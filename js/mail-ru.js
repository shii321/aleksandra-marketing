
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

        
        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Техническая Основа Идеальной Доставляемости Email",
        content: `
            <p>
            Показатели открытия бесполезны, если Ваши электронные письма никогда не попадают в основной почтовый ящик. Мы рассматриваем email-маркетинг как проблему ИТ-инфраструктуры, фокусируясь на технической настройке и репутации отправителя, необходимых для прохождения современных фильтров ISP.
            </p>

            <h3>Оценка Репутации Отправителя</h3>
            <p>
            История Вашего домена и IP-адреса определяет Ваш рейтинг репутации. Мы внедряем тщательную чистку списка и процессы двойного подтверждения подписки (double-opt-in), чтобы минимизировать жалобы на спам и поддерживать безупречную репутацию отправителя.
            </p>

            <h3>Аутентификация</h3>
            <p>
            Это обязательные технические стандарты, которые доказывают, что Вы являетесь тем, кем представляетесь. Мы гарантируем правильную настройку этих протоколов, что резко снижает вероятность того, что Вас пометят как поддельного отправителя.
            </p>

          `
    },
    2: {
        title: "Использование Поведения в Реальном Времени для Создания Уникальных Email-Путешествий",
        content: `
            <h3>Запуск Индикаторов Намерения Купить</h3>
            <p>
            Мы настраиваем поведенческие триггеры для действий с высоким намерением, таких как просмотр продукта три раза за 24 часа или проведение пяти минут на странице с ценами. Это запускает немедленное, релевантное, ненавязчивое последующее электронное письмо.
            </p>

            <h3>Блоки Динамических Рекомендаций Продуктов</h3>
            <p>
            Сетка продуктов внутри письма динамически заполняется на основе истории просмотров или прошлых покупок получателя, предлагая высокорелевантные кросс-продажи или обновления, что значительно превосходит статичные рекламные акции.
            </p>

            <h3>Центр Предпочтений как Концентратор Данных</h3>
            <p> 
            Мы преобразуем страницу отписки в центр предпочтений, позволяя пользователям выбирать желаемую частоту, тип контента и темы. Эта добровольная сегментация значительно улучшает вовлеченность и сокращает количество отписок.
            </p>`
    },
    3: {
        title: "Сопоставление Возможностей Получения Дохода по Всему Пути Клиента",
        content: `
            <h3>Последовательность с Высокой Конверсией для Брошенной Корзины</h3>
            <p>
            Эта критически важная последовательность использует структуру из 3 писем: напоминание, обработка возражений (бесплатная доставка/социальное доказательство) и финальное предложение. Она захватывает в среднем 15-20% продаж, которые в противном случае были бы потеряны.
            </p>

            <h3>Допродажа (Upsell) и Онбординг после Покупки</h3>
            <p>
            Сразу после покупки мы запускаем последовательность, сфокусированную на советах по использованию, обучении продукту и своевременном, релевантном предложении дополнительного продукта, что ускоряет принятие и увеличивает AOV (средний чек).
            </p>

            <h3>Стратегия 'Заката' (Sunset) и Реактивации</h3>
            <p>
            Мы предотвращаем устаревание списка, выявляя неактивных пользователей (нет кликов/открытий за 90 дней). Последовательность 'Закат' пытается реактивировать их специальными предложениями; те, кто не реагирует, безопасно удаляются для защиты доставляемости.
            </p> `
    },
    4: {
        title: "Запуск Психологических Показателей Открытия",
        content: `
            <h3>Использование Силы Специфики</h3>
            <p>
            Общие утверждения не работают. Мы используем числа, сроки и точные детали в теме письма (например, "Осталось 7 дней", "15% скидка только для Вас"), чтобы установить конкретную ценность и создать ощущение ограниченной возможности.
            <p>

            <h3>Принцип Пробела Любопытства</h3>
            <p>
            Мы стратегически скрываем важную часть информации, создавая разрыв между тем, что получатель знает, и тем, что он отчаянно хочет узнать. Эта мощная техника использует человеческую натуру, чтобы принудить к открытию.
            <p>

            <h3>Синергия Заголовка, Оптимизированного для Мобильных Устройств</h3>
            <p>
            Тема письма и предварительный заголовок (preheader) должны работать как единое целое. Поскольку мобильные дисплеи ограничены, мы используем пространство предварительного заголовка для предоставления важного контекста или социального доказательства, завершая "крючок", начатый в теме.
            </p>
            `
    }
    ,
    5: {
        title: "Продвинутая Оценка Лидов на Основе Потребления Контента",
        content: `
            <h3>Многоуровневая Оценка Контента</h3>
            <p>
            Мы оцениваем взаимодействие на основе уровня контента: 1 балл за просмотр блога, 5 баллов за скачивание Whitepaper (отчета) и 10 баллов за нажатие кнопки "Запросить демо". Этот суммарный балл определяет готовность лида к продаже.
</p>

            <h3>Дисквалификация Негативного Взаимодействия</h3>
            <p>
            Отслеживание негативных сигналов, таких как нажатие кнопки "Отписаться" или неоткрытие высокоприоритетного электронного письма, вызывает вычет баллов лида. Это предотвращает трату времени отделом продаж на невовлеченных потенциальных клиентов.
            </p>

            <h3>Автоматизация Передачи MQL</h3>
            <p>
            Как только лид пересекает заранее определенный порог баллов (например, 50 баллов), автоматический триггер мгновенно отправляет внутреннее уведомление отделу продаж вместе с полной историей вовлеченности лида по электронной почте, обеспечивая своевременное последующее действие.
            </p>
              `
    },
    6: {
        title: "Матрица Ценности Контента",
        content: `
            <h3>Баланс между Рекламным и Образовательным Контентом</h3>
            <p>
            Мы соблюдаем строгое соотношение, обычно 1:3 (одно рекламное письмо на каждые три образовательных или развивающих отношения письма). Это сохраняет восприятие отправителя как полезного партнера, а не просто продавца.
            </p>

            <h3>Ограничение Частоты Отправки по Сегментам</h3>
            <p>
            Вместо единой частоты для всего списка мы определяем максимальную частоту отправки для отдельных сегментов (например, Активные Покупатели получают больше, Холодные Лиды получают меньше). Это предотвращает чрезмерную рассылку и защищает доставляемость.
            </p>

            <h3>Автоматическое A/B/C Тестирование Типов Контента</h3>
            <p> 
            Мы постоянно тестируем, какой тип контента (видеоссылка, длинный текст или инфографика) работает лучше всего для разных сегментов. Это гарантирует активный мониторинг и противодействие "усталости от контента" путем адаптации формата к предпочтениям аудитории.
            </p>`
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
