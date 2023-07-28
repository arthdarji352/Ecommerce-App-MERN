import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Layout/Spinner";
import { useAuth } from "../../context/auth";

export default function AdminRoute() {
  const [ok, setOK] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOK(true);
      } else {
        setOK(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}
