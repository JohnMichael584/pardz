// ==========================================
// PARDS PRINTING SERVICES - MAIN JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const preloader = document.getElementById('preloader');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const promoVideo = document.getElementById('promoVideo');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialDots = document.getElementById('testimonialDots');

    // ==========================================
    // LOAD DATA FROM LOCAL STORAGE
    // ==========================================
    
    function loadData() {
        try {
            const data = AppData.getData();
            const settings = data.settings;
            const stats = data.stats;

            // Update Hero
            document.getElementById('heroSubtitle').textContent = settings.heroSubtitle || 'Welcome to';
            document.getElementById('heroTitle').innerHTML = (settings.heroTitle || 'PARDS PRINTING SERVICES').replace('PARDS PRINTING SERVICES', 'PARDS <span class="highlight">PRINTING</span> SERVICES');
            document.getElementById('heroDescription').textContent = settings.heroDescription || 'Your one-stop solution for premium sublimation printing, professional signage, and expert printer repairs. Quality that speaks for itself.';

            // Update Stats
            document.getElementById('statClients').textContent = stats.clients || 0;
            document.getElementById('statClients').setAttribute('data-count', stats.clients || 0);
            document.getElementById('statProjects').textContent = stats.projects || 0;
            document.getElementById('statProjects').setAttribute('data-count', stats.projects || 0);
            document.getElementById('statExperience').textContent = stats.experience || 0;
            document.getElementById('statExperience').setAttribute('data-count', stats.experience || 0);
            document.getElementById('aboutYears').textContent = (stats.experience || 0) + '+';

            // Update Contact Info
            document.getElementById('contactAddress').textContent = settings.address || '123 Print Street, Business District City, Province 1234';
            document.getElementById('contactPhone').textContent = settings.phone || '+63 912 345 6789';
            document.getElementById('contactEmail').textContent = settings.email || 'info@pardsprint.com';
            document.getElementById('contactHours').textContent = settings.hours || 'Mon - Sat: 8:00 AM - 6:00 PM';

            // Update Video
            const videoSource = document.getElementById('videoSource');
            if (videoSource && settings.videoData) {
                videoSource.src = settings.videoData;
                promoVideo.load();
            }

            // Render Services
            renderServices(data.services);
            
            // Render Products
            renderProducts(data.products);
            
            // Render Gallery
            renderGallery(data.gallery);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // ==========================================
    // RENDER SERVICES
    // ==========================================
    function renderServices(services) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = services.map(service => `
            <div class="service-card ${service.featured ? 'featured' : ''}" data-aos="fade-up">
                ${service.featured ? '<div class="featured-badge">Popular</div>' : ''}
                <div class="service-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
                <a href="#contact" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
        `).join('');
    }

    // ==========================================
    // RENDER PRODUCTS - FIXED IMAGE LOADING
    // ==========================================
    function renderProducts(products) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:60px 20px;background:#f9fafb;border-radius:12px;border:2px dashed #d1d5db;">
                    <i class="fas fa-box-open" style="font-size:48px;color:#9ca3af;margin-bottom:15px;"></i>
                    <h3 style="font-size:20px;color:#374151;margin-bottom:8px;">No Products Available</h3>
                    <p style="color:#6b7280;">Check back later for new products.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => {
            // Get the image source using AppData.getImageSrc()
            const imageSrc = AppData.getImageSrc(product);
            
            return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${imageSrc}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400/2563eb/FFFFFF?text=${encodeURIComponent(product.name)}'">
                    <div class="product-overlay">
                        <button class="btn-view"><i class="fas fa-eye"></i></button>
                        <button class="btn-quote"><i class="fas fa-comment-dots"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <span class="product-price">${product.price}</span>
                </div>
            </div>
        `}).join('');
    }

    // ==========================================
    // RENDER GALLERY - FIXED IMAGE LOADING
    // ==========================================
    function renderGallery(gallery) {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        if (gallery.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:60px 20px;background:#f9fafb;border-radius:12px;border:2px dashed #d1d5db;">
                    <i class="fas fa-images" style="font-size:48px;color:#9ca3af;margin-bottom:15px;"></i>
                    <h3 style="font-size:20px;color:#374151;margin-bottom:8px;">No Gallery Items</h3>
                    <p style="color:#6b7280;">Check back later for our latest work.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = gallery.map(item => {
            // Get the image source using AppData.getImageSrc()
            const imageSrc = AppData.getImageSrc(item);
            
            return `
            <div class="gallery-item ${item.size || 'normal'}">
                <img src="${imageSrc}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400/2563eb/FFFFFF?text=${encodeURIComponent(item.title)}'">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `}).join('');
    }

    // ==========================================
    // LISTEN FOR DATA UPDATES
    // ==========================================
    window.addEventListener('dataUpdated', function(e) {
        loadData();
    });

    // ==========================================
    // PRELOADER
    // ==========================================
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
        loadData();
    });

    // ==========================================
    // NAVIGATION
    // ==========================================
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNavLink();
    });

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================
    // BACK TO TOP
    // ==========================================
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // VIDEO MODAL
    // ==========================================
    playBtn.addEventListener('click', function() {
        videoModal.classList.add('active');
        promoVideo.play();
    });

    closeModal.addEventListener('click', function() {
        videoModal.classList.remove('active');
        promoVideo.pause();
        promoVideo.currentTime = 0;
    });

    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            promoVideo.pause();
            promoVideo.currentTime = 0;
        }
    });

    // ==========================================
    // PRODUCT FILTER
    // ==========================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // TESTIMONIAL SLIDER
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        testimonialDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function goToSlide(index) {
        currentSlide = index;
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);

    // ==========================================
    // CONTACT FORM
    // ==========================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.reset();
            showToast('Message sent successfully! We\'ll get back to you soon.');
        }, 2000);
    });

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    function showToast(message) {
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const animateElements = document.querySelectorAll('.service-card, .product-card, .gallery-item, .feature-item');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        scrollObserver.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email) {
                showToast('Thank you for subscribing!');
                this.reset();
            }
        });
    }

    console.log('✅ Pards Printing website loaded with dynamic data');
    console.log('🔗 Changes in admin panel will auto-sync here');
});
