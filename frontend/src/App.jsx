import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import AddProductPage from "./pages/supplier/AddProductPage.jsx";
import SupplierInventoryPage from "./pages/supplier/SupplierInventoryPage.jsx";
import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/add-product"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/inventory"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierInventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/orders"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
