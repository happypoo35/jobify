const Spinner = ({ size, color }) => {
  return (
    <div
      className={`spinner ${size ? `spinner-${size}` : ""} ${
        color ? `spinner-${color}` : ""
      }`}
    />
  );
};

export default Spinner;
