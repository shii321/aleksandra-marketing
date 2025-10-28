// ============================================
// АВТООБНОВЛЯЮЩИЙСЯ ТАЙМЕР НА 15 ДНЕЙ
// ============================================

(function() {
    'use strict';

    // Константы
    const DAYS_DURATION = 15; // Длительность акции в днях
    const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    const CYCLE_DURATION = DAYS_DURATION * MILLISECONDS_IN_DAY; // Длительность одного цикла в миллисекундах
    
    // БАЗОВАЯ ДАТА - точка отсчета для всех циклов
    // Можешь изменить на любую дату, от которой хочешь вести отсчет
    const BASE_DATE = new Date('2025-01-01T00:00:00Z').getTime();

    // Форматирование чисел (добавляет 0 перед однозначными)
    function formatNumber(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    // Получение текущей позиции в цикле
    function getCurrentCyclePosition() {
        const now = Date.now();
        const timeSinceBase = now - BASE_DATE;
        
        // Вычисляем, где мы находимся в текущем цикле
        // Оператор % (модуль) дает остаток от деления - это наша позиция в текущем цикле
        const positionInCycle = timeSinceBase % CYCLE_DURATION;
        
        // Вычисляем, сколько времени осталось до конца текущего цикла
        const timeLeft = CYCLE_DURATION - positionInCycle;
        
        return timeLeft;
    }

    // Обновление отображения таймера
    function updateTimer() {
        const timeLeft = getCurrentCyclePosition();

        const countdownElement = document.getElementById('countdown');
        const expiredElement = document.getElementById('expired');

        // Вычисляем оставшееся время
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Обновляем DOM
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = formatNumber(days);
        if (hoursElement) hoursElement.textContent = formatNumber(hours);
        if (minutesElement) minutesElement.textContent = formatNumber(minutes);
        if (secondsElement) secondsElement.textContent = formatNumber(seconds);

        // Показываем таймер, скрываем сообщение об истечении
        if (countdownElement) {
            countdownElement.style.display = 'flex';
        }
        if (expiredElement) {
            expiredElement.style.display = 'none';
        }
    }

    // Запуск таймера
    function initTimer() {
        // Первое обновление сразу
        updateTimer();
        
        // Затем обновляем каждую секунду
        setInterval(updateTimer, 1000);
    }

    // Запускаем когда DOM загружен
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimer);
    } else {
        // DOM уже загружен
        initTimer();
    }

    // ============================================
    // ФУНКЦИИ ДЛЯ ОСТАЛЬНОЙ ЧАСТИ СТРАНИЦЫ
    // (Мобильное меню, модалки, анимации и т.д.)
    // ============================================

    // Мобильное меню
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

    // Плавная прокрутка к секциям
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

    // Анимация звезд (если есть)
    const starsContainer = document.querySelector('.stars-container');
    if (starsContainer) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Кнопка воспроизведения и анимация процента
    const playButton = document.getElementById('playButton');
    const hiddenContent = document.getElementById('hiddenContent');
    const counterDisplay = document.querySelector('.counter-display');
    
    if (playButton && hiddenContent && counterDisplay) {
        playButton.addEventListener('click', function() {
            if (!playButton.classList.contains('clicked')) {
                playButton.classList.add('clicked');
                
                let count = 0;
                const targetNumber = 30;
                const duration = 2000;
                const increment = targetNumber / (duration / 50);
                
                const counterInterval = setInterval(() => {
                    count += increment;
                    if (count >= targetNumber) {
                        count = targetNumber;
                        clearInterval(counterInterval);
                    }
                    counterDisplay.textContent = Math.floor(count) + '%';
                }, 50);
                
                setTimeout(() => {
                    hiddenContent.classList.add('visible');
                }, 2500);
            }
        });
    }

    // Модальные окна для кейсов
    const caseTriggers = document.querySelectorAll('.case-card, .case-more');
    
    window.openModal = function(caseId) {
        const modal = document.getElementById('caseModal');
        const modalContent = document.getElementById('modalContent');
        
        if (modal && modalContent) {
            // Здесь можно загрузить контент конкретного кейса
            // Пока просто показываем модалку
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('caseModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    window.previousCase = function() {
        // Логика переключения на предыдущий кейс
        console.log('Previous case');
    };

    window.nextCase = function() {
        // Логика переключения на следующий кейс
        console.log('Next case');
    };

    // Закрытие модалки при клике вне её
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('caseModal');
        if (e.target === modal) {
            closeModal();
        }
    });

})();
