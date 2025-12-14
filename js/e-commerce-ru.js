
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
            const products = document.querySelectorAll('.product-card');
            const cartBadge = document.getElementById('cartBadge');
            const addNotification = document.getElementById('addNotification');
            const discountNotification = document.getElementById('discountNotification');
            
            let currentProduct = 0;
            let cartCount = 0;
            let isAnimating = false;
            
            // Show first product
            function showProduct(index) {
                products.forEach((product, i) => {
                    product.classList.remove('active', 'swiped-left');
                    if (i < index) {
                        product.classList.add('swiped-left');
                    } else if (i === index) {
                        product.classList.add('active');
                    }
                });
            }
            
            // Auto swipe products
            function autoSwipe() {
                if (isAnimating) return;
                
                currentProduct = (currentProduct + 1) % products.length;
                showProduct(currentProduct);
                
                // Show discount notification occasionally
                if (currentProduct === 2) {
                    setTimeout(() => {
                        discountNotification.classList.add('show');
                        setTimeout(() => {
                            discountNotification.classList.remove('show');
                        }, 3000);
                    }, 1000);
                }
            }
            
            // Add to cart functionality
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    if (isAnimating) return;
                    isAnimating = true;
                    
                    // Increment cart
                    cartCount++;
                    cartBadge.textContent = cartCount;
                    cartBadge.classList.add('visible');
                    
                    // Show notification
                    addNotification.classList.add('show');
                    
                    // Button feedback
                    this.textContent = 'Added!';
                    this.style.background = '#00F260';
                    
                    setTimeout(() => {
                        addNotification.classList.remove('show');
                        this.textContent = 'Add to Cart';
                        this.style.background = '';
                        isAnimating = false;
                    }, 2000);
                });
            });
            
            // Initialize
            showProduct(0);
            
            // Start auto swipe after delay
            setTimeout(() => {
                setInterval(autoSwipe, 4000);
            }, 2000);
        });

        let itemCount = 0;
    const totalItems = 6;
    let addedItems = [];
    let cartData = [];

    function addItem(id, card) {
        if (addedItems.includes(id)) return;
        
        // Get card info
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-price').textContent;
        
        addedItems.push(id);
        cartData.push({id, title, price});
        itemCount++;
        
        // Show cart
        if (itemCount === 1) {
            document.getElementById('ecomCart').classList.add('visible');
        }
        
        // Update count
        const countEl = document.getElementById('cartCount');
        countEl.textContent = itemCount;
        countEl.classList.add('visible');
        
        // Flying animation
        const cardRect = card.getBoundingClientRect();
        const cartRect = document.getElementById('ecomCart').getBoundingClientRect();
        
        const clone = card.cloneNode(true);
        clone.classList.add('flying-card');
        clone.style.position = 'fixed';
        clone.style.top = cardRect.top + 'px';
        clone.style.left = cardRect.left + 'px';
        clone.style.width = cardRect.width + 'px';
        clone.style.height = cardRect.height + 'px';
        
        document.body.appendChild(clone);
        
        setTimeout(() => {
            clone.style.transform = `translate(${cartRect.left - cardRect.left}px, ${cartRect.top - cardRect.top}px) scale(0.1) rotate(720deg)`;
            clone.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
            document.body.removeChild(clone);
            card.classList.add('disabled');
        }, 1000);
        
        // Check if complete
        if (itemCount === totalItems) {
            setTimeout(showSuccess, 1500);
        }
    }

    function openCart() {
        if (itemCount > 0 && itemCount < totalItems) {
            const modal = document.getElementById('cartModal');
            const overlay = document.getElementById('popupOverlay');
            const itemsEl = document.getElementById('cartItems');
            
            // Clear and fill cart
            itemsEl.innerHTML = '';
            cartData.forEach(item => {
                itemsEl.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-number">${item.id}</div>
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price}</div>
                    </div>
                `;
            });
            
            modal.classList.add('visible');
            overlay.classList.add('visible');
        }
    }

    function closeCart() {
        document.getElementById('cartModal').classList.remove('visible');
        document.getElementById('popupOverlay').classList.remove('visible');
    }

    function showSuccess() {
        closeCart();
        document.getElementById('popupOverlay').classList.add('visible');
        document.getElementById('successPopup').classList.add('visible');
        
        setTimeout(() => {
            document.getElementById('popupOverlay').classList.remove('visible');
            document.getElementById('successPopup').classList.remove('visible');
            document.getElementById('ecomCart').style.display = 'none';
        }, 3000);
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
        title: "Почему 'Headless' Архитектура — Новый Стандарт",
        content: `
            <p>
            Монолитные платформы электронной коммерции ограничивают креативность и замедляют развертывание. Переход к 'headless' (безголовому), API-ориентированному подходу позволяет компаниям использовать лучшие в своем классе инструменты (CMS, платежи, поиск) для каждой функции, сохраняя при этом единую логику бэкенда.
            </p>

            <h3>Мастерство Скорости и Производительности</h3>
            <p>
            Обслуживая статический контент через отдельный фронтенд (например, React или Vue), headless-системы устраняют замедления, вызванные зависимостями, радикально повышая скорость сайта, что является критическим фактором как для SEO-ранжирования, так и для мобильных коэффициентов конверсии.
            </p>

            <h3>Бесшовное Многоканальное Развертывание</h3>
            <p>
            Используйте одни и те же основные данные о продуктах и логику оформления заказа для питания традиционного веб-сайта, прогрессивного веб-приложения (PWA) и сторонних торговых площадок. Это централизует управление, предлагая при этом индивидуальный опыт на всех каналах.
            </p>
             `
    },
    2: {
        title: "Превращение Поиска из Функции в Механизм Продаж",
        content: `
            <h3>Интерпретация Запросов на Основе Намерений</h3>
            <p>
            Система интерпретирует естественный язык и контекст (например, различая "летнее платье" и "коктейльное платье") для отображения идеально соответствующих категорий продуктов, часто еще до того, как пользователь закончит ввод.
            </p>

            <h3>Автоматизированная Логика Мерчандайзинга</h3>
            <p>
            Результаты поиска могут динамически переранжироваться на основе данных о запасах в реальном времени, марже прибыли, сезонных тенденциях и индивидуальной истории пользователя. Это гарантирует, что самые прибыльные и релевантные продукты всегда появляются вверху.
            </p>

            <h3>Визуальный Поиск и Персонализированные Фильтры</h3>
            <p>
            Предоставление пользователям возможности загрузить изображение для поиска похожих товаров в сочетании с гиперперсонализированными фильтрами (например, "новые поступления моего размера") кардинально упрощает путь к покупке и увеличивает количество добавлений в корзину.
            </p>
            `
    },
    3: {
        title: "E-commerce и ERP как Единая Система",
        content: `
            <h3>Точность Запасов в Реальном Времени</h3>
            <p>
            Когда заказ размещается на веб-сайте, ERP мгновенно резервирует товар. Это предотвращает продажу отсутствующих товаров, снижает риск отложенных заказов и обеспечивает доверие клиентов, что особенно важно для предприятий с несколькими складами.
            </p>

            <h3>Автоматизированный Цикл "Заказ к Наличным" (Order-to-Cash)</h3>
            <p>
            Интеграция автоматизирует весь процесс: ввод заказа, проверки кредита, генерация счета-фактуры и финансовая сверка. Это сокращает время выполнения заказа с часов до минут, высвобождая операционный персонал.
            </p>

            <h3>Динамическое, Сегментированное Ценообразование</h3>
            <p>
            Правила ценообразования, определенные в ERP (например, скидки за объем, региональные налоги, уровни лояльности), мгновенно отражаются на сайте электронной коммерции. Это обеспечивает согласованность цен и позволяет быстро реализовывать сложные B2B или B2C ценовые стратегии.
            </p>
            > `
    },
    4: {
        title: "Разработка Программ Лояльности, Приносящих Прибыль",
        content: `
            <h3>Вознаграждение Нетранзакционных Действий</h3>
            <p>
            Баллы лояльности могут начисляться за заполнение профиля, написание отзыва, публикацию продукта в социальных сетях или привлечение друга. Это поощряет ценную активность пользователей, которая способствует росту бренда, а не только немедленным продажам.
            </p>

            <h3>Автоматизация Уровневых Программ</h3>
            <p>
            На основе пользовательских метрик (например, общие расходы за 12 месяцев, количество покупок) система автоматически продвигает клиентов до уровней Gold или Platinum, предоставляя им динамические преимущества, такие как ранний доступ или бесплатная доставка, и все это управляется внутри платформы.
            </p>

            <h3>Персонализированные Варианты Использования Бонусов</h3>
            <p>
            Вместо общих скидок клиенты могут использовать валюту лояльности для получения высокоперсонализированного опыта, такого как индивидуально подобранный комплект, пожертвование на благотворительность или эксклюзивный доступ к товарам ограниченной серии, что способствует эмоциональной связи.
            </p>
            `
    },
    5: {
        title: "От Корзины до Кассы",
        content: `
            <h3>Тестирование Одностраничного и Многошагового Оформления</h3>
            <p>
            Мы внедряем и A/B тестируем различные архитектуры оформления заказа, чтобы определить оптимальный макет для вашей конкретной демографической группы, что часто приводит к упрощенному, одностраничному процессу, требующему минимального количества кликов и ввода данных.
            </p>

            <h3>Сигналы Доверия и Гарантия Безопасности</h3>
            <p>
            Интеграция четких, заметных значков безопасности (SSL, логотипы платежных систем) и прозрачной политики доставки/возврата непосредственно на страницу оформления заказа немедленно укрепляет доверие, преодолевая нерешительность покупателя на критическом этапе оплаты.
            </p>

            <h3>Логика Умных Полей Формы</h3>
            <p>
            Использование функций автозаполнения, распознавание прошлых клиентов и исключение ненужных полей (например, запрос платежного адреса только в том случае, если он отличается от адреса доставки) сокращает время ввода данных пользователем и значительно снижает риск отказа от покупки.
            </p>`
    },
    6: {
        title: "Адаптация E-commerce для Сложных Корпоративных Потребностей",
        content: `
            <h3>Каталоги и Цены, Специфичные для Клиента</h3>
            <p>
            Платформа автоматически распознает корпоративного покупателя и отображает индивидуальный каталог продуктов с договорными ценами, условиями кредита и лимитами покупок, назначенными их конкретной учетной записи или роли пользователя.
            </p>

            <h3>Порталы Быстрого и Повторного Заказа</h3>
            <p>
            B2B-покупатели часто заказывают одни и те же товары. Мы разрабатываем специализированные порталы самообслуживания, где клиенты могут быстро повторно заказать из предыдущего списка или загрузить пакетный заказ через CSV, что кардинально сокращает время закупок.
            </p>

            <h3>Интегрированные Рабочие Процессы Котирования и Утверждения</h3>
            <p>
            Сложные, дорогостоящие заказы требуют внутреннего утверждения. Платформа включает интегрированные системы котирования и рабочие процессы цифрового утверждения, позволяя корпоративным пользователям отправить корзину на внутреннее согласование перед ее преобразованием в окончательный заказ.
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
