// ==========================================
// SHARED DATA MANAGEMENT
// ==========================================

const AppData = {
    // Initialize default data if not exists
    init() {
        if (!localStorage.getItem('pardsData')) {
            const defaultData = {
                products: [
                    {
                        id: 1,
                        name: 'Custom Polo Shirts',
                        description: 'Sublimation printed polo shirts',
                        price: '₱350',
                        category: 'apparel',
                        image: '', // Will be set with default image
                        imageData: null, // Base64 for uploaded images
                        inStock: true
                    },
                    {
                        id: 2,
                        name: 'Custom T-Shirts',
                        description: 'Full sublimation t-shirts',
                        price: '₱280',
                        category: 'apparel',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 3,
                        name: 'Sports Jersey',
                        description: 'Professional team jerseys',
                        price: '₱450',
                        category: 'apparel',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 4,
                        name: 'Long Sleeve Shirts',
                        description: 'Custom long sleeve designs',
                        price: '₱380',
                        category: 'apparel',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 5,
                        name: 'Tarpaulin Banners',
                        description: 'High-quality tarpaulin prints',
                        price: '₱25/sqft',
                        category: 'signage',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 6,
                        name: 'Business Signage',
                        description: 'Professional store signs',
                        price: 'Custom Quote',
                        category: 'signage',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 7,
                        name: 'Custom Stickers',
                        description: 'Vinyl and paper stickers',
                        price: '₱5/pc',
                        category: 'prints',
                        image: '',
                        imageData: null,
                        inStock: true
                    },
                    {
                        id: 8,
                        name: 'Document Printing',
                        description: 'Bond paper & forms',
                        price: '₱3/page',
                        category: 'prints',
                        image: '',
                        imageData: null,
                        inStock: true
                    }
                ],
                services: [
                    {
                        id: 1,
                        title: 'Sublimation Printing',
                        description: 'High-quality sublimation prints on various apparel including polo shirts, t-shirts, jerseys, and more.',
                        features: ['Polo Shirts', 'T-Shirts', 'Jerseys', 'Long Sleeves'],
                        icon: 'fa-tshirt',
                        featured: false
                    },
                    {
                        id: 2,
                        title: 'Uniform Printing',
                        description: 'Professional P.E. uniforms and school apparel with durable, vibrant prints that last.',
                        features: ['P.E. Uniforms', 'School Uniforms', 'Team Jerseys', 'Bulk Orders'],
                        icon: 'fa-school',
                        featured: true
                    },
                    {
                        id: 3,
                        title: 'Signage & Tarpaulin',
                        description: 'Eye-catching tarpaulins and signage for events, businesses, and promotional activities.',
                        features: ['Tarpaulins', 'Banners', 'Signage', 'Posters'],
                        icon: 'fa-image',
                        featured: false
                    },
                    {
                        id: 4,
                        title: 'Document Printing',
                        description: 'Professional bond paper printing and sticker printing for all your documentation needs.',
                        features: ['Bond Paper', 'Stickers', 'Labels', 'Forms'],
                        icon: 'fa-file-alt',
                        featured: false
                    },
                    {
                        id: 5,
                        title: 'Printer Repairs',
                        description: 'Expert printer repair services for all major brands. Fast turnaround and reliable solutions.',
                        features: ['Diagnostics', 'Maintenance', 'Parts Replacement', 'On-site Service'],
                        icon: 'fa-tools',
                        featured: false
                    },
                    {
                        id: 6,
                        title: 'Custom Designs',
                        description: 'Professional graphic design services to bring your vision to life with stunning results.',
                        features: ['Logo Design', 'Layout Design', 'Custom Artwork', 'Revisions'],
                        icon: 'fa-palette',
                        featured: false
                    }
                ],
                gallery: [
                    {
                        id: 1,
                        title: 'Team Jerseys',
                        description: 'Basketball Team Collection',
                        image: '',
                        imageData: null,
                        size: 'large'
                    },
                    {
                        id: 2,
                        title: 'Custom Polo',
                        description: 'Corporate Event',
                        image: '',
                        imageData: null,
                        size: 'normal'
                    },
                    {
                        id: 3,
                        title: 'T-Shirt Design',
                        description: 'Band Merchandise',
                        image: '',
                        imageData: null,
                        size: 'normal'
                    },
                    {
                        id: 4,
                        title: 'Fashion Collection',
                        description: 'Custom Streetwear',
                        image: '',
                        imageData: null,
                        size: 'tall'
                    },
                    {
                        id: 5,
                        title: 'Casual Wear',
                        description: 'Everyday Comfort',
                        image: '',
                        imageData: null,
                        size: 'normal'
                    },
                    {
                        id: 6,
                        title: 'Sports Uniforms',
                        description: 'School P.E. Set',
                        image: '',
                        imageData: null,
                        size: 'normal'
                    }
                ],
                settings: {
                    businessName: 'Pards Printing Services',
                    address: '123 Print Street, Business District City, Province 1234',
                    phone: '+63 912 345 6789',
                    email: 'info@pardsprint.com',
                    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
                    heroTitle: 'PARDS PRINTING SERVICES',
                    heroSubtitle: 'Welcome to',
                    heroDescription: 'Your one-stop solution for premium sublimation printing, professional signage, and expert printer repairs. Quality that speaks for itself.',
                    videoData: null // Base64 for uploaded video
                },
                stats: {
                    clients: 500,
                    projects: 1000,
                    experience: 10
                }
            };
            localStorage.setItem('pardsData', JSON.stringify(defaultData));
        }
        return this.getData();
    },

    getData() {
        return JSON.parse(localStorage.getItem('pardsData'));
    },

    saveData(data) {
        localStorage.setItem('pardsData', JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: data }));
    },

    // Helper: Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    // Product CRUD
    getProducts() {
        return this.getData().products;
    },

    async addProduct(product, imageFile = null) {
        const data = this.getData();
        product.id = Date.now();
        
        if (imageFile) {
            product.imageData = await this.fileToBase64(imageFile);
            product.image = ''; // Clear URL if present
        }
        
        data.products.push(product);
        this.saveData(data);
        return product;
    },

    async updateProduct(id, updatedProduct, imageFile = null) {
        const data = this.getData();
        const index = data.products.findIndex(p => p.id === id);
        if (index !== -1) {
            if (imageFile) {
                updatedProduct.imageData = await this.fileToBase64(imageFile);
                updatedProduct.image = '';
            }
            data.products[index] = { ...data.products[index], ...updatedProduct };
            this.saveData(data);
            return data.products[index];
        }
        return null;
    },

    deleteProduct(id) {
        const data = this.getData();
        data.products = data.products.filter(p => p.id !== id);
        this.saveData(data);
        return true;
    },

    // Service CRUD
    getServices() {
        return this.getData().services;
    },

    addService(service) {
        const data = this.getData();
        service.id = Date.now();
        data.services.push(service);
        this.saveData(data);
        return service;
    },

    updateService(id, updatedService) {
        const data = this.getData();
        const index = data.services.findIndex(s => s.id === id);
        if (index !== -1) {
            data.services[index] = { ...data.services[index], ...updatedService };
            this.saveData(data);
            return data.services[index];
        }
        return null;
    },

    deleteService(id) {
        const data = this.getData();
        data.services = data.services.filter(s => s.id !== id);
        this.saveData(data);
        return true;
    },

    // Gallery CRUD
    getGallery() {
        return this.getData().gallery;
    },

    async addGalleryItem(item, imageFile = null) {
        const data = this.getData();
        item.id = Date.now();
        
        if (imageFile) {
            item.imageData = await this.fileToBase64(imageFile);
            item.image = '';
        }
        
        data.gallery.push(item);
        this.saveData(data);
        return item;
    },

    async updateGalleryItem(id, updatedItem, imageFile = null) {
        const data = this.getData();
        const index = data.gallery.findIndex(g => g.id === id);
        if (index !== -1) {
            if (imageFile) {
                updatedItem.imageData = await this.fileToBase64(imageFile);
                updatedItem.image = '';
            }
            data.gallery[index] = { ...data.gallery[index], ...updatedItem };
            this.saveData(data);
            return data.gallery[index];
        }
        return null;
    },

    deleteGalleryItem(id) {
        const data = this.getData();
        data.gallery = data.gallery.filter(g => g.id !== id);
        this.saveData(data);
        return true;
    },

    // Settings
    getSettings() {
        return this.getData().settings;
    },

    updateSettings(settings) {
        const data = this.getData();
        data.settings = { ...data.settings, ...settings };
        this.saveData(data);
        return data.settings;
    },

    async updateVideo(videoFile) {
        const data = this.getData();
        data.settings.videoData = await this.fileToBase64(videoFile);
        this.saveData(data);
        return data.settings.videoData;
    },

    getStats() {
        return this.getData().stats;
    },

    updateStats(stats) {
        const data = this.getData();
        data.stats = { ...data.stats, ...stats };
        this.saveData(data);
        return data.stats;
    },

    // Export/Import
    exportData() {
        return JSON.stringify(this.getData(), null, 2);
    },

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            localStorage.setItem('pardsData', JSON.stringify(data));
            this.saveData(data);
            return true;
        } catch (e) {
            return false;
        }
    },

    resetData() {
        localStorage.removeItem('pardsData');
        return this.init();
    },

    // Get image source (prioritizes uploaded image)
    getImageSrc(item) {
        if (item.imageData) {
            return item.imageData;
        }
        return item.image || 'https://via.placeholder.com/400';
    }
};

AppData.init();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppData;
}
