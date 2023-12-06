import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getDogByName } from "../../Redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const searchHandler = (event) => {
        const value = event.target.value;
        setSearch(value);

        if (!value) {
            setError('Enter a name');
        } else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)) {
            setError('Only letters allowed');
        } else {
            setError('');
        }
    }

    const submitHandler = (event) => {
        dispatch(getDogByName(search));
        setSearch("");
        navigate("/home")
    }

    return (
        <div>
            <div className={styles.SearchBarContainer}>
                <input type="search" value={search} onChange={searchHandler} className={styles.SearchBarInput} />
                <button onClick={submitHandler} className={styles.SearchBarButton}>Search</button>
            </div>
            <div>
                {error && <span className={styles.SearchBarError}>{error}</span>}
            </div>
        </div>
    );
}

export default SearchBar;