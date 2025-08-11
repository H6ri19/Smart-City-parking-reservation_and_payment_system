live https://cheerful-lollipop-c114f8.netlify.app/

# Smart City Parking Reservation and Payment System
🚗 Smart City Parking Reservation and Payment System
An end-to-end full-stack solution for reserving, managing, and paying for smart city parking spaces. Supports user and admin dashboards, live slot tracking, number plate detection, and Razorpay integration for secure payments.

📸 Screenshots
User Panel		 
<img width="1920" height="3671" alt="Prescripto - Homepage" src="https://github.com/user-attachments/assets/5d6c7713-a680-4ce0-8ca2-840a0d07defc" />


Admin Dashboard
![1753035848448](https://github.com/user-attachments/assets/7f741567-5252-4c20-9d04-6d1b4dae48fc)


Parking Slots Map
![1753035849029](https://github.com/user-attachments/assets/3348827d-a216-4234-8d6a-d4c58cfbd90e)


# 🚀 Features
🔐 User Authentication (JWT, bcrypt)

📍 Live Location & Zone Map

🅿️ Real-time Parking Slot Booking

💳 Razorpay Payment Integration

🧑‍💼 Admin Panel: Manage users, parking slots, and bookings

📄 User Booking History & Profile

☁️ Cloudinary Image Upload

🧾 Invoice Generation & 📷 Number Plate Recognition (ALPR ready) || (Coming soon)

# 🧰 Tech Stack
Frontend:

React 19 + Vite

Tailwind CSS

React Router v7.6.2

Leaflet + React-Leaflet (Maps)

Backend:

Node.js + Express

MongoDB + Mongoose

Razorpay Payment API

Cloudinary (image uploads)

JWT Authentication

Multer (file handling)

env
Copy
Edit
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

 Start All Services
bash
Copy
Edit
# From project root
npm run dev

# 🔑 Routes
User API: /api/parking/...

Admin API: /api/admin/...

Booking API: /api/booking/...

# 🤝 Contributing
Fork the repo

Create a feature branch git checkout -b feature-name

Commit your changes git commit -m 'Add some feature'

Push to the branch git push origin feature-name

Create a Pull Request
