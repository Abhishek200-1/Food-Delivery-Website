# 🍔 Food Delivery Website 🚀

## 📌 Overview
This is a full-stack **Food Delivery Website** built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. The platform allows users to browse restaurants, order food, track their orders, and make payments online.

<!-- ![Website Preview](https://via.placeholder.com/800x400.png?text=Food+Delivery+Website+Preview) -->

🔗 **Live Demo:** [Visit Website](#)

## ✨ Features
✅ User authentication (signup, login) 🔐  
✅ Browse restaurants and food items 🍽️  
✅ Add to cart and place orders 🛒  
✅ Real-time order tracking 📍  
✅ Payment gateway integration 💳   
✅ Admin panel for managing restaurants and orders 🛠️  

## 🛠️ Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Integration:** Stripe

## 🚀 Installation

### 📋 Prerequisites
Ensure you have the following installed:
- ✅ Node.js
- ✅ MongoDB (running locally on port 27017)
- ✅ Git

### ⚙️ Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Abhishek200-1/food-delivery-website.git
   cd food-delivery-website
   ```

2. Install dependencies for frontend, backend and admin side:
   ```bash
   cd backend
   npm install
   ```

   ```bash
   cd frontend
   npm install
   ```

   ```bash
   cd admin
   npm install
   ```

3. Create a `.env` file in the backend directory and configure the following:
   ```env
   PORT=3000
   MONGO_URI= mongodb://localhost:27017/NomNomGo
   JWT_SECRET= your_jwt_secret
   STRIPE_SECRET_KEY = your_stripe_secret_key_
   ```

4. Start the development server:
   ```bash
   cd backend
   npm eun dev
   ```
   In a separate terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   In a separate terminal, start the admin:
   ```bash
   cd admin
   npm run dev
   ```

## 📌 API Endpoints
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | /api/auth/register   | Register a new user       |
| POST   | /api/auth/login      | User login                |
| GET    | /api/restaurants     | Get all restaurants       |
| POST   | /api/orders          | Place a new order         |
| GET    | /api/orders/:id      | Get order status          |

## 🤝 Contribution
Feel free to contribute to this project. Fork the repo, make changes, and submit a pull request! 💡

## 📜 License
This project is licensed under the **MIT License**.

---
### 📞 Contact
📧 Have any questions? Reach out via [**DevBucket YouTube Channel**](https://www.youtube.com/@DevBucket).

