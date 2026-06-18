// ==========================================
// PARDS PRINTING - ADMIN DASHBOARD SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileToggle = document.getElementById('mobileToggle');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminToast = document.getElementById('adminToast');
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');

    // Modal elements
    const modal = document.getElementById('itemModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalSave = document.getElementById('modalSave');
    const modalTitle = document.getElementById('modalTitle');
    const modalFields = document.getElementById('modalFields');
    const itemId = document.getElementById('itemId');
    const itemType = document.getElementById('itemType');

    // Demo credentials
    const DEMO_USERNAME = 'admin';
    const DEMO_PASSWORD = 'admin123';

    let currentEditItem = null;
    let currentFile = null;

    // ==========================================
    // LOGIN FUNCTIONALITY
    // ==========================================
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginScreen.style.display = 'none';
        dashboard.style.display = 'flex';
        loadDashboard();
    }

    togglePassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            if (rememberMe) {
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
            }

            loginScreen.style.display = 'none';
            dashboard.style.display = 'flex';
            
            showToast('Welcome back, Admin!');
            loadDashboard();
        } else {
            showToast('Invalid credentials. Try admin / admin123', 'error');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isLoggedIn');
        dashboard.style.display = 'none';
        loginScreen.style.display = 'flex';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================
    function loadDashboard() {
        updateStats();
        renderProducts();
        renderServices();
        renderGallery();
        loadSettings();
        loadVideoPreview();
    }

    function updateStats() {
        const data = AppData.getData();
        document.getElementById('totalProducts').textContent = data.products.length;
        document.getElementById('totalServices').textContent = data.services.length;
        document.getElementById('totalGallery').textContent = data.gallery.length;
    }

    // ==========================================
    // RENDER PRODUCTS
    // ==========================================
    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        const products = AppData.getProducts();
        
        if (products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>No Products Yet</h3>
                    <p>Click "Add Product" to create your first product.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => {
            const imageSrc = AppData.getImageSrc(product);
            return `
            <div class="product-admin-card" data-id="${product.id}">
                <div class="product-admin-image">
                    <img src="${imageSrc}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
                    ${product.inStock ? '<span class="product-badge">In Stock</span>' : '<span class="product-badge out-of-stock">Out of Stock</span>'}
                </div>
                <div class="product-admin-info">
                    <h4>${product.name}</h4>
                    <p class="product-category">${product.category}</p>
                    <div class="product-price-row">
                        <span class="price">${product.price}</span>
                        <span class="stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div class="product-actions">
                        <button class="edit-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i> Edit</button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `}).join('');
    }

    // ==========================================
    // RENDER SERVICES
    // ==========================================
    function renderServices() {
        const grid = document.getElementById('servicesGrid');
        const services = AppData.getServices();
        
        if (services.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-cogs"></i>
                    <h3>No Services Yet</h3>
                    <p>Click "Add Service" to create your first service.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = services.map(service => `
            <div class="service-admin-card" data-id="${service.id}">
                <div class="service-admin-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <div class="service-admin-info">
                    <h4>${service.title}</h4>
                    <p>${service.description}</p>
                    <div class="service-features-preview">
                        ${service.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                    ${service.featured ? '<span class="featured-badge-small">Featured</span>' : ''}
                    <div class="service-actions">
                        <button class="edit-btn" onclick="editService(${service.id})"><i class="fas fa-edit"></i> Edit</button>
                        <button class="delete-btn" onclick="deleteService(${service.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ==========================================
    // RENDER GALLERY
    // ==========================================
    function renderGallery() {
        const grid = document.getElementById('galleryGrid');
        const gallery = AppData.getGallery();
        
        if (gallery.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-images"></i>
                    <h3>No Gallery Items</h3>
                    <p>Click "Add Image" to add your first gallery item.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = gallery.map(item => {
            const imageSrc = AppData.getImageSrc(item);
            return `
            <div class="gallery-admin-card" data-id="${item.id}">
                <img src="${imageSrc}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400'">
                <div class="gallery-admin-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="gallery-actions">
                        <button class="edit-btn" onclick="editGalleryItem(${item.id})"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" onclick="deleteGalleryItem(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `}).join('');
    }

    // ==========================================
    // LOAD SETTINGS
    // ==========================================
    function loadSettings() {
        const settings = AppData.getSettings();
        const stats = AppData.getStats();

        document.getElementById('businessName').value = settings.businessName || '';
        document.getElementById('businessAddress').value = settings.address || '';
        document.getElementById('businessPhone').value = settings.phone || '';
        document.getElementById('businessEmail').value = settings.email || '';
        document.getElementById('businessHours').value = settings.hours || '';
        document.getElementById('heroTitle').value = settings.heroTitle || '';
        document.getElementById('heroSubtitle').value = settings.heroSubtitle || '';
        document.getElementById('heroDescription').value = settings.heroDescription || '';
        document.getElementById('statClients').value = stats.clients || 0;
        document.getElementById('statProjects').value = stats.projects || 0;
        document.getElementById('statExperience').value = stats.experience || 0;

        const dataSize = new Blob([localStorage.getItem('pardsData')]).size;
        document.getElementById('dataSize').textContent = `(${(dataSize / 1024).toFixed(2)} KB)`;
    }

    // ==========================================
    // VIDEO UPLOAD
    // ==========================================
    function loadVideoPreview() {
        const settings = AppData.getSettings();
        const previewDiv = document.getElementById('currentVideoPreview');
        const source = document.getElementById('currentVideoSource');
        
        if (settings.videoData) {
            previewDiv.style.display = 'block';
            source.src = settings.videoData;
            source.parentElement.load();
        } else {
            previewDiv.style.display = 'none';
        }
    }

    const videoUpload = document.getElementById('videoUpload');
    const videoUploadArea = document.getElementById('videoUploadArea');

    if (videoUpload) {
        videoUpload.addEventListener('change', async function(e) {
            const file = this.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('video/')) {
                    showToast('Please select a video file!', 'error');
                    return;
                }
                
                // Validate size (50MB max)
                if (file.size > 50 * 1024 * 1024) {
                    showToast('Video must be less than 50MB!', 'error');
                    return;
                }

                try {
                    showToast('Uploading video...');
                    await AppData.updateVideo(file);
                    loadVideoPreview();
                    showToast('Video uploaded successfully!');
                } catch (error) {
                    showToast('Error uploading video!', 'error');
                }
            }
        });
    }

    if (videoUploadArea) {
        videoUploadArea.addEventListener('click', () => videoUpload.click());
        
        videoUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            videoUploadArea.style.borderColor = '#2563eb';
        });
        
        videoUploadArea.addEventListener('dragleave', () => {
            videoUploadArea.style.borderColor = '#d1d5db';
        });
        
        videoUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            videoUploadArea.style.borderColor = '#d1d5db';
            if (e.dataTransfer.files.length) {
                videoUpload.files = e.dataTransfer.files;
                videoUpload.dispatchEvent(new Event('change'));
            }
        });
    }

    document.getElementById('removeVideoBtn')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to remove the video?')) {
            const data = AppData.getData();
            data.settings.videoData = null;
            AppData.saveData(data);
            loadVideoPreview();
            showToast('Video removed!');
        }
    });

    // ==========================================
    // SIDEBAR FUNCTIONALITY
    // ==========================================
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const pageId = this.getAttribute('data-page') + 'Page';
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            sidebar.classList.remove('active');
        });
    });

    // ==========================================
    // SETTINGS TABS
    // ==========================================
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            settingsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            settingsPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(tabId + 'Panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // SETTINGS FORM HANDLERS
    // ==========================================
    
    document.getElementById('generalSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        AppData.updateSettings({
            businessName: document.getElementById('businessName').value,
            address: document.getElementById('businessAddress').value,
            phone: document.getElementById('businessPhone').value,
            email: document.getElementById('businessEmail').value,
            hours: document.getElementById('businessHours').value
        });
        showToast('General settings saved!');
    });

    document.getElementById('heroSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        AppData.updateSettings({
            heroTitle: document.getElementById('heroTitle').value,
            heroSubtitle: document.getElementById('heroSubtitle').value,
            heroDescription: document.getElementById('heroDescription').value
        });
        showToast('Hero settings saved!');
    });

    document.getElementById('statsSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        AppData.updateStats({
            clients: parseInt(document.getElementById('statClients').value) || 0,
            projects: parseInt(document.getElementById('statProjects').value) || 0,
            experience: parseInt(document.getElementById('statExperience').value) || 0
        });
        showToast('Statistics saved!');
    });

    // ==========================================
    // DATA MANAGEMENT
    // ==========================================
    
    document.getElementById('exportDataBtn').addEventListener('click', function() {
        const data = AppData.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pards_data_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Data exported successfully!');
    });

    document.getElementById('importDataBtn').addEventListener('click', function() {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const result = AppData.importData(event.target.result);
                if (result) {
                    showToast('Data imported successfully!');
                    loadDashboard();
                } else {
                    showToast('Invalid data format!', 'error');
                }
            } catch (error) {
                showToast('Error importing data!', 'error');
            }
        };
        reader.readAsText(file);
        this.value = '';
    });

    document.getElementById('resetDataBtn').addEventListener('click', function() {
        if (confirm('⚠️ Are you sure you want to reset all data to default? This cannot be undone!')) {
            AppData.resetData();
            showToast('Data reset to default!');
            loadDashboard();
        }
    });

    // ==========================================
    // MODAL HANDLERS
    // ==========================================
    
    function openModal(title, type, data = null) {
        modalTitle.textContent = title;
        itemType.value = type;
        modal.classList.add('active');
        currentEditItem = data;
        currentFile = null;
        
        if (data && data.id) {
            itemId.value = data.id;
        } else {
            itemId.value = '';
        }
        
        renderModalFields(type, data);
    }

    function renderModalFields(type, data) {
        let html = '';
        
        switch(type) {
            case 'product':
                html = `
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="field_name" value="${data?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" id="field_description" value="${data?.description || ''}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Price</label>
                            <input type="text" id="field_price" value="${data?.price || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select id="field_category" required>
                                <option value="apparel" ${data?.category === 'apparel' ? 'selected' : ''}>Apparel</option>
                                <option value="signage" ${data?.category === 'signage' ? 'selected' : ''}>Signage</option>
                                <option value="prints" ${data?.category === 'prints' ? 'selected' : ''}>Prints</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Product Image</label>
                        <div class="file-upload-container">
                            <input type="file" id="field_image" accept="image/*" ${data ? '' : 'required'}>
                            <div class="file-upload-area small">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload image</p>
                            </div>
                            ${data?.imageData ? `<div class="file-preview"><img src="${data.imageData}" alt="Current"><span>Current image</span></div>` : ''}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="field_inStock" ${data?.inStock !== false ? 'checked' : ''}>
                            In Stock
                        </label>
                    </div>
                `;
                break;
                
            case 'service':
                html = `
                    <div class="form-group">
                        <label>Service Title</label>
                        <input type="text" id="field_title" value="${data?.title || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="field_description" rows="3" required>${data?.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Features (comma separated)</label>
                        <input type="text" id="field_features" value="${data?.features?.join(', ') || ''}" required>
                        <small>e.g. Polo Shirts, T-Shirts, Jerseys</small>
                    </div>
                    <div class="form-group">
                        <label>Icon Class</label>
                        <input type="text" id="field_icon" value="${data?.icon || 'fa-tshirt'}" required>
                        <small>Font Awesome icon class (e.g. fa-tshirt, fa-school)</small>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="field_featured" ${data?.featured ? 'checked' : ''}>
                            Featured Service
                        </label>
                    </div>
                `;
                break;
                
            case 'gallery':
                html = `
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="field_title" value="${data?.title || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" id="field_description" value="${data?.description || ''}">
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <div class="file-upload-container">
                            <input type="file" id="field_image" accept="image/*" ${data ? '' : 'required'}>
                            <div class="file-upload-area small">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload image</p>
                            </div>
                            ${data?.imageData ? `<div class="file-preview"><img src="${data.imageData}" alt="Current"><span>Current image</span></div>` : ''}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Size</label>
                        <select id="field_size">
                            <option value="normal" ${data?.size === 'normal' ? 'selected' : ''}>Normal</option>
                            <option value="large" ${data?.size === 'large' ? 'selected' : ''}>Large</option>
                            <option value="tall" ${data?.size === 'tall' ? 'selected' : ''}>Tall</option>
                        </select>
                    </div>
                `;
                break;
        }
        
        modalFields.innerHTML = html;

        // Setup file upload handlers
        const fileInput = document.getElementById('field_image');
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                if (this.files[0]) {
                    currentFile = this.files[0];
                    // Show preview
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const preview = fileInput.parentElement.querySelector('.file-preview');
                        if (preview) {
                            preview.querySelector('img').src = event.target.result;
                        }
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    }

    function getModalData() {
        const type = itemType.value;
        let data = {};
        
        switch(type) {
            case 'product':
                data = {
                    name: document.getElementById('field_name').value,
                    description: document.getElementById('field_description').value,
                    price: document.getElementById('field_price').value,
                    category: document.getElementById('field_category').value,
                    inStock: document.getElementById('field_inStock').checked
                };
                break;
                
            case 'service':
                const featuresStr = document.getElementById('field_features').value;
                data = {
                    title: document.getElementById('field_title').value,
                    description: document.getElementById('field_description').value,
                    features: featuresStr.split(',').map(f => f.trim()).filter(f => f),
                    icon: document.getElementById('field_icon').value,
                    featured: document.getElementById('field_featured').checked
                };
                break;
                
            case 'gallery':
                data = {
                    title: document.getElementById('field_title').value,
                    description: document.getElementById('field_description').value,
                    size: document.getElementById('field_size').value
                };
                break;
        }
        
        return data;
    }

    function closeModal() {
        modal.classList.remove('active');
        currentEditItem = null;
        currentFile = null;
        itemId.value = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    modalSave.addEventListener('click', async function() {
        const type = itemType.value;
        const data = getModalData();
        const id = itemId.value;
        const file = document.getElementById('field_image')?.files[0] || currentFile;

        // Validate
        if (type === 'product' && !data.name) {
            showToast('Product name is required!', 'error');
            return;
        }
        if (type === 'service' && !data.title) {
            showToast('Service title is required!', 'error');
            return;
        }
        if (type === 'gallery' && !data.title) {
            showToast('Gallery title is required!', 'error');
            return;
        }

        let result;
        try {
            if (id) {
                // Update
                switch(type) {
                    case 'product':
                        result = await AppData.updateProduct(parseInt(id), data, file);
                        break;
                    case 'service':
                        result = AppData.updateService(parseInt(id), data);
                        break;
                    case 'gallery':
                        result = await AppData.updateGalleryItem(parseInt(id), data, file);
                        break;
                }
                showToast('Item updated successfully!');
            } else {
                // Add
                switch(type) {
                    case 'product':
                        result = await AppData.addProduct(data, file);
                        break;
                    case 'service':
                        result = AppData.addService(data);
                        break;
                    case 'gallery':
                        result = await AppData.addGalleryItem(data, file);
                        break;
                }
                showToast('Item added successfully!');
            }

            if (result) {
                closeModal();
                loadDashboard();
            } else {
                showToast('Error saving item!', 'error');
            }
        } catch (error) {
            showToast('Error saving item!', 'error');
            console.error(error);
        }
    });

    // ==========================================
    // ADD BUTTONS
    // ==========================================
    
    document.querySelectorAll('#addProductBtn, #addProductBtn2').forEach(btn => {
        btn.addEventListener('click', () => openModal('Add Product', 'product'));
    });

    document.querySelectorAll('#addServiceBtn, #addServiceBtn2').forEach(btn => {
        btn.addEventListener('click', () => openModal('Add Service', 'service'));
    });

    document.querySelectorAll('#addGalleryBtn, #addGalleryBtn2').forEach(btn => {
        btn.addEventListener('click', () => openModal('Add Gallery Item', 'gallery'));
    });

    // ==========================================
    // CRUD FUNCTIONS (Global for inline buttons)
    // ==========================================
    
    window.editProduct = function(id) {
        const product = AppData.getProducts().find(p => p.id === id);
        if (product) {
            openModal('Edit Product', 'product', product);
        }
    };

    window.deleteProduct = function(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            AppData.deleteProduct(id);
            showToast('Product deleted!');
            loadDashboard();
        }
    };

    window.editService = function(id) {
        const service = AppData.getServices().find(s => s.id === id);
        if (service) {
            openModal('Edit Service', 'service', service);
        }
    };

    window.deleteService = function(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            AppData.deleteService(id);
            showToast('Service deleted!');
            loadDashboard();
        }
    };

    window.editGalleryItem = function(id) {
        const item = AppData.getGallery().find(g => g.id === id);
        if (item) {
            openModal('Edit Gallery Item', 'gallery', item);
        }
    };

    window.deleteGalleryItem = function(id) {
        if (confirm('Are you sure you want to delete this gallery item?')) {
            AppData.deleteGalleryItem(id);
            showToast('Gallery item deleted!');
            loadDashboard();
        }
    };

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    
    function showToast(message, type = 'success') {
        const toastMessage = document.getElementById('adminToastMessage');
        const toastIcon = adminToast.querySelector('i');
        
        toastMessage.textContent = message;
        
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#ef4444';
            adminToast.style.borderLeft = '4px solid #ef4444';
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
            adminToast.style.borderLeft = '4px solid #10b981';
        }
        
        adminToast.classList.add('show');
        
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        window.toastTimeout = setTimeout(() => {
            adminToast.classList.remove('show');
        }, 3000);
    }

    // ==========================================
    // NOTIFICATION DROPDOWN
    // ==========================================
    
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            
            if (notificationDropdown.classList.contains('active')) {
                const unreadItems = notificationDropdown.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                const badge = notificationBtn.querySelector('.notification-badge');
                if (badge) {
                    badge.textContent = '0';
                    badge.style.display = 'none';
                }
            }
        });

        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // ==========================================
    // USER MENU DROPDOWN
    // ==========================================
    
    const userBtn = document.querySelector('.user-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                closeModal();
            }
            if (notificationDropdown) notificationDropdown.classList.remove('active');
            if (userDropdown) userDropdown.classList.remove('active');
        }
    });

    // ==========================================
    // ADD SHAKE ANIMATION
    // ==========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        .shake {
            animation: shake 0.3s ease-in-out;
        }
        
        .file-upload-container {
            position: relative;
        }
        
        .file-upload-container input[type="file"] {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 2;
        }
        
        .file-upload-area {
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 40px 20px;
            text-align: center;
            transition: all 0.3s ease;
            background: #f9fafb;
            cursor: pointer;
        }
        
        .file-upload-area:hover {
            border-color: #2563eb;
            background: #eff6ff;
        }
        
        .file-upload-area.small {
            padding: 20px;
        }
        
        .file-upload-area i {
            font-size: 32px;
            color: #9ca3af;
            margin-bottom: 10px;
        }
        
        .file-upload-area.small i {
            font-size: 24px;
            margin-bottom: 5px;
        }
        
        .file-upload-area p {
            color: #6b7280;
            font-size: 14px;
        }
        
        .file-upload-area.small p {
            font-size: 13px;
        }
        
        .file-upload-area span {
            display: block;
            font-size: 12px;
            color: #9ca3af;
            margin-top: 5px;
        }
        
        .file-preview {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: #f3f4f6;
            border-radius: 8px;
        }
        
        .file-preview img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
        }
        
        .file-preview span {
            font-size: 13px;
            color: #6b7280;
        }
        
        .video-upload-section {
            padding: 20px 0;
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Pards Printing Admin Dashboard initialized with file upload support');
    console.log('📁 Upload images and videos directly from your computer');
    console.log('🔗 Changes sync with index.html');
});
