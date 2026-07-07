// Serenity & Soul - Spa Application Prototype JS

// 1. MOCK DATABASE
let SERVICES = {
    // Packages / Bundles
    'radiance-bundle': {
        id: 'radiance-bundle',
        name: 'Radiance Facial Bundle',
        type: 'packages',
        price: 850,
        regularPrice: 950,
        sessions: 10,
        duration: '60 Mins per session',
        description: "Commit to your skin's health with our 10-session package. Regular treatments yield lasting, radiant results. Enjoy significant savings when booking this comprehensive care package.",
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80'
    },
    'aromatherapy-bundle': {
        id: 'aromatherapy-bundle',
        name: 'Aromatherapy Massage Package (10 Sessions)',
        type: 'packages',
        price: 1000,
        regularPrice: 1200,
        sessions: 10,
        badge: 'PACKAGE DEAL',
        duration: '60 / 90 Mins per session',
        description: 'Pre-purchase 10 sessions of our signature Aromatherapy Massage and save. Valid for 12 months.',
        image: 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg'
    },
    'half-day-spa-package': {
        id: 'half-day-spa-package',
        name: 'Half-Day Spa Package',
        type: 'packages',
        price: 250,
        regularPrice: 300,
        sessions: 1,
        duration: '3 Hours',
        description: 'Enjoy a combination of aromatherapy massage, facial, and body scrub for 3 full hours of ultimate relaxation.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    },
    'aromatherapy-massage': {
        id: 'aromatherapy-massage',
        name: 'Aromatherapy Massage',
        type: 'massage',
        price: 120,
        duration: '60 / 90 Mins',
        description: 'Deep relaxation massage using selected essential oils that soothe the nervous system and relieve muscle tension. A holistic experience.',
        image: 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg'
    },
    'deep-tissue': {
        id: 'deep-tissue',
        name: 'Serenity Signature Deep Tissue',
        type: 'signature',
        price: 150,
        duration: '90 Mins',
        description: 'Intensive treatment focusing on deep muscle layers to restore the body from chronic fatigue.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
    },
    'radiance-organic-facial': {
        id: 'radiance-organic-facial',
        name: 'Facial Rejuvenation',
        type: 'facial',
        price: 95,
        duration: '60 Mins',
        description: 'Brightening facial treatment with organic plant extracts.',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80'
    },
    // Signature
    'hot-stone': {
        id: 'hot-stone',
        name: 'Hot Stone Therapy',
        type: 'signature',
        price: 165,
        duration: '90 Mins',
        description: 'Basalt stones are heated and placed on key energy points to melt away tension and restore vital energy flow.',
        badge: 'RESTORATIVE',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80'
    },
    'signature-soul': {
        id: 'signature-soul',
        name: 'Signature Soul Massage',
        type: 'signature',
        price: 190,
        duration: '120 Mins',
        description: "A personalized fusion of Swedish, Shiatsu, and Reflexology techniques tailored to your body's specific needs.",
        badge: 'BESPOKE',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    },
    // Facial
    'illuminating-peel': {
        id: 'illuminating-peel',
        name: 'Illuminating Peel',
        type: 'facial',
        price: 95,
        duration: '45 Mins',
        description: 'Fruit enzymes to brighten and smooth dull skin.',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    },
    'pure-hydration': {
        id: 'pure-hydration',
        name: 'Pure Hydration',
        type: 'facial',
        price: 120,
        duration: '60 Mins',
        description: 'Moisture-locking facial with hyaluronic acid.',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80'
    },
    // Body / Scrubs
    'sea-salt-glow': {
        id: 'sea-salt-glow',
        name: 'Sea Salt Glow',
        type: 'body',
        price: 110,
        duration: '60 Mins',
        description: 'Exfoliating ritual for silky smooth skin.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
    },
    'herbal-detox': {
        id: 'herbal-detox',
        name: 'Herbal Detox Wrap',
        type: 'body',
        price: 150,
        duration: '75 Mins',
        description: 'Warm wrap infused with mountain herbs.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    },
    'detox-body-scrub': {
        id: 'detox-body-scrub',
        name: 'Detox Body Scrub',
        type: 'body',
        price: 85,
        duration: '60 Mins',
        description: 'Thorough exfoliation for soft, radiant skin.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
    }
};

function syncServices() {
    let adminSrvRaw = localStorage.getItem('admin_services');
    if (!adminSrvRaw) {
        const defaultServices = [
          { id: 'radiance-bundle', name: 'Radiance Facial Bundle', price: 850, regularPrice: 950, duration: 60, category: 'Packages', desc: "Commit to your skin's health with our 10-session package. Regular treatments yield lasting, radiant results. Enjoy significant savings when booking this comprehensive care package.", img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: true, bestValue: true },
          { id: 'aromatherapy-bundle', name: 'Aromatherapy Massage Package (10 Sessions)', price: 1000, regularPrice: 1200, duration: 60, category: 'Packages', desc: 'Pre-purchase 10 sessions of our signature Aromatherapy Massage and save. Valid for 12 months.', img: 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg', showOnHome: false },
          { id: 'half-day-spa-package', name: 'Half-Day Spa Package', price: 250, regularPrice: 300, duration: 180, category: 'Packages', desc: 'Enjoy a combination of aromatherapy massage, facial, and body scrub for 3 full hours of ultimate relaxation.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', showOnHome: true },
          { id: 'aromatherapy-massage', name: 'Aromatherapy Massage', price: 120, duration: 60, category: 'Massage', desc: 'Deep relaxation massage using selected essential oils that soothe the nervous system and relieve muscle tension. A holistic experience.', img: 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg', showOnHome: true },
          { id: 'deep-tissue', name: 'Serenity Signature Deep Tissue', price: 150, duration: 90, category: 'Therapeutic', desc: 'Intensive treatment focusing on deep muscle layers to restore the body from chronic fatigue.', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', showOnHome: false },
          { id: 'radiance-organic-facial', name: 'Facial Rejuvenation', price: 95, duration: 60, category: 'Skincare', desc: 'Brightening facial treatment with organic plant extracts.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: true },
          { id: 'hot-stone', name: 'Hot Stone Therapy', price: 165, duration: 90, category: 'Signature', desc: 'Basalt stones are heated and placed on key energy points to melt away tension and restore vital energy flow.', img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80', showOnHome: false },
          { id: 'signature-soul', name: 'Signature Soul Massage', price: 190, duration: 120, category: 'Signature', desc: "A personalized fusion of Swedish, Shiatsu, and Reflexology techniques tailored to your body's specific needs.", img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', showOnHome: false },
          { id: 'illuminating-peel', name: 'Illuminating Peel', price: 95, duration: 45, category: 'Skincare', desc: 'Fruit enzymes to brighten and smooth dull skin.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', showOnHome: false },
          { id: 'pure-hydration', name: 'Pure Hydration', price: 120, duration: 60, category: 'Skincare', desc: 'Deep hydration facial restoring radiance.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: false },
          { id: 'detox-body-scrub', name: 'Body Scrub', price: 85, duration: 30, category: 'Body', desc: 'Exfoliating treatment with natural sea salts.', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', showOnHome: true }
        ];
        localStorage.setItem('admin_services', JSON.stringify(defaultServices));
        adminSrvRaw = JSON.stringify(defaultServices);
    }

    try {
        const list = JSON.parse(adminSrvRaw);
        let hasChanges = false;
        const updatedImages = {
            'radiance-bundle': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
            'aromatherapy-bundle': 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg',
            'half-day-spa-package': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            'aromatherapy-massage': 'https://images.alodokter.com/dk0z4ums3/image/upload/v1763539055/attached_image/aromatherapy-massage-ketahui-manfaatnya-untuk-kesehatan-0-alodokter.jpg',
            'deep-tissue': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
            'radiance-organic-facial': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
            'hot-stone': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
            'signature-soul': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            'illuminating-peel': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
            'pure-hydration': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
            'detox-body-scrub': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
            'sea-salt-glow': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
            'herbal-detox': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
        };
        list.forEach(s => {
            if (updatedImages[s.id] && s.img !== updatedImages[s.id]) {
                s.img = updatedImages[s.id];
                hasChanges = true;
            }
        });
        if (hasChanges) {
            localStorage.setItem('admin_services', JSON.stringify(list));
        }
        const mapped = {};
        list.forEach(s => {
            let type = 'massage';
            const cat = (s.category || '').toLowerCase();
            if (cat.includes('package')) type = 'packages';
            else if (cat.includes('skincare') || cat.includes('facial')) type = 'facial';
            else if (cat.includes('signature')) type = 'signature';
            else if (cat.includes('body')) type = 'body';

            mapped[s.id] = {
                id: s.id,
                name: s.name,
                type: type,
                price: parseFloat(s.price) || 0,
                regularPrice: s.regularPrice ? parseFloat(s.regularPrice) : (s.id === 'radiance-bundle' ? 950 : (s.id === 'aromatherapy-bundle' ? 1200 : (s.id === 'half-day-spa-package' ? 300 : undefined))),
                sessions: type === 'packages' ? (s.id === 'radiance-bundle' || s.id === 'aromatherapy-bundle' ? 10 : 1) : undefined,
                duration: s.duration + ' Mins',
                description: s.desc || '',
                image: s.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAITwrqOltnfvKuQeZY1uxmm9vb6Qdfic56l_uXZKbNu0tXzlwl1n4ejVoAdFTVx8_yqPZWtW9HW_UIcEhgKeDc95gwyChyS2Ua2e9hpiXuZNxuTDcGlKl4mu9wQyriwgoRgAjU_sYo7WYl5vLm4n97udJ4ZDhKVVehPxZ0e7GpWFZYoFPQ6IBkgV-zFzxT-jxw4_QAFdbLiAYvISsUvvT8v__rfmdQhJwNblCS5EdoXM6Wv2VNkZEE8Q',
                showOnHome: s.showOnHome !== false,
                bestValue: s.bestValue === true
            };
        });
        SERVICES = mapped;
    } catch (e) {
        console.error('Failed to sync services:', e);
    }
}

// Initial Sync
syncServices();

const THERAPISTS = {
    'siti': {
        id: 'siti',
        name: 'Siti Rahmawati',
        role: 'Senior Therapist',
        specialties: ['Deep Tissue', 'Aromatherapy'],
        experience: '8 years',
        description: 'With over 8 years of experience, Siti specializes in relieving deep muscle tension through intuitive touch and holistic healing practices.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCyGpGMCc0s6-2cZr0NlDqaewuY-I9V_tOS8-XEbzthk_cjPBnUWtYTnWzH3nKaivNuirBu4tNgHsUWKNNS3g4Besm6fNOCnSOYNA5tE5lQiFyryHkMi17UVHZdVUe3pfIxNL1UexF0lWLCBJsFj_lt_rWfPnZvDwLKQg8NwJMX4UPtJHqxLiIu_HrCIKlIQPC4NU6MarRT2m6ZaUUWttG4qHgDH3pnGLTZxeUXRhC2t6y0a38c1Y2aA'
    },
    'budi': {
        id: 'budi',
        name: 'Budi Santoso',
        role: 'Master Healer',
        specialties: ['Shiatsu', 'Reflexology'],
        experience: '12 years',
        description: 'Budi blends traditional Eastern techniques with modern wellness practices to restore energy flow and bring profound relaxation to the body.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ8rPIO2PgwyFK2XCcQXkgTD6GAp5gbUF-guUlH71qrNTwYFVRyW4Vlw6hb0xaXK8ekXQOPDwNEQk2qXu5JHlWXRxVkRWK06tsze7nh_Yuc_u6Xz90sFEzgvTCibstYc54kUpAoQaDNOhw_UkE2kSrS3rME23700F9kiWckGzjgTvH8I1Fo6RNLOH2UyHMo_lWG1bwOg9cPeqnKqhsCt1HhTKzPhmLaCQbhLlZQLeMKZUqPtdiTq09CQ'
    },
    'dewi': {
        id: 'dewi',
        name: 'Dewi Lestari',
        role: 'Therapist',
        specialties: ['Swedish', 'Hot Stone'],
        experience: '5 years',
        description: "Dewi's gentle approach focuses on soothing the nervous system and melting away stress using customized aromatherapy and hot stone techniques.",
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOfHRSxF7gO4ZMGWydi-40kKfg1gL4Y_-Xz8bg5YOyx_LSEkF_YNrKWzjpmp-jWQiM-tEk1TOA-dX9FEOLMRlEenjjhIz34pmjziG6iNnMqcIUmYRaw_9QGEPOgJYvAChYgrUydIlTZMSQMQqi92VbsMiZLUTSDL5UG3YW2pYsK_3WGp4nLcWrw2vAMj0Ym-oGMytaCLwwJJGGqP5ySgcmTwYAfCMBqq8-Xml_EXoIvEido8IrpObQWw'
    },
    'no-preference': {
        id: 'no-preference',
        name: 'No Preference',
        role: 'Any Available',
        specialties: [],
        experience: 'N/A',
        description: 'Let us assign the best available therapist for your selected time and service to ensure a seamless reservation.',
        image: ''
    }
};

// 2. GLOBAL APPLICATION STATE
const DEFAULT_STATE = {
    walletBalance: 250.00,
    selectedTopUpAmount: 100,
    activePackages: {
        'aromatherapy-bundle': 2,
        'radiance-bundle': 4
    },
    // Stores the total sessions bought for each package (used for progress bar)
    packageTotalSessions: {
        'aromatherapy-bundle': 10,
        'radiance-bundle': 10
    },
    // Stores which therapist was chosen at purchase time, per package
    packageTherapists: {
        'aromatherapy-bundle': null,
        'radiance-bundle': null
    },
    // When true, confirmation should deduct a package session (not charge wallet)
    packageBookingMode: null, // bundleId or null
    transactions: [
        { date: 'Oct 24, 2023', description: 'Wallet Top Up', amount: 100.00, status: 'Completed' },
        { date: 'Oct 15, 2023', description: 'Deep Tissue Massage Payment', amount: -120.00, status: 'Completed' },
        { date: 'Oct 02, 2023', description: 'Signature Facial Payment', amount: -85.00, status: 'Completed' },
        { date: 'Sep 28, 2023', description: 'Referral Bonus Credit', amount: 25.00, status: 'Completed' }
    ],
    booking: {
        service: null,
        therapist: null,
        date: null,
        time: null
    },
    guestInfo: {
        name: 'Eleanor Vance',
        email: 'eleanor.v@example.com',
        phone: '+65 9123 4567',
        specialRequests: 'Please ensure the massage room is slightly warm, and avoid using lavender oils due to a mild allergy. Thank you.'
    },
    bookings: [
        {
            id: 'booking-1',
            serviceName: 'Healing Stone Therapy',
            serviceType: 'signature',
            date: 'Thursday, Oct 24, 2026',
            time: '02:00 PM',
            therapist: 'Sari',
            location: 'Serenity Orchard Wing',
            price: 180,
            status: 'Upcoming'
        },
        {
            id: 'booking-2',
            serviceName: 'Aromatherapy Massage',
            serviceType: 'massage',
            date: 'Wednesday, Oct 15, 2025',
            time: '10:00 AM',
            therapist: 'Sari',
            location: 'Serenity Orchard Wing',
            price: 120,
            status: 'Completed'
        },
        {
            id: 'booking-3',
            serviceName: 'Signature Facial',
            serviceType: 'facial',
            date: 'Monday, Oct 02, 2025',
            time: '03:30 PM',
            therapist: 'Dewi',
            location: 'Serenity Orchard Wing',
            price: 85,
            status: 'Completed'
        }
    ],
    notifications: [
        { id: 'notif-1', date: 'Oct 24, 2026', text: 'Appointment Confirmed: Your Healing Stone Therapy with Sari on Thursday, Oct 24 has been confirmed.' },
        { id: 'notif-2', date: 'Oct 24, 2025', text: 'Wallet Top-up: Successful top-up of MYR 100.00 to your digital wallet.' },
        { id: 'notif-3', date: 'Sep 28, 2025', text: 'Welcome to Serenity & Soul: Find your inner balance with our exclusive services.' }
    ],
    notificationPreferences: {
        email: true,
        sms: true,
        push: false
    },
    privacySettings: {
        twoFactor: false,
        dataSharing: true
    },
    savedCards: [
        { id: 'card-1', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 'card-2', brand: 'Mastercard', last4: '8888', expiry: '09/25', isDefault: false }
    ],
    pkgBooking: null,
    currentView: 'home',
    serviceCategory: 'all',
    homeServiceCategory: 'all'
};

let state = { ...DEFAULT_STATE };

function loadState() {
    const saved = localStorage.getItem('serenity_soul_spa_state');
    if (saved) {
        try {
            state = JSON.parse(saved);
            // Ensure runtime booking info is reset on reload to avoid invalid wizard states
            state.booking = {
                service: null,
                therapist: null,
                date: null,
                time: null
            };
            state.packageBookingMode = null;
        } catch (e) {
            console.error("Failed to load state from localStorage", e);
            state = { ...DEFAULT_STATE };
        }
    } else {
        state = { ...DEFAULT_STATE };
    }
}

function saveState() {
    localStorage.setItem('serenity_soul_spa_state', JSON.stringify(state));
}

// Load initial state
loadState();

// ── AUTH HELPERS ────────────────────────────────────────────
// Read auth from localStorage (persisted across sessions)
function isLoggedIn() {
    return localStorage.getItem('user_logged_in') === 'true';
}

// Show the login modal; after success, run callback
window.requireLogin = function (callback) {
    if (isLoggedIn()) {
        if (callback) callback();
        return;
    }
    // Store the pending action
    window._loginCallback = callback || null;
    const modal = document.getElementById('user-login-modal');
    if (modal) modal.style.display = 'flex';
    // Hide mobile bottom nav while login modal is open
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
};

// Close the login modal and restore bottom nav if needed
window.closeLoginModal = function() {
    const modal = document.getElementById('user-login-modal');
    if (modal) modal.style.display = 'none';
    // Restore bottom nav bar if on a booking step
    const _nav = document.getElementById('mobile-bottom-nav');
    if (_nav) {
        const bookingViews = ['select-service', 'select-therapist', 'select-time'];
        _nav.style.display = bookingViews.includes(state.currentView) ? 'flex' : 'none';
    }
};

// Called by login modal on successful login
window.onLoginSuccess = function () {
    const modal = document.getElementById('user-login-modal');
    if (modal) modal.style.display = 'none';
    updateNavbarAuth();
    // Restore bottom nav bar if on a booking step
    const _nav = document.getElementById('mobile-bottom-nav');
    if (_nav) {
        const bookingViews = ['select-service', 'select-therapist', 'select-time'];
        _nav.style.display = bookingViews.includes(state.currentView) ? 'flex' : 'none';
    }
    if (window._loginCallback) {
        const cb = window._loginCallback;
        window._loginCallback = null;
        cb();
    }
};

// Logout user
window.userSignOut = function () {
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    state.currentView = 'home';
    updateNavbarAuth();
    navigateTo('home');
};

// Update navbar person icon tooltip / appearance
function updateNavbarAuth() {
    const loggedIn = isLoggedIn();
    const name = localStorage.getItem('user_name') || '';
    const avatar = document.getElementById('nav-user-btn');
    if (avatar) {
        if (loggedIn) {
            avatar.setAttribute('title', name ? `Hi, ${name}` : 'My Account');
            avatar.style.background = 'rgba(80,97,63,0.15)';
        } else {
            avatar.setAttribute('title', 'Login / Register');
            avatar.style.background = '';
        }
    }
    // Refresh wallet balance text
    updateHeaderWalletDisplay();
    // Refresh active packages widget on home
    renderActivePackagesWidget();
}

// 3. CORE ROUTING & VIEW CONTROLLER
function navigateTo(viewId) {
    state.currentView = viewId;

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.add('hidden');
    });

    // Show target section
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update Stepper state (for steps 1-4)
    updateStepperUI(viewId);

    // Update dynamic elements
    renderActiveViewContents(viewId);

    // Update active state of navbar menu items
    updateNavbarActiveState(viewId);

    // Mobile bottom nav bar: always visible on booking steps 1-3
    const _mobileNav = document.getElementById('mobile-bottom-nav');
    const _backBtn   = document.getElementById('mobile-back-btn');
    const _contBtn   = document.getElementById('mobile-continue-btn');
    if (_mobileNav && _backBtn && _contBtn) {
        if (viewId === 'select-service') {
            _mobileNav.style.display = 'flex';
            _backBtn.onclick = () => resetBookingFlow();
            _contBtn.onclick = () => window.nextStep(1);
        } else if (viewId === 'select-therapist') {
            _mobileNav.style.display = 'flex';
            _backBtn.onclick = () => navigateTo('select-service');
            _contBtn.onclick = () => window.nextStep(2);
        } else if (viewId === 'select-time') {
            _mobileNav.style.display = 'flex';
            _backBtn.onclick = () => navigateTo('select-therapist');
            _contBtn.onclick = () => window.nextStep(3);
        } else {
            _mobileNav.style.display = 'none';
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    saveState();
}
window.navigateTo = navigateTo;

window.navigateToAllServicesWithFilter = function (filterId) {
    state.activeCategoryFilter = filterId;
    state.searchQuery = '';
    navigateTo('all-services');
};

function updateNavbarActiveState(viewId) {
    const homeLinks = document.querySelectorAll('[onclick="resetBookingFlow()"]');
    const serviceLinks = document.querySelectorAll('[onclick="navigateTo(\'services-catalog\')"]');

    if (viewId === 'home') {
        homeLinks.forEach(link => {
            if (link.tagName === 'A') {
                link.className = 'text-sm font-semibold text-primary transition-colors duration-300 cursor-pointer';
            }
        });
        serviceLinks.forEach(link => {
            if (link.tagName === 'A') {
                link.className = 'text-sm font-semibold text-on-surface-variant/60 hover:text-primary transition-colors duration-300 cursor-pointer';
            }
        });
    } else if (['services-catalog', 'select-service', 'select-therapist', 'select-time', 'confirm-booking'].includes(viewId)) {
        homeLinks.forEach(link => {
            if (link.tagName === 'A') {
                link.className = 'text-sm font-semibold text-on-surface-variant/60 hover:text-primary transition-colors duration-300 cursor-pointer';
            }
        });
        serviceLinks.forEach(link => {
            if (link.tagName === 'A') {
                link.className = 'text-sm font-semibold text-primary transition-colors duration-300 cursor-pointer';
            }
        });
    }

    // Mobile bottom nav active highlight updates
    const tabs = {
        'home': 'mobile-tab-home',
        'services-catalog': 'mobile-tab-services',
        'all-services': 'mobile-tab-services',
        'select-service': 'mobile-tab-services',
        'select-therapist': 'mobile-tab-services',
        'select-time': 'mobile-tab-services',
        'confirm-booking': 'mobile-tab-services',
        'wallet': 'mobile-tab-wallet',
        'topup': 'mobile-tab-wallet',
        'profile': 'mobile-tab-profile',
        'reschedule': 'mobile-tab-profile',
        'book-package': 'mobile-tab-services'
    };
    
    document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.remove('text-[#50613f]', 'font-bold');
        btn.classList.add('text-slate-400');
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.classList.remove('filled');
    });
    
    const activeTabId = tabs[viewId];
    if (activeTabId) {
        const activeBtn = document.getElementById(activeTabId);
        if (activeBtn) {
            activeBtn.classList.remove('text-slate-400');
            activeBtn.classList.add('text-[#50613f]', 'font-bold');
            const icon = activeBtn.querySelector('.material-symbols-outlined');
            if (icon) icon.classList.add('filled');
        }
    }
}

function updateStepperUI(viewId) {
    // Clear all stepper containers first
    ['stepper-select-service', 'stepper-select-therapist', 'stepper-select-time', 'stepper-confirm-booking'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    let activeStep = 0;
    let containerId = '';
    if (viewId === 'select-service') { activeStep = 1; containerId = 'stepper-select-service'; }
    else if (viewId === 'select-therapist') { activeStep = 2; containerId = 'stepper-select-therapist'; }
    else if (viewId === 'select-time') { activeStep = 3; containerId = 'stepper-select-time'; }
    else if (viewId === 'confirm-booking') { activeStep = 4; containerId = 'stepper-confirm-booking'; }

    if (!containerId) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    let progressWidth = 0;
    if (activeStep === 2) progressWidth = 33.3;
    else if (activeStep === 3) progressWidth = 66.6;
    else if (activeStep === 4) progressWidth = 100;

    container.innerHTML = `
        <div class="relative flex items-center justify-between w-full max-w-sm mx-auto mb-10 mt-4">
            <!-- Connecting Line Background -->
            <div class="absolute left-0 right-0 top-4 h-[2px] bg-slate-200/80 z-0"></div>
            <!-- Connecting Line Active Progress -->
            <div class="absolute left-0 top-4 h-[2px] bg-[#50613f] z-0 transition-all duration-500" style="width: ${progressWidth}%"></div>
            
            <!-- Step 1 -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 1 ? 'bg-[#50613f] text-white border-2 border-[#50613f]' : 'bg-slate-200 text-slate-500 border-2 border-transparent'}">
                    ${activeStep > 1 ? '<span class="material-symbols-outlined text-[16px] font-bold">check</span>' : '1'}
                </div>
                <span class="text-[10px] font-bold mt-2 ${activeStep >= 1 ? 'text-[#50613f]' : 'text-slate-400'} uppercase tracking-wider">Service</span>
            </div>
            
            <!-- Step 2 -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 2 ? 'bg-[#50613f] text-white border-2 border-[#50613f]' : 'bg-slate-200 text-slate-500 border-2 border-transparent'}">
                    ${activeStep > 2 ? '<span class="material-symbols-outlined text-[16px] font-bold">check</span>' : '2'}
                </div>
                <span class="text-[10px] font-bold mt-2 ${activeStep >= 2 ? 'text-[#50613f]' : 'text-slate-400'} uppercase tracking-wider">Therapist</span>
            </div>
            
            <!-- Step 3 -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 3 ? 'bg-[#50613f] text-white border-2 border-[#50613f]' : 'bg-slate-200 text-slate-500 border-2 border-transparent'}">
                    ${activeStep > 3 ? '<span class="material-symbols-outlined text-[16px] font-bold">check</span>' : '3'}
                </div>
                <span class="text-[10px] font-bold mt-2 ${activeStep >= 3 ? 'text-[#50613f]' : 'text-slate-400'} uppercase tracking-wider">Time</span>
            </div>
            
            <!-- Step 4 -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 4 ? 'bg-[#50613f] text-white border-2 border-[#50613f]' : 'bg-slate-200 text-slate-500 border-2 border-transparent'}">
                    4
                </div>
                <span class="text-[10px] font-bold mt-2 ${activeStep >= 4 ? 'text-[#50613f]' : 'text-slate-400'} uppercase tracking-wider">Confirm</span>
            </div>
        </div>
    `;
}

// 4. RENDERERS
function renderActiveViewContents(viewId) {
    // Selalu perbarui header wallet di setiap navigasi
    updateHeaderWalletDisplay();

    if (viewId === 'home') {
        renderHomeView();
    } else if (viewId === 'services-catalog') {
        renderServicesCatalogView();
    } else if (viewId === 'select-service') {
        renderSelectServiceView();
    } else if (viewId === 'select-therapist') {
        renderSelectTherapistView();
    } else if (viewId === 'select-time') {
        renderSelectTimeView();
    } else if (viewId === 'confirm-booking') {
        renderConfirmBookingView();
    } else if (viewId === 'success') {
        renderSuccessView();
    } else if (viewId === 'profile') {
        renderProfileView();
    } else if (viewId === 'wallet') {
        renderWalletView();
    } else if (viewId === 'topup') {
        renderTopupView();
    } else if (viewId === 'personal-details') {
        renderPersonalDetailsView();
    } else if (viewId === 'booking-history') {
        renderBookingHistoryView();
    } else if (viewId === 'notifications') {
        renderNotificationsView();
    } else if (viewId === 'privacy-security') {
        renderPrivacySecurityView();
    } else if (viewId === 'all-services') {
        renderAllServicesView();
    } else if (viewId === 'book-package') {
        renderBookPackageView();
    } else if (viewId === 'active-packages') {
        renderActivePackagesView();
    } else if (viewId === 'reschedule') {
        renderRescheduleView();
    }
}

// Update Wallet Balance & Packages in Nav Header
function updateHeaderWalletDisplay() {
    const balances = document.querySelectorAll('.wallet-balance-text');
    const loggedIn = isLoggedIn();
    balances.forEach(bal => {
        if (loggedIn) {
            bal.textContent = `MYR ${state.walletBalance.toFixed(2)}`;
        } else {
            bal.textContent = `MYR 0.00`;
        }
    });

    const walletPills = document.querySelectorAll('.wallet-nav-pill');
    const hideWallet = ['home', 'services-catalog', 'all-services', 'faq', 'how-to-use', 'legal'].includes(state.currentView);
    walletPills.forEach(pill => {
        if (hideWallet) {
            pill.classList.add('hidden');
        } else {
            pill.classList.remove('hidden');
        }
    });
}

// RENDER: HOME VIEW (REBUILT TO MATCH SCREENSHOT DESIGN)
function renderHomeView() {
    const container = document.getElementById('home-dynamic-content');
    if (!container) return;

    // Sync from localStorage state first
    syncServices();

    const featured = Object.values(SERVICES).filter(s => s.showOnHome);
    featured.sort((a, b) => (b.bestValue ? 1 : 0) - (a.bestValue ? 1 : 0));
    const slicedFeatured = featured.slice(0, 5);

    let gridHtml = '';
    if (slicedFeatured.length === 0) {
        gridHtml = `
            <div class="col-span-12 text-center py-12 bg-white rounded-3xl border border-outline-variant/30">
                <span class="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">spa</span>
                <p class="text-sm text-on-surface-variant">No featured services selected. Please feature some services from the admin panel.</p>
            </div>
        `;
    } else {
        const patterns = [
            { cols: 'md:col-span-12', isLarge: true },
            { cols: 'md:col-span-8', isLarge: false },
            { cols: 'md:col-span-4', isLarge: false, isSmall: true },
            { cols: 'md:col-span-4', isLarge: false, isSmall: true },
            { cols: 'md:col-span-8', isLarge: false }
        ];

        gridHtml = slicedFeatured.map((s, idx) => {
            const pattern = patterns[idx % patterns.length];
            const isLarge = pattern.isLarge;
            const isSmall = pattern.isSmall;
            const isPackage = s.type === 'packages';
            const badgeLabel = isPackage ? 'Bundle' : (s.type || 'Service').toUpperCase();

            // Calculate saving percent and badge html
            const discountPercent = (s.regularPrice && s.regularPrice > s.price) ? Math.round(((s.regularPrice - s.price) / s.regularPrice) * 100) : 0;
            const discountBadgeHtml = discountPercent > 0 ? `<div class="absolute top-4 left-4 bg-[#EAB308] text-white px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">SAVE ${discountPercent}%</div>` : '';

            if (isLarge) {
                // md:col-span-12
                return `
                    <div class="md:col-span-12 min-h-[320px] bg-white shadow-sm group rounded-3xl overflow-hidden flex flex-col md:flex-row border border-outline-variant/30 relative flex-shrink-0 w-[85vw] sm:w-[360px] md:w-auto">
                        ${s.bestValue ? `<div class="absolute top-4 right-4 bg-[#FACC15] text-[#241a00] px-3.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm z-10">Best Value</div>` : ''}
                        ${discountBadgeHtml}
                        <div class="w-full md:w-[320px] h-56 md:h-auto shrink-0 p-6 flex">
                            <img class="w-full h-full object-cover rounded-2xl" src="${s.image}" alt="${s.name}">
                        </div>
                        <div class="flex-grow p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                <div class="flex gap-2 mb-3">
                                    <span class="px-3 py-1 bg-surface-variant/50 text-on-surface-variant text-[11px] font-semibold rounded-full">${badgeLabel}</span>
                                    ${isPackage ? '<span class="px-3 py-1 bg-surface-variant/50 text-on-surface-variant text-[11px] font-semibold rounded-full">Package Deal</span>' : ''}
                                </div>
                                <h3 class="font-title-md text-xl mb-2 font-bold font-serif text-[#3c4c2b]">${s.name}</h3>
                                <p class="text-body-sm text-xs text-on-surface-variant line-clamp-3 leading-relaxed">${s.description}</p>
                            </div>
                            <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                                <div>
                                    ${s.regularPrice && s.regularPrice > s.price ? `<span class="text-on-surface-variant/60 text-[11px] block line-through decoration-red-500">MYR ${s.regularPrice.toFixed(2)} (Regular)</span>` : ''}
                                    <span class="font-serif text-2xl text-[#1e293b] font-bold">MYR ${s.price}</span>
                                </div>
                                <button onclick="startBookingWithService('${s.id}')" class="${s.bestValue ? 'bg-[#FACC15] hover:bg-[#eab308] text-[#241a00]' : 'bg-[#50613f] hover:bg-[#3e4b30] text-white'} px-6 py-2.5 rounded-full font-bold transition-all text-xs flex items-center gap-1.5 shadow-sm">
                                    ${isPackage ? 'Book Package' : 'Book Service'} <span class="material-symbols-outlined text-sm ml-1">calendar_month</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (isSmall) {
                // md:col-span-4
                return `
                    <div class="md:col-span-4 bg-white shadow-sm group rounded-3xl overflow-hidden flex flex-col border border-outline-variant/30 p-4 animate-fade-in relative flex-shrink-0 w-[85vw] sm:w-[360px] md:w-auto">
                        ${s.bestValue ? `<div class="absolute top-4 right-4 bg-[#FACC15] text-[#241a00] px-3.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">Best Value</div>` : ''}
                        ${discountBadgeHtml}
                        <div class="w-full h-56 md:h-[180px] rounded-2xl overflow-hidden mb-4 shrink-0">
                            <img class="w-full h-full object-cover" src="${s.image}" alt="${s.name}">
                        </div>
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <div class="mb-1">
                                    <span class="px-3 py-1 bg-surface-variant/50 text-on-surface-variant text-[11px] font-semibold rounded-full">${badgeLabel}</span>
                                </div>
                                <h3 class="font-title-md text-sm font-bold font-serif text-[#3c4c2b] mb-1 line-clamp-1 leading-snug">${s.name}</h3>
                                <p class="text-body-sm text-[11px] text-on-surface-variant line-clamp-3 leading-relaxed">${s.description}</p>
                            </div>
                            <div class="flex justify-between items-center mt-auto pt-3 border-t border-outline-variant/10">
                                <div class="flex flex-col">
                                    ${s.regularPrice && s.regularPrice > s.price ? `<span class="text-on-surface-variant/50 text-[10px] line-through decoration-red-500">MYR ${s.regularPrice.toFixed(2)}</span>` : ''}
                                    <span class="font-serif text-sm text-[#1e293b] font-bold">MYR ${s.price}</span>
                                </div>
                                <button onclick="startBookingWithService('${s.id}')" class="${s.bestValue ? 'bg-[#FACC15] hover:bg-[#eab308] text-[#241a00]' : 'bg-[#50613f] hover:bg-[#3e4b30] text-white'} px-3 py-1.5 rounded-full font-bold text-[10px] shadow-sm transition-all whitespace-nowrap">
                                    ${isPackage ? 'Book Package' : 'Book Service'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // md:col-span-8
                const imgFirst = (idx % 4 === 1);
                const imgOrderClass = imgFirst ? 'order-1' : 'order-1 md:order-2';
                const contentOrderClass = imgFirst ? 'order-2' : 'order-2 md:order-1';
                const imgHtml = `
                    <div class="w-full md:w-[250px] h-56 md:h-auto shrink-0 p-5 flex ${imgOrderClass}">
                        <img class="w-full h-full object-cover rounded-2xl" src="${s.image}" alt="${s.name}">
                    </div>
                `;
                const contentHtml = `
                    <div class="flex-grow p-6 flex flex-col justify-between ${contentOrderClass}">
                        <div>
                            <div class="mb-2">
                                <span class="px-3 py-1 bg-surface-variant/50 text-on-surface-variant text-[11px] font-semibold rounded-full">${badgeLabel}</span>
                            </div>
                            <h3 class="font-title-md text-base font-bold font-serif text-[#3c4c2b] mb-2">${s.name}</h3>
                            <p class="text-body-sm text-xs text-on-surface-variant line-clamp-3 leading-relaxed">${s.description}</p>
                        </div>
                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                            <div class="flex flex-col">
                                ${s.regularPrice && s.regularPrice > s.price ? `<span class="text-on-surface-variant/50 text-[10px] line-through decoration-red-500">MYR ${s.regularPrice.toFixed(2)}</span>` : ''}
                                <span class="font-serif text-base text-[#1e293b] font-bold">MYR ${s.price}</span>
                            </div>
                            <button onclick="startBookingWithService('${s.id}')" class="${s.bestValue ? 'bg-[#FACC15] hover:bg-[#eab308] text-[#241a00]' : 'bg-[#50613f] hover:bg-[#3e4b30] text-white'} px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all">
                                ${isPackage ? 'Book Package' : 'Book Service'}
                            </button>
                        </div>
                    </div>
                `;

                return `
                    <div class="md:col-span-8 bg-white shadow-sm group rounded-3xl overflow-hidden flex flex-col md:flex-row border border-outline-variant/30 relative flex-shrink-0 w-[85vw] sm:w-[360px] md:w-auto">
                        ${s.bestValue ? `<div class="absolute top-4 right-4 bg-[#FACC15] text-[#241a00] px-3.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">Best Value</div>` : ''}
                        ${discountBadgeHtml}
                        ${imgHtml}
                        ${contentHtml}
                    </div>
                `;
            }
        }).join('');
    }

    container.innerHTML = `
        <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12">
            <!-- Section Title -->
            <div class="text-center mb-10 animate-fade-in">
                <h2 class="font-headline-lg text-3xl md:text-4xl text-[#3c4c2b] mb-3 font-bold font-serif">Service Catalog</h2>
                <p class="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">Choose from our range of holistic treatments, tailored to rejuvenate your mind and body.</p>
            </div>

            <!-- Bento Grid Container (Flex scroll on mobile, Grid on desktop) -->
            <div class="flex overflow-x-auto pb-4 gap-6 hide-scrollbar md:grid md:grid-cols-12 md:overflow-visible">
                ${gridHtml}
            </div>
        </div>
    `;

    // Render active packages if owned
    renderActivePackagesWidget();
}

function renderServicesCatalogView() {
    const container = document.getElementById('services-catalog-container');
    if (!container) return;

    syncServices();

    container.innerHTML = `
        <!-- Hero Section with Main Headline -->
        <div class="relative w-full min-h-[400px] flex items-center justify-center bg-[#FAF9F6]">
            <!-- Background Image with Fade/Overlay -->
            <div class="absolute inset-0 w-full h-full opacity-15">
                <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&h=700&q=80" alt="Spa Background">
            </div>
            
            <div class="relative max-w-2xl text-center z-10 px-6 py-12 flex flex-col items-center">
                <span class="font-serif text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase block mb-3 animate-fade-in">THE ART OF WELLBEING</span>
                <h1 class="font-serif text-3xl md:text-5xl text-[#1E293B] font-bold leading-tight mb-4 animate-fade-in">Nurture Your Soul with Our Curated Rituals</h1>
                <p class="text-xs md:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6 animate-fade-in">Explore a sanctuary of peace through our bespoke treatments designed to restore balance and radiance.</p>
                <button onclick="navigateTo('all-services')" class="bg-primary hover:bg-[#3e4b30] text-white px-8 py-3 rounded-full font-bold text-xs shadow-sm hover:shadow-lg transition-all flex items-center gap-2 animate-fade-in">
                    See All Services & Packages <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
            </div>
        </div>

        <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop py-16 flex flex-col gap-16">
            
            <!-- Section 1: Featured Packages -->
            <div>
                <div class="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                    <div>
                        <h2 class="font-serif text-2xl font-bold text-[#1E293B] mb-1">Featured Packages</h2>
                        <p class="text-xs text-slate-500">Multi-session bundles for transformative results</p>
                    </div>
                    <a onclick="navigateToAllServicesWithFilter('packages')" class="text-xs font-bold text-[#B45309] hover:underline cursor-pointer flex items-center gap-1">
                        See All <span class="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                    </a>
                </div>

                <!-- Grid 2 Columns (Flex scroll on mobile, Grid on desktop) -->
                <div class="flex overflow-x-auto pb-4 gap-6 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
                    ${(() => {
                        const p1 = SERVICES['radiance-bundle'];
                        if (!p1) return '';
                        const discountPercent = (p1.regularPrice && p1.regularPrice > p1.price) ? Math.round(((p1.regularPrice - p1.price) / p1.regularPrice) * 100) : 0;
                        const discountBadgeHtml = discountPercent > 0 ? `<div class="absolute top-4 left-4 bg-[#EAB308] text-white px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">SAVE ${discountPercent}%</div>` : '';
                        return `
                            <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row relative flex-shrink-0 w-[85vw] sm:w-[450px] md:w-auto">
                                <div class="w-full sm:w-5/12 h-48 sm:h-auto relative shrink-0">
                                    ${discountBadgeHtml}
                                    <img class="w-full h-full object-cover" src="${p1.image}" alt="${p1.name}">
                                </div>
                                <div class="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 class="font-serif text-lg font-bold text-[#1E293B] mb-2">${p1.name}</h3>
                                        <p class="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">${p1.description}</p>
                                        
                                        <div class="flex flex-wrap gap-4 text-slate-500 mb-6">
                                            <div class="flex items-center gap-1.5 text-[11px]">
                                                <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                                                <span>60m / session</span>
                                            </div>
                                            <div class="flex items-center gap-1.5 text-[11px]">
                                                <span class="material-symbols-outlined text-[16px] text-slate-400">layers</span>
                                                <span>10 Sessions</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-4">
                                        <div class="flex flex-col">
                                            ${p1.regularPrice && p1.regularPrice > p1.price ? `<span class="text-[10px] text-slate-400 line-through decoration-red-500">MYR ${p1.regularPrice.toFixed(2)}</span>` : '<span class="text-[10px] text-slate-400 uppercase tracking-wider">Total Value</span>'}
                                            <span class="font-serif font-bold text-[#1E293B] text-lg">MYR ${p1.price}</span>
                                        </div>
                                        <button onclick="startBookingWithService('radiance-bundle')" class="bg-[#FACC15] hover:bg-[#eab308] text-[#241a00] font-bold text-xs px-6 py-2.5 rounded-full transition-all">Book Package</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    })()}

                    ${(() => {
                        const p2 = SERVICES['aromatherapy-bundle'];
                        if (!p2) return '';
                        const discountPercent = (p2.regularPrice && p2.regularPrice > p2.price) ? Math.round(((p2.regularPrice - p2.price) / p2.regularPrice) * 100) : 0;
                        const discountBadgeHtml = discountPercent > 0 ? `<div class="absolute top-4 left-4 bg-[#EAB308] text-white px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">SAVE ${discountPercent}%</div>` : '';
                        return `
                            <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row relative flex-shrink-0 w-[85vw] sm:w-[450px] md:w-auto">
                                <div class="w-full sm:w-5/12 h-48 sm:h-auto relative shrink-0">
                                    ${discountBadgeHtml}
                                    <img class="w-full h-full object-cover" src="${p2.image}" alt="${p2.name}">
                                </div>
                                <div class="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 class="font-serif text-lg font-bold text-[#1E293B] mb-2">${p2.name}</h3>
                                        <p class="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">${p2.description}</p>
                                        
                                        <div class="flex flex-wrap gap-4 text-slate-500 mb-6">
                                            <div class="flex items-center gap-1.5 text-[11px]">
                                                <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                                                <span>60m / session</span>
                                            </div>
                                            <div class="flex items-center gap-1.5 text-[11px]">
                                                <span class="material-symbols-outlined text-[16px] text-slate-400">layers</span>
                                                <span>10 Sessions</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-4">
                                        <div class="flex flex-col">
                                            ${p2.regularPrice && p2.regularPrice > p2.price ? `<span class="text-[10px] text-slate-400 line-through decoration-red-500">MYR ${p2.regularPrice.toFixed(2)}</span>` : '<span class="text-[10px] text-slate-400 uppercase tracking-wider">Total Value</span>'}
                                            <span class="font-serif font-bold text-[#1E293B] text-lg">MYR ${p2.price}</span>
                                        </div>
                                        <button onclick="startBookingWithService('aromatherapy-bundle')" class="bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all">Book Package</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    })()}
                </div>
            </div>

            <!-- Section 2: Signature Treatments -->
            <div>
                <div class="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                    <div>
                        <h2 class="font-serif text-2xl font-bold text-[#1E293B] mb-1">Signature Treatments</h2>
                        <p class="text-xs text-slate-500">Our most sought-after experiences, crafted with precision and intention.</p>
                    </div>
                    <a onclick="navigateToAllServicesWithFilter('massage')" class="text-xs font-bold text-[#B45309] hover:underline cursor-pointer flex items-center gap-1">
                        See All <span class="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                    </a>
                </div>

                <!-- Grid 3 Columns (Flex scroll on mobile, Grid on desktop) -->
                <div class="flex overflow-x-auto pb-4 gap-6 hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
                    <!-- Treatment 1: Hot Stone Therapy -->
                    <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between flex-shrink-0 w-[85vw] sm:w-[320px] md:w-auto">
                        <div class="w-full h-56 shrink-0 overflow-hidden relative">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&h=260&q=80" alt="Hot Stone Therapy">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <span class="font-serif text-[10px] font-bold text-[#50613f] uppercase tracking-wider block mb-2">RESTORATIVE</span>
                                <h3 class="font-serif text-base font-bold text-[#1E293B] mb-2">Hot Stone Therapy</h3>
                                <p class="text-xs text-slate-500 leading-relaxed mb-6">Basalt stones are heated and placed on key energy points to melt away tension and restore flow.</p>
                            </div>
                            
                            <div class="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                        <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                                        <span class="text-[11px] font-semibold">90 Minutes</span>
                                    </div>
                                    <span class="text-xs font-bold text-[#1E293B]">MYR 165</span>
                                </div>
                                <button onclick="startBookingWithService('hot-stone')" class="bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap">
                                    Book Service
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Treatment 2: Deep Tissue Ritual -->
                    <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between flex-shrink-0 w-[85vw] sm:w-[320px] md:w-auto">
                        <div class="w-full h-56 shrink-0 overflow-hidden relative">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&h=260&q=80" alt="Deep Tissue Ritual">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <span class="font-serif text-[10px] font-bold text-[#50613f] uppercase tracking-wider block mb-2">THERAPEUTIC</span>
                                <h3 class="font-serif text-base font-bold text-[#1E293B] mb-2">Deep Tissue Ritual</h3>
                                <p class="text-xs text-slate-500 leading-relaxed mb-6">Targeted pressure designed to release chronic muscle patterns and alleviate deep-seated stress.</p>
                            </div>
                            
                            <div class="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                        <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                                        <span class="text-[11px] font-semibold">90 Minutes</span>
                                    </div>
                                    <span class="text-xs font-bold text-[#1E293B]">MYR 150</span>
                                </div>
                                <button onclick="startBookingWithService('deep-tissue')" class="bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap">
                                    Book Service
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Treatment 3: Signature Soul Massage -->
                    <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between flex-shrink-0 w-[85vw] sm:w-[320px] md:w-auto">
                        <div class="w-full h-56 shrink-0 overflow-hidden relative">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=260&q=80" alt="Signature Soul Massage">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <span class="font-serif text-[10px] font-bold text-[#50613f] uppercase tracking-wider block mb-2">BESPOKE</span>
                                <h3 class="font-serif text-base font-bold text-[#1E293B] mb-2">Signature Soul Massage</h3>
                                <p class="text-xs text-slate-500 leading-relaxed mb-6">A personalized fusion of Swedish, Shiatsu, and Reflexology techniques tailored to your body's...</p>
                            </div>
                            
                            <div class="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                        <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                                        <span class="text-[11px] font-semibold">120 Minutes</span>
                                    </div>
                                    <span class="text-xs font-bold text-[#1E293B]">MYR 190</span>
                                </div>
                                <button onclick="startBookingWithService('signature-soul')" class="bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap">
                                    Book Service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: Facial & Body Care -->
            <div class="hidden">
                <div class="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                    <div>
                        <h2 class="font-serif text-2xl font-bold text-[#1E293B] mb-1">Facial & Body Care</h2>
                        <p class="text-xs text-slate-500">Pure botanicals and organic care products</p>
                    </div>
                    <a onclick="navigateToAllServicesWithFilter('facial')" class="text-xs font-bold text-[#B45309] hover:underline cursor-pointer flex items-center gap-1">
                        See All <span class="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                    </a>
                </div>

                <!-- Grid 4 Columns -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <!-- Product 1 -->
                    <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between p-4">
                        <div class="w-full h-36 overflow-hidden rounded-xl mb-4 shrink-0">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=260&h=200&q=80" alt="Illuminating Peel">
                        </div>
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <h4 class="font-serif font-bold text-sm text-[#1E293B] mb-1">Illuminating Peel</h4>
                                <p class="text-[11px] text-slate-500 leading-relaxed mb-4">Fruit enzymes to brighten and smooth dull skin.</p>
                            </div>
                            
                            <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                                <span class="font-serif text-sm font-bold text-[#1E293B]">MYR 95.00</span>
                                <a onclick="showNotification('Illuminating Peel added to cart!', 'success'); return false;" class="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer">Add to Cart</a>
                            </div>
                        </div>
                    </div>

                    <!-- Product 2 -->
                    <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between p-4">
                        <div class="w-full h-36 overflow-hidden rounded-xl mb-4 shrink-0">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=260&h=200&q=80" alt="Sea Salt Glow">
                        </div>
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <h4 class="font-serif font-bold text-sm text-[#1E293B] mb-1">Sea Salt Glow</h4>
                                <p class="text-[11px] text-slate-500 leading-relaxed mb-4">Exfoliating ritual for silky smooth skin.</p>
                            </div>
                            
                            <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                                <span class="font-serif text-sm font-bold text-[#1E293B]">MYR 110.00</span>
                                <a onclick="showNotification('Sea Salt Glow added to cart!', 'success'); return false;" class="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer">Add to Cart</a>
                            </div>
                        </div>
                    </div>

                    <!-- Product 3 -->
                    <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between p-4">
                        <div class="w-full h-36 overflow-hidden rounded-xl mb-4 shrink-0">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=260&h=200&q=80" alt="Herbal Detox Wrap">
                        </div>
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <h4 class="font-serif font-bold text-sm text-[#1E293B] mb-1">Herbal Detox Wrap</h4>
                                <p class="text-[11px] text-slate-500 leading-relaxed mb-4">Warm wrap infused with mountain herbs.</p>
                            </div>
                            
                            <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                                <span class="font-serif text-sm font-bold text-[#1E293B]">MYR 150.00</span>
                                <a onclick="showNotification('Herbal Detox Wrap added to cart!', 'success'); return false;" class="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer">Add to Cart</a>
                            </div>
                        </div>
                    </div>

                    <!-- Product 4 -->
                    <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between p-4">
                        <div class="w-full h-36 overflow-hidden rounded-xl mb-4 shrink-0">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=260&h=200&q=80" alt="Pure Hydration">
                        </div>
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <h4 class="font-serif font-bold text-sm text-[#1E293B] mb-1">Pure Hydration</h4>
                                <p class="text-[11px] text-slate-500 leading-relaxed mb-4">Moisture-locking facial with hyaluronic acid.</p>
                            </div>
                            
                            <div class="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                                <span class="font-serif text-sm font-bold text-[#1E293B]">MYR 120.00</span>
                                <a onclick="showNotification('Pure Hydration added to cart!', 'success'); return false;" class="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

function renderActivePackagesWidget() {
    const widget = document.getElementById('owned-packages-widget');
    if (!widget) return;

    if (!isLoggedIn()) {
        widget.innerHTML = '';
        widget.classList.add('hidden');
        return;
    }

    const ownedKeys = Object.keys(state.activePackages).filter(k => state.activePackages[k] > 0);
    if (ownedKeys.length === 0) {
        widget.innerHTML = '';
        widget.classList.add('hidden');
        return;
    }

    widget.classList.remove('hidden');
    let html = `
        <div class="glass-panel rounded-2xl p-6 border border-primary/20 bg-primary-fixed/10 mb-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h4 class="font-title-md text-primary font-bold flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-primary">stars</span> Your Active Packages
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    ownedKeys.forEach(key => {
        const bundle = SERVICES[key];
        const remaining = state.activePackages[key];
        html += `
            <div class="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-outline-variant/30">
                <div>
                    <p class="font-semibold text-on-surface">${bundle.name}</p>
                    <p class="text-xs text-on-surface-variant">Remaining quota: ${remaining} of ${bundle.sessions} sessions</p>
                </div>
                <button onclick="bookPackageSession('${key}')" class="bg-primary text-white text-xs px-4 py-2 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors">
                    Use Package
                </button>
            </div>
        `;
    });

    html += `</div></div>`;
    widget.innerHTML = html;
}

// Purchase Bundle logic
window.purchaseBundle = function (bundleId) {
    const bundle = SERVICES[bundleId];
    if (!bundle) return;

    if (state.walletBalance < bundle.price) {
        showNotification(`Insufficient Serenity Wallet balance to purchase ${bundle.name}. Redirecting to Top Up...`, 'error');
        setTimeout(() => {
            navigateTo('topup');
        }, 1500);
        return;
    }

    state.walletBalance -= bundle.price;
    // Track sessions
    const prevSessions = state.activePackages[bundleId] || 0;
    state.activePackages[bundleId] = prevSessions + bundle.sessions;
    state.packageTotalSessions[bundleId] = (state.packageTotalSessions[bundleId] || 0) + bundle.sessions;
    // Store the therapist that was selected at booking time
    if (state.booking.therapist) {
        state.packageTherapists[bundleId] = state.booking.therapist;
    }

    updateHeaderWalletDisplay();
    renderActivePackagesWidget();
    saveState();
    showNotification(`Success purchasing ${bundle.name}! ${bundle.sessions} sessions added to your active packages.`, 'success');
};

// Book a session from an active package (routes to dedicated book-package view)
window.bookPackageSession = function (bundleId) {
    const bundle = SERVICES[bundleId];
    const sessionsLeft = state.activePackages[bundleId] || 0;
    if (!bundle) return;
    if (sessionsLeft <= 0) {
        showNotification('All sessions for this package have been used.', 'error');
        return;
    }

    // Set package booking state context
    state.pkgBooking = {
        bundleId: bundleId,
        date: null,
        time: null,
        monthOffset: 0
    };

    saveState();
    navigateTo('book-package');
};

// Start Booking flow from Homepage/Service
window.startBookingWithService = function (serviceId) {
    if (serviceId) {
        const service = SERVICES[serviceId];
        if (service) {
            state.booking.service = service;
            state.serviceCategory = service.type;
        }
    } else {
        state.booking.service = null;
        state.serviceCategory = 'all';
    }
    navigateTo('select-service');
};

// RENDER: STEP 1: SELECT SERVICE VIEW
function renderSelectServiceView() {
    const container = document.getElementById('services-list-container');
    if (!container) return;

    syncServices();

    // Filter services based on selected category tab
    const category = state.serviceCategory;

    // Sync tab button styles
    document.querySelectorAll('.cat-tab-btn').forEach(btn => {
        btn.className = 'cat-tab-btn px-5 py-2 rounded-full font-title-md text-xs whitespace-nowrap bg-surface-variant text-on-surface-variant hover:bg-surface-container-high transition-colors';
    });
    const activeBtn = document.getElementById(`cat-tab-${category}`);
    if (activeBtn) {
        activeBtn.className = 'cat-tab-btn px-5 py-2 rounded-full font-title-md text-xs whitespace-nowrap bg-primary/10 text-primary font-semibold border border-primary/20';
    }

    const servicesToRender = Object.values(SERVICES).filter(srv => {
        if (category === 'all') return true;
        if (category === 'packages') return srv.type === 'packages';
        return srv.type === category;
    });
    // Sort so bestValue is at the top of the list
    servicesToRender.sort((a, b) => (b.bestValue ? 1 : 0) - (a.bestValue ? 1 : 0));

    let html = '';
    servicesToRender.forEach(srv => {
        const isSelected = state.booking.service && state.booking.service.id === srv.id;
        const isPackageDeal = srv.badge === 'PACKAGE DEAL';

        html += `
            <div class="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300 relative overflow-hidden ${isSelected ? 'ring-2 ring-primary border-transparent' : 'border border-outline-variant/30 hover:border-primary/50'}">
                ${srv.bestValue ? `<div class="absolute top-0 right-0 bg-[#EAB308] text-white px-4 py-1 rounded-bl-lg font-label-caps text-[9px] font-bold uppercase tracking-wider z-10">BEST VALUE</div>` : (srv.regularPrice && srv.regularPrice > srv.price) ? `<div class="absolute top-0 right-0 bg-[#EAB308] text-white px-4 py-1 rounded-bl-lg font-label-caps text-[9px] font-bold uppercase tracking-wider z-10">SAVE ${Math.round(((srv.regularPrice - srv.price)/srv.regularPrice)*100)}%</div>` : isPackageDeal ? `<div class="absolute top-0 right-0 bg-[#EAB308] text-white px-4 py-1 rounded-bl-lg font-label-caps text-[9px] font-bold uppercase tracking-wider z-10">PACKAGE DEAL</div>` : ''}
                
                <div class="w-full md:w-44 h-28 rounded-lg overflow-hidden flex-shrink-0 relative">
                    ${isSelected ? `
                        <div class="absolute inset-0 bg-[#50613f]/15 z-10 flex items-center justify-center backdrop-blur-[1px]">
                            <div class="w-8 h-8 rounded-full bg-[#50613f] text-white flex items-center justify-center">
                                <span class="material-symbols-outlined text-[20px]">check</span>
                            </div>
                        </div>
                    ` : ''}
                    <img class="w-full h-full object-cover" src="${srv.image}" alt="${srv.name}">
                </div>
                
                <div class="flex-grow flex flex-col gap-1.5 pt-2 md:pt-0">
                    <div class="flex justify-between items-start flex-wrap gap-2">
                        <h3 class="font-title-md text-base text-on-surface font-semibold">${srv.name}</h3>
                        ${srv.regularPrice && srv.regularPrice > srv.price ? `
                            <div class="flex flex-col items-end whitespace-nowrap">
                                <span class="text-[10px] text-on-surface-variant/50 line-through decoration-red-500">MYR ${srv.regularPrice.toFixed(2)}</span>
                                <span class="font-title-md text-base text-[#1E293B] font-bold">MYR ${srv.price}</span>
                                <span class="text-[9px] font-bold text-[#b45309] bg-[#b45309]/10 px-1.5 py-0.5 rounded-md mt-0.5">SAVE MYR ${Math.round(srv.regularPrice - srv.price)}</span>
                            </div>
                        ` : `
                            <span class="font-title-md text-base text-[#1E293B] font-bold whitespace-nowrap">From MYR ${srv.price}</span>
                        `}
                    </div>
                    <p class="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${srv.description}</p>
                    <div class="flex items-center gap-2 text-outline mt-2 text-xs">
                        <span class="material-symbols-outlined text-base">schedule</span>
                        <span class="font-body-sm">${srv.duration}</span>
                    </div>
                </div>
                
                <button onclick="selectService('${srv.id}')" class="w-full md:w-auto px-6 py-2 rounded-lg font-semibold text-xs transition-all flex-shrink-0 mt-4 md:mt-0 ${isSelected ? 'bg-transparent border border-primary text-primary hover:bg-primary/5' : 'bg-primary text-white hover:bg-primary-container hover:text-on-primary-container'}">
                    ${isSelected ? 'Selected' : 'Select'}
                </button>
            </div>
        `;
    });

    container.innerHTML = html;

    // Update Sidebar
    renderSidebarSummary();
}

window.filterServiceCategory = function (category) {
    state.serviceCategory = category;
    renderSelectServiceView();
};

window.selectService = function (serviceId) {
    const srv = SERVICES[serviceId];
    if (!srv) return;

    state.booking.service = srv;
    renderSelectServiceView();
};

// RENDER: STEP 2: SELECT THERAPIST VIEW
function renderSelectTherapistView() {
    const container = document.getElementById('therapist-grid-container');
    if (!container) return;

    let html = '';
    Object.values(THERAPISTS).forEach(therapist => {
        const isSelected = state.booking.therapist && state.booking.therapist.id === therapist.id;

        const imageHtml = therapist.id === 'no-preference' ? `
            <div class="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/30">
                <span class="material-symbols-outlined text-[#50613f] text-3xl">spa</span>
            </div>
        ` : `
            <div class="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 ${isSelected ? 'border-primary' : 'border-primary/10'}">
                <img class="w-full h-full object-cover" src="${therapist.image}" alt="${therapist.name}">
            </div>
        `;

        html += `
            <div onclick="selectTherapist('${therapist.id}')" class="glass-card rounded-xl p-6 relative overflow-hidden transition-all duration-300 group cursor-pointer ${isSelected ? 'ring-2 ring-primary border-transparent' : 'border border-outline-variant/30 hover:border-primary/50'}">
                ${isSelected ? `
                    <div class="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <span class="material-symbols-outlined text-[16px]">check</span>
                    </div>
                ` : ''}
                
                <div class="flex items-start gap-4 mb-4">
                    ${imageHtml}
                    <div>
                        <h3 class="font-title-md text-title-md text-on-surface font-semibold mb-0.5">${therapist.name}</h3>
                        <p class="font-body-sm text-body-sm text-secondary font-semibold mb-2">${therapist.role}</p>
                        <div class="flex flex-wrap gap-2">
                            ${therapist.specialties.map(spec => `<span class="px-2.5 py-0.5 bg-primary/10 text-primary font-label-caps text-[9px] rounded-full uppercase">${spec}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-4">${therapist.description}</p>
                
                <button class="w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors shadow-sm ${isSelected ? 'bg-primary text-white' : 'bg-transparent border border-outline text-on-surface group-hover:bg-primary/5'}">
                    ${isSelected ? 'Selected' : 'Select'}
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    renderSidebarSummary();
}

window.selectTherapist = function (therapistId) {
    const therapist = THERAPISTS[therapistId];
    if (!therapist) return;

    state.booking.therapist = therapist;
    renderSelectTherapistView();
};

// RENDER: STEP 3: SELECT DATE & TIME VIEW
let currentMonth = new Date(new Date().getFullYear(), new Date().getMonth()); // Current month and year
let selectedDateObj = null;

function renderSelectTimeView() {
    if (!selectedDateObj) {
        selectedDateObj = new Date(); // Today
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        state.booking.date = selectedDateObj.toLocaleDateString('en-US', options);
    }
    if (!state.booking.time) {
        state.booking.time = '11:00 AM';
    }
    renderCalendar();
    renderTimeSlots();
    renderSidebarSummary();
}

function renderCalendar() {
    const calendarMonthText = document.getElementById('calendar-month-text');
    const calendarGrid = document.getElementById('calendar-days-grid');
    if (!calendarMonthText || !calendarGrid) return;

    calendarMonthText.textContent = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Dynamic offset calculations
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDayOfWeek = firstDay.getDay(); // 0 is Sun, 1 is Mon, etc.
    let html = '';
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div></div>';
    }

    // Dynamic total days calculation
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const tempDate = new Date(year, month + 1, 0);
    const daysInMonth = tempDate.getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0, 0, 0, 0);

        const isDisabled = cellDate < today;
        const isSelected = selectedDateObj && selectedDateObj.getDate() === day && selectedDateObj.getMonth() === month && selectedDateObj.getFullYear() === year;

        html += `
            <button ${isDisabled ? 'disabled' : ''} onclick="selectDate(${day})" class="h-10 w-10 mx-auto rounded-full font-body-sm text-body-sm flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-transparent ${isSelected ? 'bg-primary text-white shadow-md font-bold' : 'text-on-surface hover:bg-surface-container-high'}">
                ${day}
            </button>
        `;
    }

    calendarGrid.innerHTML = html;
}

window.prevMonth = function () {
    const todayBase = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Current base month
    const targetMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (targetMonth < todayBase) {
        showNotification('Cannot select past months.', 'info');
        return;
    }
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
};

window.nextMonth = function () {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
};

window.selectDate = function (day) {
    selectedDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    state.booking.date = selectedDateObj.toLocaleDateString('en-US', options);

    renderCalendar();
    renderSidebarSummary();
};

function renderTimeSlots() {
    const morningSlotsContainer = document.getElementById('morning-slots-container');
    const afternoonSlotsContainer = document.getElementById('afternoon-slots-container');
    if (!morningSlotsContainer || !afternoonSlotsContainer) return;

    const morningSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
    const afternoonSlots = ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

    let morningHtml = '';
    morningSlots.forEach(time => {
        const isSelected = state.booking.time === time;
        const isOccupied = time === '12:00 PM'; // simulasi slot penuh

        morningHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectTime('${time}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-primary bg-primary/10 text-primary font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-primary hover:bg-primary/5'}">
                ${time.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });
    morningSlotsContainer.innerHTML = morningHtml;

    let afternoonHtml = '';
    afternoonSlots.forEach(time => {
        const isSelected = state.booking.time === time;
        const isOccupied = time === '03:00 PM'; // simulasi slot penuh

        afternoonHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectTime('${time}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-primary bg-primary/10 text-primary font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-primary hover:bg-primary/5'}">
                ${time.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });
    afternoonSlotsContainer.innerHTML = afternoonHtml;
}

window.selectTime = function (time) {
    state.booking.time = time;
    renderTimeSlots();
    renderSidebarSummary();
};

// RENDER: STEP 4: CONFIRM BOOKING VIEW
let isEditingGuest = false;

function renderConfirmBookingView() {
    renderGuestInfoCard();
    renderPaymentMethodSelection();
    renderSidebarSummary();
}

function renderGuestInfoCard() {
    const container = document.getElementById('confirm-guest-container');
    if (!container) return;

    if (isEditingGuest) {
        container.innerHTML = `
            <div class="flex items-center justify-between mb-6 border-b border-surface-variant pb-4">
                <h2 class="font-title-md text-base text-[#1E293B] flex items-center gap-2 font-semibold">
                    <span class="material-symbols-outlined text-[#50613f]">person</span> Guest Information
                </h2>
                <button onclick="saveGuestInfo()" class="text-[#50613f] hover:text-[#3e4b30] transition-colors font-label-caps text-xs font-semibold underline">Save</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-label-caps text-on-surface-variant mb-1 font-semibold">Full Name</label>
                    <input id="edit-guest-name" type="text" class="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-primary focus:border-primary" value="${state.guestInfo.name}">
                </div>
                <div>
                    <label class="block text-xs font-label-caps text-on-surface-variant mb-1 font-semibold">Email Address</label>
                    <input id="edit-guest-email" type="email" class="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-primary focus:border-primary" value="${state.guestInfo.email}">
                </div>
                <div>
                    <label class="block text-xs font-label-caps text-on-surface-variant mb-1 font-semibold">Phone Number</label>
                    <input id="edit-guest-phone" type="text" class="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-primary focus:border-primary" value="${state.guestInfo.phone}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-xs font-label-caps text-on-surface-variant mb-1 font-semibold">Special Requests</label>
                    <textarea id="edit-guest-requests" rows="3" class="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-primary focus:border-primary">${state.guestInfo.specialRequests}</textarea>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="flex items-center justify-between mb-6 border-b border-surface-variant pb-4">
                <h2 class="font-title-md text-base text-[#1E293B] flex items-center gap-2 font-semibold">
                    <span class="material-symbols-outlined text-[#50613f]">person</span> Guest Information
                </h2>
                <button onclick="toggleEditGuest(true)" class="text-[#50613f] hover:text-[#3e4b30] transition-colors font-label-caps text-xs font-semibold underline">Edit</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p class="font-label-caps text-[10px] text-on-surface-variant mb-1 font-semibold uppercase tracking-wider">Full Name</p>
                    <p class="font-body-lg text-sm text-on-surface">${state.guestInfo.name}</p>
                </div>
                <div>
                    <p class="font-label-caps text-[10px] text-on-surface-variant mb-1 font-semibold uppercase tracking-wider">Email Address</p>
                    <p class="font-body-lg text-sm text-on-surface">${state.guestInfo.email}</p>
                </div>
                <div>
                    <p class="font-label-caps text-[10px] text-on-surface-variant mb-1 font-semibold uppercase tracking-wider">Phone Number</p>
                    <p class="font-body-lg text-sm text-on-surface">${state.guestInfo.phone}</p>
                </div>
            </div>
            <div class="mt-6 pt-6 border-t border-surface-variant">
                <p class="font-label-caps text-[10px] text-on-surface-variant mb-2 font-semibold uppercase tracking-wider">Special Requests</p>
                <div class="bg-surface-container-lowest/50 rounded-lg p-4 border border-outline-variant/30">
                    <p class="font-body-sm text-xs text-on-surface italic">"${state.guestInfo.specialRequests || 'No special requests.'}"</p>
                </div>
            </div>
        `;
    }
}

window.toggleEditGuest = function (editing) {
    isEditingGuest = editing;
    renderGuestInfoCard();
};

window.saveGuestInfo = function () {
    const name = document.getElementById('edit-guest-name').value;
    const email = document.getElementById('edit-guest-email').value;
    const phone = document.getElementById('edit-guest-phone').value;
    const specialRequests = document.getElementById('edit-guest-requests').value;

    state.guestInfo = { name, email, phone, specialRequests };
    isEditingGuest = false;
    renderGuestInfoCard();
    showNotification('Guest information successfully updated.', 'success');
};

let selectedPaymentMethod = 'wallet'; // default payment method

function renderPaymentMethodSelection() {
    const container = document.getElementById('payment-methods-container');
    if (!container) return;

    const methods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'credit_card' },
        { id: 'paynow', name: 'PayNow', icon: 'qr_code_scanner' },
        { id: 'wallet', name: 'Serenity Wallet', icon: 'account_balance_wallet', showBalance: true }
    ];

    let html = '';
    methods.forEach(method => {
        const isSelected = selectedPaymentMethod === method.id;

        html += `
            <label onclick="selectPaymentMethod('${method.id}')" class="flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors relative ${isSelected ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant hover:bg-surface-container-low'}">
                <div class="flex items-center gap-3">
                    <input name="payment_method" type="radio" class="text-primary focus:ring-primary w-4 h-4 border-outline" ${isSelected ? 'checked' : ''}>
                    <span class="font-body-lg text-sm text-on-surface ${isSelected ? 'font-semibold' : ''}">${method.name}</span>
                </div>
                <div class="flex items-center gap-2">
                    ${method.showBalance ? `<span class="font-body-sm text-xs text-on-surface-variant">(Balance: MYR ${state.walletBalance.toFixed(2)})</span>` : ''}
                    <span class="material-symbols-outlined ${isSelected ? 'text-primary' : 'text-on-surface-variant'}">${method.icon}</span>
                </div>
            </label>
        `;
    });

    container.innerHTML = html;
}

window.selectPaymentMethod = function (methodId) {
    selectedPaymentMethod = methodId;
    renderPaymentMethodSelection();
    renderSidebarSummary(); // recalculate price breakdown if bundle could be applied
};

// 5. SIDEBAR SUMMARY BUILDER
function renderSidebarSummary() {
    let targetId = 'booking-sidebar-summary';
    if (state.currentView === 'select-therapist') targetId = 'booking-sidebar-summary-therapist';
    else if (state.currentView === 'select-time') targetId = 'booking-sidebar-summary-time';
    else if (state.currentView === 'confirm-booking') targetId = 'booking-sidebar-summary-confirm';

    const sidebar = document.getElementById(targetId);
    if (!sidebar) return;

    const service = state.booking.service;
    const therapist = state.booking.therapist;
    const date = state.booking.date;
    const time = state.booking.time;

    let matchingBundleKey = null;
    let hasAvailablePackage = false;

    if (service) {
        if (service.type === 'massage' && state.activePackages['aromatherapy-bundle'] > 0) {
            matchingBundleKey = 'aromatherapy-bundle';
            hasAvailablePackage = true;
        } else if (service.type === 'facial' && state.activePackages['radiance-bundle'] > 0) {
            matchingBundleKey = 'radiance-bundle';
            hasAvailablePackage = true;
        }
    }

    const applyPackage = hasAvailablePackage && selectedPaymentMethod === 'wallet' && state.currentView === 'confirm-booking';

    let subtotal = service ? service.price : 0;
    let tax = subtotal * 0.07;
    let total = subtotal + tax;

    if (applyPackage) {
        subtotal = 0;
        tax = 0;
        total = 0;
    }

    let html = `
        <h2 class="font-headline-lg text-lg text-[#1E293B] border-b border-surface-variant pb-4 font-bold mb-6">Booking Summary</h2>
        <div class="flex flex-col gap-5">
            <!-- Service Info -->
            <div class="flex gap-3 items-start">
                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                    <span class="material-symbols-outlined text-lg">spa</span>
                </div>
                <div>
                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">SERVICE</span>
                    ${service ? `
                        <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${service.name}</h3>
                        <p class="font-body-sm text-[11px] text-on-surface-variant">${service.duration || ''} • MYR ${service.price}</p>
                    ` : `
                        <h3 class="font-title-md text-xs font-semibold text-on-surface-variant"><span class="italic text-on-surface-variant opacity-60 text-xs">To be selected</span></h3>
                    `}
                </div>
            </div>
            
            <!-- Therapist Info -->
            <div class="flex gap-3 items-start">
                <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                    ${therapist && therapist.image ? `
                        <img class="w-full h-full object-cover" src="${therapist.image}">
                    ` : `
                        <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center text-primary shrink-0">
                            <span class="material-symbols-outlined text-lg">person</span>
                        </div>
                    `}
                </div>
                <div>
                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">THERAPIST</span>
                    ${therapist ? `
                        <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${therapist.name}</h3>
                        <p class="font-body-sm text-[11px] text-on-surface-variant">${therapist.role || ''}</p>
                    ` : `
                        <h3 class="font-title-md text-xs font-semibold text-on-surface-variant"><span class="italic text-on-surface-variant opacity-60 text-xs">To be selected</span></h3>
                    `}
                </div>
            </div>
            
            <!-- Schedule Info -->
            <div class="flex gap-3 items-start">
                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                    <span class="material-symbols-outlined text-lg">calendar_month</span>
                </div>
                <div>
                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">DATE & TIME</span>
                    ${date ? `
                        <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${date}</h3>
                        <p class="font-body-sm text-[11px] text-[#50613f] font-bold">${time || 'To be selected'}</p>
                    ` : `
                        <h3 class="font-title-md text-xs font-semibold text-on-surface-variant"><span class="italic text-on-surface-variant opacity-60 text-xs">To be selected</span></h3>
                    `}
                </div>
            </div>
        </div>
    `;

    if (state.currentView === 'confirm-booking' && applyPackage) {
        const remaining = state.activePackages[matchingBundleKey];
        html += `
            <div class="mt-6 bg-[#50613f]/10 rounded-lg p-4 border border-[#50613f]/25 flex items-start gap-3">
                <span class="material-symbols-outlined text-[#50613f] mt-0.5">stars</span>
                <div class="font-body-sm text-[11px] text-on-surface">
                    <span class="font-bold block mb-0.5 text-[#50613f]">Package Applied</span>
                    1 Session deducted from your Aromatherapy Package (Remaining: ${remaining}/10).
                </div>
            </div>
        `;
    }

    // Price breakdown
    const isServiceSelected = !!service;
    const isConfirmOrTime = state.currentView === 'confirm-booking' || state.currentView === 'select-time';

    html += `
        <div class="mt-6 pt-6 border-t border-surface-variant">
            <div class="flex justify-between items-center mb-2 text-on-surface-variant text-xs">
                <span>Subtotal</span>
                <span class="${applyPackage ? 'line-through opacity-50' : ''}">MYR ${isServiceSelected ? service.price.toFixed(2) : '0.00'}</span>
            </div>
            <div class="flex justify-between items-center mb-3 text-on-surface-variant text-xs">
                <span>Tax (7%)</span>
                <span class="${applyPackage ? 'line-through opacity-50' : ''}">MYR ${(isServiceSelected ? (service.price * 0.07) : 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                <span class="font-semibold text-xs text-on-surface">${isConfirmOrTime ? 'Total' : 'Estimated Total'}</span>
                <span class="font-serif text-base text-[#1E293B] font-bold">MYR ${total === 0 && applyPackage ? '0.00' : total.toFixed(2)}</span>
            </div>
        </div>
    `;

    // Append Stepper Actions directly below Summary Booking in the sidebar
    if (state.currentView === 'select-service') {
        html += `
            <div class="hidden md:flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/30 gap-3">
                <button onclick="resetBookingFlow()" class="px-5 py-2 rounded-lg border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold flex items-center gap-1.5 transition-all w-1/2 justify-center">
                    <span class="material-symbols-outlined text-xs">arrow_back</span> Back
                </button>
                <button onclick="nextStep(1)" class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-xs hover:shadow-lg transition-all flex items-center gap-1.5 w-1/2 justify-center">
                    Continue <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
            </div>
        `;
    } else if (state.currentView === 'select-therapist') {
        html += `
            <div class="hidden md:flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/30 gap-3">
                <button onclick="navigateTo('select-service')" class="px-5 py-2 rounded-lg border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold flex items-center gap-1.5 transition-all w-1/2 justify-center">
                    <span class="material-symbols-outlined text-xs">arrow_back</span> Back
                </button>
                <button onclick="nextStep(2)" class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-xs hover:shadow-lg transition-all flex items-center gap-1.5 w-1/2 justify-center">
                    Continue <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
            </div>
        `;
    } else if (state.currentView === 'select-time') {
        html += `
            <div class="hidden md:flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/30 gap-3">
                <button onclick="navigateTo('select-therapist')" class="px-5 py-2 rounded-lg border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold flex items-center gap-1.5 transition-all w-1/2 justify-center">
                    <span class="material-symbols-outlined text-xs">arrow_back</span> Back
                </button>
                <button onclick="nextStep(3)" class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-xs hover:shadow-lg transition-all flex items-center gap-1.5 w-1/2 justify-center">
                    Continue <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
            </div>
        `;
    } else if (state.currentView === 'confirm-booking') {
        html += `
            <div class="flex flex-col gap-3 mt-6 pt-6 border-t border-outline-variant/30">
                <button onclick="confirmReservation()" class="w-full py-3 rounded-xl bg-primary hover:bg-[#3e4b30] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                    Confirm Reservation <span class="material-symbols-outlined text-sm">check_circle</span>
                </button>
                <button onclick="prevStep(4)" class="w-full py-2.5 rounded-xl border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold transition-all text-center">
                    Back
                </button>
            </div>
        `;
    }

    sidebar.innerHTML = html;

    // Sync to mobile summary modal
    const modalContent = document.getElementById('mobile-summary-modal-content');
    if (modalContent) {
        modalContent.innerHTML = html;
    }

}

// RENDER: SUCCESS VIEW
function renderSuccessView() {
    const container = document.getElementById('success-details-card');
    if (!container) return;

    const service = state.booking.service;
    const therapist = state.booking.therapist;
    const date = state.booking.date;
    const time = state.booking.time;
    const resId = state.successResId || ('RES-' + Math.floor(1000 + Math.random() * 9000));
    // Clear temporary success reservation ID
    state.successResId = null;

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            <!-- Left Side Details -->
            <div class="md:col-span-7 space-y-5">
                <!-- Reservation ID -->
                <div class="flex items-center gap-3 pb-4 border-b border-outline-variant/30">
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">RESERVATION ID</span>
                        <span class="font-title-md text-base font-bold text-[#1E293B]">#${resId}</span>
                    </div>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
                    </span>
                </div>
                
                <!-- Service -->
                <div>
                    <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">SERVICE</span>
                    <h3 class="font-title-md text-sm font-bold text-[#1E293B]">${service ? service.name : ''}</h3>
                    <p class="font-body-sm text-xs text-on-surface-variant">${service ? service.duration : ''}</p>
                </div>
                
                <!-- Therapist & Date/Time Row -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">THERAPIST</span>
                        <div class="flex items-center gap-2 mt-1">
                            ${therapist && therapist.image ? `
                                <img class="w-6 h-6 rounded-full object-cover" src="${therapist.image}">
                            ` : `
                                <div class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center">
                                    <span class="material-symbols-outlined text-sm text-[#50613f]">spa</span>
                                </div>
                            `}
                            <span class="font-title-md text-xs font-semibold text-[#1E293B]">${therapist ? therapist.name : 'No Preference'}</span>
                        </div>
                    </div>
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">DATE & TIME</span>
                        <span class="font-title-md text-xs font-semibold text-[#1E293B] block mt-1">${date || ''}</span>
                        <p class="font-body-sm text-xs text-primary font-bold">${time || ''}</p>
                    </div>
                </div>
                
                <!-- Location -->
                <div class="pt-4 border-t border-outline-variant/30">
                    <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">LOCATION</span>
                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">Serenity &amp; Soul Sanctuary</h3>
                    <p class="font-body-sm text-xs text-on-surface-variant">12 Orchard Road, Singapore 238886</p>
                </div>
            </div>
            
            <!-- Right Side Actions & QR -->
            <div class="md:col-span-5 flex flex-col justify-center">
                <div class="flex flex-col items-center gap-4 bg-white/45 p-6 rounded-xl border border-outline-variant/30 w-full max-w-[240px] mx-auto md:ml-auto">
                    <div class="w-32 h-32 bg-[#1E293B] rounded-lg p-2 flex items-center justify-center shrink-0">
                        <!-- Simulated QR Code SVG -->
                        <svg class="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                            <!-- top left square -->
                            <rect x="0" y="0" width="25" height="25"/>
                            <rect x="5" y="5" width="15" height="15" fill="#1E293B"/>
                            <rect x="8" y="8" width="9" height="9" fill="white"/>
                            <!-- top right square -->
                            <rect x="75" y="0" width="25" height="25"/>
                            <rect x="80" y="5" width="15" height="15" fill="#1E293B"/>
                            <rect x="83" y="8" width="9" height="9" fill="white"/>
                            <!-- bottom left square -->
                            <rect x="0" y="75" width="25" height="25"/>
                            <rect x="5" y="80" width="15" height="15" fill="#1E293B"/>
                            <rect x="8" y="83" width="9" height="9" fill="white"/>
                            <!-- random block details -->
                            <rect x="35" y="5" width="10" height="25"/>
                            <rect x="55" y="10" width="15" height="10"/>
                            <rect x="35" y="40" width="25" height="10"/>
                            <rect x="10" y="35" width="15" height="15"/>
                            <rect x="35" y="60" width="45" height="10"/>
                            <rect x="35" y="80" width="15" height="15"/>
                            <rect x="60" y="80" width="20" height="10"/>
                            <rect x="70" y="35" width="15" height="20"/>
                        </svg>
                    </div>
                    <span class="font-body-sm text-[10px] text-on-surface-variant text-center">Scan at reception upon arrival</span>
                    
                    <button class="w-full py-2 bg-[#EAB308] hover:bg-[#ca9b00] text-white font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all">
                        <span class="material-symbols-outlined text-xs">calendar_today</span> Add to Calendar
                    </button>
                    
                    <button class="w-full py-2 bg-transparent border border-outline text-[#1E293B] hover:bg-[#1E293B]/5 font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all">
                        <span class="material-symbols-outlined text-xs">download</span> Download Ticket
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 6. ACTION BUTTON HANDLERS FOR THE STEPS
window.nextStep = function (currentStep) {
    if (currentStep === 1) {
        if (!state.booking.service) {
            showNotification('Please select a service first to proceed.', 'warning');
            return;
        }
        navigateTo('select-therapist');
    } else if (currentStep === 2) {
        if (!state.booking.therapist) {
            showNotification('Please select a therapist first to proceed.', 'warning');
            return;
        }
        navigateTo('select-time');
    } else if (currentStep === 3) {
        if (!state.booking.date || !state.booking.time) {
            showNotification('Please select a date and time first to proceed.', 'warning');
            return;
        }
        navigateTo('confirm-booking');
    }
};

window.prevStep = function (currentStep) {
    if (currentStep === 2) navigateTo('select-service');
    else if (currentStep === 3) navigateTo('select-therapist');
    else if (currentStep === 4) navigateTo('select-time');
};

window.confirmReservation = function () {
    const service = state.booking.service;
    if (!service) return;

    requireLogin(() => {
        // --- Package Session Mode: deduct 1 session, no payment needed ---
        if (state.packageBookingMode) {
            const bundleId = state.packageBookingMode;
            if ((state.activePackages[bundleId] || 0) <= 0) {
                showNotification('Semua sesi paket sudah habis.', 'error');
                return;
            }
            state.activePackages[bundleId]--;
            state.packageBookingMode = null; // clear mode after use

            const resId = 'RES-' + Math.floor(1000 + Math.random() * 9000);

            // Add to booking history
            state.bookings.unshift({
                id: 'booking-' + Date.now(),
                resId: resId,
                serviceName: service.name,
                serviceType: service.type,
                date: state.booking.date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
                time: state.booking.time || '11:00 AM',
                therapist: state.booking.therapist ? state.booking.therapist.name : 'Sari',
                location: 'Serenity & Soul Sanctuary, 12 Orchard Road, Singapore 238886',
                price: 0,
                status: 'Upcoming'
            });

            // Add notification
            state.notifications.unshift({
                id: 'notif-' + Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                text: `Appointment Confirmed: Your package session for ${service.name} has been booked.`
            });

            state.successResId = resId;

            showNotification(`Session successfully booked! 1 session deducted from your package.`, 'success');
            navigateTo('success');
            return;
        }

        // --- Standard Booking: check if we can apply active packages ---
        let matchingBundleKey = null;
        let hasAvailablePackage = false;

        if (service.type === 'massage' && state.activePackages['aromatherapy-bundle'] > 0) {
            matchingBundleKey = 'aromatherapy-bundle';
            hasAvailablePackage = true;
        } else if (service.type === 'facial' && state.activePackages['radiance-bundle'] > 0) {
            matchingBundleKey = 'radiance-bundle';
            hasAvailablePackage = true;
        }

        const applyPackage = hasAvailablePackage && selectedPaymentMethod === 'wallet';

        if (applyPackage) {
            state.activePackages[matchingBundleKey]--;

            const resId = 'RES-' + Math.floor(1000 + Math.random() * 9000);

            // Add to booking history
            state.bookings.unshift({
                id: 'booking-' + Date.now(),
                resId: resId,
                serviceName: service.name,
                serviceType: service.type,
                date: state.booking.date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
                time: state.booking.time || '11:00 AM',
                therapist: state.booking.therapist ? state.booking.therapist.name : 'Sari',
                location: 'Serenity & Soul Sanctuary, 12 Orchard Road, Singapore 238886',
                price: 0,
                status: 'Upcoming'
            });

            // Add notification
            state.notifications.unshift({
                id: 'notif-' + Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                text: `Appointment Confirmed: Your package session for ${service.name} has been booked.`
            });

            state.successResId = resId;

            showNotification(`Booking successfully confirmed! 1 session deducted from your package.`, 'success');
            navigateTo('success');
        } else {
            const subtotal = service.price;
            const tax = subtotal * 0.07;
            const total = subtotal + tax;

            if (selectedPaymentMethod === 'wallet') {
                if (state.walletBalance < total) {
                    showNotification(`Insufficient wallet balance (Total: MYR ${total.toFixed(2)}). Redirecting to Top Up...`, 'error');
                    setTimeout(() => {
                        navigateTo('topup');
                    }, 1500);
                    return;
                }
                state.walletBalance -= total;

                // Add wallet transaction log
                state.transactions.unshift({
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    description: `${service.name} Payment`,
                    amount: -total,
                    status: 'Completed'
                });
            }

            const resId = 'RES-' + Math.floor(1000 + Math.random() * 9000);

            // Add to booking history
            state.bookings.unshift({
                id: 'booking-' + Date.now(),
                resId: resId,
                serviceName: service.name,
                serviceType: service.type,
                date: state.booking.date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
                time: state.booking.time || '11:00 AM',
                therapist: state.booking.therapist ? state.booking.therapist.name : 'Sari',
                location: 'Serenity & Soul Sanctuary, 12 Orchard Road, Singapore 238886',
                price: total,
                status: 'Upcoming'
            });

            // Add notification
            state.notifications.unshift({
                id: 'notif-' + Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                text: `Appointment Confirmed: Your ${service.name} has been booked successfully.`
            });

            state.successResId = resId;
            navigateTo('success');

            showNotification('Your reservation has been saved successfully.', 'success');
        }

        navigateTo('success');
    });
};

window.resetBookingFlow = function () {
    // Reset booking state
    state.booking = {
        service: null,
        therapist: null,
        date: null,
        time: null
    };
    selectedDateObj = null;
    isEditingGuest = false;
    navigateTo('home');
};

// 7. TOAST NOTIFICATION UTILITY
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up text-white font-semibold text-sm transition-all duration-300`;

    if (type === 'success') {
        toast.className += ' bg-primary border border-primary-container';
    } else if (type === 'warning') {
        toast.className += ' bg-secondary border border-secondary-container text-on-secondary-fixed';
    } else {
        toast.className += ' bg-error border border-error-container';
    }

    const icon = type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'error';

    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <div class="flex-grow">${message}</div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// 8. PROFILE, WALLET, & TOPUP VIEWS
function renderProfileView() {
    const container = document.getElementById('profile-container');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-container-max mx-auto py-8">
            <!-- Welcome Banner Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center gap-6 mb-8">
                <div class="relative shrink-0">
                    <img class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#50613f]/10" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80" alt="${state.guestInfo.name}">
                    <button onclick="navigateTo('personal-details')" class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#B45309] text-white flex items-center justify-center border-2 border-white hover:bg-[#92400e] transition-colors shadow-sm">
                        <span class="material-symbols-outlined text-sm font-bold">edit</span>
                    </button>
                </div>
                <div class="text-center md:text-left">
                    <span class="font-label-caps text-[10px] md:text-xs text-[#B45309] uppercase tracking-wider font-semibold block mb-1">Welcome Back</span>
                    <h1 class="font-serif text-3xl md:text-4xl text-[#1E293B] font-bold mb-2">${state.guestInfo.name}</h1>
                    <p class="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-xl leading-relaxed">Your sanctuary awaits. Today is a perfect day to find your inner balance and restore your spirit.</p>
                </div>
            </div>
            
            <!-- Two Columns -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Left Column (Active Packages & Digital Wallet) -->
                <div class="lg:col-span-8 space-y-8">
                    <!-- My Active Packages -->
                    <div class="glass-panel rounded-3xl p-6 md:p-8">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="font-serif text-xl md:text-2xl text-[#1E293B] font-bold">My Active Packages</h2>
                            <button onclick="navigateTo('active-packages')" class="text-[#B45309] hover:text-[#92400e] font-semibold text-xs flex items-center gap-1 transition-colors">
                                View All <span class="material-symbols-outlined text-xs">arrow_forward</span>
                            </button>
                        </div>
                        
                        <!-- Packages Grid (Dynamic from state.activePackages) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="profile-packages-grid">
                            ${(function () {
            const pkgKeys = Object.keys(state.activePackages);
            if (pkgKeys.length === 0) {
                return `<p class="text-sm text-on-surface-variant col-span-2 text-center py-6">You have no active packages. Purchase a package to get started.</p>`;
            }
            const iconMap = { packages: 'package_2', massage: 'spa', facial: 'face', body: 'self_care', signature: 'star' };
            return pkgKeys.map(bundleId => {
                const bundle = SERVICES[bundleId];
                if (!bundle) return '';
                const sessionsLeft = state.activePackages[bundleId];
                const totalSessions = state.packageTotalSessions[bundleId] || bundle.sessions || 10;
                const pct = Math.round((sessionsLeft / totalSessions) * 100);
                const therapist = state.packageTherapists[bundleId];
                const isActive = sessionsLeft > 0;
                const statusBadge = isActive
                    ? `<span class="bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>`
                    : `<span class="bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Exhausted</span>`;
                const icon = iconMap[bundle.type] || 'spa';
                return `
                                        <div class="bg-white rounded-2xl p-5 border border-outline-variant/30 relative flex flex-col justify-between shadow-sm">
                                            <div>
                                                <div class="flex justify-between items-center mb-4">
                                                    <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center text-primary">
                                                        <span class="material-symbols-outlined text-lg">${icon}</span>
                                                    </div>
                                                    ${statusBadge}
                                                </div>
                                                <h3 class="font-serif text-base text-[#1E293B] font-bold mb-1">${bundle.name}</h3>
                                                <p class="font-body-sm text-xs text-on-surface-variant mb-3 line-clamp-2">${bundle.description}</p>
                                                ${therapist ? `
                                                <div class="flex items-center gap-2 bg-[#f0f4e8] rounded-lg px-3 py-2 mb-3">
                                                    <span class="material-symbols-outlined text-[#50613f] text-sm">person</span>
                                                    <span class="text-[11px] font-semibold text-[#3c4c2b]">Therapist: ${therapist.name}</span>
                                                </div>` : ''}
                                            </div>
                                            <div>
                                                <div class="flex justify-between text-[11px] text-on-surface-variant font-semibold mb-1">
                                                    <span>Sessions Remaining</span>
                                                    <span>${sessionsLeft} / ${totalSessions}</span>
                                                </div>
                                                <div class="w-full bg-[#F1F5F9] rounded-full h-1.5 mb-4 overflow-hidden">
                                                    <div class="bg-[#50613f] h-1.5 rounded-full transition-all" style="width: ${pct}%"></div>
                                                </div>
                                                ${isActive ? `
                                                <button onclick="bookPackageSession('${bundleId}')" class="w-full bg-[#FACC15] text-[#241a00] hover:bg-[#eab308] font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                                                    <span class="material-symbols-outlined text-sm">calendar_month</span> Book a Session
                                                </button>` : `
                                                <button disabled class="w-full bg-slate-100 text-slate-400 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                                                    <span class="material-symbols-outlined text-sm">block</span> All Sessions Used
                                                </button>`}
                                            </div>
                                        </div>
                                    `;
            }).join('');
        })()}
                        </div>
                    </div>
                    
                    <!-- Digital Wallet Card -->
                    <div class="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 shadow-sm">
                        <!-- Left Side -->
                        <div class="p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block mb-1">Digital Wallet</span>
                                <span class="text-xs text-on-surface-variant block mb-2">Available Balance</span>
                                <span class="font-serif text-3xl text-[#1E293B] font-bold block mb-6">MYR ${state.walletBalance.toFixed(2)}</span>
                            </div>
                            <div class="flex gap-3">
                                <button onclick="navigateTo('wallet')" class="bg-[#50613f] text-white hover:bg-[#3e4b30] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2">
                                    <span class="material-symbols-outlined text-sm">account_balance_wallet</span> Manage Wallet
                                </button>
                                <button onclick="navigateTo('wallet')" class="bg-white border border-outline text-[#50613f] hover:bg-[#50613f]/5 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1">
                                    History
                                </button>
                            </div>
                        </div>
                        <!-- Right Side (Green Banner Perk) -->
                        <div class="bg-[#50613f] p-8 text-white relative overflow-hidden flex flex-col justify-center min-h-[160px]">
                            <div class="absolute -right-4 -bottom-6 text-white/5 pointer-events-none select-none">
                                <span class="material-symbols-outlined text-[180px]">account_balance_wallet</span>
                            </div>
                            <div class="relative z-10">
                                <span class="font-label-caps text-[10px] text-[#FACC15] font-bold uppercase tracking-wider block mb-2">Membership Perk</span>
                                <h3 class="font-serif text-xl font-bold mb-1">You're earning 5% Soul Points on every top-up this month.</h3>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column (Account Settings & Next Appointment) -->
                <div class="lg:col-span-4 space-y-6">
                    <!-- Account Settings Card -->
                    <div class="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/30">
                        <h2 class="font-serif text-lg text-[#1E293B] font-bold mb-4 px-2">Account Settings</h2>
                        
                        <div class="flex flex-col">
                            <a href="#" onclick="navigateTo('personal-details'); return false;" class="flex justify-between items-center py-3.5 px-2 hover:bg-[#50613f]/5 rounded-xl transition-colors group">
                                <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">person</span>
                                    <span class="font-body-md text-xs font-semibold text-on-surface">Personal Details</span>
                                </div>
                                <span class="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                            </a>
                            <a href="#" onclick="navigateTo('booking-history'); return false;" class="flex justify-between items-center py-3.5 px-2 hover:bg-[#50613f]/5 rounded-xl transition-colors group">
                                <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">history</span>
                                    <span class="font-body-md text-xs font-semibold text-on-surface">Booking History</span>
                                </div>
                                <span class="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                            </a>
                            <a href="#" onclick="navigateTo('notifications'); return false;" class="flex justify-between items-center py-3.5 px-2 hover:bg-[#50613f]/5 rounded-xl transition-colors group">
                                <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">notifications</span>
                                    <span class="font-body-md text-xs font-semibold text-on-surface">Notifications</span>
                                </div>
                                <span class="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                            </a>
                            <a href="#" onclick="navigateTo('privacy-security'); return false;" class="flex justify-between items-center py-3.5 px-2 hover:bg-[#50613f]/5 rounded-xl transition-colors group">
                                <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">shield</span>
                                    <span class="font-body-md text-xs font-semibold text-on-surface">Privacy & Security</span>
                                </div>
                                <span class="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                            </a>
                        </div>
                        
                        <div class="border-t border-outline-variant/30 mt-4 pt-4 flex justify-center">
                            <button onclick="confirmSignOut()" class="text-red-500 hover:text-red-700 font-bold text-xs flex items-center gap-2 py-2 px-4 transition-colors">
                                <span class="material-symbols-outlined text-sm font-bold">logout</span> Sign Out
                            </button>
                        </div>
                    </div>
                    
                    <!-- Next Appointment Card -->
                    <div class="bg-[#F1F5F9]/60 rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
                        <div class="flex justify-between items-center mb-4">
                            <span class="font-label-caps text-[9px] text-[#B45309] font-bold uppercase tracking-wider">Next Appointment</span>
                            <span class="material-symbols-outlined text-on-surface-variant text-lg">schedule</span>
                        </div>
                        <h3 class="font-serif text-sm font-bold text-[#1E293B] mb-1">Healing Stone Therapy</h3>
                        <p class="font-body-sm text-[11px] text-on-surface-variant mb-2">Thursday, Oct 24 • 14:00 PM</p>
                        <div class="flex items-center gap-1.5 text-on-surface-variant text-[11px] mb-4">
                            <span class="material-symbols-outlined text-xs text-primary">location_on</span>
                            <span>Serenity Orchard Wing</span>
                        </div>
                        <button onclick="showNotification('Reschedule process initiated.', 'info')" class="text-[#B45309] hover:text-[#92400e] font-bold text-[11px] transition-colors">
                            Reschedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderWalletView() {
    const container = document.getElementById('wallet-container');
    if (!container) return;

    let txHtml = '';
    state.transactions.forEach(tx => {
        const isPositive = tx.amount > 0;
        const amountText = (isPositive ? '+ ' : '- ') + 'MYR ' + Math.abs(tx.amount).toFixed(2);
        const amountClass = isPositive ? 'text-green-600 font-bold' : 'text-[#1E293B] font-semibold';

        let iconHtml = '';
        if (tx.description.toLowerCase().includes('top up')) {
            iconHtml = `<div class="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-base">add</span></div>`;
        } else if (tx.description.toLowerCase().includes('facial')) {
            iconHtml = `<div class="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-base">face</span></div>`;
        } else if (tx.description.toLowerCase().includes('massage')) {
            iconHtml = `<div class="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-base">spa</span></div>`;
        } else {
            iconHtml = `<div class="w-8 h-8 rounded-full bg-amber-50 text-[#B45309] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-base">stars</span></div>`;
        }

        txHtml += `
            <tr class="border-b border-outline-variant/30 hover:bg-slate-50/50 transition-colors">
                <td class="py-4 text-xs font-semibold text-on-surface-variant">${tx.date}</td>
                <td class="py-4">
                    <div class="flex items-center gap-3">
                        ${iconHtml}
                        <span class="font-body-md text-xs font-bold text-[#1E293B]">${tx.description}</span>
                    </div>
                </td>
                <td class="py-4">
                    <span class="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Completed</span>
                </td>
                <td class="py-4 text-right ${amountClass}">${amountText}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="max-w-container-max mx-auto py-8">
            <!-- Header Title -->
            <div class="mb-8">
                <h1 class="font-serif text-3xl text-[#1E293B] font-bold mb-1">Wallet & Transactions</h1>
                <p class="font-body-sm text-xs text-on-surface-variant">Manage your Serenity & Soul spa credits and view payment history.</p>
            </div>
            
            <!-- Cards Grid (Left: Balance, Right: Quick Recharge) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                <!-- Available Balance Card -->
                <div class="md:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 flex flex-col justify-center gap-6">
                    <div>
                        <span class="font-label-caps text-[10px] text-outline font-bold uppercase tracking-wider block mb-1">Available Balance</span>
                        <span class="font-serif text-4xl text-[#1E293B] font-bold block mt-2">MYR ${state.walletBalance.toFixed(2)}</span>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="navigateToTopUp(100)" class="w-full md:w-auto bg-[#50613f] text-white hover:bg-[#3e4b30] font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-base">add_circle</span> Top Up Now
                        </button>
                        <button onclick="openPaymentMethodsModal()" class="hidden bg-white border border-outline text-[#50613f] hover:bg-[#50613f]/5 font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2">
                            <span class="material-symbols-outlined text-base">credit_card</span> Payment Methods
                        </button>
                    </div>
                </div>
                
                <!-- Quick Recharge Card -->
                <div class="md:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="material-symbols-outlined text-[#B45309] text-lg">bolt</span>
                            <h2 class="font-serif text-lg text-[#1E293B] font-bold">Quick Recharge</h2>
                        </div>
                        <p class="font-body-sm text-xs text-on-surface-variant mb-6">Select a preset amount to instantly add to your wellness wallet.</p>
                    </div>
                    
                    <!-- Presets Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="navigateToTopUp(50)" class="bg-white hover:bg-slate-50 border border-outline-variant/60 rounded-xl p-4 flex flex-col items-center justify-center transition-all group hover:border-[#50613f] hover:text-[#50613f]">
                            <span class="font-serif text-base font-bold text-[#1E293B]">MYR 50</span>
                        </button>
                        <button onclick="navigateToTopUp(100)" class="bg-white hover:bg-slate-50 border border-outline-variant/60 rounded-xl p-4 flex flex-col items-center justify-center transition-all group hover:border-[#50613f] hover:text-[#50613f] relative overflow-visible">
                            <div class="absolute -top-2.5 bg-[#B45309] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</div>
                            <span class="font-serif text-base font-bold text-[#1E293B]">MYR 100</span>
                        </button>
                        <button onclick="navigateToTopUp(200)" class="bg-white hover:bg-slate-50 border border-outline-variant/60 rounded-xl p-4 flex flex-col items-center justify-center transition-all group hover:border-[#50613f] hover:text-[#50613f]">
                            <span class="font-serif text-base font-bold text-[#1E293B]">MYR 200</span>
                            <span class="text-[9px] text-[#2e7d32] font-semibold mt-0.5">+ MYR 10 Bonus</span>
                        </button>
                        <button onclick="navigateToTopUp('custom')" class="bg-white hover:bg-slate-50 border border-outline-variant/60 rounded-xl p-4 flex flex-col items-center justify-center transition-all group hover:border-[#50613f] hover:text-[#50613f]">
                            <span class="font-serif text-base font-bold text-[#1E293B] flex items-center gap-1">Custom <span class="material-symbols-outlined text-xs">edit</span></span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Recent Transactions Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-on-surface-variant text-lg">history</span>
                        <h2 class="font-serif text-lg text-[#1E293B] font-bold">Recent Transactions</h2>
                    </div>
                    <a href="#" class="text-[#B45309] hover:text-[#92400e] font-semibold text-xs flex items-center gap-1 transition-colors">
                        View All <span class="material-symbols-outlined text-xs">arrow_forward</span>
                    </a>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-outline-variant/60 text-outline text-[10px] uppercase font-bold tracking-wider">
                                <th class="pb-3">Date</th>
                                <th class="pb-3">Description</th>
                                <th class="pb-3">Status</th>
                                <th class="pb-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${txHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderTopupView() {
    const container = document.getElementById('topup-container');
    if (!container) return;

    const currentBalance = state.walletBalance;
    const selectedAmount = state.selectedTopUpAmount !== undefined ? state.selectedTopUpAmount : 100;

    container.innerHTML = `
        <div class="max-w-xl mx-auto py-8">
            <!-- Back to Wallet Link -->
            <button onclick="navigateTo('wallet')" class="flex items-center gap-1.5 text-xs font-semibold text-[#B45309] hover:underline mb-6">
                <span class="material-symbols-outlined text-sm font-bold">arrow_back</span> Back to Wallet
            </button>
            
            <!-- Page Title & Subtitle -->
            <div class="text-center mb-8">
                <h1 class="font-serif text-3xl md:text-4xl text-[#1E293B] font-bold mb-2">Top-Up Your Sanctuary Wallet</h1>
                <p class="font-body-sm text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">Add funds securely for seamless bookings and exclusive spa treatments.</p>
            </div>
            
            <!-- Current Balance Card -->
            <div class="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm text-center mb-6">
                <span class="font-label-caps text-[9px] text-[#B45309] font-bold uppercase tracking-wider block mb-1">Current Balance</span>
                <div class="font-serif text-2xl text-[#1E293B] font-bold">
                    MYR <span class="font-serif text-3xl font-bold">${currentBalance.toFixed(2)}</span>
                </div>
            </div>
            
            <!-- Top Up Form Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm">
                <!-- Select Amount Section -->
                <div class="mb-6">
                    <h3 class="font-serif text-sm font-bold text-[#1E293B] mb-3">Select Amount</h3>
                    <div class="grid grid-cols-4 gap-3 mb-4">
                        <button type="button" onclick="selectTopUpAmount(50)" id="topup-amt-50" class="topup-amount-btn border rounded-xl py-3 font-semibold text-xs transition-all text-center">
                            MYR 50
                        </button>
                        <button type="button" onclick="selectTopUpAmount(100)" id="topup-amt-100" class="topup-amount-btn border rounded-xl py-3 font-semibold text-xs transition-all text-center">
                            MYR 100
                        </button>
                        <button type="button" onclick="selectTopUpAmount(200)" id="topup-amt-200" class="topup-amount-btn border rounded-xl py-3 font-semibold text-xs transition-all text-center">
                            MYR 200
                        </button>
                        <button type="button" onclick="selectTopUpAmount('custom')" id="topup-amt-custom" class="topup-amount-btn border rounded-xl py-3 font-semibold text-xs transition-all text-center">
                            Custom
                        </button>
                    </div>
                    
                    <!-- Custom Amount Input Field -->
                    <div id="custom-amount-wrapper" class="hidden">
                        <label class="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1">Custom Amount (MYR)</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant">MYR</span>
                            <input type="number" id="custom-topup-input" value="150" min="10" step="5" class="w-full pl-12 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                    </div>
                </div>
                
                <!-- Payment Details Section -->
                <div class="border-t border-outline-variant/30 pt-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-serif text-sm font-bold text-[#1E293B]">Payment Details</h3>
                        <span class="flex items-center gap-1 text-[9px] text-outline font-bold tracking-wider uppercase">
                            <span class="material-symbols-outlined text-[12px] text-outline">lock</span> Secure Stripe Payment
                        </span>
                    </div>
                    
                    <!-- Form Fields -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Card Number</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">credit_card</span>
                                <input type="text" id="stripe-card-number" placeholder="0000 0000 0000 0000" class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Expiry Date</label>
                                <input type="text" id="stripe-card-expiry" placeholder="MM/YY" class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">CVC</label>
                                <input type="text" id="stripe-card-cvc" placeholder="123" class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Name on Card</label>
                            <input type="text" id="stripe-card-name" placeholder="e.g. Jane Doe" class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <button type="button" onclick="submitStripeTopUp()" class="w-full mt-6 bg-[#FACC15] text-[#241a00] hover:bg-[#eab308] font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 hover:shadow-lg">
                        Pay with Stripe <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                    </button>
                    
                    <!-- Encryption Footer -->
                    <div class="flex items-center justify-center gap-1 mt-4 text-[10px] text-on-surface-variant font-semibold">
                        <span class="material-symbols-outlined text-[12px]">lock</span>
                        <span>Payments are securely encrypted.</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    selectTopUpAmount(selectedAmount);
}

window.selectTopUpAmount = function (amount) {
    state.selectedTopUpAmount = amount;

    document.querySelectorAll('.topup-amount-btn').forEach(btn => {
        btn.classList.remove('bg-[#50613f]/10', 'border-[#50613f]', 'text-[#50613f]', 'font-bold');
        btn.classList.add('bg-white', 'border-outline-variant/60', 'text-on-surface-variant');
    });

    const activeBtn = document.getElementById(`topup-amt-${amount}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'border-outline-variant/60', 'text-on-surface-variant');
        activeBtn.classList.add('bg-[#50613f]/10', 'border-[#50613f]', 'text-[#50613f]', 'font-bold');
    }

    const wrapper = document.getElementById('custom-amount-wrapper');
    if (wrapper) {
        if (amount === 'custom') {
            wrapper.classList.remove('hidden');
        } else {
            wrapper.classList.add('hidden');
        }
    }
};

window.navigateToTopUp = function (amount) {
    state.selectedTopUpAmount = amount;
    navigateTo('topup');
};

window.submitStripeTopUp = function () {
    const cardNum = document.getElementById('stripe-card-number').value.trim();
    const cardExpiry = document.getElementById('stripe-card-expiry').value.trim();
    const cardCvc = document.getElementById('stripe-card-cvc').value.trim();
    const cardName = document.getElementById('stripe-card-name').value.trim();

    if (!cardNum || !cardExpiry || !cardCvc || !cardName) {
        showNotification('Please enter all payment details to proceed.', 'error');
        return;
    }

    let amount = 0;
    if (state.selectedTopUpAmount === 'custom') {
        const customVal = parseFloat(document.getElementById('custom-topup-input').value);
        if (isNaN(customVal) || customVal <= 0) {
            showNotification('Please enter a valid amount.', 'error');
            return;
        }
        amount = customVal;
    } else {
        amount = parseFloat(state.selectedTopUpAmount);
    }

    let bonusText = '';
    if (amount === 200) {
        state.walletBalance += 10.00;
        bonusText = ' (+ MYR 10.00 Bonus)';
    }

    state.walletBalance += amount;

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    state.transactions.unshift({
        date: dateStr,
        description: 'Wallet Top Up',
        amount: amount + (amount === 200 ? 10 : 0),
        status: 'Completed'
    });

    updateHeaderWalletDisplay();
    showNotification(`Successfully topped up MYR ${amount.toFixed(2)}${bonusText}!`, 'success');

    navigateTo('wallet');
};

// --- SUB-VIEWS FOR ACCOUNT SETTINGS ---

// 1. PERSONAL DETAILS
function renderPersonalDetailsView() {
    const container = document.getElementById('personal-details-container');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <!-- Header and Navigation -->
            <div class="flex items-center gap-3 mb-8">
                <button onclick="navigateTo('profile')" class="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">Account Settings</span>
                    <h1 class="font-serif text-2xl md:text-3xl text-[#1E293B] font-bold">Personal Details</h1>
                </div>
            </div>

            <!-- Card Form -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30">
                <form id="personal-details-form" onsubmit="savePersonalDetails(event)" class="space-y-6">
                    <!-- Avatar section -->
                    <div class="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-outline-variant/30">
                        <div class="relative shrink-0">
                            <img class="w-20 h-20 rounded-full object-cover border-4 border-[#50613f]/10" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80" alt="${state.guestInfo.name}">
                            <div class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#B45309] text-white flex items-center justify-center border border-white cursor-pointer hover:bg-[#92400e] transition-colors">
                                <span class="material-symbols-outlined text-[12px] font-bold">photo_camera</span>
                            </div>
                        </div>
                        <div class="text-center sm:text-left">
                            <h3 class="font-serif text-base text-[#1E293B] font-bold mb-1">Profile Photo</h3>
                            <p class="font-body-sm text-[11px] text-on-surface-variant max-w-xs leading-relaxed">Update your photo to personalize your spa experience. JPG or PNG, max 2MB.</p>
                        </div>
                    </div>

                    <!-- Fields Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Full Name</label>
                            <input type="text" id="pd-name" value="${state.guestInfo.name}" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Email Address</label>
                            <input type="email" id="pd-email" value="${state.guestInfo.email}" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Phone Number</label>
                            <input type="tel" id="pd-phone" value="${state.guestInfo.phone}" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Date of Birth</label>
                            <input type="date" id="pd-dob" value="1994-08-14" class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Gender</label>
                            <div class="flex gap-6 mt-1">
                                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface">
                                    <input type="radio" name="pd-gender" value="female" checked class="text-primary focus:ring-primary border-outline-variant"> Female
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface">
                                    <input type="radio" name="pd-gender" value="male" class="text-primary focus:ring-primary border-outline-variant"> Male
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface">
                                    <input type="radio" name="pd-gender" value="other" class="text-primary focus:ring-primary border-outline-variant"> Prefer not to say
                                </label>
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Special Requests / Medical Notes</label>
                            <textarea id="pd-requests" rows="3" class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface resize-none">${state.guestInfo.specialRequests}</textarea>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-4 pt-4 border-t border-outline-variant/30 justify-end">
                        <button type="button" onclick="navigateTo('profile')" class="px-5 py-2.5 rounded-xl border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold transition-all">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-2.5 rounded-xl bg-primary hover:bg-[#3e4b30] text-white font-bold text-xs transition-all shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
window.renderPersonalDetailsView = renderPersonalDetailsView;

window.savePersonalDetails = function (event) {
    event.preventDefault();
    const name = document.getElementById('pd-name').value.trim();
    const email = document.getElementById('pd-email').value.trim();
    const phone = document.getElementById('pd-phone').value.trim();
    const requests = document.getElementById('pd-requests').value.trim();

    if (!name || !email || !phone) {
        showNotification('Name, email and phone number are required.', 'error');
        return;
    }

    state.guestInfo.name = name;
    state.guestInfo.email = email;
    state.guestInfo.phone = phone;
    state.guestInfo.specialRequests = requests;

    showNotification('Personal details updated successfully.', 'success');
    navigateTo('profile');
};

// 2. BOOKING HISTORY
let activeHistoryTab = 'upcoming';

function renderBookingHistoryView() {
    const container = document.getElementById('booking-history-container');
    if (!container) return;

    // Filter bookings based on activeHistoryTab
    const filteredBookings = state.bookings.filter(b => {
        if (activeHistoryTab === 'upcoming') {
            return b.status === 'Upcoming';
        } else {
            return b.status === 'Completed' || b.status === 'Cancelled';
        }
    });

    let listHtml = '';
    if (filteredBookings.length === 0) {
        listHtml = `
            <div class="text-center py-12 bg-white rounded-3xl border border-outline-variant/30 p-8 shadow-sm">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">calendar_today</span>
                <p class="text-sm font-semibold text-on-surface-variant">No ${activeHistoryTab} appointments found.</p>
                <p class="text-xs text-on-surface-variant/70 mt-1">Book your next relaxing treatment from our services page.</p>
                <button onclick="navigateTo('services-catalog')" class="mt-4 px-5 py-2.5 rounded-full bg-[#FACC15] text-[#241a00] hover:bg-[#eab308] font-bold text-xs shadow-sm">Explore Services</button>
            </div>
        `;
    } else {
        const iconMap = { signature: 'star', massage: 'spa', facial: 'face', body: 'self_care', packages: 'package_2' };
        
        filteredBookings.forEach(booking => {
            const icon = iconMap[booking.serviceType] || 'spa';
            const showCancel = booking.status === 'Upcoming';
            const statusBadge = booking.status === 'Upcoming' 
                ? `<span class="bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Confirmed</span>`
                : booking.status === 'Cancelled'
                ? `<span class="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Cancelled</span>`
                : `<span class="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Completed</span>`;

            listHtml += `
                <div class="bg-white rounded-2xl p-5 border border-outline-variant/30 relative flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#50613f]/10 text-primary flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-xl">${icon}</span>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                                <h3 class="font-serif text-base text-[#1E293B] font-bold">${booking.serviceName}</h3>
                                ${statusBadge}
                            </div>
                            <div class="space-y-1">
                                <p class="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-sm text-[#50613f]">schedule</span>
                                    <span>${booking.date} • ${booking.time}</span>
                                </p>
                                <p class="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-sm text-[#50613f]">person</span>
                                    <span>Therapist: <strong class="text-on-surface">${booking.therapist}</strong></span>
                                </p>
                                <p class="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-sm text-[#50613f]">location_on</span>
                                    <span>${booking.location}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 border-outline-variant/20 pt-3 md:pt-0 gap-3">
                        <span class="font-serif text-base text-[#1E293B] font-bold">MYR ${parseFloat(booking.price).toFixed(2)}</span>
                        ${showCancel ? `
                        <div class="flex gap-2 flex-wrap justify-end">
                            <button onclick="openQrTicketModal('${booking.id}')" class="px-3 py-1.5 rounded-lg bg-[#50613f]/10 hover:bg-[#50613f]/25 text-[#50613f] text-[10px] font-bold transition-all flex items-center gap-1 shadow-sm">
                                <span class="material-symbols-outlined text-[12px] font-bold">qr_code</span> View QR
                            </button>
                            <button onclick="rescheduleBooking('${booking.id}')" class="px-3 py-1.5 rounded-lg border border-outline text-on-surface-variant hover:bg-slate-50 text-[10px] font-bold transition-all">Reschedule</button>
                            <button onclick="cancelBooking('${booking.id}')" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold transition-all">Cancel</button>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <!-- Header and Navigation -->
            <div class="flex items-center gap-3 mb-8">
                <button onclick="navigateTo('profile')" class="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">Account Settings</span>
                    <h1 class="font-serif text-2xl md:text-3xl text-[#1E293B] font-bold">Booking History</h1>
                </div>
            </div>

            <!-- Tab Selectors -->
            <div class="flex border-b border-outline-variant/30 mb-6">
                <button onclick="setHistoryTab('upcoming')" class="px-6 py-3 font-title-md text-xs font-bold border-b-2 transition-all ${activeHistoryTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}">
                    Upcoming Appointments
                </button>
                <button onclick="setHistoryTab('past')" class="px-6 py-3 font-title-md text-xs font-bold border-b-2 transition-all ${activeHistoryTab === 'past' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}">
                    Past & Cancelled
                </button>
            </div>

            <!-- Bookings List -->
            <div class="space-y-4">
                ${listHtml}
            </div>
        </div>
    `;
}
window.renderBookingHistoryView = renderBookingHistoryView;

window.setHistoryTab = function (tab) {
    activeHistoryTab = tab;
    renderBookingHistoryView();
};

window.rescheduleBooking = function (bookingId) {
    const booking = state.bookings.find(b => b.id === bookingId);
    if (booking) {
        state.rescheduleBooking = {
            bookingId: bookingId,
            date: booking.date,
            time: booking.time,
            monthOffset: 0
        };
        saveState();
        navigateTo('reschedule');
        showNotification('Reschedule process initiated. Please pick a new slot.', 'info');
    }
};

function renderRescheduleView() {
    const container = document.getElementById('reschedule-container');
    if (!container) return;

    if (!state.rescheduleBooking) {
        container.innerHTML = `<p class="text-center py-12 text-on-surface-variant">No reschedule booking session initialized.</p>`;
        return;
    }

    const bookingId = state.rescheduleBooking.bookingId;
    const booking = state.bookings.find(b => b.id === bookingId);
    if (!booking) {
        container.innerHTML = `<p class="text-center py-12 text-on-surface-variant">Booking not found.</p>`;
        return;
    }

    // Default dates if null
    if (!state.rescheduleBooking.date) {
        const defaultDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        state.rescheduleBooking.date = defaultDate.toLocaleDateString('en-US', options);
    }
    if (!state.rescheduleBooking.time) {
        state.rescheduleBooking.time = '11:00 AM';
    }

    // Parse selected date
    let selDate = new Date(state.rescheduleBooking.date);
    if (isNaN(selDate.getTime())) {
        selDate = new Date();
    }

    // Month to render
    const baseMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const renderMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + (state.rescheduleBooking.monthOffset || 0), 1);
    const monthText = renderMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Calendar Cells offset
    const startDayOfWeek = renderMonth.getDay();
    let calendarDaysHtml = '';
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDaysHtml += '<div></div>'; 
    }

    const year = renderMonth.getFullYear();
    const month = renderMonth.getMonth();
    const tempDate = new Date(year, month + 1, 0);
    const daysInMonth = tempDate.getDate();

    const today = new Date(); // Actual today
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0, 0, 0, 0);

        const isDisabled = cellDate < today;
        const isSelected = selDate.getDate() === day && selDate.getMonth() === month && selDate.getFullYear() === year;

        calendarDaysHtml += `
            <button ${isDisabled ? 'disabled' : ''} onclick="selectRescheduleDate(${day})" class="h-10 w-10 mx-auto rounded-full font-body-sm text-body-sm flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-transparent ${isSelected ? 'bg-[#50613f] text-white shadow-md font-bold' : 'text-on-surface hover:bg-surface-container-high'}">
                ${day}
            </button>
        `;
    }

    // Time Slots
    const morningSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
    const afternoonSlots = ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

    let morningSlotsHtml = '';
    morningSlots.forEach(t => {
        const isSelected = state.rescheduleBooking.time === t;
        const isOccupied = t === '12:00 PM';
        morningSlotsHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectRescheduleTime('${t}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-[#50613f] bg-[#50613f]/10 text-[#50613f] font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-[#50613f] hover:bg-[#50613f]/5'}">
                ${t.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });

    let afternoonSlotsHtml = '';
    afternoonSlots.forEach(t => {
        const isSelected = state.rescheduleBooking.time === t;
        const isOccupied = t === '03:00 PM';
        afternoonSlotsHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectRescheduleTime('${t}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-[#50613f] bg-[#50613f]/10 text-[#50613f] font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-[#50613f] hover:bg-[#50613f]/5'}">
                ${t.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });

    container.innerHTML = `
        <div class="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
            <div>
                <h1 class="font-serif text-3xl text-[#1E293B] font-bold mb-1">Reschedule Appointment</h1>
                <p class="font-body-sm text-xs text-on-surface-variant">Select a new date and time slot for your reservation.</p>
            </div>
            <button onclick="navigateTo('booking-history')" class="px-4 py-2 rounded-xl border border-outline hover:bg-slate-50 text-secondary font-bold text-xs flex items-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-sm">arrow_back</span> Back to History
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left side: Calendar & Time Slots -->
            <div class="lg:col-span-8 space-y-6">
                <div class="glass-panel rounded-3xl p-6 md:p-8 bg-white shadow-sm border border-outline-variant/30">
                    <h2 class="font-title-md text-base text-[#50613f] mb-6 flex items-center gap-2 font-semibold">
                        <span class="material-symbols-outlined">calendar_month</span> Select New Date &amp; Time
                    </h2>

                    <!-- Calendar Card -->
                    <div class="mb-8 border border-outline-variant/30 rounded-2xl p-4 bg-white/45">
                        <div class="flex justify-between items-center mb-6">
                            <button onclick="changeRescheduleMonth(-1)" class="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                                <span class="material-symbols-outlined">chevron_left</span>
                            </button>
                            <span class="font-title-md text-base font-semibold text-[#1E293B]">${monthText}</span>
                            <button onclick="changeRescheduleMonth(1)" class="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                                <span class="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                        <div class="grid grid-cols-7 gap-2 text-center mb-2">
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Sun</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Mon</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Tue</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Wed</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Thu</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Fri</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Sat</div>
                        </div>
                        <div class="grid grid-cols-7 gap-2 text-center">
                            ${calendarDaysHtml}
                        </div>
                    </div>

                    <!-- Time Slots Card -->
                    <div class="border-t border-outline-variant/30 pt-6">
                        <div class="space-y-6">
                            <div>
                                <h3 class="font-title-md text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Morning (09:00 - 12:00)</h3>
                                <div class="flex flex-wrap gap-3">
                                    ${morningSlotsHtml}
                                </div>
                            </div>
                            <div>
                                <h3 class="font-title-md text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Afternoon (13:00 - 18:00)</h3>
                                <div class="flex flex-wrap gap-3">
                                    ${afternoonSlotsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right side: Sidebar Summary -->
            <div class="lg:col-span-4">
                <div class="glass-panel rounded-3xl p-6 md:p-8 bg-white border border-outline-variant/30 shadow-sm space-y-6 sticky top-8 flex flex-col justify-between">
                    <div>
                        <h2 class="font-serif text-lg text-[#1E293B] font-bold border-b border-outline-variant/20 pb-4 mb-6">Reschedule Summary</h2>
                        <div class="flex flex-col gap-5">
                            <!-- Service Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                                    <span class="material-symbols-outlined text-lg">spa</span>
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">SERVICE</span>
                                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${booking.serviceName}</h3>
                                </div>
                            </div>
                            
                            <!-- Therapist Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center text-primary shrink-0">
                                    <span class="material-symbols-outlined text-lg">person</span>
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">THERAPIST</span>
                                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${booking.therapist}</h3>
                                </div>
                            </div>
                            
                            <!-- Schedule Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                                    <span class="material-symbols-outlined text-lg">calendar_month</span>
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">NEW DATE & TIME</span>
                                    ${state.rescheduleBooking.date ? `
                                        <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${state.rescheduleBooking.date}</h3>
                                        <p class="font-body-sm text-[11px] text-[#50613f] font-bold">${state.rescheduleBooking.time || 'To be selected'}</p>
                                    ` : `
                                        <h3 class="font-title-md text-xs font-semibold text-on-surface-variant"><span class="italic text-on-surface-variant opacity-60 text-xs">To be selected</span></h3>
                                    `}
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Payment Details (Free Reschedule) -->
                    <div class="border-t border-outline-variant/20 pt-4 space-y-4">
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-on-surface-variant">
                                <span>Reschedule Fee</span>
                                <span class="line-through text-outline">MYR 20.00</span>
                            </div>
                            <div class="flex justify-between text-[#2e7d32] font-semibold">
                                <span>Discount</span>
                                <span>-MYR 20.00 (Free)</span>
                            </div>
                            <div class="border-t border-outline-variant/10 pt-3 flex justify-between items-center">
                                <span class="font-bold text-[#1E293B]">Total Fee</span>
                                <span class="font-serif text-lg font-bold text-[#1E293B]">MYR 0.00</span>
                            </div>
                        </div>

                        <!-- Confirm Actions -->
                        <div class="pt-2">
                            <button onclick="confirmReschedule()" class="w-full bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                                Confirm Reschedule <span class="material-symbols-outlined text-sm">check_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
window.renderRescheduleView = renderRescheduleView;

window.selectRescheduleDate = function (day) {
    const baseMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const renderMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + (state.rescheduleBooking.monthOffset || 0), day);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    state.rescheduleBooking.date = renderMonth.toLocaleDateString('en-US', options);

    saveState();
    renderRescheduleView();
};

window.selectRescheduleTime = function (time) {
    state.rescheduleBooking.time = time;
    saveState();
    renderRescheduleView();
};

window.changeRescheduleMonth = function (offset) {
    const targetOffset = (state.rescheduleBooking.monthOffset || 0) + offset;
    if (targetOffset < 0) {
        showNotification('Cannot select past months.', 'info');
        return;
    }
    state.rescheduleBooking.monthOffset = targetOffset;
    saveState();
    renderRescheduleView();
};

window.confirmReschedule = function () {
    const bookingId = state.rescheduleBooking.bookingId;
    const booking = state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Update appointment date & time
    const oldDate = booking.date;
    const oldTime = booking.time;
    booking.date = state.rescheduleBooking.date;
    booking.time = state.rescheduleBooking.time;

    // Record notification
    state.notifications.unshift({
        id: 'notif-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        text: `Rescheduled: Your appointment for ${booking.serviceName} has been rescheduled from ${oldDate} at ${oldTime} to ${booking.date} at ${booking.time}.`
    });

    // Populate state.booking so renderSuccessView renders it perfectly
    state.booking.service = {
        name: booking.serviceName,
        duration: '60 Mins',
        price: parseFloat(booking.price) || 0
    };
    state.booking.therapist = { name: booking.therapist, role: 'Specialist' };
    state.booking.date = booking.date;
    state.booking.time = booking.time;
    state.successResId = booking.resId;

    // Reset reschedule states
    state.rescheduleBooking = null;
    saveState();
    
    // Go to success view!
    navigateTo('success');
    showNotification('Appointment successfully rescheduled!', 'success');
};

window.cancelBooking = function (bookingId) {
    if (confirm("Are you sure you want to cancel this appointment?")) {
        const booking = state.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'Cancelled';
            // refund if paid with wallet
            state.walletBalance += parseFloat(booking.price);
            
            // Add a transaction logs
            state.transactions.unshift({
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                description: `Refund: ${booking.serviceName} Cancellation`,
                amount: parseFloat(booking.price),
                status: 'Completed'
            });

            // Add notification
            state.notifications.unshift({
                id: 'notif-' + Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                text: `Cancelled: Your reservation for ${booking.serviceName} has been cancelled. MYR ${parseFloat(booking.price).toFixed(2)} refunded to your wallet.`
            });

            showNotification('Appointment cancelled successfully. MYR ' + parseFloat(booking.price).toFixed(2) + ' refunded to wallet.', 'success');
            renderBookingHistoryView();
            updateHeaderWalletDisplay();
            saveState();
        }
    }
};

// 3. NOTIFICATIONS
function renderNotificationsView() {
    const container = document.getElementById('notifications-container');
    if (!container) return;

    let logHtml = '';
    if (state.notifications.length === 0) {
        logHtml = `<p class="text-xs text-on-surface-variant text-center py-6">No notification logs found.</p>`;
    } else {
        state.notifications.forEach(notif => {
            logHtml += `
                <div class="flex gap-3 py-4 border-b border-outline-variant/20 last:border-b-0">
                    <div class="w-8 h-8 rounded-full bg-[#50613f]/10 text-primary flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-base">notifications</span>
                    </div>
                    <div class="flex-grow">
                        <p class="text-xs font-semibold text-on-surface leading-relaxed">${notif.text}</p>
                        <span class="text-[10px] text-on-surface-variant font-medium mt-1 block">${notif.date}</span>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = `
        <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left Column: Navigation and Preferences Form -->
            <div class="lg:col-span-6 space-y-6">
                <!-- Header -->
                <div class="flex items-center gap-3">
                    <button onclick="navigateTo('profile')" class="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">Account Settings</span>
                        <h1 class="font-serif text-2xl md:text-3xl text-[#1E293B] font-bold">Notifications</h1>
                    </div>
                </div>

                <!-- Preferences Card -->
                <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30">
                    <h2 class="font-serif text-base text-[#1E293B] font-bold mb-4">Notification Channels</h2>
                    <form onsubmit="saveNotificationPreferences(event)" class="space-y-6">
                        <!-- Email Toggle -->
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-xs font-semibold text-on-surface mb-0.5">Email Notifications</h3>
                                <p class="text-[11px] text-on-surface-variant leading-normal max-w-xs">Receive booking confirmations, receipts, and newsletters.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notif-email" ${state.notificationPreferences.email ? 'checked' : ''} class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <!-- SMS Toggle -->
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-xs font-semibold text-on-surface mb-0.5">SMS Alerts</h3>
                                <p class="text-[11px] text-on-surface-variant leading-normal max-w-xs">Receive real-time scheduling reminders and notifications.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notif-sms" ${state.notificationPreferences.sms ? 'checked' : ''} class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <!-- Push Toggle -->
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-xs font-semibold text-on-surface mb-0.5">Push Notifications</h3>
                                <p class="text-[11px] text-on-surface-variant leading-normal max-w-xs">Get alerts directly on your browser about special promos.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notif-push" ${state.notificationPreferences.push ? 'checked' : ''} class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3 justify-end pt-4 border-t border-outline-variant/30">
                            <button type="button" onclick="navigateTo('profile')" class="px-5 py-2.5 rounded-xl border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold transition-all">
                                Cancel
                            </button>
                            <button type="submit" class="px-6 py-2.5 rounded-xl bg-primary hover:bg-[#3e4b30] text-white font-bold text-xs transition-all shadow-sm">
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Right Column: Notifications Log History -->
            <div class="lg:col-span-6 space-y-4">
                <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 h-full flex flex-col">
                    <h2 class="font-serif text-base text-[#1E293B] font-bold mb-4">Notification History</h2>
                    <div class="divide-y divide-outline-variant/10 overflow-y-auto max-h-[400px] pr-2 flex-grow">
                        ${logHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}
window.renderNotificationsView = renderNotificationsView;

window.saveNotificationPreferences = function (event) {
    event.preventDefault();
    const email = document.getElementById('notif-email').checked;
    const sms = document.getElementById('notif-sms').checked;
    const push = document.getElementById('notif-push').checked;

    state.notificationPreferences.email = email;
    state.notificationPreferences.sms = sms;
    state.notificationPreferences.push = push;

    showNotification('Notification preferences saved successfully.', 'success');
    navigateTo('profile');
};

// 4. PRIVACY & SECURITY
function renderPrivacySecurityView() {
    const container = document.getElementById('privacy-security-container');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <!-- Header and Navigation -->
            <div class="flex items-center gap-3 mb-8">
                <button onclick="navigateTo('profile')" class="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">Account Settings</span>
                    <h1 class="font-serif text-2xl md:text-3xl text-[#1E293B] font-bold">Privacy & Security</h1>
                </div>
            </div>

            <!-- Settings Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 space-y-8">
                <!-- Change Password Form -->
                <div>
                    <h2 class="font-serif text-base text-[#1E293B] font-bold mb-4 pb-2 border-b border-outline-variant/20">Change Password</h2>
                    <form onsubmit="savePassword(event)" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Current Password</label>
                                <input type="password" id="ps-current-pwd" placeholder="••••••••" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">New Password</label>
                                <input type="password" id="ps-new-pwd" placeholder="••••••••" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Confirm New Password</label>
                                <input type="password" id="ps-confirm-pwd" placeholder="••••••••" required class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                            </div>
                        </div>
                        <div class="flex justify-end mt-2">
                            <button type="submit" class="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#3e4b30] text-white font-bold text-xs transition-all shadow-sm">Update Password</button>
                        </div>
                    </form>
                </div>

                <!-- Account Security Settings -->
                <div>
                    <h2 class="font-serif text-base text-[#1E293B] font-bold mb-4 pb-2 border-b border-outline-variant/20">Account Security</h2>
                    <form onsubmit="savePrivacySettings(event)" class="space-y-4">
                        <!-- 2FA Checkbox -->
                        <div class="flex items-start gap-3">
                            <input type="checkbox" id="ps-2fa" ${state.privacySettings.twoFactor ? 'checked' : ''} class="mt-1 rounded text-primary focus:ring-primary border-outline-variant">
                            <div>
                                <label for="ps-2fa" class="text-xs font-bold text-on-surface block cursor-pointer">Enable Two-Factor Authentication (2FA)</label>
                                <p class="text-[11px] text-on-surface-variant leading-relaxed">Secure your account by requiring an verification code in addition to your password.</p>
                            </div>
                        </div>

                        <!-- Data Sharing -->
                        <div class="flex items-start gap-3">
                            <input type="checkbox" id="ps-data" ${state.privacySettings.dataSharing ? 'checked' : ''} class="mt-1 rounded text-primary focus:ring-primary border-outline-variant">
                            <div>
                                <label for="ps-data" class="text-xs font-bold text-on-surface block cursor-pointer">Personalized Experience & Recommendations</label>
                                <p class="text-[11px] text-on-surface-variant leading-relaxed">Allow Serenity & Soul to analyze treatment logs to recommend curated essential oils and therapy frequencies.</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex gap-3 justify-end pt-4 border-t border-outline-variant/30">
                            <button type="button" onclick="navigateTo('profile')" class="px-5 py-2.5 rounded-xl border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold transition-all">
                                Cancel
                            </button>
                            <button type="submit" class="px-6 py-2.5 rounded-xl bg-primary hover:bg-[#3e4b30] text-white font-bold text-xs transition-all shadow-sm">
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Danger Zone -->
                <div class="p-6 border border-red-200 bg-red-50/50 rounded-2xl">
                    <h3 class="text-xs font-bold text-red-800 flex items-center gap-1.5 mb-2">
                        <span class="material-symbols-outlined text-sm font-bold">warning</span> Danger Zone
                    </h3>
                    <p class="text-[11px] text-red-700 leading-relaxed mb-4">Permanently deactivate and delete your account data. This action is irreversible and you will forfeit any existing wallet balance (MYR ${state.walletBalance.toFixed(2)}).</p>
                    <button type="button" onclick="deleteAccount()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm">Delete Account</button>
                </div>
            </div>
        </div>
    `;
}
window.renderPrivacySecurityView = renderPrivacySecurityView;

window.savePassword = function (event) {
    event.preventDefault();
    const currentPwd = document.getElementById('ps-current-pwd').value;
    const newPwd = document.getElementById('ps-new-pwd').value;
    const confirmPwd = document.getElementById('ps-confirm-pwd').value;

    if (newPwd !== confirmPwd) {
        showNotification('New password and password confirmation do not match.', 'error');
        return;
    }

    if (newPwd.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return;
    }

    // Reset password inputs
    document.getElementById('ps-current-pwd').value = '';
    document.getElementById('ps-new-pwd').value = '';
    document.getElementById('ps-confirm-pwd').value = '';

    showNotification('Your password has been changed successfully.', 'success');
};

window.savePrivacySettings = function (event) {
    event.preventDefault();
    const twoFactor = document.getElementById('ps-2fa').checked;
    const dataSharing = document.getElementById('ps-data').checked;

    state.privacySettings.twoFactor = twoFactor;
    state.privacySettings.dataSharing = dataSharing;

    showNotification('Privacy settings saved successfully.', 'success');
    navigateTo('profile');
};

window.deleteAccount = function () {
    if (confirm("WARNING: Are you sure you want to delete your account? This is permanent and your remaining wallet balance of MYR " + state.walletBalance.toFixed(2) + " will be forfeited.")) {
        // Reset state to Guest
        state.guestInfo = {
            name: 'Guest User',
            email: 'guest@example.com',
            phone: '',
            specialRequests: ''
        };
        state.walletBalance = 0.00;
        state.bookings = [];
        state.transactions = [];
        state.notifications = [];
        updateHeaderWalletDisplay();
        showNotification('Account successfully deleted.', 'success');
        navigateTo('home');
    }
};

// 5. SIGN OUT MODAL
window.confirmSignOut = function () {
    let modal = document.getElementById('sign-out-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'sign-out-modal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-[90%] border border-outline-variant/30 shadow-2xl transform scale-95 transition-transform duration-300 text-center">
                <div class="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                    <span class="material-symbols-outlined text-2xl font-bold">logout</span>
                </div>
                <h3 class="font-serif text-lg text-[#1E293B] font-bold mb-2">Sign Out</h3>
                <p class="text-xs text-on-surface-variant leading-relaxed mb-6">Are you sure you want to sign out of Serenity & Soul? Your current progress and session state will be reset.</p>
                <div class="flex gap-3 justify-center">
                    <button onclick="cancelSignOut()" class="px-5 py-2.5 rounded-xl border border-outline text-[#50613f] hover:bg-[#50613f]/5 text-xs font-bold transition-all w-full">
                        Cancel
                    </button>
                    <button onclick="performSignOut()" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all w-full shadow-sm">
                        Sign Out
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    setTimeout(() => {
        modal.classList.remove('pointer-events-none', 'opacity-0');
        modal.querySelector('.transform').classList.remove('scale-95');
    }, 50);
};

window.cancelSignOut = function () {
    const modal = document.getElementById('sign-out-modal');
    if (modal) {
        modal.classList.add('pointer-events-none', 'opacity-0');
        modal.querySelector('.transform').classList.add('scale-95');
    }
};

window.performSignOut = function () {
    window.cancelSignOut();

    // Reset session variables
    state.guestInfo = {
        name: 'Eleanor Vance',
        email: 'eleanor.v@example.com',
        phone: '+65 9123 4567',
        specialRequests: 'Please ensure the massage room is slightly warm, and avoid using lavender oils due to a mild allergy. Thank you.'
    };
    state.walletBalance = 250.00;
    
    // Reset active packages sessions back to full
    state.activePackages = {
        'aromatherapy-bundle': 2,
        'radiance-bundle': 4
    };
    
    // Clear custom bookings
    state.bookings = [
        {
            id: 'booking-1',
            serviceName: 'Healing Stone Therapy',
            serviceType: 'signature',
            date: 'Thursday, Oct 24, 2026',
            time: '02:00 PM',
            therapist: 'Sari',
            location: 'Serenity Orchard Wing',
            price: 180,
            status: 'Upcoming'
        },
        {
            id: 'booking-2',
            serviceName: 'Aromatherapy Massage',
            serviceType: 'massage',
            date: 'Wednesday, Oct 15, 2025',
            time: '10:00 AM',
            therapist: 'Sari',
            location: 'Serenity Orchard Wing',
            price: 120,
            status: 'Completed'
        },
        {
            id: 'booking-3',
            serviceName: 'Signature Facial',
            serviceType: 'facial',
            date: 'Monday, Oct 02, 2025',
            time: '03:30 PM',
            therapist: 'Dewi',
            location: 'Serenity Orchard Wing',
            price: 85,
            status: 'Completed'
        }
    ];

    updateHeaderWalletDisplay();
    showNotification('Signed out successfully.', 'success');
    navigateTo('home');
};

// 6. ALL SERVICES & PACKAGES CATALOG VIEW
function renderAllServicesView() {
    const container = document.getElementById('all-services-container');
    if (!container) return;

    if (typeof state.searchQuery === 'undefined') state.searchQuery = '';
    if (typeof state.activeCategoryFilter === 'undefined') state.activeCategoryFilter = 'all';

    const query = state.searchQuery.toLowerCase().trim();
    const activeFilter = state.activeCategoryFilter;

    // Filter services dynamically from the SERVICES database
    const filtered = Object.values(SERVICES).filter(srv => {
        const matchesCategory = activeFilter === 'all' || srv.type === activeFilter;
        const matchesSearch = srv.name.toLowerCase().includes(query) || srv.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    // Sort so bestValue is at the top of the catalog
    filtered.sort((a, b) => (b.bestValue ? 1 : 0) - (a.bestValue ? 1 : 0));

    // Generate tabs
    const categories = [
        { id: 'all', label: 'All Treatments' },
        { id: 'packages', label: 'Packages / Bundles' },
        { id: 'massage', label: 'Massage Therapy' },
        { id: 'facial', label: 'Facial Care' },
        { id: 'body', label: 'Body Treatments' }
    ];

    let tabsHtml = categories.map(cat => {
        const isActive = activeFilter === cat.id;
        return `
            <button onclick="setAllServicesFilter('${cat.id}')" class="px-5 py-2 rounded-full font-title-md text-xs whitespace-nowrap transition-all ${isActive ? 'bg-[#50613f] text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                ${cat.label}
            </button>
        `;
    }).join('');

    let gridHtml = '';
    if (filtered.length === 0) {
        gridHtml = `
            <div class="col-span-full text-center py-16 bg-white rounded-3xl border border-outline-variant/30 p-8 shadow-sm">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">search_off</span>
                <p class="text-sm font-semibold text-on-surface-variant">No treatments match your search criteria.</p>
                <p class="text-xs text-on-surface-variant/70 mt-1">Try checking your spelling or selecting another category.</p>
            </div>
        `;
    } else {
        filtered.forEach(srv => {
            const isPackage = srv.type === 'packages';
            const badgeLabel = isPackage ? 'Bundle' : (srv.type || 'Service').toUpperCase();
            
            const discountPercent = (srv.regularPrice && srv.regularPrice > srv.price) ? Math.round(((srv.regularPrice - srv.price) / srv.regularPrice) * 100) : 0;
            const discountBadgeHtml = discountPercent > 0 
                ? `<div class="absolute top-4 left-4 bg-[#EAB308] text-white px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm z-10">SAVE ${discountPercent}%</div>`
                : `<div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-sm border border-outline-variant/20">${badgeLabel}</div>`;

            gridHtml += `
                <div class="bg-white border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between relative">
                    ${srv.bestValue ? `<div class="absolute top-0 right-0 bg-[#EAB308] text-white px-4 py-1 rounded-bl-lg font-label-caps text-[9px] font-bold uppercase tracking-wider z-10">BEST VALUE</div>` : ''}
                    <div class="w-full h-52 shrink-0 overflow-hidden relative bg-slate-100">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${srv.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&h=300&q=80'}" alt="${srv.name}">
                        ${discountBadgeHtml}
                    </div>
                    <div class="p-6 flex flex-col justify-between flex-grow">
                        <div>
                            <h3 class="font-serif text-base font-bold text-[#1E293B] mb-2 line-clamp-1 leading-snug">${srv.name}</h3>
                            <p class="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">${srv.description}</p>
                        </div>
                        
                        <div class="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
                            <div class="flex flex-col justify-end">
                                <div class="flex items-center gap-1 text-slate-500 mb-0.5">
                                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                                    <span class="text-[10px] font-medium">${srv.duration || '60 Mins'}</span>
                                </div>
                                ${srv.regularPrice && srv.regularPrice > srv.price ? `<span class="text-on-surface-variant/50 text-[10px] line-through decoration-red-500">MYR ${srv.regularPrice.toFixed(2)}</span>` : ''}
                                <span class="font-serif font-bold text-[#1E293B] text-base">MYR ${srv.price}</span>
                            </div>
                            <button onclick="startBookingWithService('${srv.id}')" class="${srv.bestValue ? 'bg-[#FACC15] hover:bg-[#eab308] text-[#241a00]' : 'bg-[#50613f] hover:bg-[#3e4b30] text-white'} font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1">
                                ${isPackage ? 'Book Package' : 'Book Service'} <span class="material-symbols-outlined text-sm">calendar_month</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = `
        <div class="space-y-8">
            <!-- Header and Navigation -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
                <div class="flex items-center gap-3">
                    <button onclick="navigateTo('services-catalog')" class="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <span class="font-label-caps text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">Spa Catalog</span>
                        <h1 class="font-serif text-2xl md:text-3xl text-[#1E293B] font-bold">All Services & Packages</h1>
                    </div>
                </div>
                
                <!-- Search bar -->
                <div class="relative w-full md:w-80">
                    <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input type="text" id="all-services-search" placeholder="Search treatments..." value="${state.searchQuery}" oninput="searchAllServices(this.value)" class="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline-variant/60 focus:outline-none focus:border-primary text-xs font-semibold text-on-surface">
                    ${state.searchQuery ? `
                        <button onclick="searchAllServices(''); document.getElementById('all-services-search').value=''" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <span class="material-symbols-outlined text-base">close</span>
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- Categories Tabs -->
            <div class="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                ${tabsHtml}
            </div>

            <!-- Services Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${gridHtml}
            </div>
        </div>
    `;
}
window.renderAllServicesView = renderAllServicesView;

window.setAllServicesFilter = function (category) {
    state.activeCategoryFilter = category;
    renderAllServicesView();
};

window.searchAllServices = function (query) {
    state.searchQuery = query;
    renderAllServicesView();
};

// 7. SAVED PAYMENT METHODS MODAL MANAGER
window.openPaymentMethodsModal = function () {
    const modal = document.getElementById('modal-payment-methods');
    if (!modal) return;

    renderSavedCards();

    // Show modal with animation
    modal.classList.remove('hidden');
    // Force reflow
    modal.offsetHeight;
    modal.classList.remove('opacity-0');
};

window.closePaymentMethodsModal = function () {
    const modal = document.getElementById('modal-payment-methods');
    if (!modal) return;

    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        window.hideAddNewCardForm();
    }, 300);
};

function renderSavedCards() {
    const container = document.getElementById('saved-cards-list');
    if (!container) return;

    if (!state.savedCards || state.savedCards.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-on-surface-variant opacity-60">
                <span class="material-symbols-outlined text-3xl mb-1">credit_card_off</span>
                <p class="text-xs">No saved payment methods found.</p>
            </div>
        `;
        return;
    }

    let html = '';
    state.savedCards.forEach(card => {
        const icon = card.brand.toLowerCase() === 'visa' ? 'credit_card' : 'credit_card'; 
        const brandColor = card.brand.toLowerCase() === 'visa' ? 'text-primary' : 'text-secondary';
        
        html += `
            <div class="flex items-center justify-between p-4 bg-slate-50 border border-outline-variant/40 rounded-2xl relative group">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined ${brandColor} text-xl">${icon}</span>
                    <div>
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-xs font-bold text-on-surface">${card.brand} ending in ${card.last4}</span>
                            ${card.isDefault ? `<span class="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-bold rounded uppercase">Default</span>` : ''}
                        </div>
                        <span class="text-[10px] text-on-surface-variant block mt-0.5">Expires ${card.expiry}</span>
                    </div>
                </div>
                <div class="flex items-center gap-1.5">
                    ${!card.isDefault ? `
                        <button onclick="setDefaultCard('${card.id}')" class="text-[10px] font-bold text-primary hover:underline cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            Set Default
                        </button>
                    ` : ''}
                    <button onclick="deleteSavedCard('${card.id}')" class="w-7 h-7 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 flex items-center justify-center transition-colors cursor-pointer" title="Delete card">
                        <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

window.showAddNewCardForm = function () {
    const form = document.getElementById('add-card-form');
    const toggleBtn = document.getElementById('btn-add-card-toggle');
    if (form) form.classList.remove('hidden');
    if (toggleBtn) toggleBtn.classList.add('hidden');
};

window.hideAddNewCardForm = function () {
    const form = document.getElementById('add-card-form');
    const toggleBtn = document.getElementById('btn-add-card-toggle');
    if (form) {
        form.classList.add('hidden');
        form.reset();
    }
    if (toggleBtn) toggleBtn.classList.remove('hidden');
};

window.handleAddNewCard = function (event) {
    event.preventDefault();
    const numberInput = document.getElementById('new-card-number').value.replace(/\s+/g, '');
    const expiryInput = document.getElementById('new-card-expiry').value.trim();
    const cvvInput = document.getElementById('new-card-cvv').value.trim();

    if (numberInput.length < 12) {
        showNotification('Invalid card number length.', 'error');
        return;
    }

    const last4 = numberInput.substring(numberInput.length - 4);
    // Simple brand detection
    const isVisa = numberInput.startsWith('4');
    const brand = isVisa ? 'Visa' : 'Mastercard';

    const newCard = {
        id: 'card-' + Date.now(),
        brand,
        last4,
        expiry: expiryInput,
        isDefault: !state.savedCards || state.savedCards.length === 0
    };

    if (!state.savedCards) state.savedCards = [];
    state.savedCards.push(newCard);

    saveState();
    renderSavedCards();
    window.hideAddNewCardForm();
    showNotification(`Added new ${brand} ending in ${last4} successfully.`, 'success');
};

window.deleteSavedCard = function (cardId) {
    if (confirm("Are you sure you want to delete this payment method?")) {
        const idx = state.savedCards.findIndex(c => c.id === cardId);
        if (idx !== -1) {
            const removed = state.savedCards.splice(idx, 1)[0];
            if (removed.isDefault && state.savedCards.length > 0) {
                state.savedCards[0].isDefault = true;
            }
            saveState();
            renderSavedCards();
            showNotification('Payment method deleted successfully.', 'success');
        }
    }
};

window.setDefaultCard = function (cardId) {
    state.savedCards.forEach(c => {
        c.isDefault = c.id === cardId;
    });
    saveState();
    renderSavedCards();
    showNotification('Default payment method updated.', 'success');
};

// 8. RENDER: BOOK PACKAGE SESSION VIEW
function renderBookPackageView() {
    const container = document.getElementById('book-package-container');
    if (!container) return;

    if (!state.pkgBooking) {
        container.innerHTML = `<p class="text-center py-12 text-on-surface-variant">No active package booking session initialized.</p>`;
        return;
    }

    const bundleId = state.pkgBooking.bundleId || 'radiance-bundle';
    const bundle = SERVICES[bundleId];
    if (!bundle) return;

    const sessionsLeft = state.activePackages[bundleId] || 0;
    const therapist = state.packageTherapists[bundleId] || THERAPISTS['siti'];

    // Initial date if null
    if (!state.pkgBooking.date) {
        const defaultDate = new Date(); // Use actual current date!
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        state.pkgBooking.date = defaultDate.toLocaleDateString('en-US', options);
    }
    if (!state.pkgBooking.time) {
        state.pkgBooking.time = '11:00 AM';
    }

    // Parse selected date
    let selDate = new Date(state.pkgBooking.date);
    if (isNaN(selDate.getTime())) {
        selDate = new Date();
    }

    // Month to render
    const baseMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const renderMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + (state.pkgBooking.monthOffset || 0), 1);
    const monthText = renderMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Calendar Cells offset
    const startDayOfWeek = renderMonth.getDay();
    let calendarDaysHtml = '';
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDaysHtml += '<div></div>'; 
    }

    const year = renderMonth.getFullYear();
    const month = renderMonth.getMonth();
    const tempDate = new Date(year, month + 1, 0);
    const daysInMonth = tempDate.getDate();

    const today = new Date(); // Actual today
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0, 0, 0, 0);

        const isDisabled = cellDate < today;
        const isSelected = selDate.getDate() === day && selDate.getMonth() === month && selDate.getFullYear() === year;

        calendarDaysHtml += `
            <button ${isDisabled ? 'disabled' : ''} onclick="selectPackageDate(${day})" class="h-10 w-10 mx-auto rounded-full font-body-sm text-body-sm flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-transparent ${isSelected ? 'bg-[#50613f] text-white shadow-md font-bold' : 'text-on-surface hover:bg-surface-container-high'}">
                ${day}
            </button>
        `;
    }

    // Time Slots
    const morningSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
    const afternoonSlots = ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

    let morningSlotsHtml = '';
    morningSlots.forEach(t => {
        const isSelected = state.pkgBooking.time === t;
        const isOccupied = t === '12:00 PM';
        morningSlotsHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectPackageTime('${t}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-[#50613f] bg-[#50613f]/10 text-[#50613f] font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-[#50613f] hover:bg-[#50613f]/5'}">
                ${t.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });

    let afternoonSlotsHtml = '';
    afternoonSlots.forEach(t => {
        const isSelected = state.pkgBooking.time === t;
        const isOccupied = t === '03:00 PM';
        afternoonSlotsHtml += `
            <button ${isOccupied ? 'disabled' : ''} onclick="selectPackageTime('${t}')" class="px-4 py-2 rounded-lg border font-body-sm text-xs transition-colors ${isSelected ? 'border-[#50613f] bg-[#50613f]/10 text-[#50613f] font-bold' : isOccupied ? 'border-outline-variant text-on-surface opacity-30 cursor-not-allowed bg-surface-container' : 'border-outline-variant text-on-surface hover:border-[#50613f] hover:bg-[#50613f]/5'}">
                ${t.replace(' AM', '').replace(' PM', '')}
            </button>
        `;
    });

    container.innerHTML = `
        <div class="mb-8 text-center md:text-left">
            <h1 class="font-serif text-3xl text-[#1E293B] font-bold mb-1">Use Package Session</h1>
            <p class="font-body-sm text-xs text-on-surface-variant">Schedule a treatment session for your active package.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left side: Calendar & Time Slots -->
            <div class="lg:col-span-8 space-y-6">
                <div class="glass-panel rounded-3xl p-6 md:p-8 bg-white shadow-sm border border-outline-variant/30">
                    <h2 class="font-title-md text-base text-[#50613f] mb-6 flex items-center gap-2 font-semibold">
                        <span class="material-symbols-outlined">calendar_month</span> Select Date &amp; Time
                    </h2>

                    <!-- Calendar Card -->
                    <div class="mb-8 border border-outline-variant/30 rounded-2xl p-4 bg-white/45">
                        <div class="flex justify-between items-center mb-6">
                            <button onclick="changePackageMonth(-1)" class="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                                <span class="material-symbols-outlined">chevron_left</span>
                            </button>
                            <span class="font-title-md text-base font-semibold text-[#1E293B]">${monthText}</span>
                            <button onclick="changePackageMonth(1)" class="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                                <span class="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                        <div class="grid grid-cols-7 gap-2 text-center mb-2">
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Sun</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Mon</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Tue</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Wed</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Thu</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Fri</div>
                            <div class="font-label-caps text-[10px] text-outline uppercase font-semibold">Sat</div>
                        </div>
                        <div class="grid grid-cols-7 gap-2 text-center">
                            ${calendarDaysHtml}
                        </div>
                    </div>

                    <!-- Time Slots Card -->
                    <div class="border-t border-outline-variant/30 pt-6">
                        <div class="space-y-6">
                            <div>
                                <h3 class="font-title-md text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Morning (09:00 - 12:00)</h3>
                                <div class="flex flex-wrap gap-3">
                                    ${morningSlotsHtml}
                                </div>
                            </div>
                            <div>
                                <h3 class="font-title-md text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Afternoon (13:00 - 18:00)</h3>
                                <div class="flex flex-wrap gap-3">
                                    ${afternoonSlotsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right side: Sidebar Summary -->
            <div class="lg:col-span-4">
                <div class="glass-panel rounded-3xl p-6 md:p-8 bg-white border border-outline-variant/30 shadow-sm space-y-6 sticky top-8 flex flex-col justify-between">
                    <div>
                        <h2 class="font-serif text-lg text-[#1E293B] font-bold border-b border-outline-variant/20 pb-4 mb-6">Booking Summary</h2>
                        <div class="flex flex-col gap-5">
                            <!-- Service Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                                    <span class="material-symbols-outlined text-lg">spa</span>
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">SERVICE</span>
                                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${bundle.name}</h3>
                                    <p class="font-body-sm text-[11px] text-on-surface-variant">Remaining: ${sessionsLeft} Session(s)</p>
                                </div>
                            </div>
                            
                            <!-- Therapist Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                                    ${therapist && therapist.image ? `
                                        <img class="w-full h-full object-cover" src="${therapist.image}">
                                    ` : `
                                        <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center text-primary shrink-0">
                                            <span class="material-symbols-outlined text-lg">person</span>
                                        </div>
                                    `}
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">THERAPIST</span>
                                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${therapist.name}</h3>
                                    <p class="font-body-sm text-[11px] text-on-surface-variant">${therapist.role || 'Therapist'}</p>
                                </div>
                            </div>
                            
                            <!-- Schedule Info -->
                            <div class="flex gap-3 items-start">
                                <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center shrink-0 text-primary">
                                    <span class="material-symbols-outlined text-lg">calendar_month</span>
                                </div>
                                <div>
                                    <span class="font-label-caps text-[9px] text-outline mb-0.5 block uppercase font-bold tracking-wider">DATE & TIME</span>
                                    ${state.pkgBooking.date ? `
                                        <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">${state.pkgBooking.date}</h3>
                                        <p class="font-body-sm text-[11px] text-[#50613f] font-bold">${state.pkgBooking.time || 'To be selected'}</p>
                                    ` : `
                                        <h3 class="font-title-md text-xs font-semibold text-on-surface-variant"><span class="italic text-on-surface-variant opacity-60 text-xs">To be selected</span></h3>
                                    `}
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Payment Details (Prepaid Package) -->
                    <div class="border-t border-outline-variant/20 pt-4 space-y-4">
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-on-surface-variant">
                                <span>Subtotal</span>
                                <span>MYR 0.00</span>
                            </div>
                            <div class="flex justify-between text-on-surface-variant">
                                <span>Tax (7%)</span>
                                <span>MYR 0.00</span>
                            </div>
                            <div class="border-t border-outline-variant/10 pt-3 flex justify-between items-center">
                                <span class="font-bold text-[#1E293B]">Estimated Total</span>
                                <span class="font-serif text-lg font-bold text-[#1E293B]">MYR 0.00</span>
                            </div>
                        </div>

                        <!-- Confirm Actions -->
                        <div class="pt-2">
                            <button onclick="confirmPackageBooking()" class="w-full bg-[#50613f] hover:bg-[#3e4b30] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                                Confirm Session Booking <span class="material-symbols-outlined text-sm">check_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
window.renderBookPackageView = renderBookPackageView;

window.selectPackageDate = function (day) {
    const baseMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const renderMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + (state.pkgBooking.monthOffset || 0), day);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    state.pkgBooking.date = renderMonth.toLocaleDateString('en-US', options);

    saveState();
    renderBookPackageView();
};

window.selectPackageTime = function (time) {
    state.pkgBooking.time = time;
    saveState();
    renderBookPackageView();
};

window.changePackageMonth = function (offset) {
    const targetOffset = (state.pkgBooking.monthOffset || 0) + offset;
    if (targetOffset < 0) {
        showNotification('Cannot select past months.', 'info');
        return;
    }
    state.pkgBooking.monthOffset = targetOffset;
    saveState();
    renderBookPackageView();
};

window.cancelPackageBookingFlow = function () {
    state.pkgBooking = null;
    saveState();
    navigateTo('home');
};

window.confirmPackageBooking = function () {
    const bundleId = state.pkgBooking.bundleId;
    const bundle = SERVICES[bundleId];
    if (!bundle) return;

    if ((state.activePackages[bundleId] || 0) <= 0) {
        showNotification('All package sessions have been used.', 'error');
        return;
    }

    // Deduct session
    state.activePackages[bundleId]--;
    const therapist = state.packageTherapists[bundleId] || THERAPISTS['siti'];
    const resId = 'RES-' + Math.floor(1000 + Math.random() * 9000);

    // Record booking history
    state.bookings.unshift({
        id: 'booking-' + Date.now(),
        resId: resId,
        serviceName: bundle.name,
        serviceType: bundle.type,
        date: state.pkgBooking.date,
        time: state.pkgBooking.time,
        therapist: therapist.name,
        location: 'Serenity & Soul Sanctuary, 12 Orchard Road, Singapore 238886',
        price: 0,
        status: 'Upcoming'
    });

    // Record notification
    state.notifications.unshift({
        id: 'notif-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        text: `Package Session Booked: Your package session for ${bundle.name} is scheduled on ${state.pkgBooking.date} at ${state.pkgBooking.time}.`
    });

    // Populate state.booking so renderSuccessView renders it perfectly
    state.booking.service = {
        name: bundle.name,
        duration: '60 Mins',
        price: 0
    };
    state.booking.therapist = therapist;
    state.booking.date = state.pkgBooking.date;
    state.booking.time = state.pkgBooking.time;
    state.successResId = resId;

    // Reset flow states
    state.pkgBooking = null;
    saveState();
    
    // Update view widget
    renderActivePackagesWidget();
    
    // Go to success view!
    navigateTo('success');
    showNotification('Package session successfully scheduled!', 'success');
};

// 8.1 RENDER: ALL ACTIVE PACKAGES CATALOG VIEW
function renderActivePackagesView() {
    const container = document.getElementById('all-active-packages-container');
    if (!container) return;

    const pkgKeys = Object.keys(state.activePackages);
    if (pkgKeys.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-3xl border border-outline-variant/30 p-8 shadow-sm">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">package_2</span>
                <p class="text-sm font-semibold text-on-surface-variant">You have no active packages.</p>
                <p class="text-xs text-on-surface-variant/70 mt-1">Purchase a package from the services tab to start booking sessions.</p>
            </div>
        `;
        return;
    }

    const iconMap = { packages: 'package_2', massage: 'spa', facial: 'face', body: 'self_care', signature: 'star' };
    
    let html = '';
    pkgKeys.forEach(bundleId => {
        const bundle = SERVICES[bundleId];
        if (!bundle) return;
        const sessionsLeft = state.activePackages[bundleId];
        const totalSessions = state.packageTotalSessions[bundleId] || bundle.sessions || 10;
        const pct = Math.round((sessionsLeft / totalSessions) * 100);
        const isActive = sessionsLeft > 0;
        const statusBadge = isActive
            ? `<span class="bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Active</span>`
            : `<span class="bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Exhausted</span>`;
        const icon = iconMap[bundle.type] || 'spa';

        html += `
            <div class="bg-white rounded-3xl p-6 border border-outline-variant/30 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 min-h-[260px]">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <div class="w-10 h-10 rounded-lg bg-[#50613f]/10 flex items-center justify-center text-[#50613f]">
                            <span class="material-symbols-outlined text-lg">${icon}</span>
                        </div>
                        ${statusBadge}
                    </div>
                    <h3 class="font-serif text-base font-bold text-[#3c4c2b] mb-1 line-clamp-1">${bundle.name}</h3>
                    <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">${bundle.description}</p>
                    
                    <div class="mb-4">
                        <div class="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                            <span>Sessions Remaining</span>
                            <span>${sessionsLeft} / ${totalSessions}</span>
                        </div>
                        <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full bg-[#50613f] transition-all duration-500" style="width: ${pct}%"></div>
                        </div>
                    </div>
                </div>
                <div>
                    ${isActive ? `
                        <button onclick="bookPackageSession('${bundleId}')" class="w-full bg-[#FACC15] text-[#241a00] hover:bg-[#eab308] font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm">calendar_month</span> Book a Session
                        </button>
                    ` : `
                        <button disabled class="w-full bg-slate-100 text-slate-400 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                            <span class="material-symbols-outlined text-sm">check_circle</span> All Sessions Used
                        </button>
                    `}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
window.renderActivePackagesView = renderActivePackagesView;

// 8.2 DIALOG/MODAL: QR CODE TICKET MANAGER
window.openQrTicketModal = function (bookingId) {
    const modal = document.getElementById('modal-qr-ticket');
    const content = document.getElementById('qr-ticket-modal-content');
    if (!modal || !content) return;

    const booking = state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const resId = booking.resId || 'RES-2209';
    const duration = booking.serviceName.includes('Bundle') ? '60 Mins' : '90 Mins';

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-left p-2">
            <!-- Left Side Details -->
            <div class="md:col-span-7 space-y-5">
                <div class="flex items-center gap-3 pb-4 border-b border-outline-variant/30">
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">RESERVATION ID</span>
                        <span class="font-title-md text-base font-bold text-[#1E293B]">#${resId}</span>
                    </div>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-semibold border border-[#a3cfbb]">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></span> Confirmed
                    </span>
                </div>
                
                <div>
                    <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">SERVICE</span>
                    <h3 class="font-title-md text-sm font-bold text-[#1E293B]">${booking.serviceName}</h3>
                    <p class="font-body-sm text-xs text-on-surface-variant">${duration}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">THERAPIST</span>
                        <div class="flex items-center gap-2 mt-1">
                            <div class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center">
                                <span class="material-symbols-outlined text-sm text-[#50613f]">spa</span>
                            </div>
                            <span class="font-title-md text-xs font-semibold text-[#1E293B]">${booking.therapist}</span>
                        </div>
                    </div>
                    <div>
                        <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">DATE & TIME</span>
                        <span class="font-title-md text-xs font-semibold text-[#1E293B] block mt-1">${booking.date}</span>
                        <p class="font-body-sm text-xs text-[#50613f] font-bold">${booking.time}</p>
                    </div>
                </div>
                
                <div class="pt-4 border-t border-outline-variant/30">
                    <span class="font-label-caps text-[9px] text-outline uppercase font-bold tracking-wider mb-0.5 block">LOCATION</span>
                    <h3 class="font-title-md text-xs font-semibold text-[#1E293B]">Serenity &amp; Soul Sanctuary</h3>
                    <p class="font-body-sm text-xs text-on-surface-variant">${booking.location || '12 Orchard Road, Singapore 238886'}</p>
                </div>
            </div>
            
            <!-- Right Side Actions & QR -->
            <div class="md:col-span-5 flex flex-col justify-center">
                <div class="flex flex-col items-center gap-4 bg-white/45 p-6 rounded-xl border border-outline-variant/30 w-full max-w-[240px] mx-auto md:ml-auto">
                    <div class="w-32 h-32 bg-[#1E293B] rounded-lg p-2 flex items-center justify-center shrink-0">
                        <svg class="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                            <rect x="0" y="0" width="25" height="25"/>
                            <rect x="5" y="5" width="15" height="15" fill="#1E293B"/>
                            <rect x="8" y="8" width="9" height="9" fill="white"/>
                            <rect x="75" y="0" width="25" height="25"/>
                            <rect x="80" y="5" width="15" height="15" fill="#1E293B"/>
                            <rect x="83" y="8" width="9" height="9" fill="white"/>
                            <rect x="0" y="75" width="25" height="25"/>
                            <rect x="5" y="80" width="15" height="15" fill="#1E293B"/>
                            <rect x="8" y="83" width="9" height="9" fill="white"/>
                            <rect x="35" y="5" width="10" height="25"/>
                            <rect x="55" y="10" width="15" height="10"/>
                            <rect x="35" y="40" width="25" height="10"/>
                            <rect x="10" y="35" width="15" height="15"/>
                            <rect x="35" y="60" width="45" height="10"/>
                            <rect x="35" y="80" width="15" height="15"/>
                            <rect x="60" y="80" width="20" height="10"/>
                            <rect x="70" y="35" width="15" height="20"/>
                        </svg>
                    </div>
                    <span class="font-body-sm text-[10px] text-on-surface-variant text-center">Scan at reception upon arrival</span>
                    
                    <button class="w-full py-2 bg-[#EAB308] hover:bg-[#ca9b00] text-white font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all">
                        <span class="material-symbols-outlined text-xs">calendar_today</span> Add to Calendar
                    </button>
                    
                    <button class="w-full py-2 bg-transparent border border-outline text-[#1E293B] hover:bg-[#1E293B]/5 font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all">
                        <span class="material-symbols-outlined text-xs">download</span> Download Ticket
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.offsetHeight;
    modal.classList.remove('opacity-0');
};

window.closeQrTicketModal = function () {
    const modal = document.getElementById('modal-qr-ticket');
    if (!modal) return;

    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

// 9. APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(state.currentView || 'home');
    updateNavbarAuth();
});

// Mobile Hamburger Dropdown Menu Helpers
window.toggleMobileMenu = function() {
    const dropdown = document.getElementById('mobile-menu-dropdown');
    if (dropdown) {
        const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
        if (isHidden) {
            window.updateMobileMenuUI();
            dropdown.style.display = 'flex';
            dropdown.style.flexDirection = 'column';
            dropdown.style.gap = '1rem';
        } else {
            dropdown.style.display = 'none';
        }
    }
};

window.closeMobileMenu = function() {
    const dropdown = document.getElementById('mobile-menu-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
};

window.updateMobileMenuUI = function() {
    const usernameEl = document.getElementById('mobile-menu-username');
    const userroleEl = document.getElementById('mobile-menu-userrole');
    const authBtn = document.getElementById('mobile-menu-auth-btn');
    const avatarContainer = document.getElementById('mobile-menu-avatar-container');
    
    if (!usernameEl || !userroleEl || !authBtn || !avatarContainer) return;
    
    const loggedIn = isLoggedIn();
    if (loggedIn) {
        const name = localStorage.getItem('user_name') || 'Eleanor Vance';
        usernameEl.textContent = name;
        userroleEl.textContent = 'Customer';
        
        // Show avatar circle EV
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarContainer.innerHTML = `<span class="font-bold text-sm text-[#3c4c2b]">${initials}</span>`;
        avatarContainer.className = "w-12 h-12 rounded-full bg-[#50613f]/15 flex items-center justify-center overflow-hidden";
        
        // Auth button as sign out
        authBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">logout</span>Sign Out`;
        authBtn.className = "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors cursor-pointer text-sm font-semibold text-left";
    } else {
        usernameEl.textContent = 'Guest User';
        userroleEl.textContent = 'Not Logged In';
        avatarContainer.innerHTML = `<span class="material-symbols-outlined text-[24px]">person</span>`;
        avatarContainer.className = "w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center overflow-hidden";
        
        // Auth button as sign in
        authBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">login</span>Sign In`;
        authBtn.className = "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#50613f]/10 text-[#50613f] transition-colors cursor-pointer text-sm font-semibold text-left";
    }
};

window.handleMobileMenuAuth = function() {
    window.closeMobileMenu();
    const loggedIn = isLoggedIn();
    if (loggedIn) {
        handleResetAll();
    } else {
        requireLogin(() => {});
    }
};

// Document click listener to close dropdown on click outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('mobile-menu-dropdown');
    const hamburger = document.getElementById('mobile-hamburger-btn');
    if (dropdown && dropdown.style.display !== 'none' && dropdown.style.display !== '') {
        if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    }
});


// Mobile Bottom Navigation Bar — shows Back & Continue on steps 1-3 (mobile only)
function updateMobileBottomNav(viewId) {
    const nav = document.getElementById('mobile-bottom-nav');
    const backBtn = document.getElementById('mobile-back-btn');
    const continueBtn = document.getElementById('mobile-continue-btn');
    if (!nav || !backBtn || !continueBtn) return;

    const bookingSteps = {
        'select-service':   { step: 1, back: () => resetBookingFlow(),          continueLabel: 'Continue' },
        'select-therapist': { step: 2, back: () => navigateTo('select-service'), continueLabel: 'Continue' },
        'select-time':      { step: 3, back: () => navigateTo('select-therapist'), continueLabel: 'Continue' },
    };

    const stepConfig = bookingSteps[viewId];
    if (stepConfig) {
        nav.style.display = 'flex';
        // Wire up Back
        backBtn.onclick = stepConfig.back;
        // Wire up Continue (reuse existing nextStep validation)
        continueBtn.textContent = '';
        continueBtn.innerHTML = `${stepConfig.continueLabel} <span class="material-symbols-outlined text-[18px]">arrow_forward</span>`;
        continueBtn.onclick = () => window.nextStep(stepConfig.step);
    } else {
        nav.style.display = 'none';
    }
}
// Expose so navigateTo (declared before this function) can call it
window.updateMobileBottomNav = updateMobileBottomNav;
