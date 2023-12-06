import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

function Card(props) {
    const { id, name, image, temperament, weight } = props;
    return (
        <NavLink to={`/detail/${id}`} className={styles.CardsDecoration}>
            <div className={styles.CardContainer}>
                <div className={styles.Card}>
                    <img className={styles.CardImage} src={image} alt={name} />
                </div>
                <div>
                    <h3>{name}</h3>
                </div>
                <div>
                    <h6>Temperament: {temperament}</h6>
                </div>
                <div>
                    <h6>weight: {weight} kilograms</h6>
                </div>
            </div>
        </NavLink>
    );
}

export default Card;