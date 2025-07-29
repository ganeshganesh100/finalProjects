document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    let currentIndex = 0;
    let intervalId;

    if (slides.length > 0 && dotsContainer && prevBtn && nextBtn) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function resetAutoPlay() {
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, 5000);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        intervalId = setInterval(nextSlide, 5000);
    }


    const dobInput = document.getElementById('registerDob');
    const today = new Date();
    // Set max date for registration DOB to ensure user is at least 13 years old
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    if (dobInput) {
        dobInput.max = maxDate.toISOString().split('T')[0];
    }

    let users = JSON.parse(localStorage.getItem('foodyUsers')) || [];

    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (passwordInput && icon) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    passwordInput.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            }
        });
    });

    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const registerError = document.getElementById('registerError');

    function validatePasswords() {
        if (!registerPassword || !confirmPassword || !registerError) return true;

        const password = registerPassword.value;
        const confirm = confirmPassword.value;

        if (password.length > 0 && password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters long';
            registerError.style.display = 'block';
            return false;
        } else if (confirm.length > 0 && password !== confirm) {
            registerError.textContent = 'Passwords do not match';
            registerError.style.display = 'block';
            return false;
        } else {
            registerError.style.display = 'none';
            return password.length >= 6 && (confirm.length === 0 || password === confirm);
        }
    }

    if (registerPassword) {
        registerPassword.addEventListener('input', validatePasswords);
    }
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswords);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            const loginError = document.getElementById('loginError');
            const loginSuccess = document.getElementById('loginSuccess');

            if (!emailInput || !passwordInput || !loginError || !loginSuccess) return;

            const email = emailInput.value;
            const password = passwordInput.value;

            loginError.style.display = 'none';
            loginSuccess.style.display = 'none';

            const user = users.find(u => u.email === email);

            if (!user) {
                loginError.textContent = 'No account found with this email address';
                loginError.style.display = 'block';
                return;
            }

            if (user.password !== password) {
                loginError.textContent = 'Incorrect password. Please try again.';
                loginError.style.display = 'block';
                return;
            }

            localStorage.setItem('foodyCurrentUser', JSON.stringify(user));
            loginSuccess.textContent = `Welcome back, ${user.name}!`;
            loginSuccess.style.display = 'block';

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('registerName');
            const emailInput = document.getElementById('registerEmail');
            const dobInput = document.getElementById('registerDob');
            const passwordInput = document.getElementById('registerPassword');
            const confirmPassInput = document.getElementById('confirmPassword');
            const registerError = document.getElementById('registerError');
            const registerSuccess = document.getElementById('registerSuccess');

            if (!nameInput || !emailInput || !dobInput || !passwordInput || !confirmPassInput || !registerError || !registerSuccess) return;

            const name = nameInput.value;
            const email = emailInput.value;
            const dob = dobInput.value;
            const password = passwordInput.value;
            const confirmPass = confirmPassInput.value;

            registerError.style.display = 'none';
            registerSuccess.style.display = 'none';

            if (password.length < 6) {
                registerError.textContent = 'Password must be at least 6 characters long';
                registerError.style.display = 'block';
                return;
            }

            if (password !== confirmPass) {
                registerError.textContent = 'Passwords do not match';
                registerError.style.display = 'block';
                return;
            }

            if (users.find(u => u.email === email)) {
                registerError.textContent = 'An account with this email already exists';
                registerError.style.display = 'block';
                return;
            }

            const birthDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (age < 13 || (age === 13 && monthDiff < 0) || (age === 13 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                registerError.textContent = 'You must be at least 13 years old to register';
                registerError.style.display = 'block';
                return;
            }

            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                dob: dob,
                password: password,
                registeredAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('foodyUsers', JSON.stringify(users));

            registerSuccess.textContent = `Registration successful! Welcome to Foody Web, ${name}!`;
            registerSuccess.style.display = 'block';

            localStorage.setItem('foodyCurrentUser', JSON.stringify(newUser));

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        });
    }


    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.dataset.tab;
            const authTitle = document.getElementById('authTitle');

            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.auth-form-tab').forEach(tab => tab.classList.remove('active'));
            const targetFormTab = document.getElementById(tabName + 'FormTab');
            if (targetFormTab) {
                targetFormTab.classList.add('active');
            }


            if (authTitle) {
                authTitle.textContent = tabName === 'login' ? 'Login to your account' : 'Create your account';
            }

            document.querySelectorAll('.error-message, .success-message').forEach(msg => {
                msg.style.display = 'none';
            });
        });
    });

    document.querySelectorAll('[data-tab-switch]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetTab = this.dataset.tabSwitch;
            const tabButton = document.querySelector(`.tab-button[data-tab="${targetTab}"]`);
            if (tabButton) {
                tabButton.click();
            }
        });
    });

    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('loginEmail');
            if (!emailInput) {
                alert('Email input not found.');
                return;
            }

            const email = emailInput.value;

            if (!email) {
                alert('Please enter your email address first');
                return;
            }

            const user = users.find(u => u.email === email);
            if (user) {
                alert(`Password reset link sent to ${email} (Demo: Your password is "${user.password}")`);
            } else {
                alert('No account found with this email address');
            }
        });
    }

    const currentUser = JSON.parse(localStorage.getItem('foodyCurrentUser'));
    updateAuthUI(currentUser);

    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    if (dobInput) {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

        dobInput.max = maxDate.toISOString().split('T')[0];
        dobInput.min = minDate.toISOString().split('T')[0];

        dobInput.addEventListener('change', function () {
            const selectedDate = new Date(this.value);
            const age = today.getFullYear() - selectedDate.getFullYear();
            const monthDiff = today.getMonth() - selectedDate.getMonth();

            if (age < 13 || (age === 13 && monthDiff < 0) || (age === 13 && monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                this.setCustomValidity('You must be at least 13 years old to register');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    let products = [];
    let cart = JSON.parse(localStorage.getItem('foodyWBCart')) || [];

    const productListElement = document.getElementById('productGrid');
    const cartItemsElement = document.getElementById('cartItems');
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const cartDiscountElement = document.getElementById('cartDiscount');
    const totalPriceElement = document.getElementById('cartTotal');
    const totalItemsCountElement = document.getElementById('totalItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const notificationBox = document.getElementById('cartNotification');
    let notificationTimeout;

    function isOfferActive(product) {
        if (product.isOnOffer && product.offerValidUntil) {
            const now = new Date();
            const validUntilDate = new Date(product.offerValidUntil);
            return product.isOnOffer && validUntilDate.getTime() > now.getTime();
        }
        return false;
    }

    function getEffectivePrice(product) {
        return isOfferActive(product)
            ? product.price * (1 - product.offerPercentage / 100)
            : product.price;
    }

    function displayProducts() {
        if (!productListElement) return;

        productListElement.innerHTML = '';

        if (products.length === 0) {
            productListElement.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: #666;">No products available at the moment. Please check back later!</p>';
            return;
        }

        products.forEach(product => {
            const effectivePrice = getEffectivePrice(product);
            const onOffer = isOfferActive(product);

            const priceHtml = onOffer
                ? `<p>Price: <span class="original-price">Nrs ${product.price.toFixed(2)}</span> <span class="discounted-price">Nrs ${effectivePrice.toFixed(2)}</span></p>`
                : `<p>Price: Nrs ${product.price.toFixed(2)}</p>`;

            const offerBadge = onOffer
                ? `<span class="offer-badge">${product.offerPercentage}% OFF!</span>`
                : '';

            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${offerBadge}
                <h4>${product.name}</h4>
                ${priceHtml}
                <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
            `;
            productListElement.appendChild(productDiv);
        });
    }

    function showNotification(message, type = 'success') {
        if (notificationBox) {
            clearTimeout(notificationTimeout);
            notificationBox.textContent = message;
            notificationBox.className = `cart-notification ${type}`;
            notificationBox.classList.add('show');

            notificationTimeout = setTimeout(() => {
                notificationBox.classList.remove('show');
            }, 4000);
        }
    }

    function addToCart(productId) {
        if (!productId || isNaN(productId)) {
            showNotification("Invalid product ID.", 'error');
            return;
        }

        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            const effectivePrice = getEffectivePrice(productToAdd);
            const existingItemIndex = cart.findIndex(item => item.productId === productId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    productId: productToAdd.id,
                    name: productToAdd.name,
                    image: productToAdd.image,
                    originalPriceAtTimeOfAdd: productToAdd.price,
                    priceAtTimeOfAdd: effectivePrice,
                    quantity: 1
                });
            }

            saveCart();
            updateCartDisplay();
            const currentQuantity = cart.find(item => item.productId === productId).quantity;
            showNotification(`${productToAdd.name} added to cart! Total: ${currentQuantity}`, 'success');
        } else {
            console.error(`Product with ID ${productId} not found.`);
            showNotification('Error: Product not found.', 'error');
        }
    }

    function updateCartDisplay() {
        if (!cartItemsElement || !cartSubtotalElement || !cartDiscountElement || !totalPriceElement || !totalItemsCountElement) {
            return;
        }

        cartItemsElement.innerHTML = '';
        let totalItemsInCart = 0;
        let subtotal = 0;
        let totalDiscountAmount = 0;
        let grandTotal = 0;

        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">Your cart is empty. <a href="cart.html" style="color: #ff6b6b;">Browse products</a></div>';
            cartItemsElement.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                totalItemsInCart += item.quantity;

                const originalTotal = item.originalPriceAtTimeOfAdd * item.quantity;
                const discountedTotal = item.priceAtTimeOfAdd * item.quantity;
                const discount = originalTotal - discountedTotal;

                subtotal += originalTotal;
                totalDiscountAmount += discount;
                grandTotal += discountedTotal;

                const li = document.createElement('li');
                li.setAttribute('data-product-id', item.productId);
                li.innerHTML = `
                    <div class="item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                        <div>
                            <span class="item-name">${item.name}</span><br>
                            ${discount > 0
                        ? `<span class="original-item-price">Nrs ${item.originalPriceAtTimeOfAdd.toFixed(2)}</span> <span class="discounted-item-price">Nrs ${item.priceAtTimeOfAdd.toFixed(2)}</span>`
                        : `<span class="item-price">Nrs ${item.priceAtTimeOfAdd.toFixed(2)}</span>`
                    }
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="quantity-btn decrease" data-product-id="${item.productId}" aria-label="Decrease quantity">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-product-id="${item.productId}" aria-label="Increase quantity">+</button>
                        <button class="remove-from-cart-btn" data-product-id="${item.productId}" aria-label="Remove ${item.name} from cart">Remove</button>
                    </div>
                `;
                cartItemsElement.appendChild(li);
            });
        }

        updateElementWithAnimation(totalItemsCountElement, totalItemsInCart);
        updateElementWithAnimation(cartSubtotalElement, subtotal.toFixed(2));
        updateElementWithAnimation(cartDiscountElement, totalDiscountAmount.toFixed(2));
        updateElementWithAnimation(totalPriceElement, grandTotal.toFixed(2));
    }

    function updateElementWithAnimation(element, newValue) {
        if (element) {
            element.style.transform = 'scale(1.1)';
            element.textContent = newValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    function changeQuantity(productId, delta) {
        const itemIndex = cart.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += delta;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
                showNotification('Item removed from cart.', 'info');
            }
            saveCart();
            updateCartDisplay();
        }
    }

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            const itemName = cart[itemIndex].name;
            cart.splice(itemIndex, 1);
            saveCart();
            updateCartDisplay();
            showNotification(`${itemName} removed from cart.`, 'info');
        }
    }

    function saveCart() {
        localStorage.setItem('foodyWBCart', JSON.stringify(cart));
    }

    if (productListElement) {
        productListElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(event.target.dataset.productId);
                if (!isNaN(productId)) {
                    const originalText = event.target.textContent;
                    event.target.textContent = 'Adding...';
                    event.target.disabled = true;

                    setTimeout(() => {
                        addToCart(productId);
                        event.target.textContent = originalText;
                        event.target.disabled = false;
                    }, 300);
                }
            }
        });
    }

    if (cartItemsElement) {
        cartItemsElement.addEventListener('click', (event) => {
            const target = event.target;
            const productId = parseInt(target.dataset.productId);
            if (!isNaN(productId)) {
                if (target.classList.contains('remove-from-cart-btn')) {
                    // Removed the 'if (confirm(...))' condition.
                    removeFromCart(productId);
                } else if (target.classList.contains('quantity-btn')) {
                    if (target.classList.contains('increase')) {
                        changeQuantity(productId, 1);
                    } else if (target.classList.contains('decrease')) {
                        changeQuantity(productId, -1);
                    }
                }
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification("Your cart is empty. Please add items before checking out.", 'error');
                return;
            }

            // Removed the 'confirm()' condition for checkout.
            showNotification("Proceeding to payment... (Demo: Payment gateway integration needed here!)", 'info');
            setTimeout(() => {
                cart = [];
                saveCart();
                updateCartDisplay();
                showNotification("Order placed successfully! (Demo)", 'success');
            }, 2000);
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification("Cart is already empty.", 'info');
                return;
            }

            // Removed the 'confirm()' condition for clearing the cart.
            cart = [];
            saveCart();
            updateCartDisplay();
            showNotification("Cart cleared.", 'info');
        });
    }


    async function fetchProductsFromAPI() {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Product data with an updated offerValidUntil date for 'Burger'
            return [
                { id: 1, name: "Fried Rice", price: 120, image: "../assets/fried_rice.jpg", category: "main" },
                { id: 2, name: "Burger", price: 150, image: "../assets/burger.jpg", isOnOffer: true, offerPercentage: 10, offerValidUntil: "2026-07-31T23:59:59", category: "fast-food" }, // Updated year
                { id: 3, name: "Ice Cream", price: 80, image: "../assets/ice_cream.jpg", category: "dessert" },
                { id: 4, name: "Chicken Roast", price: 200, image: "../assets/chicken.jpg", category: "main" },
                { id: 5, name: "Pizza", price: 250, image: "../assets/pizza.jpg", isOnOffer: true, offerPercentage: 15, offerValidUntil: "2026-07-15T23:59:59", category: "fast-food" }, // Updated year
                { id: 6, name: "Pasta", price: 180, image: "../assets/pasta.jpg", category: "main" },
                { id: 7, name: "Sandwich", price: 100, image: "../assets/sandwich.jpg", category: "snack" },
                { id: 8, name: "Salad", price: 90, image: "../assets/salad.jpg", category: "healthy" },
                { id: 9, name: "Fried Momo", price: 200, image: "../assets/fried_momo.jpeg", category: "snack" }
            ];
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error('Failed to fetch products from API');
        }
    }

    async function initializeApp() {
        try {
            if (productListElement) {
                productListElement.innerHTML = '<div style="text-align: center; padding: 2rem; grid-column: 1 / -1;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #ff6b6b;"></i><br><br>Loading delicious food...</div>';
            }

            products = await fetchProductsFromAPI();

            if (productListElement) {
                displayProducts();
            }

            updateCartDisplay();

        } catch (error) {
            console.error("Failed to fetch products:", error);
            if (notificationBox) {
                showNotification("Failed to load products. Please try again later.", 'error');
            }
            if (productListElement) {
                productListElement.innerHTML = '<div style="text-align: center; padding: 2rem; grid-column: 1 / -1; color: #ff6b6b;"><i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i><br>Error loading products. <button onclick="location.reload()" style="background: #ff6b6b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-top: 1rem;">Refresh Page</button></div>';
            }
        }
    }

    function updateAuthUI(user) {
        const accountLinks = document.querySelectorAll('a[href*="login.html"]');
        accountLinks.forEach(link => {
            if (user) {
                const firstName = user.name.split(' ')[0];
                const displayName = firstName.length > 8 ? firstName.substring(0, 8) + '...' : firstName;

                link.innerHTML = `
                    <span class="user-name">
                        <i class="fas fa-user"></i> ${displayName}
                    </span>
                    <i class="fas fa-sign-out-alt" title="Logout"></i>
                `;
                link.title = `Logged in as ${user.name} - Click to logout`;
                link.classList.add('logout-icon');
                link.setAttribute('aria-label', `Logged in as ${user.name}. Click to logout`);

                // To ensure event listener is properly attached, clone and replace
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);

                newLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    logout(user.name);
                });
            } else {
                link.innerHTML = 'Account';
                link.title = 'Login / Register';
                link.classList.remove('logout-icon');
                link.removeAttribute('aria-label');

                // To ensure event listener is properly attached, clone and replace
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
            }
        });
    }

    function logout(userName) {
        // Removed the confirm() for logout as per request.
        localStorage.removeItem('foodyCurrentUser');
        showNotification('Logged out successfully!', 'info');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) { // Check if data-src exists
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that do not support IntersectionObserver
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    initializeApp();
    lazyLoadImages();

    function handleViewportChanges() {
        const isMobile = window.innerWidth <= 768;
        // const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Not explicitly used for styling here

        if (notificationBox) {
            if (isMobile) {
                notificationBox.style.position = 'fixed';
                notificationBox.style.left = '10px';
                notificationBox.style.right = '10px';
                notificationBox.style.top = '80px';
            } else {
                notificationBox.style.position = 'fixed';
                notificationBox.style.left = 'auto';
                notificationBox.style.right = '20px';
                notificationBox.style.top = '120px';
            }
        }

        if (productListElement) { // Apply grid changes only if productListElement exists
            if (isMobile) {
                productListElement.style.gridTemplateColumns = '1fr';
            } else {
                // Reset to default for larger screens, assuming CSS handles the default
                productListElement.style.gridTemplateColumns = '';
            }
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener('resize', debounce(handleViewportChanges, 250));
    handleViewportChanges(); // Initial call to set correct styles on load
});