/* ==========================================================================
   VICTORIA - THE GREAT BUSINESS
   Premium JS Interaction Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Custom Follow Cursor
    // ==========================================
    const cursor = document.getElementById('customCursor');
    const cursorGlow = document.getElementById('customCursorGlow');
    
    if (cursor && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Subtle delayed offset for the glow ring
            cursorGlow.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 150, fill: 'forwards' });
        });

        // Add class on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .portfolio-item, .faq-header, .why-card, .service-card, .testimonial-bullet, .carousel-dot');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorGlow.classList.add('hovered');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorGlow.classList.remove('hovered');
            });
        });
    }

    // ==========================================
    // 2. Preloader Animation
    // ==========================================
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loaderBar');
    
    if (preloader && loaderBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                }, 400);
            }
            loaderBar.style.width = `${progress}%`;
        }, 80);
    } else {
        if(preloader) preloader.style.display = 'none';
    }

    // ==========================================
    // 3. Scroll Progress Indicator & Sticky Navbar
    // ==========================================
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update top bar
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }
        
        // Sticky transition navbar
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 4. Mobile Menu Hamburger Toggle
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        
        // Close menu on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu if clicked outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }

    // ==========================================
    // 5. Active Navbar Section Tracker
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 6. Search Overlay Toggle
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchOverlay && searchCloseBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('open');
            setTimeout(() => { if (searchInput) searchInput.focus(); }, 300);
        });
        
        searchCloseBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('open');
        });
        
        // Close on Escape Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
                searchOverlay.classList.remove('open');
            }
        });
    }

    // ==========================================
    // 7. Hero Carousel Autoplay Engine
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const paginationContainer = document.getElementById('carouselPagination');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    
    let activeSlideIndex = 0;
    let carouselInterval;
    
    if (slides.length > 0) {
        // Generate pagination dots
        slides.forEach((slide, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetInterval();
            });
            if (paginationContainer) paginationContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        function updateCarousel() {
            slides.forEach((slide, idx) => {
                slide.classList.remove('active');
                if (dots[idx]) dots[idx].classList.remove('active');
            });
            
            slides[activeSlideIndex].classList.add('active');
            if (dots[activeSlideIndex]) dots[activeSlideIndex].classList.add('active');
        }
        
        function nextSlide() {
            activeSlideIndex = (activeSlideIndex + 1) % slides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            activeSlideIndex = (activeSlideIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        function goToSlide(index) {
            activeSlideIndex = index;
            updateCarousel();
        }
        
        function startInterval() {
            carouselInterval = setInterval(nextSlide, 5000);
        }
        
        function resetInterval() {
            clearInterval(carouselInterval);
            startInterval();
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        startInterval();
    }

    // ==========================================
    // 8. Mouse Parallax & Blobs Follow Effects
    // ==========================================
    const parallaxShape1 = document.getElementById('parallaxShape1');
    const parallaxShape2 = document.getElementById('parallaxShape2');
    
    document.addEventListener('mousemove', (e) => {
        const xOffset = (window.innerWidth / 2 - e.clientX) * 0.03;
        const yOffset = (window.innerHeight / 2 - e.clientY) * 0.03;
        
        if (parallaxShape1) {
            parallaxShape1.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(45deg)`;
        }
        if (parallaxShape2) {
            parallaxShape2.style.transform = `translate(${-xOffset * 1.5}px, ${-yOffset * 1.5}px) rotate(-15deg)`;
        }
    });

    // ==========================================
    // 9. Stats Count-Up Animation (Intersection Observer)
    // ==========================================
    const counterElements = document.querySelectorAll('.count-num');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 1500; // 1.5 seconds animation
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;
        
        const counterInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic progress mapping
            const easeOutValue = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(easeOutValue * target);
            
            element.innerText = currentCount;
            
            if (frame >= totalFrames) {
                element.innerText = target + (element.innerText.includes('%') || target === 500 || target === 300 || target === 50 ? '+' : '');
                clearInterval(counterInterval);
            }
        }, frameRate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        statsObserver.observe(counter);
    });

    // ==========================================
    // 10. Portfolio Grid Filtering & Lightbox
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Lightbox triggers
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    
    if (lightbox && lightboxImg && lightboxCaption && lightboxCloseBtn) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgUrl = item.getAttribute('data-img');
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-desc');
                
                lightboxImg.setAttribute('src', imgUrl);
                lightboxCaption.innerHTML = `<strong>${title}</strong><p style="font-size:0.95rem; color:#aaa; margin-top:8px;">${desc}</p>`;
                
                lightbox.classList.add('open');
            });
        });
        
        lightboxCloseBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
            }
        });
    }

    // ==========================================
    // 11. Scroll-reveal timeline tracker
    // ==========================================
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.getElementById('timelineProgress');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetStep = entry.target;
                targetStep.classList.add('active');
                
                // Update progress bar length based on step targets
                const progressValue = targetStep.getAttribute('data-progress');
                if (timelineProgress) {
                    timelineProgress.style.width = `${progressValue}%`;
                }
            }
        });
    }, { threshold: 0.6, rootMargin: '0px 0px -100px 0px' });
    
    timelineSteps.forEach(step => {
        timelineObserver.observe(step);
    });

    // ==========================================
    // 12. Testimonial Slider Autoplay & Drag
    // ==========================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const bulletsContainer = document.getElementById('testimonialBullets');
    
    let activeTestimonialIndex = 0;
    let testimonialInterval;
    
    if (testimonials.length > 0 && testimonialTrack) {
        // Generate bullets
        testimonials.forEach((_, idx) => {
            const bullet = document.createElement('div');
            bullet.classList.add('testimonial-bullet');
            if (idx === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => {
                goToTestimonial(idx);
                resetTestimonialInterval();
            });
            if (bulletsContainer) bulletsContainer.appendChild(bullet);
        });
        
        const bullets = document.querySelectorAll('.testimonial-bullet');
        
        function updateTestimonials() {
            testimonialTrack.style.transform = `translateX(-${activeTestimonialIndex * 100}%)`;
            bullets.forEach((bullet, idx) => {
                bullet.classList.remove('active');
                if (idx === activeTestimonialIndex) bullet.classList.add('active');
            });
        }
        
        function nextTestimonial() {
            activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
            updateTestimonials();
        }
        
        function goToTestimonial(idx) {
            activeTestimonialIndex = idx;
            updateTestimonials();
        }
        
        function startTestimonialInterval() {
            testimonialInterval = setInterval(nextTestimonial, 6000);
        }
        
        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        }
        
        startTestimonialInterval();
    }

    // ==========================================
    // 13. FAQ Accordion Toggle
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = `${content.scrollHeight}px`;
            }
        });
    });

    // ==========================================
    // 14. Theme Switcher Engine (Dark/Light)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;
    
    // Retrieve stored theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    // ==========================================
    // 15. Form Submission & Input Labels Logic
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitFormBtn');
    const formResponseMsg = document.getElementById('formResponseMsg');
    
    if (contactForm && submitBtn && formResponseMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clean response status
            formResponseMsg.className = 'form-response-msg';
            formResponseMsg.innerText = '';
            
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();
            
            if (!name || !email || !message) {
                formResponseMsg.classList.add('error');
                formResponseMsg.innerText = 'Required details are missing. Please complete all fields.';
                return;
            }
            
            // Simulate API request delay
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending Alignment Request <i class="fa-solid fa-spinner fa-spin"></i>`;
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `Submit Inquiry <i class="fa-solid fa-paper-plane"></i>`;
                
                formResponseMsg.classList.add('success');
                formResponseMsg.innerText = 'Inquiry logged. A principal consultant will contact your office shortly.';
                
                contactForm.reset();
            }, 1800);
        });
    }

    // Newsletter validation
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterResponseMsg = document.getElementById('newsletterResponseMsg');
    
    if (newsletterForm && newsletterResponseMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            
            if (!email) return;
            
            newsletterResponseMsg.className = 'form-response-msg';
            newsletterResponseMsg.innerText = '';
            
            setTimeout(() => {
                newsletterResponseMsg.classList.add('success');
                newsletterResponseMsg.style.color = '#FFFFFF';
                newsletterResponseMsg.innerText = 'Email subscribed to the Strategic Brief.';
                emailInput.value = '';
            }, 600);
        });
    }

    // ==========================================
    // 16. Button Ripple Click Effect
    // ==========================================
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // 17. Scroll Reveal Animation Engine
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-slide-left, .reveal-slide-right, .reveal-zoom');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealTriggerPoint = window.innerHeight - 80;
            
            if (elementTop < revealTriggerPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load to show initial elements

    // ==========================================
    // 18. Cookie Consent Banner Control
    // ==========================================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const declineCookiesBtn = document.getElementById('declineCookiesBtn');
    
    if (cookieBanner && acceptCookiesBtn && declineCookiesBtn) {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 2500); // Appear after 2.5s
        }
        
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('visible');
        });
        
        declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('visible');
        });
    }

});
