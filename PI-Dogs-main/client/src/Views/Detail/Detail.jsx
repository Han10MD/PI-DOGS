import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Detail.module.css';


export const DogDetail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const dogData = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/dogs/${id}`);
                console.log(data);
                setDog(data);
            } catch (error) {
                navigate('/error');
            }
        }
        dogData();
    }, [id])

    if (Object.keys(dog).length === 0) {
        return (
            <div className={styles.LoadingContainer}>
                <img src="https://media4.giphy.com/media/326iF1qWfsTgKA4c78/giphy.gif?cid=ecf05e47bb424ju01lihhh22ckgcjtswv0kgkpu9p7vral42&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="Searching" />
            </div>
        );
    }

    return (
        <div className={styles.DetailContainer}>
            <div className={styles.GoBackButtonContainer}>
                <NavLink to={'/home'} className={styles.GoBackButton}>Back</NavLink>
            </div>
            <div className={styles.DogDetailContainer}>
                <div className={styles.DogImage}>
                    <img src={dog.image} alt={dog.name} className={styles.DogImage} />
                </div>
                <div className={styles.DogInfo}>
                    <h1 className={styles.DogName}>{dog.name}</h1>
                    <p className={styles.DogText}>Id: {dog.id}</p>
                    <p className={styles.DogText}>Heigth: {dog.height} centimeters</p>
                    <p className={styles.DogText}>Weigth: {dog.weight} kilograms</p>
                    <p className={styles.DogText}>Life span: {dog.life_span}</p>
                    <p className={styles.DogText}>Temperament: {dog.temperament}</p>
                </div>
            </div>
        </div>
    )
}