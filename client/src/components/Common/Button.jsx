import { FiCheckCircle } from "react-icons/fi";
import { Spinner } from ".";

import { useSelector } from "react-redux";
import { selectAlert } from "app/slice.global";

const Button = ({
  isLoading,
  loadingMsg = "Processing...",
  showAlert,
  className,
  children,
  ...props
}) => {
  const alert = useSelector(selectAlert);

  const message = isLoading ? (
    <>
      <Spinner />
      {loadingMsg}
    </>
  ) : showAlert && alert ? (
    <>
      <FiCheckCircle />
      {alert.msg}
    </>
  ) : (
    children
  );

  return (
    <button
      {...props}
      className={`${className}${isLoading ? ` btn-loading` : ""}${
        showAlert && alert ? ` btn-${alert.type}` : ""
      }`}
    >
      {message}
    </button>
  );
};

export default Button;
