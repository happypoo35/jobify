import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const doc = document.documentElement;
      doc.style.setProperty(`--app-height`, `${window.innerHeight}px`);
      setWindowSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktop = windowSize > 1024;
  const tablet = windowSize <= 768;
  const mobile = windowSize <= 576;

  return { desktop, tablet, mobile };
};

export default useWindowSize;
