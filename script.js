// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
});

function initWebsite() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Animated Statistics Counter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target')) || 0;
        if (target === 0) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate section headers
                if (entry.target.classList.contains('section-intro')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100);
                }
                
                // Animate about text
                if (entry.target.classList.contains('about-text')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 200);
                }
                
                // Animate statistics
                if (entry.target.classList.contains('stat-number')) {
                    if (!entry.target.classList.contains('animated')) {
                        entry.target.classList.add('animated');
                        animateCounter(entry.target);
                    }
                }
                
                // Fade in animations with stagger
                if (entry.target.classList.contains('stat-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
                
                if (entry.target.classList.contains('info-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                }
                
                // Animate service cards
                if (entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                }
                
                // Animate area items
                if (entry.target.classList.contains('area-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 50);
                }
            }
        });
    }, observerOptions);

    // Observe section intros
    document.querySelectorAll('.section-intro').forEach(intro => {
        observer.observe(intro);
    });
    
    // Observe about text
    document.querySelectorAll('.about-text').forEach(text => {
        observer.observe(text);
    });

    // Observe elements
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    document.querySelectorAll('.stat-item, .info-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe area items
    document.querySelectorAll('.area-item').forEach(item => {
        observer.observe(item);
    });

    // Project Card Click Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.project-modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                const modal = document.getElementById(`modal-${projectId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Close modal functions
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = this.closest('.project-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            const modal = this.closest('.project-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                sections.forEach(section => {
                    const sectionHeight = section.offsetHeight;
                    const sectionTop = section.offsetTop - 150;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Parallax effect for hero section
    let heroTicking = false;
    window.addEventListener('scroll', () => {
        if (!heroTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const heroContent = document.querySelector('.hero-content');
                
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    
                    if (heroContent) {
                        const opacity = Math.max(0, 1 - scrolled / 500);
                        heroContent.style.opacity = opacity;
                    }
                }
                heroTicking = false;
            });
            heroTicking = true;
        }
    });

    // Initialize animations on load
    window.addEventListener('load', () => {
        // Hide page loader
        const pageLoader = document.querySelector('.page-loader');
        if (pageLoader) {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 500);
        }
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
        
        // Animate logo on load
        const logo = document.querySelector('.logo-img');
        if (logo) {
            logo.style.animation = 'scaleIn 0.6s ease 0.2s both';
        }
    });
}

