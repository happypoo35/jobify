import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useWindowSize, useAlert } from "hooks";

import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";
import { useGetUserQuery } from "app/api.auth";
import { selectSidebar } from "app/slice.global";

const Layout = () => {
  const { pathname } = useLocation();
  const { tablet } = useWindowSize();
  useAlert();

  const user = useSelector(selectUser);
  const sidebar = useSelector(selectSidebar);
  const skip = user ? false : true;

  const { refetch } = useGetUserQuery(undefined, { skip });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  return (
    <div className={`wrapper ${tablet && sidebar ? "modal" : ""}`}>
      <Outlet />
    </div>
  );
};

export default Layout;
