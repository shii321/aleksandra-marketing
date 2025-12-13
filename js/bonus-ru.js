// ============================================
// АВТООБНОВЛЯЮЩИЙСЯ ТАЙМЕР НА 15 ДНЕЙ
// ============================================

(function() {
    'use strict';

    // Константы
    const DAYS_DURATION = 15;
    const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    const CYCLE_DURATION = DAYS_DURATION * MILLISECONDS_IN_DAY;
    const BASE_DATE = new Date('2025-01-01T00:00:00Z').getTime();

    function formatNumber(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    function getCurrentCyclePosition() {
        const now = Date.now();
        const timeSinceBase = now - BASE_DATE;
        const positionInCycle = timeSinceBase % CYCLE_DURATION;
        const timeLeft = CYCLE_DURATION - positionInCycle;
        return timeLeft;
    }

    function updateTimer() {
        const timeLeft = getCurrentCyclePosition();
        const countdownElement = document.getElementById('countdown');
        const expiredElement = document.getElementById('expired');

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = formatNumber(days);
        if (hoursElement) hoursElement.textContent = formatNumber(hours);
        if (minutesElement) minutesElement.textContent = formatNumber(minutes);
        if (secondsElement) secondsElement.textContent = formatNumber(seconds);

        if (countdownElement) countdownElement.style.display = 'flex';
        if (expiredElement) expiredElement.style.display = 'none';
    }

    function initTimer() {
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimer);
    } else {
        initTimer();
    }
})();

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================

window.toggleMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && hamburger && overlay) {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
};

window.closeMobileMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && hamburger && overlay) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.toggleServices = function() {
    const dropdown = document.querySelector('.services-dropdown');
    const arrow = document.querySelector('.services-arrow');
    
    if (dropdown && arrow) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');
    }
};

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                e.preventDefault();
                const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
                const targetPosition = section.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (this.classList.contains('mobile-nav-link')) {
                    closeMobileMenu();
                }
            }
        });
    });
});

// ============================================
// АВТОМАТИЧЕСКИЙ СЛАЙДЕР УСЛУГ
// ============================================

(function() {
    'use strict';

    function initServicesSlider() {
        const sliderTrack = document.querySelector('.slider-track');
        
        if (sliderTrack) {
            const cards = sliderTrack.querySelectorAll('.service-card');
            
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                sliderTrack.appendChild(clone);
            });
            
            createSliderDots(cards.length);
        }
    }

    function createSliderDots(count) {
        const dotsContainer = document.querySelector('.slider-dots');
        
        if (dotsContainer) {
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = 'slider-dot';
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            }
            
            updateActiveDot(count);
        }
    }

    function updateActiveDot(totalSlides) {
        const dots = document.querySelectorAll('.slider-dot');
        const slideDuration = 40000 / totalSlides;
        
        setInterval(() => {
            const currentTime = Date.now();
            const currentSlide = Math.floor((currentTime % 40000) / slideDuration);
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicesSlider);
    } else {
        initServicesSlider();
    }
})();

// ============================================
// МОДАЛЬНЫЕ ОКНА ДЛЯ КЕЙСОВ
// ============================================

const cases = [
    {
        company: "KAIF",
        industry: "Спорт и Спа",
        position: "Руководитель отдела продаж и маркетинга",
        location: "Пхукет",
        description: `Провела комплексную трансформацию бизнеса для многофункционального спортивного комплекса (бойцовский клуб, тренажерный зал, танцевальная & йога студия, занятия в бассейне, детский клуб, ресторан, салон красоты, баня, ивенты)

        <strong>Ключевые Достижения:</strong>
        • Собрала и обучила отдел продаж с нуля, повысив коэффициент конверсии на 65%
        • Внедрил CRM-систему, автоматизировав 80% процессов продаж и управления лидами
        • Организовала масштабные спортивные и развлекательные мероприятия, повысив узнаваемость бренда
        • Выстроила стратегические партнерские отношения с туристическими агентствами и фитнес-инфлюенсерами
        • Интегрировала ИИ-чат-бота для обслуживания клиентов, сократив время ответа

        <strong>Использованные Услуги:</strong> Стратегия, CRM, Ивент-маркетинг, Партнерства, AI-решения`,
        metrics: "Автоматизация CRM: 80% | Обучение Команды: Завершено | Спортивные Мероприятия: 12+"
    },
    {
        company: "SOHO Club",
        industry: "Иранский Ресторан и Ночной Клуб",
        position: "Менеджер по продажам и маркетингу", 
        location: "Пхукет",
        description: `Полный запуск бренда и маркетинговая стратегия для ресторана иранской кухни с ночными развлекательными программами.

        <strong>Ключевые Достижения:</strong>
        • Организовала профессиональные фотосессии, создав высококачественный визуальный контент
        • Разработала полную айдентику бренда, включая логотип, цветовую палитру и визуальные руководства
        • Управляла присутствием в социальных сетях на всех платформах с единым брендингом
        • Выстроила отношения с фуд-инфлюенсерами и отраслевыми партнерами
        • Руководила разработкой веб-сайта от концепции до запуска

        <strong>Использованные Услуги:</strong> Контент, Веб-разработка, Стратегия, Инфлюенсер-маркетинг`,
        metrics: "Запуск Бренда: Завершено | Рост в Соцсетях: 300% | Веб-сайт: С нуля"
    },
    {
        company: "Lychee Studio", 
        industry: "Салон Красоты и Спа",
        position: "Менеджер по продажам",
        location: "Пхукет",
        description: `Оптимизация продаж и развитие команды для премиального салона красоты и спа-услуг.

        <strong>Ключевые Достижения:</strong>
        • Построила полные воронки продаж, от генерации лидов до удержания клиентов
        • Увеличила пожизненную ценность клиента с помощью программ лояльности
        • Наняла и обучил команду продаж техникам закрытия сделок
        • Внедрила стратегии допродаж и персонализированные последующие контакты
        • Разработала ценовые стратегии для различных сегментов рынка

        <strong>Использованные Услуги:</strong> Стратегия, CRM, Email-маркетинг`,
        metrics: "Воронка Продаж: Завершена | Рост LTV: 45% | Обучение Команды: 100%"
    },
    {
        company: "Vnail Studio",
        industry: "Сеть Салонов Красоты",
        position: "Менеджер по продажам, Маркетолог",
        location: "Россия",
        description: `Полная цифровизация бизнеса и внедрение CRM в сети салонов красоты из 4 локаций.

        <strong>Ключевые Достижения:</strong>
        • Внедрила интегрированную CRM-систему во всех 4 локациях
        • Создала и обучила команду продаж с комплексными процессами
        • Оцифровала бизнес-операции, перейдя от традиционных к автоматизированным рабочим процессам
        • Создала подробные воронки продаж и системы отслеживания конверсии
        • Установила дашборды KPI для мониторинга производительности в реальном времени

        <strong>Использованные Услуги:</strong> CRM, Стратегия, Контент, Управление Командой Продаж`,
        metrics: "Локации: 4 салона | Интеграция CRM: 100% | Автоматизация Процессов: 85%"
    },
    {
        company: "Unique Club",
        industry: "Премиальный Ресторан",
        position: "Менеджер по рекламе", 
        location: "Пхукет",
        description: `Управление таргетированными рекламными кампаниями для элитного заведения.

        <strong>Ключевые Достижения:</strong>
        • Создала привлекательные тексты, адаптированные для разных платформ социальных сетей
        • Разработала визуальные креативы, оптимизированные под требования социальных сетей
        • Сгенерировала уникальные ссылки для отслеживания эффективности
        • Исследовала высокоэффективные группы с релевантной демографией
        • Проанализировала показатели вовлеченности и оптимизировал стратегию размещения

        <strong>Использованные Услуги:</strong> Таргетированная Реклама, Контент`,
        metrics: "Размещение Рекламы: 15+ платформ | Кликабельность (CTR): +40% | Отслеживание: 100% покрытие"
    },
    {
        company: "GASTRONOM",
        industry: "Фермерское Мясное Кафе и Производство",
        position: "SMM и Маркетинг Менеджер",
        location: "Пхукет",
        description: `SMM и контент-стратегия для производства фермерского мяса и кафе.

        <strong>Ключевые Достижения:</strong>
        • Ежедневное управление Instagram со стратегическим планированием контента
        • Профессиональная предметная фотосъемка продукции и фуд-стайлинг
        • Создала обучающий контент о видах мяса и способах приготовления
        • Разработала голос бренда для аудитории мясной индустрии
        • Управляла коллаборациями с инфлюенсерами среди местных шеф-поваров

        <strong>Использованные Услуги:</strong> Контент, Стратегия, Инфлюенсер-маркетинг`,
        metrics: "Создано Контента: 200+ постов | Рост Вовлеченности: 180% | Партнерства с Шефами: 8"
    },
    {
        company: "Tropicana",
        industry: "Турагентство",
        position: "Специалист по Маркетингу",
        location: "Пхукет", 
        description: `Многоканальная маркетинговая стратегия для туристического агентства, обслуживающего международных клиентов.

        <strong>Ключевые Достижения:</strong>
        • Разработала контент-стратегии для нескольких клиентских индустрий
        • Управляла многоканальными рекламными кампаниями на разных платформах
        • Координировала инфлюенсер-маркетинг с микро- и макро-блогерами
        • Построила автоматизированные воронки продаж с лид-магнитами и email-последовательностями
        • Создала партнерские маркетинговые программы, расширяя источники дохода

        <strong>Использованные Услуги:</strong> Контент, Таргетированная Реклама, Email-маркетинг, Стратегия`,
        metrics: "Каналы Кампаний: 6+ | Партнерства с Инфлюенсерами: 25+ | Автоматизация: 70%"
    },
    {
        company: "Hungry Monkey",
        industry: "Кафе Русской Домашней Кухни", 
        position: "Менеджер по Ивент-Маркетингу",
        location: "Пхукет",
        description: `Ивент-маркетинг и координация развлекательных мероприятий для уютного кафе русской кухни.

        <strong>Ключевые Достижения:</strong>
        • Организовывала еженедельные караоке-вечера с полным техническим обеспечением
        • Разработала и проводил интерактивные викторины и конкурсы
        • Координировала кинопоказы с проекцией и кейтерингом
        • Управляла групповыми игровыми сессиями и мероприятиями по тимбилдингу
        • Создавала увлекательную атмосферу с помощью освещения и подбора музыки

        <strong>Использованные Услуги:</strong> Ивент-маркетинг, Контент`,
        metrics: "Организовано Мероприятий: 50+ | Рост Посещаемости: 120% | Удержание Клиентов: 85%"
    },
    {
        company: "Siyai Brand",
        industry: "Премиальный Модный Ритейл",
        position: "Менеджер по продажам и маркетингу",
        location: "Россия", 
        description: `Управление отделом продаж и маркетинговая стратегия для магазина премиальной одежды с услугами персонального стайлинга.

        <strong>Ключевые Достижения:</strong>
        • Управляла высокоэффективным отделом продаж с контролем производительности
        • Разработала маркетинговую стратегию с подробным созданием портрета покупателя (buyer persona)
        • Оптимизировала CRM-систему с внедрением автоматизации
        • Создала продающие тексты для социальных сетей и конверсии веб-сайта
        • Внедрила еженедельную отчетность по производительности с практическими выводами

        <strong>Использованные Услуги:</strong> Стратегия, CRM, Контент, Управление Командой Продаж`,
        metrics: "Команда Продаж: 8 человек | Автоматизация CRM: 75% | Конверсия: +30%"
    }
];

let currentCaseIndex = 0;

const logoImages = [
    'https://i.ibb.co/zVTKxRp7/2568-07-31-09-38-16-photoaidcom-cropped.png',
    'https://i.ibb.co/JFttZ6zf/2568-07-31-09-39-55-photoaidcom-cropped-1.png',
    'https://i.ibb.co/LDDtwnMq/2568-07-31-09-38-56-photoaidcom-cropped.png',
    'https://i.ibb.co/QF3n8n2w/2568-07-31-09-39-01-photoaidcom-cropped.png',
    'https://i.ibb.co/Q7MZNq1b/2568-07-31-09-39-05-photoaidcom-cropped.png',
    'https://i.ibb.co/9HXQCvBt/2568-07-31-09-39-11-photoaidcom-cropped.png',
    'https://i.ibb.co/bMNzjP90/2568-07-31-09-39-17-photoaidcom-cropped.png',
    'https://i.ibb.co/8LQtzJxj/2568-07-31-09-39-55-photoaidcom-cropped.png',
    'https://i.ibb.co/LDyGRQz9/2568-07-27-08-37-48-photoaidcom-cropped.png'
];

window.openModal = function(index) {
    currentCaseIndex = index;
    const modal = document.getElementById('caseModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateModalContent();
        updateNavigationButtons();
    }
};

window.closeModal = function() {
    const modal = document.getElementById('caseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

function updateModalContent() {
    const case_ = cases[currentCaseIndex];
    const modalContent = document.getElementById('modalContent');
    const modal = document.querySelector('.modal-content');
    
    if (!modalContent || !modal) return;
    
    modal.classList.add('changing');
    
    setTimeout(() => {
        modalContent.innerHTML = `
            <img src="${logoImages[currentCaseIndex]}" class="modal-logo" alt="${case_.company} Logo">
            <h3 class="modal-company" id="modalCompany">${case_.company}</h3>
            <div class="modal-industry">${case_.industry}</div>
            <div class="modal-position">${case_.position} | ${case_.location}</div>
            <div class="modal-metrics">
                <h4>Key Results</h4>
                <p>${case_.metrics}</p>
            </div>
            <div class="modal-description">${case_.description}</div>
        `;
        modal.classList.remove('changing');
    }, 150);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentCaseIndex === 0;
    if (nextBtn) nextBtn.disabled = currentCaseIndex === cases.length - 1;
}

window.previousCase = function() {
    if (currentCaseIndex > 0) {
        currentCaseIndex--;
        updateModalContent();
        updateNavigationButtons();
    }
};

window.nextCase = function() {
    if (currentCaseIndex < cases.length - 1) {
        currentCaseIndex++;
        updateModalContent();
        updateNavigationButtons();
    }
};

// Закрытие модалки при клике вне её
window.addEventListener('click', function(event) {
    const modal = document.getElementById('caseModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Навигация по клавишам
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('caseModal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowLeft') {
            previousCase();
        } else if (event.key === 'ArrowRight') {
            nextCase();
        }
    }
});

// Accessibility для карточек кейсов
document.addEventListener('DOMContentLoaded', function() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach((card, index) => {
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
    });
    
    // Intersection Observer для анимаций
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });
        
        caseCards.forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    }
});