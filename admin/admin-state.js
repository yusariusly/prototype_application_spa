// Shared State for Serenity & Soul Admin Interface
// Implements localStorage persistence for a fully interactive prototype.

const DEFAULT_SERVICES = [
  { id: 'radiance-bundle', name: 'Radiance Facial Bundle', price: 850, regularPrice: 950, duration: 60, category: 'Packages', desc: "Commit to your skin's health with our 10-session package. Regular treatments yield lasting, radiant results. Enjoy significant savings when booking this comprehensive care package.", img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: true },
  { id: 'aromatherapy-bundle', name: 'Aromatherapy Massage Package (10 Sessions)', price: 1000, regularPrice: 1200, duration: 60, category: 'Packages', desc: 'Pre-purchase 10 sessions of our signature Aromatherapy Massage and save. Valid for 12 months.', img: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'half-day-spa-package', name: 'Half-Day Spa Package', price: 250, regularPrice: 300, duration: 180, category: 'Packages', desc: 'Enjoy a combination of aromatherapy massage, facial, and body scrub for 3 full hours of ultimate relaxation.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', showOnHome: true },
  { id: 'aromatherapy-massage', name: 'Aromatherapy Massage', price: 120, duration: 60, category: 'Massage', desc: 'Deep relaxation massage using selected essential oils that soothe the nervous system and relieve muscle tension. A holistic experience.', img: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&w=800&q=80', showOnHome: true },
  { id: 'deep-tissue', name: 'Serenity Signature Deep Tissue', price: 150, duration: 90, category: 'Therapeutic', desc: 'Intensive treatment focusing on deep muscle layers to restore the body from chronic fatigue.', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'radiance-organic-facial', name: 'Facial Rejuvenation', price: 95, duration: 60, category: 'Skincare', desc: 'Brightening facial treatment with organic plant extracts.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: true },
  { id: 'hot-stone', name: 'Hot Stone Therapy', price: 165, duration: 90, category: 'Signature', desc: 'Basalt stones are heated and placed on key energy points to melt away tension and restore vital energy flow.', img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'signature-soul', name: 'Signature Soul Massage', price: 190, duration: 120, category: 'Signature', desc: "A personalized fusion of Swedish, Shiatsu, and Reflexology techniques tailored to your body's specific needs.", img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'illuminating-peel', name: 'Illuminating Peel', price: 95, duration: 45, category: 'Skincare', desc: 'Fruit enzymes to brighten and smooth dull skin.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'pure-hydration', name: 'Pure Hydration', price: 120, duration: 60, category: 'Skincare', desc: 'Deep hydration facial restoring radiance.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', showOnHome: false },
  { id: 'detox-body-scrub', name: 'Body Scrub', price: 85, duration: 30, category: 'Body', desc: 'Exfoliating treatment with natural sea salts.', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', showOnHome: true }
];

const DEFAULT_STAFF = [
  { id: 'stf-1', name: 'Siti Rahma', specialization: 'Deep Tissue', tags: ['Deep Tissue', 'Reflexology'], rating: 4.9, reviews: 120, status: 'Active', avatar: 'SR', color: 'rgba(105,122,86,0.25)', textColor: '#3c4c2b', img: '' },
  { id: 'stf-2', name: 'Budi Santoso', specialization: 'Acupuncture', tags: ['Acupuncture', 'Therapeutic'], rating: 4.8, reviews: 85, status: 'Active', avatar: 'BS', color: '#dde4e3', textColor: '#45483f', img: '' },
  { id: 'stf-3', name: 'Lestari Ayu', specialization: 'Holistic Facial', tags: ['Holistic Facial', 'Skin Care'], rating: 5.0, reviews: 42, status: 'Active', avatar: 'LA', color: '#e8e2d6', textColor: '#1e1c14', img: '' },
  { id: 'stf-4', name: 'Elena Rossi', specialization: 'Aromatherapy', tags: ['Aromatherapy', 'Massage'], rating: 4.7, reviews: 63, status: 'Active', avatar: 'ER', color: '#d6e9bd', textColor: '#111f05', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXL1nXvHoMpWBFsWneY6ACc6JQ_VKO_v2oSlwtQVZc-FWNW2VuAbUHLk5GqiSuek7bIeMnvfNXdEZf4L6cuC4IFMx6ePqcI7WDBfvUnP_jD0mGvM220IeAc8iNLtSzyDAq3YFbqEFmpzukgL815IuiITu_N9Y08FzpLJRdCfl1LXNLIAi3jwRANg85m7DdZVx3B_E1dh8Ok9TMbuG8YYgdlnrhKrlFYMmb3mBDexoGKCGazk2j6AGsqQ' },
  { id: 'stf-5', name: 'Sarah Lin', specialization: 'Lead Esthetician', tags: ['Facial Therapy', 'Anti-Aging'], rating: 5.0, reviews: 42, status: 'On Leave', avatar: 'SL', color: '#e8efef', textColor: '#75786e', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdj4trpzamnfWlTIxIHxZdnFubSewIWpR395mGHVaXj0VFcRztpDs19DvEoz7IZSFDWcCSZZ00vfU1Fpv15n4nDohZzyyZ0vGnR_gtoGepVvp_GbdsXE3l6sHOE_Cv69W9dHR5xp7O5VanfAlOaRUNkehCWFaXGtBn2fz5Uyfc6IMdD6j9AOdU4pxf6LknCWqAY_yEZTMZ_blnoyfLuzgpV-6mqEyFyTws9f91EEKBbKGXNVO4DZl6Aw' }
];

const DEFAULT_RESERVATIONS = [
  { id: 'RES-001', customer: 'Eleanor Vance', service: 'Deep Tissue', therapistId: 'stf-4', timeSlot: '10:00', duration: 120, date: '2025-07-03', status: 'Confirmed' },
  { id: 'RES-002', customer: 'Mr. Reza', service: 'Express Massage', therapistId: 'stf-1', timeSlot: '13:00', duration: 60, date: '2025-07-03', status: 'Pending' },
  { id: 'RES-003', customer: 'Diana K.', service: 'Acupuncture', therapistId: 'stf-2', timeSlot: '09:00', duration: 60, date: '2025-07-03', status: 'Pending' },
  { id: 'RES-004', customer: 'Hendra K.', service: 'Acupuncture', therapistId: 'stf-2', timeSlot: '11:00', duration: 60, date: '2025-07-03', status: 'Confirmed' },
  { id: 'RES-005', customer: 'Nia Ramadhani', service: 'Premium Glow Facial', therapistId: 'stf-3', timeSlot: '13:00', duration: 120, date: '2025-07-03', status: 'Confirmed' },
  { id: 'RES-006', customer: 'James W.', service: 'Relaxation Massage', therapistId: 'stf-4', timeSlot: '15:00', duration: 60, date: '2025-07-03', status: 'Pending' }
];

const DEFAULT_ROOMS = [
  { id: 1, name: 'Room 1', status: 'Occupied' },
  { id: 2, name: 'Room 2', status: 'Occupied' },
  { id: 3, name: 'Room 3', status: 'Vacant' },
  { id: 4, name: 'Room 4', status: 'Occupied' },
  { id: 5, name: 'Room 5', status: 'Vacant' }
];

// Helper to initialize local storage
function initStorage() {
  const existing = localStorage.getItem('admin_services');
  // Check if existing structure has the updated Aromatherapy Package regularPrice (1200)
  if (!existing || !existing.includes('1200')) {
    localStorage.setItem('admin_services', JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem('admin_staff')) {
    localStorage.setItem('admin_staff', JSON.stringify(DEFAULT_STAFF));
  }
  if (!localStorage.getItem('admin_reservations')) {
    localStorage.setItem('admin_reservations', JSON.stringify(DEFAULT_RESERVATIONS));
  }
  if (!localStorage.getItem('admin_rooms')) {
    localStorage.setItem('admin_rooms', JSON.stringify(DEFAULT_ROOMS));
  }
}

// Initialize immediately
initStorage();

// Data accessor functions
const AdminState = {
  getServices: () => JSON.parse(localStorage.getItem('admin_services')),
  saveServices: (data) => localStorage.setItem('admin_services', JSON.stringify(data)),
  
  getStaff: () => JSON.parse(localStorage.getItem('admin_staff')),
  saveStaff: (data) => localStorage.setItem('admin_staff', JSON.stringify(data)),

  getReservations: () => JSON.parse(localStorage.getItem('admin_reservations')),
  saveReservations: (data) => localStorage.setItem('admin_reservations', JSON.stringify(data)),

  getRooms: () => JSON.parse(localStorage.getItem('admin_rooms')),
  saveRooms: (data) => localStorage.setItem('admin_rooms', JSON.stringify(data)),

  // Add Reservation
  addReservation: (res) => {
    const list = AdminState.getReservations();
    const newId = 'RES-' + String(list.length + 1).padStart(3, '0');
    const newRes = { id: newId, ...res };
    list.push(newRes);
    AdminState.saveReservations(list);
    return newRes;
  },

  // Edit / Update Reservation status
  updateReservationStatus: (id, status) => {
    const list = AdminState.getReservations();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = status;
      AdminState.saveReservations(list);
    }
  },

  // Add Staff
  addStaff: (member) => {
    const list = AdminState.getStaff();
    const newId = 'stf-' + (list.length + 1);
    const avatar = member.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const newMember = {
      id: newId,
      avatar,
      rating: 5.0,
      reviews: 0,
      color: '#e8efef',
      textColor: '#45483f',
      ...member
    };
    list.push(newMember);
    AdminState.saveStaff(list);
    return newMember;
  },

  // Toggle Room Status
  toggleRoomStatus: (id) => {
    const rooms = AdminState.getRooms();
    const room = rooms.find(r => r.id === id);
    if (room) {
      room.status = room.status === 'Occupied' ? 'Vacant' : 'Occupied';
      AdminState.saveRooms(rooms);
    }
  },

  // Toggle Home Visibility
  toggleShowOnHome: (id) => {
    const list = AdminState.getServices();
    const srv = list.find(s => s.id === id);
    if (srv) {
      if (!srv.showOnHome) {
        const featuredCount = list.filter(s => s.showOnHome).length;
        if (featuredCount >= 5) {
          alert("Maximum of 5 featured services/packages can be displayed on the homepage.");
          return false;
        }
      } else {
        if (srv.bestValue) {
          srv.bestValue = false;
        }
      }
      srv.showOnHome = !srv.showOnHome;
      AdminState.saveServices(list);
      return true;
    }
    return false;
  },

  // Toggle Best Value (Star)
  toggleBestValue: (id) => {
    const list = AdminState.getServices();
    const srv = list.find(s => s.id === id);
    if (srv) {
      if (!srv.showOnHome) {
        alert("Only services/packages featured on the homepage (with the home icon active) can be marked as Best Value.");
        return false;
      }
      const wasBestValue = srv.bestValue;
      list.forEach(s => {
        s.bestValue = false;
      });
      srv.bestValue = !wasBestValue;
      AdminState.saveServices(list);
      return true;
    }
    return false;
  }
};
window.AdminState = AdminState;
