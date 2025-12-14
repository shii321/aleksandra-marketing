
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


        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Использование Данных для Прогнозирования",
        content: `
            <p>
            Современные CRM-системы используют машинное обучение и глубокий анализ исторических данных, превращаясь из простого средства учета в проактивный центр бизнес-аналитики, который прогнозирует результаты.
            </p>

            <h3>Прогнозирование Будущих Потоков Дохода</h3>
            <p>
            Передовые модели CRM анализируют прошлую скорость закрытия сделок, данные скоринга лидов и продолжительность цикла продаж для генерации высокоточных прогнозов доходов, что позволяет финансовым и операционным командам точно планировать ресурсы.
            </p>

            <h3>Индекс Предотвращения Оттока Клиентов</h3>
            <p>
            Отслеживая отклонения в поведении клиентов (например, уменьшение количества обращений в поддержку, снижение использования ПО, более медленные платежи), CRM рассчитывает 'оценку риска оттока' в реальном времени, запуская проактивные стратегии вмешательства до того, как произойдет потеря клиента.
            </p>
 `
    },
    2: {
        title: "Повышение Морального Духа и Эффективности через Дизайн",
        content: `
            <h3>Минимизация Трения при Вводе Данных</h3>
            <p>
            Плохо спроектированные CRM приводят к рутинной усталости и устаревшим записям. Внедряя логирование в один клик, умные интеграции (например, синхронизацию электронной почты) и формы ввода, ориентированные на мобильные устройства, ввод данных становится бесшовным и менее обременительным для занятого персонала.
            </p>

            <h3>Персонализированные Панели Управления для Пользователей</h3>
            <p>
            Нет двух одинаковых ролей. Торговым представителям нужна видимость воронки, в то время как агентам службы поддержки — история заявок. Разработка пользовательских панелей, специфичных для каждой роли, уменьшает беспорядок, повышает сосредоточенность и гарантирует, что критически важные KPI всегда видны и пригодны для принятия мер.
            </p>

            <h3>Геймификация Рабочих Процессов Продаж</h3>
            <p>
            CRM может интегрировать соревновательные элементы, такие как таблицы лидеров, виртуальные значки и системы вознаграждений за своевременное выполнение задач и достижение целей по конверсии. Это использует внутреннюю мотивацию, делая ежедневное использование CRM более увлекательным и ориентированным на цель.
            </p>   `
    },
    3: {
        title: "Использование CRM для Глубокой Поведенческой Сегментации",
        content: `
            <h3>Микросегментация по Намерению</h3>
            <p>
            CRM фиксирует сигналы намерения, такие как частота посещения веб-сайта, скачанные документы или просмотренные конкретные страницы. Это позволяет сегментировать пользователей в группы, например, "Интересующиеся Ценами" или "Сфокусированные на Интеграции", обеспечивая доставку высокоспецифичного контента.
            </p>

            <h3>Автоматизация Стадий Жизненного Цикла</h3>
            <p>
            Каждый контакт в CRM сопоставляется с точной стадией (Лид, Квалифицированный лид, Возможность, Евангелист). Правила автоматизации обеспечивают динамическую корректировку доставки контента и частоты контактов с продажами на основе этой стадии, предотвращая преждевременное обращение или пропущенные последующие действия.
            </p>

            <h3>Динамическое Внедрение Контента</h3>
            <p>
            Поля данных CRM (например, размер компании, отрасль, недавняя покупка) используются для динамического внедрения персонализированных элементов в электронные письма, целевые страницы и рекламу, благодаря чему контент кажется разработанным специально для конкретного получателя, что повышает коэффициенты конверсии.
            </p>
             `
    },
    4: {
        title: "Централизация Клиентских Данных для Единых Бизнес-Операций",
        content: `
            <h3>Устранение Дублирования и Конфликта Данных</h3>
           <p>
           Интеграция CRM с финансовыми и инвентаризационными системами предотвращает конфликтующие записи. Если адрес клиента меняется в CRM, он автоматически обновляется в системе выставления счетов, устраняя общие административные ошибки и путаницу для клиента.
           <p>

            <h3>Кросс-Департаментная Видимость</h3>
            <p>
            Отдел продаж видит открытые заявки в службу поддержки (из сервисного модуля), а отдел обслуживания видит историю покупок клиента (из модуля продаж). Эта видимость гарантирует, что каждое взаимодействие является информированным и контекстуально релевантным.
            </p>

            <h3>Целостная Пожизненная Ценность Клиента (LTV)</h3>
            <p>
            Путем подключения маркетинговых расходов (с рекламной платформы), операционных расходов (из ERP) и доходов (из воронки продаж) в рамках CRM, бизнес может точно рассчитать истинный LTV и прибыльность различных сегментов клиентов.
            </p> `
    },
    5: {
        title: "Автоматизация Программ Лояльности и Рефералов с Помощью CRM",
        content: `
            <h3>Отслеживание Оценок Здоровья после Продажи</h3>
            <p>
            После конверсии CRM отслеживает ключевые показатели "здоровья" (например, успешность онбординга, уровень принятия функций, частота входов). Высокие оценки автоматически запускают запросы на публичные отзывы или участие в кейсах.
            </p>

            <h3>Автоматизированное Перемещение по Уровням Лояльности</h3>
            <p>
            Как только клиент достигает заранее определенных порогов расходов или долговечности, записанных в CRM, он автоматически переводится на более высокий уровень лояльности, мгновенно предоставляя новые привилегии без ручного вмешательства менеджеров по работе с клиентами.
            </p>

            <h3>Выявление Возможностей для Рефералов</h3>
            <p>
            CRM отмечает клиентов, которые продемонстрировали устойчивую вовлеченность, предоставили положительный отзыв или купили дополнительный продукт, как идеальных кандидатов для реферальной программы. Эта автоматизация обеспечивает высококачественные входящие лиды с низкими затратами на привлечение.
            </p> `
    },
    6: {
        title: "Максимизация ROI с Помощью Отраслевых CRM-Платформ",
        content: `
            <h3>Предварительно Настроенные Отраслевые Рабочие Процессы</h3>
            <p>
            Вертикальные CRM поставляются с предварительно загруженными необходимыми воронками продаж, терминологией и контрольными точками юридического соответствия, относящимися к конкретной отрасли. Например, финансовая CRM включает шаги KYC (Знай Своего Клиента), встроенные в воронку лидов.
            </p>

            <h3>Нативная Интеграция с Отраслевыми Инструментами</h3>
            <p>
            Эти нишевые системы часто интегрируются нативно с отраслевым программным обеспечением (например, MLS для недвижимости, EMR для здравоохранения), что устраняет необходимость в сложных, дорогостоящих и часто нестабильных кастомных API.
            </p>

            <h3>Упрощенное Обучение и Внедрение</h3>
            <p>
            Поскольку интерфейс, поля и язык рабочего процесса соответствуют существующей профессиональной терминологии команды, время на обучение радикально сокращается, что приводит к гораздо более высокому уровню принятия пользователями и более быстрой окупаемости инвестиций (ROI).
            </p> `
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
