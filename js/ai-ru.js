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

// ======================== NEURAL NETWORK ANIMATION ========================
// Check if mobile
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    // Neural Network Animation - only on desktop
    const neurons = document.querySelectorAll('.neuron');
    const connections = document.querySelectorAll('.connection');
    const labels = document.querySelectorAll('.ai-label');
    
    // Random pulse animation for neurons
    function activateRandomNeuron() {
        const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
        randomNeuron.classList.add('neuron-active');
        
        // Highlight connected paths
        const neuronX = randomNeuron.getAttribute('cx');
        connections.forEach(path => {
            const pathData = path.getAttribute('d');
            if (pathData.includes(neuronX)) {
                path.classList.add('path-glow');
                setTimeout(() => {
                    path.classList.remove('path-glow');
                }, 1000);
            }
        });
        
        setTimeout(() => {
            randomNeuron.classList.remove('neuron-active');
        }, 2000);
    }
    
    // Start random activation
    setInterval(activateRandomNeuron, 500);
    
    // Show labels with delay
    labels.forEach((label, index) => {
        setTimeout(() => {
            label.classList.add('visible');
        }, 1000 + index * 300);
    });
    
    // Interactive neurons
    neurons.forEach(neuron => {
        neuron.addEventListener('mouseenter', function() {
            this.style.r = parseInt(this.getAttribute('r')) + 5;
            this.style.filter = 'drop-shadow(0 0 20px rgba(0, 242, 96, 1))';
            
            // Activate connected paths
            const cx = this.getAttribute('cx');
            connections.forEach(path => {
                if (path.getAttribute('d').includes(cx)) {
                    path.classList.add('path-glow');
                }
            });
        });
        
        neuron.addEventListener('mouseleave', function() {
            this.style.r = this.getAttribute('r');
            this.style.filter = 'drop-shadow(0 0 10px rgba(0, 242, 96, 0.8))';
            
            // Deactivate paths
            connections.forEach(path => {
                path.classList.remove('path-glow');
            });
        });
    });
    
    // Create flowing data particles
    function createDataParticle() {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        document.querySelector('.neural-network').appendChild(particle);
        
        // Random path selection
        const randomPath = connections[Math.floor(Math.random() * connections.length)];
        const pathData = randomPath.getAttribute('d').match(/\d+/g);
        
        if (pathData && pathData.length >= 4) {
            const startX = parseInt(pathData[0]);
            const startY = parseInt(pathData[1]);
            const endX = parseInt(pathData[2]);
            const endY = parseInt(pathData[3]);
            
            // Position particle at start
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // Animate to end
            particle.style.transition = 'all 2s ease-in-out';
            setTimeout(() => {
                particle.style.left = `${endX}px`;
                particle.style.top = `${endY}px`;
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    // Create particles periodically
    setInterval(createDataParticle, 300);
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const neuralNetwork = document.querySelector('.neural-network');
        neuralNetwork.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    });
}

// ======================== AI DEMO TAB SWITCHING ========================
// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        
        // Trigger animations
        if (tabId === 'code') startCodeAnimation();
        if (tabId === 'analytics') startAnalyticsAnimation();
        if (tabId === 'support') startChatAnimation();
        if (tabId === 'forecast') startChartAnimation();
    });
});

// Code Animation
function startCodeAnimation() {
    const codeLines = [
        '<span class="code-keyword">function</span> <span class="code-function">optimizeRevenue</span>(data) {',
        '  <span class="code-keyword">const</span> insights = AI.<span class="code-function">analyze</span>(data);',
        '  <span class="code-keyword">const</span> forecast = AI.<span class="code-function">predict</span>(insights);',
        '  ',
        '  <span class="code-comment">// AI: Increase prices by 15%</span>',
        '  <span class="code-keyword">if</span> (forecast.demand > <span class="code-string">0.8</span>) {',
        '    <span class="code-keyword">return</span> <span class="code-function">adjustPrice</span>(<span class="code-string">1.15</span>);',
        '  }',
        '}'
    ];

    const container = document.getElementById('codeLines');
    container.innerHTML = '';
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'code-line';
            lineDiv.innerHTML = line;
            lineDiv.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(lineDiv);
        }, index * 200);
    });
}

// Analytics Animation
function startAnalyticsAnimation() {
    const data = [
        { metric: 'Revenue', current: '$125,420', previous: '$98,300', change: '+27.6%', insight: 'Значительный рост' },
        { metric: 'Customers', current: '3,845', previous: '3,201', change: '+20.1%', insight: 'Конверсия работы с холодной базой' },
        { metric: 'Avg Order', current: '$89', previous: '$76', change: '+17.1%', insight: 'Прогрев стимулирует продажи' },
        { metric: 'Conversion', current: '4.2%', previous: '2.8%', change: '+50%', insight: 'Оптимизировали процесс оформления заказа' }
    ];

    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';

    data.forEach((row, index) => {
        setTimeout(() => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.metric}</td>
                <td>${row.current}</td>
                <td>${row.previous}</td>
                <td style="color: #00F260;">${row.change}</td>
                <td>${row.insight}</td>
            `;
            tbody.appendChild(tr);
        }, index * 300);
    });
}

// Chat Animation
function startChatAnimation() {
    const messages = [
        { type: 'user', text: 'Когда есть место?' },
        { type: 'ai', text: 'Свободные слоты Пн, Ср 9:00-11:00, на выходных 16:00-20:00. Хотите записаться?' },
        { type: 'user', text: 'Да, Ср 10:00' },
        { type: 'ai', text: 'Отлично! Среда 10:00. Ждем вас!' }
    ];

    const container = document.getElementById('chatMessages');
    container.innerHTML = '';

    messages.forEach((msg, index) => {
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}`;
            messageDiv.innerHTML = `<div class="message-bubble">${msg.text}</div>`;
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
        }, index * 1500);
    });
}

// Chart Animation
function startChartAnimation() {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';
    
    const data = [45, 60, 75, 95, 110, 140];
    
    data.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '0px';
        container.appendChild(bar);
        
        setTimeout(() => {
            bar.style.height = `${value * 1.5}px`;
        }, index * 150);
    });
}

// Start first animation
startCodeAnimation();

// ======================== FAQ TOGGLE ========================
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
// Article content database
const articles = {
    1: {
        title: "Революция в Бизнес-Аналитике: Преобразуйте Операции с Помощью ИИ. Получите результат за секунды.",
        content: `
            <p>В современном быстро меняющемся цифровом пространстве ИИ стал помощником не только для личных дел, но и для расширения бизнеса. 
            Это практический инструмент, который повышает эффективность, снижает затраты и открывает новые источники дохода в 
            отраслях по всему миру. 
            </p>
            
            <h3>Новая Эра BI</h3>
            <p>
            ИИ трансформирует Бизнес-Аналитику (BI), выходя за рамки простого описания прошлых событий. 
            Современные алгоритмы способны не только прогнозировать будущие результаты 
            (например, спрос, рыночные тенденции, поведение клиентов), но и предоставлять предписывающие рекомендации — оптимальные варианты действий для достижения поставленных целей. 
            Исследования показывают, что такой продвинутый подход позволяет компаниям принимать более точные и своевременные решения, обеспечивая значительное конкурентное преимущество.
            </p>
            
            <h3>Автоматизация Рутины для Стратегии</h3>
            <p>
            Одним из ключевых преимуществ ИИ является автоматизация рутинных, повторяющихся задач, таких как создание отчетов, предварительный анализ данных или обслуживание клиентов (чат-боты). 
            Это не только снижает риск ошибок, но и освобождает высококвалифицированных сотрудников для более творческой, стратегической и сложной работы. 
            Таким образом, ИИ дополняет, а не заменяет людей, фокусируя человеческий капитал на задачах, требующих креативности и эмоционального интеллекта.
            </p>
            
            <p>Аналитика данных на основе искусственного интеллекта выявляет идеи, которые могут быть упущены человеком, 
            что способствует принятию более эффективных решений и стратегическому планированию. 
            Алгоритмы ИИ обрабатывают модели поведения клиентов, рыночные тенденции 
            и операционные метрики, чтобы предоставить действенные рекомендации. 
            Этот уровень бизнес-аналитики когда-то был доступен только крупным предприятиям, 
            но современные решения ИИ делают его доступным для малого и среднего бизнеса 
            по всему Таиланду, Сингапуру, Малайзии и в более широком Азиатско-Тихоокеанском регионе.
            </p>
        `
    },
    2: {
        title: "Превращение Данных в Индивидуальные Предложения",
        content: `
            <h3>Персонализация</h3>
            <p>
            Мы спользуем Машинное Обучение (МО) и Обработку Естественного Языка (NLP) для анализа огромных объемов данных: истории покупок, 
            просмотров, взаимодействий в социальных сетях и демографических тенденций. На основе этого анализа ИИ создает сверхперсонализированные предложения, контент и 
            рекламные сообщения для каждого отдельного пользователя. 
            Согласно отчету McKinsey, компании, преуспевающие в персонализации, получают на 40% больше дохода от этой деятельности, чем среднестатистические игроки.
            </p>

            <h3>Чат-боты и Виртуальные Помощники</h3>
            <p>
            Современные чат-боты, управляемые ИИ, вышли за рамки стандартных ответов. Обучаясь на тысячах взаимодействий, они могут определять эмоции, намерения и настроения клиентов (анализ тональности), 
            что позволяет им предоставлять более точные и эмпатичные ответы. 
            Это обеспечивает круглосуточную поддержку, снижает разочарование клиентов (по данным Salesforce, 74% потребителей раздражает отсутствие персонализации) и значительно повышает удовлетворенность и лояльность.
            </p>
    
            <h3>Рост Конверсии и LTV</h3>
            <p>
            Применение ИИ в персонализации напрямую влияет на ключевые маркетинговые показатели. Повышение релевантности коммуникации приводит к более высокому уровню вовлеченности и, как следствие, к более высоким показателям конверсии. Кроме того, персонализированный опыт, заставляющий клиента чувствовать себя ценным, увеличивает его Пожизненную Ценность (LTV) и способствует лучшему удержанию.
            </p>
              `
    },
    3: {
        title: "Точное Прогнозирование Спроса",
        content: `
            <h3>Эффективное Управление Запасами</h3>
            <p>
            Машинное Обучение (МО) совершает революцию в прогнозировании спроса. Анализируя исторические данные, рыночные условия, сезонность и даже погодные условия, ИИ может предсказывать спрос с высокой точностью. Это позволяет компаниям избежать как дефицита товаров, так и избытка запасов, что критически важно для таких секторов, как розничная торговля (предотвращение избыточного/недостаточного запаса популярных товаров) и производство (точное планирование сырья).
            </p>
            <h3>От Планирования до Доставки</h3>
            <p>
            ИИ обеспечивает видимость в реальном времени по всей цепочке поставок, интегрируя данные из множества источников. Это позволяет быстро реагировать на сбои и принимать решения на основе актуальной информации. Кроме того, ИИ внедряется в автономное планирование и выполнение, например, для оптимизации маршрутов доставки (логистика "последней мили") и управления складскими роботами, что увеличивает скорость доставки и снижает логистические затраты.
            </p>

            <h3>Практическая Экономия</h3>
            <p>
            Интеллектуальные системы могут непрерывно анализировать производительность поставщиков, сравнивать цены и оперативно предлагать альтернативные варианты. Это сокращает общие операционные расходы. В таких секторах, как пищевая промышленность или производство, ИИ помогает управлять скоропортящимися товарами, прогнозируя оптимальное время пополнения, что минимизирует отходы и повышает рентабельность.
            </p>
            `
    },
    4: {
        title: "Автоматизация Процессов",
        content: `
            <h3>Объединение RPA и Машинного Обучения</h3>
            <p>
            Традиционная Роботизированная Автоматизация Процессов (RPA) дополняется возможностями ИИ. Интеллектуальная Автоматизация Процессов (IPA) позволяет системам не только выполнять повторяющиеся задачи, но и самообучаться, принимать простые решения и обрабатывать неструктурированные данные (например, распознавание текста в документах). Это ускоряет выполнение проектов, снижает риск ошибок и дает компаниям значительное конкурентное преимущество.
            </p>

            <h3>Трансформация Бизнес-Моделей</h3>
            <p>
            ИИ не просто оптимизирует существующие процессы; он открывает новые бизнес-модели. От генеративных моделей, позволяющих создавать текст, креативы и видео в ранее невиданных масштабах (маркетинг), до новых подходов в предиктивном обслуживании (прогнозирование отказа оборудования до его возникновения) — ИИ стимулирует цифровую трансформацию, обеспечивая долгосрочный рост для компаний.
            </p>

            `
    },
    5: {
        title: "Глубокий Анализ Данных и Прогнозирование Поведения Потребителей",
        content: `
            <h3>От Анализа к Контенту</h3>
            <p>
            ИИ может анализировать огромные объемы данных из CRM, социальных сетей, веб-сайтов и других источников, выявляя скрытые закономерности и идеи, недоступные для человека. Это позволяет маркетологам лучше понять предпочтения потребителей и прогнозировать тенденции. Используя предиктивную аналитику, компании могут нацеливать свои кампании на наиболее восприимчивые сегменты, сокращая неэффективные маркетинговые расходы.
            </p>

            <h3>Масштабирование Создания Контента</h3>
            <p>Генеративные модели ИИ позволяют создавать высококачественный, индивидуально адаптированный контент — от рассылок по электронной почте и постов в социальных сетях до рекламных текстов и даже видео — в масштабе и со скоростью, которые ранее были недостижимы. Это значительно упрощает маркетинговый процесс, позволяя быстро адаптировать сообщения для разных аудиторий и каналов, обеспечивая при этом высокую степень персонализации. </p>
            <h3>Оптимизация Рекламы и ROI</h3>
            <p>
            Искусственный интеллект позволяет оптимизировать рекламные кампании в реальном времени. Алгоритмы постоянно корректируют ставки, подбирают лучшие креативы и сегментируют аудиторию для достижения максимальной эффективности. В результате повышается окупаемость инвестиций (ROI), поскольку средства направляются в самые эффективные каналы и на наиболее вовлеченные группы потребителей.
            </p>
            
            `
    },
    6: {
        title: "ИИ в Кибербезопасности и Обнаружении Мошенничества",
        content: `
            <h3>Аномалии и Угрозы в Реальном Времени</h3>
            <p>
            Системы ИИ выступают в роли проактивных защитников, анализируя массивные объемы сетевого трафика, журналов и активности пользователей в реальном времени. Они обучены распознавать отклонения от нормального поведения, которые могут быть ранними индикаторами кибератаки, утечки данных или злонамеренной деятельности. В отличие от традиционных систем, ИИ может идентифицировать новые, ранее неизвестные угрозы благодаря своей способности находить сложные закономерности.
            </p>

            <h3>Выявление Скрытых Рисковых Паттернов</h3>
            <p>
            В финансовом секторе и электронной коммерции ИИ играет ключевую роль в предотвращении мошенничества. Анализируя транзакции, поведенческие данные и контекст, алгоритмы ИИ могут выявлять необычные и мошеннические схемы с более высокой точностью, чем традиционные методы. Это минимизирует финансовые потери и повышает доверие клиентов. ИИ учитывает контекст и комбинирует разнообразные данные для построения точных моделей оценки риска.
            </p>
             `
    }

};

// Slider functionality
const slider = document.getElementById('articleSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modal = document.getElementById('articleModal');
const closeModalBtn = document.getElementById('closeModal');
const articleContent = document.getElementById('articleContent');
const dotsContainer = document.getElementById('sliderDots');

// Create dots
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

// Recreate dots on resize
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
        // Если в начале, переходим в конец
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
        // Если в конце, переходим в начало
        slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        slider.scrollBy({ left: 500, behavior: 'smooth' });
    }
});

// Open article modal
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

// Close modal
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Замени функцию handleSwipe на эту (более плавный свайп):

function handleSwipe() {
    const cardWidth = slider.querySelector('.article-card').offsetWidth + 30;
    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const swipeDistance = touchStartX - touchEndX;
    
    // Увеличил порог для более уверенного свайпа
    if (Math.abs(swipeDistance) > 75) {
        if (swipeDistance > 0) {
            // Свайп влево
            if (scrollLeft >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const currentIndex = Math.round(scrollLeft / cardWidth);
                scrollToCard(currentIndex + 1);
            }
        } else {
            // Свайп вправо
            const currentIndex = Math.round(scrollLeft / cardWidth);
            if (currentIndex === 0) {
                scrollToCard(cardCount - 1);
            } else {
                scrollToCard(currentIndex - 1);
            }
        }
    }
}