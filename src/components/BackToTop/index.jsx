import React from "react";
import { useEffect, useState } from "react";
import styles from "./BackToTop.module.scss";

export const BackToTop = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        })
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
      <div>
        {backToTopButton && (
          <button className={styles.toTop} onClick={scrollUp}>
            &#8679;
          </button>
        )}
      </div>
    );
  };
