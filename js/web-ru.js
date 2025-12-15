
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

        
        // ======================== ARTICLE SLIDER ========================
const articles = {
    1: {
        title: "Разработка Ботов для Самодиагностики и Выполнения Задач",
        content: `
            <p>Новое поколение чат-ботов не просто маршрутизирует запросы; они созданы с глубокой интеграцией в системы планирования ресурсов предприятия (ERP) или управления взаимоотношениями с клиентами (CRM). Это позволяет им выполнять такие действия, как обработка возврата, обновление заказа или даже исправление простой настройки учетной записи — все автоматически.
            </p>

            <h3>Архитектура Решений, Ориентированная на API</h3>
            <p>Мы разрабатываем ботов, используя подход API-first, гарантируя, что каждая основная бизнес-функция доступна через безопасный, модульный API. Эта инфраструктура является основой для способности бота выполнять сложные многоэтапные задачи.
            </p>

            <h3>Петля Обратной Связи и Самокоррекция</h3>
            <p>Бот спроектирован с непрерывным циклом обучения. Каждое успешное или неуспешное решение регистрируется и анализируется для уточнения будущих путей диагностики, что позволяет системе улучшать коэффициент успешности без переподготовки разработчиком.
            </p>
             `
    },
    2: {
        title: "Контекстуальная Инженерия",
        content: `
            <h3>Поведенческие Триггерные Точки и Сдвиги Макетa</h3>
            <p>Мы определяем точные поведенческие триггеры, такие как "три быстрых перехода на страницу справки" или "длительное время на графике сравнения с конкурентами", которые вызывают немедленное изменение макета страницы, выделяя обнадеживающие элементы, такие как отзывы или гарантии.
            </p>

            <h3>Приоритезация Контента на Основе Скорости</h3>
            <p>Контенту присваивается оценка скорости. Для пользователей, которые демонстрируют быструю навигацию с высоким намерением, мы выносим основную информацию выше на странице. Для медленных, обдумывающих пользователей мы приоритизируем подробные факты и социальное доказательство глубже в структуре.
            </p>

            <h3>Рендеринг Профилей Пользователей на Стороне Сервера</h3>
            <p>Персонализация обрабатывается на стороне сервера, гарантируя, что полностью адаптированный интерфейс загружается мгновенно. Это позволяет избежать резкого мерцания, связанного с модификациями на стороне клиента, и обеспечивает согласованный пользовательский опыт во всех точках взаимодействия.
            </p>   `
    },
    3: {
        title: "Переводчик Данных (The Data Translator)",
        content: `
            <h3>Сопоставление Протоколов и Нормализация Данных</h3>
            <p>Промежуточное ПО (middleware) отвечает за нормализацию полей данных из разных источников, таких как преобразование Customer_ID_SAP в client_hash_CRM, обеспечивая целостность и согласованность данных во всем технологическом стеке.
            </p>

            <h3>Архитектура Микросервисов, Управляемая Событиями</h3>
            <p>Вместо постоянного опроса, интеграция использует архитектуру, управляемую событиями. Когда в Системе А происходит конкретное событие, такое как "Обновление Инвентаря", микросервис мгновенно передает изменение только в необходимую нисходящую Систему Б, снижая нагрузку и задержку.
            </p>

            <h3>Абстракция Уровня Безопасности</h3>
            <p>Промежуточное ПО действует как централизованный шлюз безопасности. Вместо того, чтобы настраивать правила безопасности на каждой устаревшей системе индивидуально, все внешние современные приложения взаимодействуют только с безопасным уровнем промежуточного ПО, что упрощает соблюдение требований и управление.
            </p>  `
    },
    4: {
        title: "Фокус на Единственной, Мгновенной Доставке Ценности",
        content: `
            <h3>Платформенно-Агностические Встраиваемые Виджеты</h3>
            <p>Микроприложение кодируется с использованием универсальных веб-стандартов, чтобы его можно было легко встроить на любую платформу, от поста в блоге до стороннего каталога, сохраняя единообразие бренда и производительность независимо от хост-среды.
            </p>

            <h3>Сохранение Данных Только в Течение Сеанса</h3>
            <p>Эти служебные приложения по умолчанию разработаны с учетом конфиденциальности. Они обрабатывают все необходимые вычисления и действия в рамках текущего сеанса пользователя, минимизируя требования к хранению данных и упрощая процессы согласия пользователя.
            </p>

            <h3>Атрибуция Через Встроенный Контекст</h3>
            <p>Каждый экземпляр микроприложения содержит скрытые контекстные параметры, которые привязывают действие пользователя непосредственно к исходному источнику, позволяя маркетологам точно измерять окупаемость инвестиций от встраивания инструмента на различные внешние каналы.
            </p>    `
    },
    5: {
        title: "Приоритизация Автономии Пользователя Над Краткосрочными Хаками Конверсии",
        content: `
            <h3>Обратимые Действия и Периоды "Остывания"</h3>
            <p>Критические действия, такие как безвозвратное удаление учетной записи или крупное понижение плана, разрабатываются с временным периодом ожидания или простой кнопкой "отменить", что снижает случайную потерю обслуживания и повышает доверие пользователей.
            </p>

            <h3>Ясность Вместо Когнитивной Нагрузки</h3>
            <p>Вместо использования сложного жаргона или сокрытия важной информации, мы используем простой язык и четкие визуальные иерархии. При отображении цены, например, мы гарантируем, что общая стоимость, дата продления и политика отмены сразу видны, устраняя трение от путаницы. </p>

            <h3>Поведенческие Подсказки для Положительных Результатов</h3>
            <p>Мы используем положительные подсказки (тонкие визуальные сигналы интерфейса) для поощрения полезного поведения пользователей, такие как выделение настроек по умолчанию для экономии энергии или предложение более безопасного пароля, вместо использования карающих или обманчивых сообщений. </p>    `
    },
    6: {
        title: "Коммерция на Смарт-Контрактах",
        content: `
            <h3>Подтверждаемая Собственность Через NFT</h3>
            <p>Уникальные цифровые активы или уровни лояльности выпускаются как невзаимозаменяемые токены (NFT), предоставляя клиенту доказуемое, передаваемое право собственности на его статус вознаграждения или эксклюзивный доступ к контенту, что резко увеличивает воспринимаемую ценность. </p>

            <h3>Прозрачное Отслеживание Цепочки Поставок на Основе DLT</h3>
            <p>Для электронной коммерции мы интегрируем решение DLT (технология распределенного реестра), которое позволяет клиентам публично проверить происхождение, обработку и подлинность продукта, решая критически важные для потребителя вопросы о происхождении и этическом снабжении непосредственно через платформу.  </p>

            <h3>Децентрализованная Аутентификация и Хранилища Данных</h3>
            <p>Пользователям предлагается возможность аутентификации через децентрализованные решения для идентификации. Хранение данных смещается в частные, зашифрованные хранилища, где пользователь сохраняет ключи, позволяя ему предоставлять временный, поддающийся аудиту доступ к приложению только при необходимости. </p>    `
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
