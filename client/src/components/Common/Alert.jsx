import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectMessage, setMessage } from "app/slice.global";

const Alert = () => {
  const messageRef = useRef(null);

  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  useEffect(() => {
    messageRef?.current?.addEventListener("animationend", () =>
      dispatch(setMessage(null))
    );
  }, [message, dispatch]);

  if (!message) return;

  return (
    <div ref={messageRef} className={`alert alert-${message.type}`}>
      {message.msg}
    </div>
  );
};

export default Alert;
