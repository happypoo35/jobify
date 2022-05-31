import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";
import { ReactComponent as JobifyLogo } from "assets/images/logo.svg";

const Logo = () => {
  const user = useSelector(selectUser);

  return (
    <Link to={user ? "/dashboard" : "/"} className="logo">
      <JobifyLogo alt="Jobify logo" style={{ display: "block" }} />
    </Link>
  );
};

export default Logo;
