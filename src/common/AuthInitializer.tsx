// src/AuthInitializer.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCredentials } from "@/store/Slices/AuthSlice/authSlice";
import axios from "axios";
import Loader from "@/components/reusable/Loader";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/user/my-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(
          setCredentials({
            user: res.data,
            token: token,
          })
        );
      })
      .catch(() => {
        localStorage.removeItem("token"); // invalid token cleanup
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loader />; // show loader until auth is ready
  }

  return <>{children}</>;
};

export default AuthInitializer;
