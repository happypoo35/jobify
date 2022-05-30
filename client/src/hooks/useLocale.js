const useLocale = (props) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...props?.options,
  };

  const localeDate = (date) =>
    new Date(date).toLocaleString(props?.format || "en-EN", dateOptions);

  return localeDate;
};

export default useLocale;
