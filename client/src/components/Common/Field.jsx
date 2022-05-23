import { forwardRef } from "react";

const Field = forwardRef(({ error, label, ...props }, ref) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <input ref={ref} {...props} id={`${props.name}-input`} placeholder=" " />
      <label htmlFor={`${props.name}-input`}>{label}</label>
      {error && error !== ` ` && <span className="error-msg">{error}</span>}
    </div>
  );
});

export default Field;
