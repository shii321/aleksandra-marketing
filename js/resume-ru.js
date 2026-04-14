// ============================================
// ДАННЫЕ КЕЙСОВ - КОММЕРЧЕСКИЕ ПРОЕКТЫ
// ============================================

const commercialCases = [
    {
        name: "KAIF Sports & Spa",
        industry: "Спорт и Велнес комплекс",
        positions: ["Head of Sales & Marketing"],
        description: `
            <h3>Что сделано:</h3>
            <p>Полная трансформация бизнеса многофункционального спортивного комплекса с залом, спа, рестораном и бойцовским клубом.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Собрала и обучила отдел продаж с нуля, увеличив конверсию на 65%</p>
            <p>• Внедрила CRM-систему, автоматизировав 80% процессов продаж и управления лидами</p>
            <p>• Организовала масштабные спортивные и развлекательные мероприятия</p>
            <p>• Построила стратегические партнерства с турагентствами и фитнес-инфлюенсерами</p>
            <p>• Интегрировала AI-чатбот для клиентского сервиса, сократив время ответа на 90%</p>
            
            <p><strong>Результаты:</strong> Автоматизация CRM 80% | Обучение команды завершено | Спортивных мероприятий 12+</p>
        `
    },
    {
        name: "SOHO Club",
        industry: "Иранский Ресторан и Ночной Клуб",
        positions: ["Sales & Marketing Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>Полный запуск бренда и маркетинговая стратегия для ресторана иранской кухни с ночными развлечениями.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Организовала профессиональные фотосессии блюд, создав высококачественный визуальный контент</p>
            <p>• Разработала полную айдентику бренда: логотип, цветовая палитра, визуальные гайдлайны</p>
            <p>• Управляла присутствием в соцсетях на всех платформах с консистентным брендингом</p>
            <p>• Построила отношения с фуд-инфлюенсерами и партнерами по индустрии</p>
            <p>• Руководила разработкой сайта от концепции до запуска</p>
            
            <p><strong>Результаты:</strong> Запуск бренда завершен | Рост в соцсетях 300% | Сайт с нуля</p>
        `
    },
    {
        name: "Lychee Studio",
        industry: "Салон Красоты и Спа",
        positions: ["Sales Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>Оптимизация продаж и развитие команды для премиум салона красоты и спа.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Построила полные воронки продаж от генерации лидов до удержания</p>
            <p>• Увеличила customer lifetime value через программы лояльности</p>
            <p>• Нанимала и обучала команду продаж техникам закрытия сделок</p>
            <p>• Внедрила стратегии допродаж и персонализированные follow-up</p>
            <p>• Разработала ценовые стратегии для разных сегментов рынка</p>
            
            <p><strong>Результаты:</strong> Воронка продаж завершена | Увеличение LTV 45% | Обучение команды 100%</p>
        `
    },
    {
        name: "Vnail Studio",
        industry: "Сеть Салонов Красоты",
        positions: ["Manager", "Sales", "Marketing"],
        description: `
            <h3>Что сделано:</h3>
            <p>Полная цифровизация бизнеса и внедрение CRM в сети из 4 салонов красоты.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Внедрила интегрированную CRM-систему во все 4 локации</p>
            <p>• Построила и обучила команду продаж с комплексными процессами</p>
            <p>• Оцифровала бизнес-операции от традиционных к автоматизированным</p>
            <p>• Создала детальные воронки продаж и системы отслеживания конверсий</p>
            <p>• Установила KPI дашборды для мониторинга производительности в реальном времени</p>
            
            <p><strong>Результаты:</strong> Локаций: 4 салона | Интеграция CRM 100% | Автоматизация процессов 85%</p>
        `
    }
];

// ============================================
// ДАННЫЕ КЕЙСОВ - ФРИЛАНС ПРОЕКТЫ
// ============================================

const freelanceCases = [
    {
        name: "Unique Club",
        industry: "Премиум Ресторан",
        positions: ["Ads Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>Управление таргетированной рекламой для элитного ресторана.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Создала вовлекающие тексты для разных соцсетей</p>
            <p>• Разработала визуальные креативы, оптимизированные под требования платформ</p>
            <p>• Генерировала уникальные ссылки для отслеживания эффективности</p>
            <p>• Исследовала высокоэффективные группы с релевантной демографией</p>
            <p>• Анализировала вовлеченность и оптимизировала стратегию размещения</p>
            
            <p><strong>Результаты:</strong> Размещений рекламы 15+ платформ | Click-through +40% | Tracking 100%</p>
        `
    },
    {
        name: "GASTRONOM",
        industry: "Фермерское Кафе",
        positions: ["SMM & Marketing Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>SMM и контент-стратегия для кафе с фермерским производством мяса.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Ежедневное управление Instagram со стратегическим планированием контента</p>
            <p>• Профессиональная фотография продуктов и фуд-стайлинг</p>
            <p>• Создала образовательный контент о cuts мяса и способах приготовления</p>
            <p>• Разработала brand voice для аудитории мясной индустрии</p>
            <p>• Управляла коллаборациями с локальными шеф-поварами</p>
            
            <p><strong>Результаты:</strong> Создано контента 200+ постов | Рост вовлеченности 180% | Партнерств с шефами 8</p>
        `
    },
    {
        name: "Tropicana",
        industry: "Туристическое Агентство",
        positions: ["Marketing Specialist"],
        description: `
            <h3>Что сделано:</h3>
            <p>Мультиканальная маркетинговая стратегия для турагентства с международными клиентами.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Разработала контент-стратегии для множественных клиентских индустрий</p>
            <p>• Управляла мультиканальными рекламными кампаниями на разных платформах</p>
            <p>• Координировала influencer marketing с микро и макро блогерами</p>
            <p>• Построила автоматизированные воронки продаж с лид-магнитами и email-последовательностями</p>
            <p>• Создала партнерские маркетинговые программы, расширив потоки дохода</p>
            
            <p><strong>Результаты:</strong> Каналов кампаний 6+ | Партнерств с инфлюенсерами 25+ | Автоматизация 70%</p>
        `
    },
    {
        name: "Hungry Monkey",
        industry: "Кафе Домашней Кухни",
        positions: ["Event Marketing Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>Ивент-маркетинг и развлекательная координация для уютного кафе русской кухни.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Организовывала еженедельные караоке-вечера с полной технической настройкой</p>
            <p>• Разрабатывала и проводила интерактивные квизы и конкурсы</p>
            <p>• Координировала ивенты с показом фильмов с проекцией и кейтерингом</p>
            <p>• Управляла групповыми игровыми сессиями и тимбилдинг активностями</p>
            <p>• Создавала вовлекающую атмосферу через световое и музыкальное оформление</p>
            
            <p><strong>Результаты:</strong> Организовано ивентов 50+ | Рост посещаемости 120% | Customer retention 85%</p>
        `
    },
    {
        name: "Siyai Brand",
        industry: "Премиум Fashion Ритейл",
        positions: ["Sales & Marketing Manager"],
        description: `
            <h3>Что сделано:</h3>
            <p>Управление командой продаж и маркетинговая стратегия для премиум магазина одежды с персональным стайлингом.</p>
            
            <p><strong>Ключевые достижения:</strong></p>
            <p>• Управляла высокоэффективной командой продаж с контролем результатов</p>
            <p>• Разработала маркетинговую стратегию с детальным созданием buyer persona</p>
            <p>• Оптимизировала CRM-систему с внедрением автоматизации</p>
            <p>• Создавала копирайтинг для соцсетей и конверсии на сайте</p>
            <p>• Внедрила еженедельную отчетность с actionable insights</p>
            
            <p><strong>Результаты:</strong> Команда продаж 8 человек | Автоматизация CRM 75% | Конверсия +30%</p>
        `
    }
];

// ============================================
// РЕНДЕРИНГ КЕЙСОВ НА СТРАНИЦЕ
// ============================================

function renderCases(cases, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    
    cases.forEach((caseItem, index) => {
        html += `
            <div class="case-item" data-index="${index}">
                <div class="case-header" onclick="toggleCase(this)">
                    <div class="case-left">
                        <div class="case-name">${caseItem.name}</div>
                        <div class="case-divider"></div>
                        <div class="case-industry">${caseItem.industry}</div>
                        <div class="case-positions">
                            ${caseItem.positions.map(pos => `<span class="position-badge">${pos}</span>`).join('')}
                        </div>
                    </div>
                    <div class="case-toggle">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </div>
                </div>
                <div class="case-content">
                    <div class="case-description">
                        ${caseItem.description}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Функция для переключения кейса (открыть/закрыть)
function toggleCase(header) {
    const caseItem = header.closest('.case-item');
    const isActive = caseItem.classList.contains('active');
    
    // Закрыть все остальные кейсы
    document.querySelectorAll('.case-item').forEach(item => {
        if (item !== caseItem) {
            item.classList.remove('active');
        }
    });
    
    // Переключить текущий кейс
    if (isActive) {
        caseItem.classList.remove('active');
    } else {
        caseItem.classList.add('active');
    }
}

// ============================================
// МУЗЫКАЛЬНЫЕ ПЛЕЕРЫ
// ============================================

function initMusicPlayer(playBtnId, audioId, progressId, currentTimeId, durationId) {
    const playBtn = document.getElementById(playBtnId);
    const audio = document.getElementById(audioId);
    const progressFill = document.getElementById(progressId);
    const currentTimeSpan = document.getElementById(currentTimeId);
    const durationSpan = document.getElementById(durationId);
    
    if (!playBtn || !audio) return;
    
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    let isPlaying = false;
    
    // Кнопка play/pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            isPlaying = false;
        } else {
            // Остановить все остальные треки
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) a.pause();
            });
            document.querySelectorAll('.play-icon').forEach(icon => icon.style.display = 'block');
            document.querySelectorAll('.pause-icon').forEach(icon => icon.style.display = 'none');
            
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            isPlaying = true;
        }
    });
    
    // Обновление прогресса
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
            
            currentTimeSpan.textContent = formatTime(audio.currentTime);
        }
    });
    
    // Загрузка метаданных
    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });
    
    // Трек закончился
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isPlaying = false;
        progressFill.style.width = '0%';
        currentTimeSpan.textContent = '0:00';
    });
}

// Форматирование времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// ТРИ КНОПКИ С ОШИБКОЙ
// ============================================

function initButtons() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const errorMessage = document.getElementById('errorMessage');
    
    if (btn1) {
        btn1.addEventListener('click', () => {
            window.location.href = 'https://wa.me/66823207917';
        });
    }
    
    if (btn2) {
        btn2.addEventListener('click', () => {
            // Здесь можно добавить скачивание PDF резюме
            alert('Функция скачивания резюме в разработке!');
        });
    }
    
    if (btn3 && errorMessage) {
        btn3.addEventListener('click', () => {
            errorMessage.classList.add('show');
            
            // Скрыть сообщение через 5 секунд
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);
        });
    }
}

// ============================================
// FAQ ФУНКЦИЯ (из вашего основного сайта)
// ============================================

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');

    // Закрыть все другие FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });

    // Переключить текущий FAQ
    if (isActive) {
        faqItem.classList.remove('active');
        faqAnswer.classList.remove('active');
    } else {
        faqItem.classList.add('active');
        faqAnswer.classList.add('active');
    }
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Рендерим кейсы
    renderCases(commercialCases, 'commercialCasesContainer');
    renderCases(freelanceCases, 'freelanceCasesContainer');
    
    // Инициализируем музыкальные плееры
    initMusicPlayer('playBtn1', 'audio1', 'progress1', 'currentTime1', 'duration1');
    initMusicPlayer('playBtn2', 'audio2', 'progress2', 'currentTime2', 'duration2');
    initMusicPlayer('playBtn3', 'audio3', 'progress3', 'currentTime3', 'duration3');
    
    // Инициализируем кнопки
    initButtons();
    
    console.log('✅ Resume page initialized!');
    console.log('📊 Commercial cases:', commercialCases.length);
    console.log('💼 Freelance cases:', freelanceCases.length);
});

// ============================================
// МОБИЛЬНОЕ МЕНЮ (из вашего основного JS)
// ============================================

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && overlay && hamburger) {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && overlay && hamburger) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleServices() {
    const dropdown = document.querySelector('.services-dropdown');
    const arrow = document.querySelector('.services-arrow');
    
    if (dropdown && arrow) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');
    }
}