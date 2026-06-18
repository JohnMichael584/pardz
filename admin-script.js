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
    const orderModal = document.getElementById('orderModal');
    const addOrderBtn = document.getElementById('addOrderBtn');
    const cancelOrder = document.getElementById('cancelOrder');
    const saveOrder = document.getElementById('saveOrder');
    const adminToast = document.getElementById('adminToast');
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');

    // Demo credentials
    const DEMO_USERNAME = 'admin';
    const DEMO_PASSWORD = 'admin123';

    // ==========================================
    // LOGIN FUNCTIONALITY
    // ==========================================
    
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginScreen.style.display = 'none';
        dashboard.style.display = 'flex';
        initializeCharts();
    }

    // Toggle password visibility
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

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate credentials
        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            // Store login state
            if (rememberMe) {
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
            }

            // Show dashboard
            loginScreen.style.display = 'none';
            dashboard.style.display = 'flex';
            
            showToast('Welcome back, Admin!');
            initializeCharts();
        } else {
            showToast('Invalid credentials. Try admin / admin123', 'error');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    // Logout
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
    // SIDEBAR FUNCTIONALITY
    // ==========================================
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    // Mobile toggle
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding page
            const pageId = this.getAttribute('data-page') + 'Page';
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');

            // Close mobile sidebar
            sidebar.classList.remove('active');
        });
    });

    // ==========================================
    // ORDER MODAL
    // ==========================================
    
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', function() {
            orderModal.classList.add('active');
        });
    }

    if (cancelOrder) {
        cancelOrder.addEventListener('click', function() {
            orderModal.classList.remove('active');
        });
    }

    if (saveOrder) {
        saveOrder.addEventListener('click', function() {
            orderModal.classList.remove('active');
            showToast('Order saved successfully!');
        });
    }

    // Close modal on outside click
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
        }
    });

    // Close modal button
    const closeBtn = orderModal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            orderModal.classList.remove('active');
        });
    }

    // ==========================================
    // SETTINGS TABS
    // ==========================================
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            settingsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding panel
            settingsPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(tabId + 'Panel').classList.add('active');
        });
    });

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
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
        }
        
        adminToast.classList.add('show');
        
        setTimeout(() => {
            adminToast.classList.remove('show');
        }, 3000);
    }

    // ==========================================
    // CHARTS INITIALIZATION
    // ==========================================
    
    function initializeCharts() {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Sales',
                        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                borderDash: [5, 5]
                            },
                            ticks: {
                                callback: function(value) {
                                    return '₱' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Services Chart
        const servicesCtx = document.getElementById('servicesChart');
        if (servicesCtx) {
            new Chart(servicesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sublimation', 'Uniforms', 'Signage', 'Documents', 'Repairs'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            '#2563eb',
                            '#10b981',
                            '#f97316',
                            '#8b5cf6',
                            '#ec4899'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    }

    // ==========================================
    // TABLE SELECT ALL
    // ==========================================
    
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    }

    // ==========================================
    // ACTION BUTTONS
    // ==========================================
    
    // View buttons
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Viewing order details...');
        });
    });

    // Edit buttons
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Opening edit form...');
        });
    });

    // Delete buttons
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                showToast('Item deleted successfully!');
            }
        });
    });

    // ==========================================
    // FORM SUBMISSIONS
    // ==========================================
    
    // Settings forms
    document.querySelectorAll('.settings-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Settings saved successfully!');
        });
    });

    // ==========================================
    // MESSAGE PREVIEW CLICK
    // ==========================================
    
    document.querySelectorAll('.message-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            document.querySelectorAll('.message-preview').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==========================================
    // SEND MESSAGE
    // ==========================================
    
    const sendBtn = document.querySelector('.send-btn');
    const messageInput = document.querySelector('.message-input input');
    
    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', function() {
            if (messageInput.value.trim()) {
                // In a real app, this would send the message
                showToast('Message sent!');
                messageInput.value = '';
            }
        });

        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                showToast('Message sent!');
                this.value = '';
            }
        });
    }

    // ==========================================
    // PRODUCT CARDS
    // ==========================================
    
    document.querySelectorAll('.product-admin-card.add-new').forEach(card => {
        card.addEventListener('click', function() {
            showToast('Add product form coming soon!');
        });
    });

    // ==========================================
    // SHAKE ANIMATION
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
    `;
    document.head.appendChild(style);
});
