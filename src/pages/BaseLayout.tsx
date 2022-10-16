import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    console.log("page layout called");
  }, [location]);

  return <Outlet />;
};

export default BaseLayout;
