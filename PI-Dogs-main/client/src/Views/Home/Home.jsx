import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'
import { filterDogs, filterTemps, filterWeights, resetFilters, filterOrigin } from "../../Redux/actions";
import Paginado from "../../Components/Pagination/Pagination";
import { Cards } from "../../Components/Cards/Cards";

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogsOrdered);//me trae todos los perros
    const temperaments = useSelector(state => state.tempsFilter);//me trae todos los temperamentos sin repetir

    //* Estados para el paginado
    const [currentPage, setCurrentPage] = useState(1);//pagina actual
    const [perrosPorPagina, setPerrosPorPagina] = useState(8);//cantidad de perros por pagina
    const [order, setOrder] = useState("")//orden
    const indexLastDog = currentPage * perrosPorPagina;//indice del ultimo perro
    const indexFirstDog = indexLastDog - perrosPorPagina;//indice del primer perro

    const changeHandler = (event) => {//filtro de ascendente y descendente
        dispatch(filterDogs(event.target.value));
        setCurrentPage(1)
        setOrder(`Ordenar ${event.target.value}`)
    };

    const selectHandler = (event) => {//filtro por temperamentos
        dispatch(filterTemps(event.target.value));
        setCurrentPage(1)
        setOrder(`Ordenar ${event.target.value}`)
    };

    const handleSortWeight = (event) => {//filtro por peso
        dispatch(filterWeights(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${event.target.value}`)
    };

    const handleOrigin = (event) => {//filtro por origen
        dispatch(filterOrigin(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${event.target.value}`)
    }

    const resetHandler = () => {//resetea el estado
        dispatch(resetFilters());
        setOrder("");
        setCurrentPage(1);
    }

    const currentDog = dogs.slice(indexFirstDog, indexLastDog);//corta la cantidad de perros que necesito mostrar según los indices a partir del estado global
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.HomeContainer}>
            <div className={styles.HomeTitleContainer}>
                <h1 className={styles.HomeTitle}>All Breeds</h1>
            </div>
            <div className={styles.HomeFiltersContainer}>
                <div className={styles.HomeFilters}>

                    <select onChange={changeHandler} className={styles.FilterSelectors}>
                        <option value="asc">Ascending order</option>
                        <option value="desc">Descending order</option>
                    </select>
                    <select onChange={selectHandler} className={styles.FilterSelectors}>
                        <option value="all">All Temperaments</option>
                        {temperaments.map((temp) => (
                            <option key={temp} value={temp}>{temp}</option>
                        ))}
                    </select>
                    <select onChange={e => handleSortWeight(e)} className={styles.FilterSelectors}>
                        <option disabled={true}>Filter by weight</option>
                        <option value="all">All Weight</option>
                        <option value="asc">Ascending Weight</option>
                        <option value="desc">Descending Weight</option>
                    </select>
                    <select onChange={handleOrigin} className={styles.FilterSelectors}>
                        <option value="all">All Origins</option>
                        <option value="api">Api</option>
                        <option value="db">DataBase</option>
                    </select>

                    <button onClick={resetHandler} className={styles.FiltersReset}>Reset all</button>

                    <NavLink to="/create" className={styles.CreateButton}>
                        Create Dog
                    </NavLink>
                </div>
            </div>
            
            <div className={styles.CardsContainer} >
                <Cards dogs={currentDog} />
            </div>

            <div className={styles.PaginadoContainer}>
                <Paginado className={styles.Paginado}
                    perrosPorPagina={perrosPorPagina}
                    dogs={dogs}
                    paginado={paginado}
                    currentPage={currentPage} />
            </div>

        </div>
    );
};

export default Home;