// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import CustomerDashboard from "./pages/CustomerDashboard";
// import SupplierDashboard from "./pages/SupplierDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Users from "./pages/admin/Users.jsx";
// import Orders from "./pages/admin/Orders.jsx";
// import Products from "./pages/admin/Products.jsx";
// import AddProductPage from "./pages/supplier/AddProductPage.jsx";
// import SupplierInventoryPage from "./pages/supplier/SupplierInventoryPage.jsx";
// import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import ProductDetails from "./pages/customer/ProductDetails.jsx";
// import CartScreen from "./pages/customer/CartScreen.jsx";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/customer"
//           element={
//             <ProtectedRoute allowedRoles={["customer"]}>
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/supplier"
//           element={
//             <ProtectedRoute allowedRoles={["supplier"]}>
//               <SupplierDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/supplier/add-product"
//           element={
//             <ProtectedRoute allowedRoles={["supplier"]}>
//               <AddProductPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/supplier/inventory"
//           element={
//             <ProtectedRoute allowedRoles={["supplier"]}>
//               <SupplierInventoryPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/supplier/orders"
//           element={
//             <ProtectedRoute allowedRoles={["supplier"]}>
//               <SupplierOrdersPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <Users />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/orders"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/products"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <Products />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute allowedRoles={["customer"]}>
//               <ProductDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute allowedRoles={["customer"]}>
//               <CartScreen/>
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 fallback */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//     <ToastContainer />
//     </>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import SupplierDashboard from "./pages/SupplierDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import AddProductPage from "./pages/supplier/AddProductPage.jsx";
import SupplierInventoryPage from "./pages/supplier/SupplierInventoryPage.jsx";
import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetails from "./pages/customer/ProductDetails.jsx";
import CartScreen from "./pages/customer/CartScreen.jsx";
import CustomerNav from "./components/CustomerNav.jsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrowseProducts from "./pages/customer/BrowseProducts.jsx";
import LandingPage from "./pages/LandingPage.jsx";

// Layout wrapper for customer routes
function CustomerLayout() {
  return (
    <>
      <CustomerNav />
      <CustomerDashboard />
    </>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Customer Routes with CustomerNav */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/browse"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerNav />
                 <BrowseProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <>
                  <CustomerNav />
                  <ProductDetails />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <>
                  <CustomerNav />
                  <CartScreen />
                </>
              </ProtectedRoute>
            }
          />

          {/* Supplier Routes */}
          <Route
            path="/supplier/dashboard"
            element={
              <ProtectedRoute allowedRoles={["supplier"]}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/add-product"
            element={
              <ProtectedRoute allowedRoles={["supplier"]}>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/inventory"
            element={
              <ProtectedRoute allowedRoles={["supplier"]}>
                <SupplierInventoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/orders"
            element={
              <ProtectedRoute allowedRoles={["supplier"]}>
                <SupplierOrdersPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
