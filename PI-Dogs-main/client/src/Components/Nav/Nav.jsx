import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";
import perroCircular from "../Img/hero-profile-dog.png"

const NavBar = () => {
    return (
        <div className={styles.Nav}>
            <div className={styles.NavTitleContainer}>
                <img className={styles.NavImg} src={perroCircular} />
                <h2 className={styles.NavTitle}>Henry Dogs</h2>
            </div>
            <div className={styles.NavSearchBarContainer}>
                <SearchBar />
            </div>
        </div>
    )
}

export default NavBar;