import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";
const LazyLogin = lazy(() => import("@/pages/Login"));
const LazyDashboardLayout = lazy(() => import("@/pages/DashboardLayout"));
const LazyBaseLayout = lazy(() => import("@/pages/BaseLayout"));
import PrivateRoute from "./PrivateRoute";
import { roleBasedPermissions as RBP } from "@/lib/constants/roles";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";

import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// admins
import AdminList from "@/pages/admins/List";
import AdminDetails from "@/pages/admins/Details";
import AdminAdd from "@/pages/admins/Add";
import AdminEdit from "@/pages/admins/Edit";


// logout
const authToken = Cookies.get("token" || "");
axios.defaults.headers.common["Authorization"] = authToken || "";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    } else if (error?.response?.status === 500) {
      toast.error(
        "Something went wrong, please try again. If problem persist, please contact system admin."
      );
    } else {
      return error.response;
    }
  }
);



const RouteList = () => {
  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            <Suspense fallback={<LoadingSpiner />}>
              <LazyBaseLayout />
            </Suspense>
          }
        >
          <Route
            path="/*"
            element={<PrivateRoute allowedRights={RBP?.dashboard} />}
          >
            <Route
              path=""
              element={
                <Suspense fallback={<LoadingSpiner />}>
                  <LazyDashboardLayout />
                </Suspense>
              }
            >
              <Route index element={<Home />} />

              {/* dashboards */}
              <Route element={<PrivateRoute allowedRights={RBP?.dashboard} />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              {/* admins */}
              <Route element={<PrivateRoute allowedRights={RBP?.admin.list} />}>
                <Route path="admin/list" element={<AdminList />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRights={RBP?.admin.create} />}
              >
                <Route path="admin/add" element={<AdminAdd />} />
              </Route>
              <Route element={<PrivateRoute allowedRights={RBP?.admin.edit} />}>
                <Route path="admin/edit/:id" element={<AdminEdit />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRights={RBP?.admin.details} />}
              >
                <Route path="admin/details/:id" element={<AdminDetails />} />
              </Route>


              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          <Route
            path="login"
            element={
              <Suspense fallback={<LoadingSpiner />}>
                <LazyLogin />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;
