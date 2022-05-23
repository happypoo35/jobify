import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FiPieChart, FiUser, FiFilePlus, FiLayers } from "react-icons/fi";
import { Logo } from "components/Common";
import { useWindowSize, useOutsideClick } from "hooks";

import { useDispatch, useSelector } from "react-redux";
import { selectSidebar, toggleSidebar } from "app/slice.global";

const navItems = [
  {
    name: "Stats",
    url: ".",
    icon: <FiPieChart />,
  },
  {
    name: "All Jobs",
    url: "all-jobs",
    icon: <FiLayers />,
  },
  {
    name: "Add Job",
    url: "add-job",
    icon: <FiFilePlus />,
  },
  {
    name: "Profile",
    url: "profile",
    icon: <FiUser />,
  },
];

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const { tablet } = useWindowSize();

  const dispatch = useDispatch();
  const sidebar = useSelector(selectSidebar);

  useOutsideClick(sidebarRef, (e) => {
    if (!tablet || e.target.classList.contains("btn-icon")) return;
    dispatch(toggleSidebar({ value: false }));
  });

  useEffect(() => {
    if (tablet) {
      dispatch(toggleSidebar({ value: false }));
    } else {
      dispatch(toggleSidebar({ value: true }));
    }
  }, [tablet, dispatch]);

  return (
    <aside className={`sidebar ${sidebar ? "active" : ""}`} ref={sidebarRef}>
      <div className="sidebar-content">
        <header className="sidebar-header">
          <Logo />
        </header>
        <nav className="sidebar-nav">
          {navItems.map((el, id) => (
            <NavLink
              to={el.url}
              end
              key={id}
              className="sidebar-nav-item"
              onClick={() => tablet && dispatch(toggleSidebar(false))}
            >
              {el.icon}
              {el.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
