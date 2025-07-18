/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
            const profServicesSwiper = new Swiper('.prof-services-swiper-container', {
                // Slides per view
                slidesPerView: 1,
                spaceBetween: 30,
                
                // Loop the slides
                loop: true,
                
                // Autoplay
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                
                // Navigation
                navigation: {
                    nextEl: '.prof-services-next-btn',
                    prevEl: '.prof-services-prev-btn',
                },
                
                // Responsive breakpoints
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                },
                
                // Smooth transitions
                speed: 800,
                
                // Equal height slides
                watchSlidesProgress: true,
            });

            // Pause autoplay on hover
            const swiperContainer = document.querySelector('.prof-services-swiper-container');
            swiperContainer.addEventListener('mouseenter', () => {
                profServicesSwiper.autoplay.stop();
            });
            
            swiperContainer.addEventListener('mouseleave', () => {
                profServicesSwiper.autoplay.start();
            });
        });


/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
            const mainHeroSwiper = new Swiper('.main-hero-swiper-container', {
                // Auto-play configuration
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                
                // Loop the slides
                loop: true,
                
                // Smooth transitions
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                
                // Pagination dots
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                
                // Custom navigation buttons
                navigation: {
                    nextEl: '.main-hero-next-btn',
                    prevEl: '.main-hero-prev-btn',
                },
                
                // Transition speed
                speed: 1000,
            });
        });

////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            const searchInput = document.getElementById('searchInput');
            const categoryTabs = document.querySelectorAll('.category-tab');
            const noResults = document.querySelector('.no-results');

            // Toggle FAQ items
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    faqItems.forEach(faq => faq.classList.remove('active'));
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                let visibleCount = 0;

                faqItems.forEach(item => {
                    const questionText = item.querySelector('.question-text').textContent.toLowerCase();
                    const answerText = item.querySelector('.faq-answer-content').textContent.toLowerCase();
                    
                    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            });

            // Category filtering
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const category = this.dataset.category;
                    
                    // Update active tab
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Clear search
                    searchInput.value = '';
                    
                    // Filter items
                    let visibleCount = 0;
                    faqItems.forEach(item => {
                        if (category === 'all' || item.dataset.category === category) {
                            item.style.display = 'block';
                            visibleCount++;
                        } else {
                            item.style.display = 'none';
                        }
                        item.classList.remove('active');
                    });

                    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
                });
            });
        });