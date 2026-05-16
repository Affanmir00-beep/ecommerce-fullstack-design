# BrandStore - Premium E-Commerce Platform

![BrandStore Cover](public/assets/interior/1.jpg) <!-- Assuming this exists, acts as a nice header -->

**Live Demo:** 👉 [Click Here to View Live Site] https://ecommerce-fullstack-design-pi-mauve.vercel.app/  
**GitHub Repository:** 👉 [Click Here to View Source Code] https://github.com/Affanmir00-beep/ecommerce-fullstack-design

---

## 📖 Overview
BrandStore is a modern, fully-functional MERN-stack e-commerce web application. It features a stunning, responsive frontend UI alongside a robust Node.js backend. Built with a focus on seamless user experience, it provides a comprehensive digital storefront for browsing products and an exclusive administrative dashboard for inventory management.

## ✨ Key Features
- **Modern User Interface:** Highly responsive and visually premium UI designed using TailwindCSS and Framer Motion for smooth micro-animations.
- **Dynamic Product Catalog:** Extensive catalog with search, filtering (by category, brand, condition, and price), and sorting capabilities.
- **Admin Dashboard:** Secure, role-based admin panel to effortlessly Create, Read, Update, and Delete (CRUD) products.
- **Authentication System:** Secure user registration and login utilizing JWT (JSON Web Tokens) and bcrypt password hashing.
- **Cloud Database:** Integrated with MongoDB Atlas for reliable, live data persistence.
- **Serverless Ready:** Backend fully optimized for serverless deployment on Vercel.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (v19)** - UI Framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - High-performance animations
- **React Router DOM** - Frontend routing

### Backend
- **Node.js & Express.js** - Server environment and API framework
- **MongoDB & Mongoose** - NoSQL Database and ODM
- **JWT & bcryptjs** - Authentication and security
- **CORS & dotenv** - Environment and cross-origin resource management

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) Account (or local MongoDB installation)

### 1. Clone the repository
```bash
git clone https://github.com/Affanmir00-beep/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Install Dependencies
Install the required packages for both the frontend and backend.
```bash
# Install frontend dependencies
npm install

# Install backend dependencies (if separate package.json exists)
# OR if it's a monolithic setup:
npm install express mongoose cors dotenv jsonwebtoken bcryptjs multer
```

### 3. Environment Variables
Create a `.env` file inside the `server/` directory and configure the following variables:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development  
```

### 4. Seed the Database (Optional)
To populate the database with sample products and the default Admin account:
```bash
node server/seed.cjs
```
*(Default Admin login - Email: `admin@brandstore.com` | Password: `admin123`)*

### 5. Run the Application
You will need two terminals to run the application locally:

**Terminal 1 (Frontend):**
```bash
npm run dev
```
**Terminal 2 (Backend):**
```bash
node server/index.cjs
```
The app will be running at `http://localhost:5173`.

---

## 📡 API Endpoints Summary

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate user & get token
- `GET /me` - Get current user profile (Protected)

### Product Routes (`/api/products`)
- `GET /` - Fetch all products (supports query parameters for filtering/searching)
- `GET /featured` - Fetch top featured products
- `GET /:id` - Fetch single product details
- `POST /` - Create a new product (Admin Only)
- `PUT /:id` - Update a product (Admin Only)
- `DELETE /:id` - Delete a product (Admin Only)

---

## ☁️ Deployment
This project is configured and optimized for Vercel. 
- **Frontend:** Built via standard Vite build commands.
- **Backend:** Configured via `vercel.json` to act as serverless functions.
- Ensure that `MONGODB_URI` and `JWT_SECRET` are added to your Vercel Project Settings under **Environment Variables** prior to deployment.

---
*Documentation generated for project submission.*
