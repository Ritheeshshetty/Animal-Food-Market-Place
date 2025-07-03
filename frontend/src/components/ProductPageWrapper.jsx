import React from "react";
import useAuth from "../hooks/useAuth";
import CustomerNav from "../components/CustomerNav";
import ProductDetails from "../pages/customer/ProductDetails";

export default function ProductPageWrapper() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "customer" && <CustomerNav />}
      <ProductDetails />
    </>
  );
}
