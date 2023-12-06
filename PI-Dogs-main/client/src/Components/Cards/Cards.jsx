import Card from "../Card/Card.jsx";
import styles from "./Cards.module.css";

export function Cards ({dogs}) {
    
    if(!dogs || dogs.length === 0) {
        return <div><img src="https://media4.giphy.com/media/326iF1qWfsTgKA4c78/giphy.gif?cid=ecf05e47bb424ju01lihhh22ckgcjtswv0kgkpu9p7vral42&ep=v1_gifs_related&rid=giphy.gif&ct=s"/>...</div>
    }

    return (
        <div className={styles.CardsContainer}>
            { dogs.map(({id, name, image, temperament, weight}) => (
                <Card key={id} id={id} name={name} image={image} temperament={temperament} weight={weight} />
            ))}
        </div>
    );
}