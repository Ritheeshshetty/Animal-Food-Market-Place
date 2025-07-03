import BrowseProducts from "../pages/customer/BrowseProducts";
import useAuth from "../hooks/useAuth";
import CustomerNav from "../components/CustomerNav";
export default function BrowseProductsWrapper() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "customer" && <CustomerNav />}
      <BrowseProducts/>
    </>
  );
}
