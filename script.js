// Hero background animation for parallax effect
function initHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Hero image and content rotation functionality
function initHeroImageRotation() {
    const heroImages = document.querySelectorAll('.hero-image');
    const heroContentItems = document.querySelectorAll('.hero-content-item');
    
    if (heroImages.length > 0 && heroContentItems.length > 0) {
        let currentIndex = 0;
        
        function rotateContent() {
            // Remove active class from current image and content
            heroImages[currentIndex].classList.remove('active');
            heroContentItems[currentIndex].classList.remove('active');
            
            // Move to next item
            currentIndex = (currentIndex + 1) % heroImages.length;
            
            // Add active class to next image and content
            heroImages[currentIndex].classList.add('active');
            heroContentItems[currentIndex].classList.add('active');
        }
        
        // Start rotation every 4seconds
        setInterval(rotateContent, 4000);
        
        // Preload images for smooth transitions
        heroImages.forEach(img => {
            const image = new Image();
            image.src = img.src;
        });
    }
}

//events section

//end event section
// Learn More Modal Functions
window.openLearnMoreModal = function() {
    document.getElementById('learn-more-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.closeLearnMoreModal = function() {
    document.getElementById('learn-more-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Global opportunity section function - defined outside DOMContentLoaded
window.showOpportunitySection = function(sectionId) {
    console.log('showOpportunitySection called with:', sectionId);

    // Ensure we're working with valid section IDs
    const validSections = ['careers', 'proposals'];
    if (!validSections.includes(sectionId)) {
        console.warn('Invalid section ID:', sectionId);
        sectionId = 'careers'; // Default fallback
    }

    // Hide all opportunity sections
    const allSections = document.querySelectorAll('.opportunity-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Smooth scroll to opportunities section with offset
        const opportunitiesSection = document.querySelector('#opportunities');
        if (opportunitiesSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = opportunitiesSection.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        console.log('Showing opportunity section:', sectionId);
    } else {
        console.warn('Target section not found:', sectionId);
        // If section not found, default to careers
        const defaultSection = document.getElementById('careers');
        if (defaultSection) {
            defaultSection.classList.add('active');
        }
    }
};

// Modal functionality - global
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Initialize blog posts display - show only first 3
function initializeBlogDisplay() {
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const paginationInfo = document.querySelector('.pagination-info span');
    const completeMessage = document.querySelector('.articles-complete-message');

    // Remove completion message if it exists
    if (completeMessage) {
        completeMessage.remove();
    }

    // Hide all posts beyond the first 3
    blogCards.forEach((card, index) => {
        if (index >= 3) {
            card.classList.add('load-more-hidden');
        } else {
            card.classList.remove('load-more-hidden');
        }
    });

    // Update pagination info
    if (paginationInfo) {
        const visibleCount = Math.min(3, blogCards.length);
        paginationInfo.textContent = `Showing ${visibleCount} of ${blogCards.length} articles`;
    }

    // Show load more button if there are more than 3 posts and reset its state
    if (loadMoreBtn && blogCards.length > 3) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        loadMoreBtn.onclick = loadMorePosts;
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

// Load more posts functionality with toggle support
window.loadMorePosts = function() {
    const hiddenCards = document.querySelectorAll('.blog-card.load-more-hidden');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const paginationInfo = document.querySelector('.pagination-info span');
    const allCards = document.querySelectorAll('.blog-card');
    const completeMessage = document.querySelector('.articles-complete-message');

    if (hiddenCards.length > 0) {
        // Show all remaining hidden posts
        hiddenCards.forEach(card => {
            card.classList.remove('load-more-hidden');
            card.style.animation = 'fadeIn 0.5s ease-in';
        });

        // Update pagination info
        if (paginationInfo) {
            const visibleCards = document.querySelectorAll('.blog-card:not(.load-more-hidden)');
            paginationInfo.textContent = `Showing ${visibleCards.length} of ${allCards.length} articles`;
        }

        // Change button to "Show Less" functionality
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Articles';
            loadMoreBtn.onclick = showLessPosts;
        }

        // Remove completion message if it exists
        if (completeMessage) {
            completeMessage.remove();
        }
    }
};

// Show less posts functionality
window.showLessPosts = function() {
    const allCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const paginationInfo = document.querySelector('.pagination-info span');

    // Hide all posts beyond the first 3
    allCards.forEach((card, index) => {
        if (index >= 3) {
            card.classList.add('load-more-hidden');
        }
    });

    // Update pagination info
    if (paginationInfo) {
        const visibleCards = document.querySelectorAll('.blog-card:not(.load-more-hidden)');
        paginationInfo.textContent = `Showing ${visibleCards.length} of ${allCards.length} articles`;
    }

    // Change button back to "Load More" functionality
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        loadMoreBtn.onclick = loadMorePosts;
    }

    // Scroll to blog section to show the collapsed state
    const blogSection = document.getElementById('blog');
    if (blogSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = blogSection.offsetTop - headerHeight - 100;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Navigation active state and smooth scrolling
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    // Handle navigation link clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip empty or invalid selectors
            if (!href || href === '#' || href.length <= 1) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to clicked nav link (if it's a nav link)
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }

            // Validate selector before using it
            const isValidSelector = /^#[a-zA-Z][\w-]*$/.test(href);
            if (!isValidSelector) {
                console.warn('Invalid selector format:', href);
                return;
            }

            try {
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Handle special cases where sections might not exist on current page
                    const sectionId = href.substring(1);
                    console.log('Target section not found on current page:', sectionId);

                    // For opportunities navigation, try to handle it gracefully
                    if (sectionId.includes('careers') || sectionId.includes('proposals')) {
                        // Check if we're on a page that should handle this
                        const opportunitiesSection = document.querySelector('#opportunities');
                        if (opportunitiesSection && window.showOpportunitySection) {
                            window.showOpportunitySection(sectionId);
                        } else {
                            // Navigate to opportunities page
                            window.location.href = `opportunities.html${href}`;
                        }
                    }
                }
            } catch (error) {
                console.warn('Error handling navigation:', href, error);
            }
        });
    });

    

    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`.main-nav .nav-link[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }

    // Throttled scroll event for performance
    const throttledScrollHandler = throttle(updateActiveNavOnScroll, 100);
    window.addEventListener('scroll', throttledScrollHandler);

    // Set initial active state
    updateActiveNavOnScroll();

    // Counter animation for impact stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.nav-dot');

    window.showTestimonial = function(index) {
        testimonials.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    };

    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

         // Submit to Formspree
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert('Error: ' + data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        }).finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
    }

    // Enhanced Blog Functionality
    // Blog filtering system for content management integration
    const blogCards = document.querySelectorAll('.blog-card');
    const filterBtns = document.querySelectorAll('.blog-filters .filter-btn');

    // Make blog tags clickable to show related content
    document.querySelectorAll('.blog-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase();

            // Show modal with tag-specific content
            if (tagText === 'future of work') {
                openTagModal('future-of-work');
            } else if (tagText === 'technology trends') {
                openTagModal('technology-trends');
            } else if (tagText === 'digital transformation') {
                openTagModal('digital-transformation');
            }
        });

        // Add hover effect to show it's clickable
        tag.style.cursor = 'pointer';
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Blog post filtering functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');
            let visibleCount = 0;

            blogCards.forEach((card, index) => {
                const matchesFilter = filterValue === 'all' || card.getAttribute('data-category') === filterValue;

                if (matchesFilter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';

                    // For "All Posts", apply load more logic (show only first 3)
                    if (filterValue === 'all') {
                        if (visibleCount >= 3) {
                            card.classList.add('load-more-hidden');
                        } else {
                            card.classList.remove('load-more-hidden');
                        }
                    } else {
                        // For other filters, show all matching posts
                        card.classList.remove('load-more-hidden');
                    }
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('load-more-hidden');
                }
            });

            // Update load more button and pagination
            const loadMoreBtn = document.querySelector('.load-more-btn');
            const paginationInfo = document.querySelector('.pagination-info span');
            const completeMessage = document.querySelector('.articles-complete-message');

            if (completeMessage) {
                completeMessage.remove();
            }

            if (filterValue === 'all') {
                const currentlyVisible = document.querySelectorAll('.blog-card:not(.load-more-hidden):not([style*="none"])').length;
                if (paginationInfo) {
                    paginationInfo.textContent = `Showing ${currentlyVisible} of ${visibleCount} articles`;
                }

                if (visibleCount > 3 && loadMoreBtn) {
                    loadMoreBtn.style.display = 'inline-flex';
                    // Reset button to "Load More" state when filtering
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
                    loadMoreBtn.onclick = loadMorePosts;
                } else if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                if (paginationInfo) {
                    paginationInfo.textContent = `Showing ${visibleCount} of ${visibleCount} articles`;
                }
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        });
    });

    // Blog search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let matchingCount = 0;

            blogCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const tags = Array.from(card.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());

                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              tags.some(tag => tag.includes(searchTerm));

                if (matches) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                    card.classList.remove('load-more-hidden');
                    matchingCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('load-more-hidden');
                }
            });

            // Update pagination and hide load more when searching
            const loadMoreBtn = document.querySelector('.load-more-btn');
            const paginationInfo = document.querySelector('.pagination-info span');
            const completeMessage = document.querySelector('.articles-complete-message');

            if (completeMessage) {
                completeMessage.remove();
            }

            if (searchTerm.trim() === '') {
                // Reset to initial state when search is cleared
                initializeBlogDisplay();
            } else {
                // Hide load more button when searching and reset its state
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
                    loadMoreBtn.onclick = loadMorePosts;
                }
                if (paginationInfo) {
                    paginationInfo.textContent = `Found ${matchingCount} articles matching "${searchTerm}"`;
                }
            }

            console.log(`Found ${matchingCount} articles matching "${searchTerm}"`);
        });
    }

    // Blog newsletter form submission
    const blogNewsletterForm = document.getElementById('blog-newsletter-form');
    if (blogNewsletterForm) {
        blogNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            // Integration point for email marketing services
            alert('Thank you for subscribing to our blog updates!');
            this.reset();
        });
    }

    // Tag modal functionality for showing tag-specific content
    window.openTagModal = function(tagType) {
        let modalId, title, content;

        switch(tagType) {
            case 'future-of-work':
                modalId = 'future-of-work-modal';
                title = 'Future of Work';
                content = {
                    intro: 'The future of work is being reshaped by technological advancement, changing demographics, and evolving workplace cultures.',
                    sections: [
                        {
                            title: 'Remote and Hybrid Work Models',
                            content: 'Organizations are embracing flexible work arrangements that combine remote and in-office experiences to attract and retain top talent.'
                        },
                        {
                            title: 'Skills-Based Hiring',
                            content: 'Companies are shifting focus from traditional qualifications to specific skills and competencies, opening opportunities for diverse talent pools.'
                        },
                        {
                            title: 'AI-Human Collaboration',
                            content: 'The future workplace will see increased collaboration between humans and AI systems, requiring new skills in AI literacy and human-machine interaction.'
                        },
                        {
                            title: 'Continuous Learning Culture',
                            content: 'Organizations are investing in lifelong learning platforms to help employees adapt to rapidly changing skill requirements.'
                        }
                    ]
                };
                break;

            case 'technology-trends':
                modalId = 'technology-trends-modal';
                title = 'Technology Trends';
                content = {
                    intro: 'Stay ahead of the curve with the latest technology trends shaping industries and creating new opportunities for professionals.',
                    sections: [
                        {
                            title: 'Artificial Intelligence & Machine Learning',
                            content: 'AI continues to transform industries with advancements in natural language processing, computer vision, and predictive analytics.'
                        },
                        {
                            title: 'Cloud-Native Development',
                            content: 'Microservices, containerization, and serverless computing are becoming standard practices for scalable application development.'
                        },
                        {
                            title: 'Cybersecurity Evolution',
                            content: 'Zero-trust security models and AI-powered threat detection are essential as cyber threats become more sophisticated.'
                        },
                        {
                            title: 'Sustainable Technology',
                            content: 'Green computing, energy-efficient algorithms, and sustainable software development practices are gaining prominence.'
                        },
                        {
                            title: 'Low-Code/No-Code Platforms',
                            content: 'These platforms are democratizing software development, enabling non-technical users to create applications.'
                        }
                    ]
                };
                break;

            case 'digital-transformation':
                modalId = 'digital-transformation-modal';
                title = 'Digital Transformation';
                content = {
                    intro: 'Digital transformation is reshaping how organizations operate, serve customers, and create value in the digital economy.',
                    sections: [
                        {
                            title: 'Customer Experience Revolution',
                            content: 'Organizations are leveraging data analytics and AI to create personalized, seamless customer experiences across all touchpoints.'
                        },
                        {
                            title: 'Data-Driven Decision Making',
                            content: 'Companies are building robust data infrastructures to enable real-time insights and evidence-based strategic decisions.'
                        },
                        {
                            title: 'Process Automation',
                            content: 'Robotic Process Automation (RPA) and intelligent automation are streamlining operations and reducing manual tasks.'
                        },
                        {
                            title: 'Digital Workplace Transformation',
                            content: 'Modern collaboration tools and digital workflows are creating more efficient and flexible work environments.'
                        }
                    ]
                };
                break;
        }

        // Create and show the modal
        createTagModal(modalId, title, content);
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Create tag modal dynamically
    function createTagModal(modalId, title, content) {
        // Remove existing modal if it exists
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';

        modal.innerHTML = `
            <div class="modal-content blog-modal">
                <span class="close" onclick="closeModal('${modalId}')">&times;</span>
                <article class="blog-full-article">
                    <div class="blog-header">
                        <h1>${title}</h1>
                        <div class="blog-meta-full">
                            <span class="blog-date"><i class="fas fa-calendar"></i> Updated Daily</span>
                            <span class="read-time"><i class="fas fa-clock"></i> 5 min read</span>
                            <span class="author"><i class="fas fa-user"></i> CAPACITI Team</span>
                        </div>
                    </div>
                    <div class="blog-content-full">
                        <p><strong>${content.intro}</strong></p>
                        ${content.sections.map(section => `
                            <h3>${section.title}</h3>
                            <p>${section.content}</p>
                        `).join('')}

                        <div class="blog-quote">
                            <blockquote>
                                "Staying informed about these trends is crucial for professionals looking to remain competitive in the evolving digital landscape."
                            </blockquote>
                        </div>

                        <h3>Related Resources</h3>
                        <ul>
                            <li><a href="#programmes">Explore our training programmes</a></li>
                            <li><a href="#opportunities">View current opportunities</a></li>
                            <li><a href="#contact">Contact us for more information</a></li>
                        </ul>
                    </div>
                </article>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Enhanced engagement features
    // Like functionality for blog posts
    document.querySelectorAll('.likes').forEach(likeBtn => {
        likeBtn.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            const countSpan = this.querySelector('span') || this;
            let currentCount = parseInt(countSpan.textContent.match(/\d+/)[0]);

            if (heartIcon.classList.contains('fas')) {
                // Unlike
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                currentCount--;
                this.style.color = '#9ca3af';
            } else {
                // Like
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                currentCount++;
                this.style.color = '#ef4444';
            }

            countSpan.innerHTML = `<i class="${heartIcon.classList.contains('fas') ? 'fas' : 'far'} fa-heart"></i> ${currentCount}`;
        });
    });

    // Comment modal functionality
    document.querySelectorAll('.comments').forEach(commentBtn => {
        commentBtn.addEventListener('click', function() {
            // This would open a comment modal or navigate to full article
            alert('Comments feature would integrate with your CMS commenting system');
        });
    });

    // Programme filtering functionality
    const programmeCards = document.querySelectorAll('.programme-card');
    const programmeFilterBtns = document.querySelectorAll('.programme-filters .filter-btn');

    if (programmeFilterBtns.length > 0 && programmeCards.length > 0) {
        programmeFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                programmeFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                programmeCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });

                console.log(`Filtered programmes by: ${filterValue}`);
            });
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Handle dropdown navigation clicks for opportunities
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent is a nav-dropdown-item
        const dropdownItem = e.target.closest('.nav-dropdown-item');
        if (dropdownItem) {
            e.preventDefault();
            
            const href = dropdownItem.getAttribute('href');
            const sectionId = dropdownItem.getAttribute('data-section');

            if (href && href.includes('#')) {
                const hashSection = href.split('#')[1];
                const targetSection = sectionId || hashSection;

                console.log('Dropdown navigation clicked:', targetSection);

                // Navigate to opportunities page if not already there
                if (!window.location.pathname.includes('opportunities.html')) {
                    window.location.href = `opportunities.html#${targetSection}`;
                } else {
                    // Already on opportunities page, just show the section
                    if (window.showOpportunitySection) {
                        window.showOpportunitySection(targetSection);
                        
                        // Update URL hash without page reload
                        window.history.pushState(null, null, `#${targetSection}`);
                    } else {
                        console.error('showOpportunitySection function not available');
                    }
                }
            }
        }
    });

    // Initialize opportunities section navigation on page load if URL has hash
    if (window.location.hash && window.location.pathname.includes('opportunities.html')) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(function() {
            if (window.showOpportunitySection) {
                window.showOpportunitySection(sectionId);
            }
        }, 500);
    }

    // Initialize blog display on page load
    initializeBlogDisplay();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('impact-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.mission-vision-item, .team-member, .programme-card, .blog-card, .opportunity-card, .impact-stats');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    initHeroBackground();
    initHeroImageRotation();

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} CAPACITI. All rights reserved.`;
    }

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });

    window.shareOnSocial = function(platform, url, text) {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    window.searchSite = function(query) {
        const searchResults = [];
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p');

        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                searchResults.push({
                    element: element,
                    text: element.textContent,
                    section: element.closest('section')?.id || 'unknown'
                });
            }
        });

        return searchResults;
    };

    if ('serviceWorker' in navigator) {
        console.log('Service Worker support detected');
    }

    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            }, 0);
        });
    }
});
// CV Upload Functionality
window.handleCVUpload = function(input) {
    const file = input.files[0];
    const statusDiv = document.getElementById('cv-upload-status');
    const messageElement = document.getElementById('cv-upload-message');
    const progressBar = document.getElementById('upload-progress-bar');
    
    if (!file) {
        return;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please select a PDF, DOC, or DOCX file.');
        input.value = '';
        return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        input.value = '';
        return;
    }
    
    // Show upload status
    statusDiv.style.display = 'block';
    messageElement.textContent = `Uploading ${file.name}...`;
    messageElement.style.color = '#6b7280';
    
    // Simulate upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 200);
    
    // Create FormData and simulate upload
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('type', 'cv_submission');
    formData.append('timestamp', new Date().toISOString());
    
    // In a real implementation, you would send this to your backend
    // For now, we'll simulate a successful upload
    setTimeout(() => {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            messageElement.innerHTML = `
                <i class="fas fa-check-circle" style="color: #10b981; margin-right: 8px;"></i>
                CV uploaded successfully! We'll review your application and get back to you soon.
            `;
            messageElement.style.color = '#10b981';
            
            // Reset after 5 seconds
            setTimeout(() => {
                statusDiv.style.display = 'none';
                progressBar.style.width = '0%';
                input.value = '';
            }, 5000);
        }, 500);
        
        // Log the file details (in real app, send to server)
        console.log('CV Upload Details:', {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadTime: new Date().toISOString()
        });
        
        // Optional: Send email notification or save to database
        // This would be handled by your backend in a real implementation
        
    }, 2000 + Math.random() * 1000); // Simulate 2-3 second upload
};

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// CSS animations added via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(30px); }
    }

    .loaded * {
        animation-play-state: running;
    }

    .load-more-hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);