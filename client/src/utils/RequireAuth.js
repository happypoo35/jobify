import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";

const RequireAuth = () => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
