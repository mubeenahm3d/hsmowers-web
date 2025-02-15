import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scroll({top: 0, });
    document
      .getElementById("app")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]); // Runs when the route (pathname) changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
