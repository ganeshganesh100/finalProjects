// API Configuration
const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let selectedRoomId = null;

// DOM Elements
const loginModal = document.getElementById('loginModal');
const bookingModal = document.getElementById('bookingModal');
const roomsList = document.getElementById('roomsList');
const bookingsList = document.getElementById('bookingsList');
const authForm = document.getElementById('authForm');
const bookingForm = document.getElementById('bookingForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
    setupEventListeners();
    checkUserSession();
});

// Event Listeners
function setupEventListeners() {
    document.querySelector('a[href="#login"]').addEventListener('click', openLoginModal);
    document.getElementById('bookStartDate').addEventListener('change', calculatePrice);
    document.getElementById('bookEndDate').addEventListener('change', calculatePrice);
}

// Auth Functions
function openLoginModal() {
    loginModal.classList.add('show');
}

function closeLoginModal() {
    loginModal.classList.remove('show');
}

function handleAuth(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    if (!email || !password) {
        alert('Please fill in email and password');
        return;
    }

    // Simulate auth (in production, make API call)
    currentUser = {
        email,
        name: name || email,
        phone
    };

    localStorage.setItem('user', JSON.stringify(currentUser));
    localStorage.setItem('token', 'dummy-token-' + Date.now());

    alert('Login successful!');
    closeLoginModal();
    updateNavigation();
    loadUserBookings();
}

function checkUserSession() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        updateNavigation();
        loadUserBookings();
    }
}

function updateNavigation() {
    const loginBtn = document.querySelector('.btn-login');
    if (currentUser) {
        loginBtn.textContent = `Logout (${currentUser.email})`;
        loginBtn.onclick = logout;
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    currentUser = null;
    updateNavigation();
    alert('Logged out successfully');
}

// Room Functions
async function loadRooms() {
    try {
        // Mock data for demo
        const rooms = [
            {
                id: 1,
                name: 'Conference Room A',
                description: 'Large conference room with modern amenities',
                capacity: 20,
                location: 'Floor 2',
                amenities: ['Projector', 'Whiteboard', 'Video Conference'],
                pricePerHour: 50
            },
            {
                id: 2,
                name: 'Meeting Room B',
                description: 'Small intimate meeting space',
                capacity: 8,
                location: 'Floor 1',
                amenities: ['Whiteboard', 'TV Screen'],
                pricePerHour: 30
            },
            {
                id: 3,
                name: 'Training Room C',
                description: 'Equipped for training and workshops',
                capacity: 30,
                location: 'Floor 3',
                amenities: ['Projector', 'Smart Board', 'Sound System', 'Video Conference'],
                pricePerHour: 75
            }
        ];

        displayRooms(rooms);
    } catch (error) {
        console.error('Error loading rooms:', error);
        roomsList.innerHTML = '<p>Error loading rooms. Please try again.</p>';
    }
}

function displayRooms(rooms) {
    roomsList.innerHTML = rooms.map(room => `
        <div class="room-card">
            <div class="room-image">🏢</div>
            <div class="room-content">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <div class="room-details">
                    <p>👥 Capacity: ${room.capacity} persons</p>
                    <p>📍 Location: ${room.location}</p>
                </div>
                <div class="amenities">
                    ${room.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
                <div class="price">$${room.pricePerHour}/hour</div>
                <div class="room-actions">
                    <button class="btn btn-primary" onclick="openBookingModal(${room.id}, '${room.name}', ${room.pricePerHour})">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function searchRooms() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const capacity = document.getElementById('capacity').value;

    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        alert('End date must be after start date');
        return;
    }

    // In production, filter rooms based on availability
    loadRooms();
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
}

// Booking Functions
function openBookingModal(roomId, roomName, pricePerHour) {
    if (!currentUser) {
        alert('Please login first');
        openLoginModal();
        return;
    }

    selectedRoomId = roomId;
    document.getElementById('bookRoomId').value = `${roomName} ($${pricePerHour}/hour)`;
    bookingModal.classList.add('show');
}

function closeBookingModal() {
    bookingModal.classList.remove('show');
    bookingForm.reset();
    selectedRoomId = null;
}

function calculatePrice() {
    const startDate = new Date(document.getElementById('bookStartDate').value);
    const endDate = new Date(document.getElementById('bookEndDate').value);

    if (!startDate || !endDate || startDate >= endDate) {
        return;
    }

    const hours = (endDate - startDate) / (1000 * 60 * 60);
    const pricePerHour = 50; // Get from room data
    const totalPrice = hours * pricePerHour;

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function handleBooking(event) {
    event.preventDefault();

    const startDate = document.getElementById('bookStartDate').value;
    const endDate = document.getElementById('bookEndDate').value;
    const notes = document.getElementById('bookNotes').value;

    if (!startDate || !endDate) {
        alert('Please select dates and times');
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        alert('End date must be after start date');
        return;
    }

    // Simulate booking creation
    const booking = {
        id: Math.random().toString(36).substr(2, 9),
        roomId: selectedRoomId,
        startDate,
        endDate,
        notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Booking confirmed! Check your bookings section.');
    closeBookingModal();
    loadUserBookings();
}

function loadUserBookings() {
    if (!currentUser) {
        bookingsList.innerHTML = '<p>Please <a href="#login" onclick="openLoginModal()">login</a> to view your bookings.</p>';
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>No bookings yet. <a href="#rooms">Book a room</a></p>';
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <h4>Room Booking #${booking.id.substr(0, 6)}</h4>
                <span class="booking-status status-${booking.status}">${booking.status}</span>
            </div>
            <p><strong>Date:</strong> ${new Date(booking.startDate).toLocaleString()} - ${new Date(booking.endDate).toLocaleString()}</p>
            <p><strong>Duration:</strong> ${Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60))} hours</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            <div class="room-actions">
                <button class="btn btn-secondary" onclick="cancelBooking('${booking.id}')">Cancel Booking</button>
            </div>
        </div>
    `).join('');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings = bookings.map(b => 
            b.id === bookingId ? { ...b, status: 'cancelled' } : b
        );
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadUserBookings();
        alert('Booking cancelled successfully');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === bookingModal) {
        closeBookingModal();
    }
}