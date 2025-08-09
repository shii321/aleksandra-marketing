
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
