import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.FooterContainer}>
            <div className={styles.FooterTextContainer}>
                <p className={styles.FooterText}>© 2023 All rights reserved</p>
            </div>
            <div className={styles.FooterLinksContainer}>
                <div className={styles.GitLinkDiv}>
                    <NavLink to="https://github.com/Argiiasd" target="_blank" className={styles.GitLink}>GitHub</NavLink>
                </div>
                <div className={styles.LinkedInLinkDiv}>
                    <NavLink to="https://www.linkedin.com/in/mateo-jeremias-pg/" target="_blank" className={styles.LinkedInLink}>LinkedIn</NavLink>
                </div>
            </div>
        </footer>
    );
}

export default Footer;