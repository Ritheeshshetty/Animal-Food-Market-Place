import React from "react";
import useAuth from "../hooks/useAuth";
import CustomerNav from "../components/CustomerNav";
import CartScreen from "../pages/customer/CartScreen";

export default function CartPageWrapper() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "customer" && <CustomerNav />}
      <CartScreen />
    </>
  );
}
