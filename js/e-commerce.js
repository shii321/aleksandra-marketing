
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
