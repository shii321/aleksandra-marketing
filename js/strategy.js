
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

        // Initialize chess board
        const board = document.getElementById('chessBoard');
        const pieces = ['pawn', 'king', 'knight', 'rook'];
        const piecesSVG = {
            'pawn': '<svg viewBox="0 0 512 512"><path d="M256,0c-52.928,0-96,43.072-96,96s43.072,96,96,96s96-43.072,96-96S308.928,0,256,0z M256,170.667 c-41.173,0-74.667-33.493-74.667-74.667S214.827,21.333,256,21.333S330.667,54.827,330.667,96S297.173,170.667,256,170.667z"/><path d="M256,42.667c-29.419,0-53.333,23.936-53.333,53.333c0,5.888,4.779,10.667,10.667,10.667S224,101.888,224,96 c0-17.643,14.357-32,32-32c5.888,0,10.667-4.779,10.667-10.667S261.888,42.667,256,42.667z"/><path d="M350.976,176.768c-1.707-3.627-9.792-16-42.219-22.805c-5.675-1.173-11.392,2.475-12.629,8.256 c-1.195,5.76,2.475,11.413,8.256,12.629c16.683,3.52,23.851,8.277,26.283,10.219v12.395c-7.467,4.907-29.227,15.872-74.667,15.872 c-45.589,0-67.328-11.029-74.667-15.851v-12.245c2.752-2.304,9.963-6.976,26.283-10.368c5.781-1.216,9.472-6.869,8.256-12.629 c-1.237-5.781-6.933-9.451-12.629-8.256c-32.405,6.805-40.512,19.179-42.219,22.805c-0.661,1.429-1.024,2.965-1.024,4.544v21.333 c0,2.752,1.067,5.397,2.965,7.381c2.411,2.517,25.536,24.619,93.035,24.619s90.624-22.101,93.035-24.619 c1.899-1.984,2.965-4.629,2.965-7.381v-21.333C352,179.755,351.637,178.219,350.976,176.768z"/><path d="M371.563,410.133c-0.619-0.96-62.229-95.275-62.229-186.133c0-5.888-4.779-10.667-10.667-10.667S288,218.112,288,224 c0,80.597,43.392,160.811,59.733,188.16c-12.523,5.611-40.427,14.507-91.733,14.507c-51.371,0-79.296-8.896-91.733-14.485 C180.608,384.853,224,304.619,224,224c0-5.888-4.779-10.667-10.667-10.667s-10.667,4.779-10.667,10.667 c0,90.688-61.611,185.173-62.229,186.112c-2.987,4.544-2.091,10.624,2.112,14.101C145.472,426.645,173.653,448,256,448 s110.528-21.355,113.451-23.765C373.675,420.757,374.571,414.677,371.563,410.133z"/><path d="M354.581,373.675c-5.781-1.515-11.499,2.027-12.928,7.744s2.027,11.499,7.765,12.928 c23.68,5.952,44.117,16.768,45.248,21.653v38.613c-8.299,8.128-43.648,36.053-138.667,36.053 c-95.275,0-130.56-28.053-138.667-36.032l-0.021-38.528c1.152-4.992,21.589-15.829,45.269-21.781 c5.717-1.408,9.173-7.211,7.765-12.928c-1.451-5.717-7.317-9.259-12.928-7.744C138.944,378.261,96,391.637,96,416v42.667 c0,2.197,0.683,4.352,1.941,6.144C99.285,466.731,132.544,512,256,512s156.715-45.269,158.059-47.168 c1.259-1.792,1.941-3.947,1.941-6.144v-42.667C416,391.659,373.056,378.283,354.581,373.675z"/></svg>',
            'king': '<svg viewBox="0 0 512 512"><path d="M317.141,40.157h-31.23V9.387c0-5.549-3.377-9.387-8.926-9.387h-50.196c-5.549,0-11.152,3.838-11.152,9.387v30.77h-29.005 c-5.549,0-11.152,3.838-11.152,9.387V99.74c0,5.549,5.603,10.691,11.152,10.691h29.005v29.466c0,5.549,5.603,10.691,11.152,10.691 h50.196c5.549,0,8.926-5.142,8.926-10.691v-29.466h31.23c5.549,0,8.926-5.142,8.926-10.691V49.544 C326.067,43.995,322.69,40.157,317.141,40.157z M305.989,90.353h-29.005c-5.549,0-11.152,3.838-11.152,9.387v30.77h-30.118V99.74 c0-5.549-3.378-9.387-8.926-9.387h-31.231V60.235h31.231c5.549,0,8.926-5.142,8.926-10.691V20.078h30.118v29.466 c0,5.549,5.603,10.691,11.152,10.691h29.005V90.353z"/><path d="M390.048,431.196c29.245-30.615,87.174-97.963,86.029-152.044c-0.402-19.128-8.279-35.039-22.583-47.304 c-31.598-27.078-64.681-28.432-97.309-4.696v-37.059c0-5.549-3.378-9.387-8.926-9.387H166.553c-5.549,0-11.152,3.838-11.152,9.387 v38.147c-12.549-10.637-26.924-16.735-41.14-17.863c-19.137-1.608-37.909,5.696-56.301,21.471 c-14.314,12.265-21.635,28.176-22.037,47.304c-1.147,54.189,56.253,121.701,85.444,152.23 c-14.517,2.108-26.201,14.625-26.201,29.75v20.118c0,16.598,14.583,30.75,31.142,30.75h261.196 c16.559,0,28.917-14.152,28.917-30.75v-20.118C416.421,445.586,405.156,432.758,390.048,431.196z M56.131,279.047 c0.294-13.353,5.255-23.453,15.167-31.963c14.196-12.157,28.353-17.833,41.932-16.696c19.264,1.529,35.471,16.176,45.667,28.196 c2.725,3.206,6.62,4.402,10.561,2.922c3.951-1.451,6.022-5.216,6.022-9.422v-51.299h160.627v49.681 c0,4.186,3.145,7.922,7.066,9.402c3.892,1.461,8.601,0.363,11.365-2.794c27.843-31.833,57.012-35.206,86.443-9.99 c9.912,8.51,14.941,18.61,15.235,31.963c1.187,55.872-76.978,135.071-92.919,150.13h-16.039c-1.314,0-2.559,2.51-3.706,2.51 h-173.01c-1.226,0-2.569-2.51-3.99-2.51h-17.432C133.18,414.118,54.945,334.919,56.131,279.047z M387.504,491.922H126.308 c-5.49,0-11.064-5.142-11.064-10.672v-20.118c0-5.529,5.574-9.368,11.064-9.368h40.245h180.706h40.245 c5.49,0,8.838,3.838,8.838,9.368v20.118h0C396.342,486.779,392.994,491.922,387.504,491.922z"/></svg>',
            'knight': '<svg viewBox="0 0 3000 3000"><path d="m779.935 2648.496v257.754h1440.129v-257.754zm1278.504-107.373v75.146h-1116.879v-75.146zm-1116.879-32.227c.114-.011 1050.735.008 1113.924 0-2.123-.182 29.224 2.791 56.761-17.553 63.704-47.611 41.337-143.098-30.656-162.047-24.346-7.054-339.648-1.126-665.076-2.969-507.156 5.368-526.365-27.366-563.271 68.138-15.359 58.957 29.883 114.51 88.318 114.431zm74.215-214.793h996.697c-144.867-853.951 755.83-1718.062-397.916-1975.974l-190.722-224.379v246.82l-145.852-11.221c-.031.029-62.253 124.53-67.03 134.06-196.043 206.403-466.669 370.998-571.53 497.008-11.441 14.415-19.071 27.284-22.486 38.708-69.587 295.154 200.431 467.838 492.765 194.083 124.143 65.736 274.799 74.666 448.758 33.662-390.814 265.771-596.01 611.093-542.684 1067.233zm713.901-1979.824c1097.763 1.891 488.264 1131.548 558.018 1574.508l-246.563 7.617c79.34-656.193 556.695-1328.963-311.455-1582.125z"/></svg>',
            'rook': '<svg viewBox="0 0 35.68 35.68"><path d="M29.84,35.68h-24v-5.908h24V35.68z M26.54,11.889H9.141v16.098H26.54V11.889z M24.626,0v4.208h-4.36V0h-4.852v4.208h-4.36 V0H6.59v10.244h22.5V0H24.626z"/></svg>'
        };
        
        // Create chess board squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                
                // Add some chess pieces randomly
                if (Math.random() > 0.7) {
                    const piece = pieces[Math.floor(Math.random() * pieces.length)];
                    const pieceDiv = document.createElement('div');
                    pieceDiv.className = 'chess-piece';
                    pieceDiv.style.setProperty('--delay', Math.random() * 10);
                    pieceDiv.innerHTML = piecesSVG[piece];
                    square.appendChild(pieceDiv);
                }
                
                board.appendChild(square);
            }
        }
        
        // Mouse parallax effect - only on desktop
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                
                const board = document.querySelector('.chess-board');
                board.style.transform = `rotateX(${20 + y * 10}deg) rotateY(${-20 + x * 10}deg)`;
            });
        }
        
        // Interactive squares
        document.querySelectorAll('.chess-square').forEach(square => {
            square.addEventListener('click', function() {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(0, 242, 96, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'ripple 0.6s ease-out';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        const strategies = [
            {
                name: "Marketing Strategy",
                description: "A comprehensive marketing approach designed to increase brand awareness, attract target customers, and establish market positioning through data-driven tactics and creative campaigns.",
                sections: [
                    {
                        title: "Market Analysis",
                        items: [
                            "Competitor research and positioning map",
                            "Market size and growth potential assessment",
                            "Industry trends and opportunities identification",
                            "SWOT analysis for strategic planning"
                        ]
                    },
                    {
                        title: "Target Audience",
                        items: [
                            "Detailed buyer persona development",
                            "Customer journey mapping",
                            "Pain points and needs analysis",
                            "Behavioral patterns research"
                        ]
                    },
                    {
                        title: "Marketing Channels",
                        items: [
                            "Social media strategy and content calendar",
                            "SEO optimization and content marketing",
                            "Email marketing campaigns and automation",
                            "Paid advertising strategy (Google, Meta, etc.)"
                        ]
                    },
                    {
                        title: "Implementation",
                        items: [
                            "30/60/90 day action plan",
                            "KPI definition and tracking setup",
                            "Budget allocation recommendations",
                            "Team training and support"
                        ]
                    }
                ]
            },
            {
                name: "Sales Strategy",
                description: "Optimized sales processes, team development, and conversion tactics designed to maximize revenue, improve close rates, and create sustainable growth through systematic approaches.",
                sections: [
                    {
                        title: "Sales Process Optimization",
                        items: [
                            "Sales funnel analysis and improvement",
                            "Lead qualification framework",
                            "Sales cycle reduction strategies",
                            "Conversion rate optimization tactics"
                        ]
                    },
                    {
                        title: "Team Development",
                        items: [
                            "Sales team structure and roles",
                            "Comprehensive training programs",
                            "Performance metrics and KPIs",
                            "Incentive and commission structures"
                        ]
                    },
                    {
                        title: "Sales Tools & Systems",
                        items: [
                            "CRM selection and implementation",
                            "Sales automation workflows",
                            "Lead tracking and reporting",
                            "Integration with marketing systems"
                        ]
                    },
                    {
                        title: "Sales Materials",
                        items: [
                            "Sales scripts and objection handling",
                            "Presentation templates and demos",
                            "Pricing strategy and packages",
                            "Case studies and success stories"
                        ]
                    }
                ]
            },
            {
                name: "Digital Strategy",
                description: "Complete digital transformation roadmap focusing on technology integration, process automation, and digital presence optimization to create competitive advantages in the digital age.",
                sections: [
                    {
                        title: "Digital Infrastructure",
                        items: [
                            "Technology stack assessment and recommendations",
                            "Website and mobile app strategy",
                            "Cloud infrastructure planning",
                            "Cybersecurity and data protection"
                        ]
                    },
                    {
                        title: "Process Automation",
                        items: [
                            "Workflow automation opportunities",
                            "AI and chatbot implementation",
                            "Marketing automation setup",
                            "Operations digitization roadmap"
                        ]
                    },
                    {
                        title: "Digital Marketing",
                        items: [
                            "Omnichannel digital strategy",
                            "E-commerce optimization",
                            "Digital advertising campaigns",
                            "Analytics and tracking setup"
                        ]
                    },
                    {
                        title: "Innovation & Future",
                        items: [
                            "Emerging technology adoption plan",
                            "Digital transformation timeline",
                            "Innovation culture development",
                            "Continuous improvement framework"
                        ]
                    }
                ]
            },
            {
                name: "B2B Strategy",
                description: "Strategic partnership development and B2B sales optimization focused on creating mutually beneficial relationships, expanding market reach, and driving sustainable business growth.",
                sections: [
                    {
                        title: "Partner Identification",
                        items: [
                            "Strategic partner mapping",
                            "Complementary business analysis",
                            "Partnership opportunity assessment",
                            "Due diligence frameworks"
                        ]
                    },
                    {
                        title: "Partnership Development",
                        items: [
                            "Partnership proposal templates",
                            "Collaboration models and structures",
                            "Revenue sharing frameworks",
                            "Legal and contract guidelines"
                        ]
                    },
                    {
                        title: "B2B Sales Process",
                        items: [
                            "Enterprise sales methodology",
                            "Account-based marketing strategy",
                            "Long sales cycle management",
                            "Key account management program"
                        ]
                    },
                    {
                        title: "Relationship Management",
                        items: [
                            "Partner success programs",
                            "Communication protocols",
                            "Performance tracking systems",
                            "Partnership expansion strategies"
                        ]
                    }
                ]
            },
            {
                name: "Complete Strategy",
                description: "Comprehensive business transformation combining all strategic elements - marketing, sales, digital, and partnerships - for maximum impact and sustainable growth across all business areas.",
                sections: [
                    {
                        title: "Integrated Approach",
                        items: [
                            "Full business audit and analysis",
                            "Cross-functional strategy alignment",
                            "Unified goals and KPIs",
                            "Holistic implementation roadmap"
                        ]
                    },
                    {
                        title: "All Strategies Included",
                        items: [
                            "Complete marketing strategy and execution",
                            "Full sales optimization and team development",
                            "End-to-end digital transformation",
                            "Comprehensive B2B and partnership program"
                        ]
                    },
                    {
                        title: "Advanced Features",
                        items: [
                            "Executive dashboard and reporting",
                            "Change management support",
                            "Dedicated strategy team",
                            "Quarterly strategy reviews and updates"
                        ]
                    },
                    {
                        title: "Long-term Success",
                        items: [
                            "3-year growth roadmap",
                            "Scalability planning",
                            "Continuous optimization program",
                            "Strategic advisory services"
                        ]
                    }
                ]
            }
        ];

        let currentStrategyIndex = 0;

        function openModal(index) {
            currentStrategyIndex = index;
            document.getElementById('strategyModal').style.display = 'block';
            updateModalContent();
            updateNavigationButtons();
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('strategyModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function updateModalContent() {
            const strategy = strategies[currentStrategyIndex];
            const modalContent = document.getElementById('modalContent');
            
            let sectionsHTML = '';
            strategy.sections.forEach(section => {
                let itemsHTML = section.items.map(item => `<li>${item}</li>`).join('');
                sectionsHTML += `
                    <div class="modal-section">
                        <h3>${section.title}</h3>
                        <ul>${itemsHTML}</ul>
                    </div>
                `;
            });
            
            modalContent.innerHTML = `
                <h2 class="modal-strategy-name">${strategy.name}</h2>
                <p class="modal-strategy-description">${strategy.description}</p>
                ${sectionsHTML}
            `;
        }

        function updateNavigationButtons() {
            document.getElementById('prevBtn').disabled = currentStrategyIndex === 0;
            document.getElementById('nextBtn').disabled = currentStrategyIndex === strategies.length - 1;
        }

        function previousStrategy() {
            if (currentStrategyIndex > 0) {
                currentStrategyIndex--;
                updateModalContent();
                updateNavigationButtons();
            }
        }

        function nextStrategy() {
            if (currentStrategyIndex < strategies.length - 1) {
                currentStrategyIndex++;
                updateModalContent();
                updateNavigationButtons();
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('strategyModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('strategyModal');
            if (modal.style.display === 'block') {
                if (event.key === 'Escape') {
                    closeModal();
                } else if (event.key === 'ArrowLeft') {
                    previousStrategy();
                } else if (event.key === 'ArrowRight') {
                    nextStrategy();
                }
            }
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
