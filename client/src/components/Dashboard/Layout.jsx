import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";

import Sidebar from "./Sidebar";
import { Button, Logo } from "components/Common";

import { useDispatch } from "react-redux";
import { useLogoutMutation } from "app/api.auth";
import { toggleSidebar } from "app/slice.global";

const Layout = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(toggleSidebar({ value: false }));
    } catch (err) {}
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="container">
            <button
              className="btn-icon"
              aria-label="toggle menu"
              onClick={() => dispatch(toggleSidebar())}
            >
              <FaAlignLeft />
            </button>
            <h1 className="h3">Dashboard</h1>
            <Logo />
            <Button
              className="btn"
              onClick={handleLogout}
              isLoading={isLoading}
            >
              Logout
            </Button>
          </div>
        </header>
        <main className="dashboard-main container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
