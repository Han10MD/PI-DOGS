import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing_Page.module.css";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.Landing}>
            <div className={styles.LandingContainer}>
                <div className={styles.LandingText}>
                    <h1 className={styles.LandingTitle}>
                        Henry Dogs
                    </h1>
                    <p className={styles.LandingParagraph}>
                    Welcome to our page dedicated to dog breeds. Here you will find detailed information about a wide variety of canine breeds. From the small and adorable to the large and energetic, our goal is to provide you with everything you need to know about each dog breed. Explore our extensive catalog of breeds, discover their unique characteristics.
                    </p>
                </div>
                <div className={styles.LandingButtonDiv}>
                    <button onClick={() => navigate("/home")} className={styles.LandingButton}>
                        Go to the Home Page
                    </button>
                </div>
            </div>
        </div>
    )
}