import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectAlert, setAlert } from "app/slice.global";

const useAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector(selectAlert);

  useEffect(() => {
    if (!alert) return;
    setTimeout(() => dispatch(setAlert(null)), 2000);
  }, [alert, dispatch]);

  return null;
};

export default useAlert;
