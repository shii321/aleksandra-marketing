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
        { metric: 'Revenue', current: '$125,420', previous: '$98,300', change: '+27.6%', insight: 'Strong growth pattern' },
        { metric: 'Customers', current: '3,845', previous: '3,201', change: '+20.1%', insight: 'Good retention rate' },
        { metric: 'Avg Order', current: '$89', previous: '$76', change: '+17.1%', insight: 'Upsell strategy working' },
        { metric: 'Conversion', current: '4.2%', previous: '2.8%', change: '+50%', insight: 'Optimize checkout flow' }
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
        { type: 'user', text: 'What are your opening hours?' },
        { type: 'ai', text: 'We\'re open Mon-Fri 9AM-6PM, weekends 10AM-4PM. Need to book?' },
        { type: 'user', text: 'Yes, tomorrow at 2 PM' },
        { type: 'ai', text: 'Perfect! Tomorrow 2PM is booked. You\'ll get a confirmation email.' }
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
        title: "Business Intelligence Revolution: Transform Your Operations with AI. Get result in seconds.",
        content: `
            <p>In today's rapidly evolving digital landscape, AI integration has become essential for businesses seeking competitive advantage. 
            Artificial intelligence is no longer just a futuristic concept—it's a practical tool that drives efficiency, reduces costs, and unlocks new revenue streams across 
            industries in Southeast Asia and beyond.
            </p>
            
            <h3>The New Era of BI</h3>
            <p>
            Artificial Intelligence transforms Business Intelligence (BI) by moving beyond merely describing past events. 
            Modern ML algorithms are capable of not only predicting future outcomes 
            (e.g., demand, market trends, customer behavior) but also providing prescriptive recommendations—optimal courses of action to achieve set goals. 
            Research indicates that this advanced approach allows companies to make more precise and timely decisions, securing a significant competitive edge.
            </p>
            
            <h3>Automating Routine for Strategy</h3>
            <p>
            One of AI's key advantages is the automation of routine, repetitive tasks, such as report generation, preliminary data analysis, or customer service (chatbots). 
            This not only reduces the risk of errors but also frees up highly skilled employees for more creative, strategic, and complex work. 
            Thus, AI complements, rather than replaces, humans, focusing human capital on tasks requiring creativity and emotional intelligence.
            </p>
            
            <p>Data analytics powered by artificial intelligence uncovers insights that humans might miss, 
            enabling better decision-making and strategic planning. 
            AI algorithms process customer behavior patterns, market trends, 
            and operational metrics to provide actionable recommendations. 
            This level of business intelligence was once available only to large enterprises, 
            but modern AI solutions make it accessible to small and medium-sized businesses 
            throughout Thailand, Singapore, Malaysia, and the wider Asia-Pacific region.
            </p>
        `
    },
    2: {
        title: "Turning Data into Individual Offers",
        content: `
            <h3>The Essence of AI Personalization</h3>
            <p>
            AI personalization utilizes Machine Learning and Natural Language Processing (NLP) to analyze massive data volumes: purchase history, 
            views, social media interactions, and demographic trends. Based on this analysis, AI creates hyper-personalized offers, content, and 
            ad messages for each individual user. 
            According to a McKinsey report, companies excelling in personalization generate 40% more revenue from these activities than average players.
            </p>

            <h3>Chatbots and Virtual Assistants</h3>
            <p>
            Modern AI-driven chatbots have moved beyond stock responses. By learning from thousands of interactions, they can detect customer emotions, intent, and sentiment (sentiment analysis), 
            allowing them to provide more accurate and empathetic responses. 
            This ensures round-the-clock support, reduces customer frustration (according to Salesforce, 74% of consumers are annoyed by the lack of personalization), and significantly increases satisfaction and loyalty.
            </p>
    
            <h3>Conversion and LTV Growth</h3>
            <p>
            Applying AI in personalization directly impacts key marketing metrics. Increasing communication relevance leads to higher engagement levels and, consequently, higher conversion rates. Furthermore, a personalized experience, making the customer feel valued, increases their Customer Lifetime Value (LTV) and contributes to better retention.
            </p>
              `
    },
    3: {
        title: "Implementing AI in Your Business: A Strategic Approach",
        content: `
            <h3>Starting Your AI Journey</h3>
            <p>Successful AI adoption requires careful planning and phased implementation. Start by identifying processes that consume significant time or resources—these are ideal candidates for automation. Common starting points include customer service chatbots, automated data entry, and predictive inventory management.</p>
            
            <h3>Choosing the Right AI Solutions</h3>
            <p>The key to effective AI integration lies in choosing solutions that align with your business goals and existing infrastructure. Whether you're operating in Phuket, Bangkok, or anywhere across Southeast Asia, scalable AI solutions can be customized to match your industry requirements, company size, and growth objectives.</p>
            
            <h3>Integration Without Disruption</h3>
            <p>Modern AI platforms integrate seamlessly with popular CRM systems, marketing tools, and business applications, ensuring smooth adoption without disrupting current operations. As teams become comfortable with AI tools, expand into more complex applications like forecasting, advanced analytics, and intelligent workflow automation.</p>
        `
    },
    4: {
        title: "AI Solutions for Sales and Marketing Optimization",
        content: `
            <h3>Transform Your Digital Marketing</h3>
            <p>AI integration transforms digital marketing strategies through advanced segmentation, personalization, and campaign optimization. Machine learning algorithms analyze customer data to predict purchasing behavior, optimize ad spend, and identify high-value prospects.</p>
            
            <h3>Automated Email Marketing Excellence</h3>
            <p>Automated email marketing systems powered by AI achieve higher open rates and conversions by delivering the right message at the optimal time. Natural language processing helps craft compelling content that resonates with your audience.</p>
            
            <h3>SEO & PPC Campaign Optimization</h3>
            <p>SEO and PPC campaigns benefit significantly from AI-driven insights. Natural language processing helps identify trending keywords and content opportunities, while predictive analytics forecast campaign performance. Businesses using AI for digital marketing report improved conversion rates, lower customer acquisition costs, and more efficient resource allocation.</p>
        `
    },
    5: {
        title: "AI Solutions for Sales and Marketing Optimization",
        content: `
            <h3>Transform Your Digital Marketing</h3>
            <p>AI integration transforms digital marketing strategies through advanced segmentation, personalization, and campaign optimization. Machine learning algorithms analyze customer data to predict purchasing behavior, optimize ad spend, and identify high-value prospects.</p>
            
            <h3>Automated Email Marketing Excellence</h3>
            <p>Automated email marketing systems powered by AI achieve higher open rates and conversions by delivering the right message at the optimal time. Natural language processing helps craft compelling content that resonates with your audience.</p>
            
            <h3>SEO & PPC Campaign Optimization</h3>
            <p>SEO and PPC campaigns benefit significantly from AI-driven insights. Natural language processing helps identify trending keywords and content opportunities, while predictive analytics forecast campaign performance. Businesses using AI for digital marketing report improved conversion rates, lower customer acquisition costs, and more efficient resource allocation.</p>
        `
    },
    6: {
        title: "AI Solutions for Sales and Marketing Optimization",
        content: `
            <h3>Transform Your Digital Marketing</h3>
            <p>AI integration transforms digital marketing strategies through advanced segmentation, personalization, and campaign optimization. Machine learning algorithms analyze customer data to predict purchasing behavior, optimize ad spend, and identify high-value prospects.</p>
            
            <h3>Automated Email Marketing Excellence</h3>
            <p>Automated email marketing systems powered by AI achieve higher open rates and conversions by delivering the right message at the optimal time. Natural language processing helps craft compelling content that resonates with your audience.</p>
            
            <h3>SEO & PPC Campaign Optimization</h3>
            <p>SEO and PPC campaigns benefit significantly from AI-driven insights. Natural language processing helps identify trending keywords and content opportunities, while predictive analytics forecast campaign performance. Businesses using AI for digital marketing report improved conversion rates, lower customer acquisition costs, and more efficient resource allocation.</p>
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