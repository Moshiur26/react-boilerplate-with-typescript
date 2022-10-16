import { FC, ReactElement, ReactNode } from "react";
// import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRoutePrpos {
  allowedRights: string[];
}

const PrivateRoute: FC<PrivateRoutePrpos> = ({ allowedRights }) => {
  const token = Cookies.get("token" || "");
  const role:any = Cookies.get("role" || "");
  // const auth = useAuth();

  return token && allowedRights.includes(role) ? 
  <Outlet /> : 
  <Navigate to="/login" />;
};

export default PrivateRoute;
