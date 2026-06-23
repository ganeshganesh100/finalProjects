



### Backend
- **REST API**: Full-featured REST API for all operations
- **User Management**: Registration, login, and profile management
- **Room Management**: Create, update, and manage room listings
- **Booking System**: Complete booking lifecycle management
- **Availability Check**: Real-time room availability checking


### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd finalProjects
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/room-booking
JWT_SECRET=your_secret_key_here
NODE_ENV=develop
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

5. **Open in browser**
```
http://localhost:5000
```

## 📁 Project Structure

```
finalProjects/
├── public/
│   ├── index.html          # Frontend homepage
│   ├── styles.css          # CSS styling
│   └── app.js              # Frontend JavaScript
├── config/
│   └── database.js         # MongoDB configuration
├── models/
│   ├── User.js            # User data model
│   ├── Room.js            # Room data model
│   └── Booking.js         # Booking data model
├── routes/
│   ├── auth.js            # Authentication endpoints
│   ├── rooms.js           # Room management endpoints
│   ├── bookings.js        # Booking endpoints
│   └── users.js           # User profile endpoints
├── server.js              # Express server setup
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rooms
- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create new room (Admin)
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/check-availability` - Check room availability

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 💻 Frontend Usage

### 1. **Browse Rooms**
- Navigate to the Rooms section
- View all available rooms with details
- Filter by date, time, and capacity

### 2. **Book a Room**
- Click "Book Now" on a room
- Select start and end date/time
- Add optional notes
- Confirm booking

### 3. **Manage Bookings**
- View all your bookings in "My Bookings"
- Cancel bookings if needed
- See booking details and status

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with Bcrypt
- CORS protection
- Input validation on both frontend and backend
- Protected API endpoints

## 📊 Sample Data

The system comes with sample rooms:

| Room | Capacity | Price | Amenities |
|------|----------|-------|----------|
| Conference Room A | 20 | $50/hr | Projector, Whiteboard, Video Conference |
| Meeting Room B | 8 | $30/hr | Whiteboard, TV Screen |
| Training Room C | 30 | $75/hr | Projector, Smart Board, Sound System |

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register a new user
- [ ] Login with credentials
- [ ] Search rooms by date
- [ ] Book a room
- [ ] View bookings
- [ ] Cancel a booking
- [ ] Check room availability

## 🚀 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Admin dashboard
- [ ] Room reviews and ratings
- [ ] Recurring bookings
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change PORT in `.env` to an available port
- Or kill process: `lsof -ti:5000 | xargs kill`

### CORS Errors
- Ensure frontend and backend are configured with correct URLs
- Check CORS settings in `server.js`

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a final project for room booking system development.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Happy Booking! 🎉**
