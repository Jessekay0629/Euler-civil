// Sample projects data (expanded for demonstration)
        const projects = [
            {
                id: 1,
                title: "Highway Construction Project",
                category: "road",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
            },
            {
                id: 2,
                title: "Soil Testing Laboratory",
                category: "geotechnical",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
            },
            {
                id: 3,
                title: "Commercial Building Structure",
                category: "concrete",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
            },
            {
                id: 4,
                title: "Bridge Construction",
                category: "bridges",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
            },
            {
                id: 5,
                title: "Water Treatment Plant",
                category: "water",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
            },
            {
                id: 6,
                title: "Mining Operations",
                category: "mining",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
            },
            {
                id: 7,
                title: "Tunnel Engineering",
                category: "tunnels",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
            },
            {
                id: 8,
                title: "Airport Runway",
                category: "aviation",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
            },
            {
                id: 9,
                title: "Dam Construction",
                category: "dams",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
            },
            {
                id: 10,
                title: "Railway Infrastructure",
                category: "railways",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
            },
            {
                id: 11,
                title: "Residential Complex",
                category: "residential",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
            },
            {
                id: 12,
                title: "Industrial Facility",
                category: "industrial",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
            }
        ];

        // Filter categories - first 4 are shown directly, rest in modal
        const allFilters = [
            { key: 'all', label: 'All Projects' },
            { key: 'road', label: 'Road Construction' },
            { key: 'geotechnical', label: 'Geotechnical' },
            { key: 'concrete', label: 'Structural Engineering' },
            { key: 'bridges', label: 'Bridge Construction' },
            { key: 'water', label: 'Water Treatment' },
            { key: 'mining', label: 'Mining Operations' },
            { key: 'tunnels', label: 'Tunnel Engineering' },
            { key: 'aviation', label: 'Aviation Infrastructure' },
            { key: 'dams', label: 'Dam Construction' },
            { key: 'railways', label: 'Railway Infrastructure' },
            { key: 'residential', label: 'Residential Projects' },
            { key: 'industrial', label: 'Industrial Facilities' }
        ];

        let displayedProjects = 6;
        let currentFilter = 'all';

        function createGalleryItem(project) {
            return `
                <div class="gallery-item" data-category="${project.category}">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${project.title}</h3>
                    </div>
                </div>
            `;
        }

        function renderGallery() {
            const gallery = document.getElementById('gallery');
            const filteredProjects = currentFilter === 'all' 
                ? projects.slice(0, displayedProjects)
                : projects.filter(p => p.category === currentFilter).slice(0, displayedProjects);
            
            gallery.innerHTML = filteredProjects.map(createGalleryItem).join('');
            
            // Update load more button visibility
            const loadMoreBtn = document.getElementById('loadMore');
            const totalFiltered = currentFilter === 'all' ? projects.length : projects.filter(p => p.category === currentFilter).length;
            loadMoreBtn.style.display = displayedProjects >= totalFiltered ? 'none' : 'block';
        }

        function filterProjects(category) {
            currentFilter = category;
            displayedProjects = 6;
            
            // Update active filter button (only for main tabs)
            document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const activeBtn = document.querySelector(`[data-filter="${category}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Add animation delay for smooth transition
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => item.classList.add('hidden'));
            
            setTimeout(() => {
                renderGallery();
            }, 300);
        }

        function loadMore() {
            displayedProjects += 3;
            renderGallery();
        }

        function populateModal() {
            const modalFilters = document.getElementById('modalFilters');
            // Skip the first 4 filters as they're already in the main tabs
            const additionalFilters = allFilters.slice(4);
            
            modalFilters.innerHTML = additionalFilters.map(filter => `
                <button class="modal-filter-btn" data-filter="${filter.key}">
                    ${filter.label}
                </button>
            `).join('');
            
            // Add event listeners to modal filter buttons
            modalFilters.querySelectorAll('.modal-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterProjects(btn.dataset.filter);
                    closeModal();
                });
            });
        }

        function openModal() {
            document.getElementById('filterModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('filterModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
            if (btn.id !== 'viewMoreBtn') {
                btn.addEventListener('click', () => {
                    filterProjects(btn.dataset.filter);
                });
            }
        });

        document.getElementById('viewMoreBtn').addEventListener('click', openModal);
        document.getElementById('closeModal').addEventListener('click', closeModal);
        document.getElementById('filterModal').addEventListener('click', (e) => {
            if (e.target.id === 'filterModal') {
                closeModal();
            }
        });

        document.getElementById('loadMore').addEventListener('click', loadMore);

        // Handle ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Initialize
        populateModal();
        renderGallery();

        // Add smooth scroll animation on load
        window.addEventListener('load', () => {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });