import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";

const CheckAuth = () => {
  const user = useSelector(selectUser);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default CheckAuth;
