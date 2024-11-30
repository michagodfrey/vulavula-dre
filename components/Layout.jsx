import React, { useState, useEffect } from "react";
import { Header } from "./";

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      {children}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-pink-600 text-white py-3 px-6 font-extrabold text-3xl rounded-xl shadow-lg hover:bg-pink-700 transition opacity-50"
          aria-label="Scroll to top"
        >
          ⬆
        </button>
      )}
    </>
  );
};

export default Layout;
