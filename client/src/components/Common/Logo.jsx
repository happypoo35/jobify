import { Link } from "react-router-dom";
import logo from "assets/images/logo.svg";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";

const Logo = () => {
  const user = useSelector(selectUser);

  return (
    <Link to={user ? "/dashboard" : "/"} className="logo">
      <img src={logo} alt="Jobify" />
    </Link>
  );
};

export default Logo;
