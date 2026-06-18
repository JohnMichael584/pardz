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
                        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                        inStock: true
                    },
                    {
                        id: 2,
                        name: 'Custom T-Shirts',
                        description: 'Full sublimation t-shirts',
                        price: '₱280',
                        category: 'apparel',
                        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
                        inStock: true
                    },
                    {
                        id: 3,
                        name: 'Sports Jersey',
                        description: 'Professional team jerseys',
                        price: '₱450',
                        category: 'apparel',
                        image: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=400',
                        inStock: true
                    },
                    {
                        id: 4,
                        name: 'Long Sleeve Shirts',
                        description: 'Custom long sleeve designs',
                        price: '₱380',
                        category: 'apparel',
                        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
                        inStock: true
                    },
                    {
                        id: 5,
                        name: 'Tarpaulin Banners',
                        description: 'High-quality tarpaulin prints',
                        price: '₱25/sqft',
                        category: 'signage',
                        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                        inStock: true
                    },
                    {
                        id: 6,
                        name: 'Business Signage',
                        description: 'Professional store signs',
                        price: 'Custom Quote',
                        category: 'signage',
                        image: 'https://images.unsplash.com/photo-1524275804141-eb37f78f1e29?w=400',
                        inStock: true
                    },
                    {
                        id: 7,
                        name: 'Custom Stickers',
                        description: 'Vinyl and paper stickers',
                        price: '₱5/pc',
                        category: 'prints',
                        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
                        inStock: true
                    },
                    {
                        id: 8,
                        name: 'Document Printing',
                        description: 'Bond paper & forms',
                        price: '₱3/page',
                        category: 'prints',
                        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2uj38?w=400',
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
                        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
                        size: 'large'
                    },
                    {
                        id: 2,
                        title: 'Custom Polo',
                        description: 'Corporate Event',
                        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
                        size: 'normal'
                    },
                    {
                        id: 3,
                        title: 'T-Shirt Design',
                        description: 'Band Merchandise',
                        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400',
                        size: 'normal'
                    },
                    {
                        id: 4,
                        title: 'Fashion Collection',
                        description: 'Custom Streetwear',
                        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
                        size: 'tall'
                    },
                    {
                        id: 5,
                        title: 'Casual Wear',
                        description: 'Everyday Comfort',
                        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',
                        size: 'normal'
                    },
                    {
                        id: 6,
                        title: 'Sports Uniforms',
                        description: 'School P.E. Set',
                        image: 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=400',
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
                    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
                    heroImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600'
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
        // Trigger update event
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: data }));
    },

    // Product CRUD
    getProducts() {
        return this.getData().products;
    },

    addProduct(product) {
        const data = this.getData();
        product.id = Date.now();
        data.products.push(product);
        this.saveData(data);
        return product;
    },

    updateProduct(id, updatedProduct) {
        const data = this.getData();
        const index = data.products.findIndex(p => p.id === id);
        if (index !== -1) {
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

    addGalleryItem(item) {
        const data = this.getData();
        item.id = Date.now();
        data.gallery.push(item);
        this.saveData(data);
        return item;
    },

    updateGalleryItem(id, updatedItem) {
        const data = this.getData();
        const index = data.gallery.findIndex(g => g.id === id);
        if (index !== -1) {
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

    // Reset to default
    resetData() {
        localStorage.removeItem('pardsData');
        return this.init();
    }
};

// Initialize data on load
AppData.init();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppData;
}
