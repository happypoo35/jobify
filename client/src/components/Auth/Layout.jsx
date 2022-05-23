import { Logo } from "components/Common";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="main-auth container">
      <section className="auth-card" aria-label="authorization">
        <Logo />
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
