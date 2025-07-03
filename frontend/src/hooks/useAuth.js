// import { useEffect, useState } from 'react';
// import api from '../api';

// export default function useAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // 🔥 add loading

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get('/auth/me', { withCredentials: true });
//         setUser(res.data.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false); // 🔥 set loading to false after fetch
//       }
//     };

//     fetchUser();
//   }, []);

//   return { user, loading };
// }


// File: useAuth.js
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import api from '../api';
// import { addOrUpdateCartItem, fetchCart } from '../redux/slices/cartSlice';

// export default function useAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const syncGuestCartToServer = async (userData) => {
//       const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

//       if (guestCart.length > 0 && userData) {
//         for (const item of guestCart) {
//           try {
//             await dispatch(addOrUpdateCartItem(item)).unwrap();
//           } catch (err) {
//             console.error("Error syncing cart item:", err);
//           }
//         }
//         localStorage.removeItem("guest_cart");
//         dispatch(fetchCart());
//       }
//     };

//     const fetchUser = async () => {
//       try {
//         const res = await api.get('/auth/me', { withCredentials: true });
//         setUser(res.data.user);
//         await syncGuestCartToServer(res.data.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

//   return { user, loading };
// }



import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';
import { addOrUpdateCartItem, fetchCart } from '../redux/slices/cartSlice';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me', { withCredentials: true });
        const userData = res.data.user;
        setUser(userData);

        const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        if (guestCart.length > 0) {
          for (const item of guestCart) {
            await dispatch(addOrUpdateCartItem(item)).unwrap();
          }
          localStorage.removeItem("guest_cart");
          dispatch(fetchCart());
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { user, loading };
}