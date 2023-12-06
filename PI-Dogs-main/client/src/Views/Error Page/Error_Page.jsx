import { NavLink } from "react-router-dom";
import styles from "./Error_Page.module.css";

export const ErrorPage = () => {
    return (
        <div className={styles.ErrorPageContainer}>
            <NavLink to="/home" className={styles.ErrorHomeButton}>Go to Home Page</NavLink>
            <div className={styles.ErrorPage}>
                <img className={styles.ErrorImage} src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2MyZDFoc3djOGVhOWM4NmFxZmhmdzR2YmR1Njd0c3Z0M2NjM2ZzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeuOy2Fcl9vDGiA/giphy.gif" />
                <div className={styles.ErrorPageText}>
                    <h2>Error 404</h2>
                    <p>Page not found</p>
                </div>
            </div>
        </div>
    )
}