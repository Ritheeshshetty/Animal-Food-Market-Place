# 🐾 Animal Food Marketplace 🛒

A modern, user-friendly platform for buying and selling pet and livestock food products. Customers browse and buy healthy foods for their animals, suppliers manage listings and analyze business performance, and admins ensure everything runs smoothly.

![alt text](<Brown Simple Discount Food Pet Banner.png>) 📦 At a Glance

|       | Customers     | Suppliers        | Admin               |
|-------|--------------|------------------|---------------------|
| 🛍️   | Browse & buy | Manage products  | Approve suppliers   |
| 📝   | Track orders  | Inventory tools  | User management     |
| ⭐   | Review items  | View analytics   | Platform analytics  |
| 🔒   | Secure login  | Manage feedback  | Content moderation  |

## 🌟 Features

- **Role-based dashboards:** Custom experiences for customers, suppliers, and admins.
- **Product search and filters:** Quickly find the perfect pet or livestock food.
- **Drag & drop inventory management:** Effortlessly add and update products.
- **Real-time order tracking:** Get instant status updates.
- **Interactive reviews:** Leave & read feedback.
- **Data-driven analytics:** Visualize your sales and growth.
- **JWT authentication:** Secure access and privacy.
- **Mobile-first responsive UI:** Looks beautiful on any device.

## 🏗️ Project Structure


Directory Tree

```txt
backend/
  ├── app.js            # Express app setup
  ├── server.js         # Server entry
  ├── package.json
  ├── .env
  ├── config/
  ├── controllers/
  ├── middlewares/
  ├── models/
  ├── routes/
  ├── uploads/
  └── utils/
frontend/
  ├── src/
      ├── components/   # Reusable UI
      ├── pages/        # Route components
      ├── hooks/        # Custom hooks
      └── api.js
  ├── public/
  ├── index.html
  ├── package.json
  └── vite.config.js
```


## 🚚 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
# Create a .env file:
# MONGODB_URI=...
# JWT_SECRET=...
# PORT=5000
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
# Create a .env file:
# VITE_API_BASE_URL=http://localhost:5000
npm run dev
```

## 🌐 Key API Endpoints

| Category       | Endpoint                | Description                    |
|----------------|-------------------------|--------------------------------|
| Auth           | POST /api/auth/register | Register user                  |
|                | POST /api/auth/login    | User login                     |
| Products       | GET /api/products       | List products                  |
|                | POST /api/products      | Supplier: add product          |
| Orders         | GET /api/orders         | Get user's orders              |
|                | POST /api/orders        | Create order                   |
| Reviews        | POST /api/reviews       | Submit review                  |

*See backend/routes for the full API documentation.*

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, CSS3, React Icons
- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Security:** JWT auth, bcrypt for passwords

## 🎨 Screenshots
ADMIN:

Admin page Dashboard:
![alt text](image-3.png)
![alt text](image-4.png)

Admin Page User:
![alt text](image-5.png)

Admin Product Management:
![alt text](image-6.png)

Admin Order Management:
![alt text](image-7.png)

SUPPLIER:

Supplier Dashboard:
![alt text](image-8.png)

Supplier add product section:
![alt text](image-9.png)

Supplier Inverntory Managment:
![alt text](image-10.png)

Supplier View Orders:
![alt text](image-11.png)

Supplier Product Management:
![alt text](image-12.png)

Supplier Sales Report:
![alt text](image-13.png)


Supplier Customer Reviews:
![alt text](image-14.png)

CUSTOMER:

Customer Dashboard:
![alt text](image-15.png)

Customer Recommended section based on top selling and top rated products:
![alt text](image-17.png)

Customer Browse Products:
![alt text](image-16.png)

Customer Cart page:
![alt text](image-18.png)

Customer Payment Page:
![alt text](image-19.png)
![alt text](image-20.png)

Customer Order Tracking:
![alt text](image-21.png) 
![alt text](image-22.png)

Customer Reviews:
![alt text](image-23.png)

Landing Page:
![alt text](image.png)

Feature Section in Landing page
![alt text](image-1.png)

Product Details Section:
![alt text](image-2.png)

## 📊 Analytics Example

```javascript
// Display supplier analytics in the dashboard:
import { useAnalytics } from '../hooks';

const SupplierDashboard = () => {
  const { sales, inventory, feedback } = useAnalytics();
  // Custom UI for visualization
};
```

## 📢 Badges

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/your-username/animal-food-marketplace](https://img.shields.io/b 🤝 Contributing

We love contributions! Please see `CONTRIBUTING.md` for guidelines, open an issue to suggest a feature, or submit a pull request to help the project grow.

## 💻 Live Demo

_Coming soon!_

## 📄 License

MIT © 2023 Animal Food Marketplace

> _Ready to make animal nutrition easy and accessible to all—one order at a time._