import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import styles from './Game.module.css';

const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const originalCards = React.useRef([]); // Mantén una copia inmutable de las cartas originales

    const apiUrl = 'https://api.thedogapi.com/v1/breeds/';
    const API_KEY = 'live_f1m5YEH3Aojlu5IgaK5iNvNPzXMrW1D7U8xPTdYpHYpgUNKVYzlnrClJ51LouK6F';

useEffect(() => {
        const fetchDogBreeds = async () => {
        try {
            const response = await axios.get(`${apiUrl}?api_key=${API_KEY}`);
            const dogBreeds = response.data; // Obtener todas las razas de perros
            const shuffledBreeds = dogBreeds.sort(() => Math.random() - 0.5); // Barajar todas las razas
            const selectedBreeds = shuffledBreeds.slice(0, 12); // Tomar solo las primeras 6 razas
            const duplicatedBreeds = [...selectedBreeds, ...selectedBreeds];
            const shuffledCards = duplicatedBreeds.sort(() => Math.random() - 0.5);
            setCards(shuffledCards);
            originalCards.current = [...shuffledCards]; // Almacena las cartas originales
            setIsLoading(false);
        } catch (error) {
            console.error('Error al obtener las razas de perros:', error);
        }
        };
    
        fetchDogBreeds();
    }, []);

const flipCard = (index) => {
    if (flippedCards.length === 2) {
    return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
    checkForMatch(newFlippedCards);
    }
};

const checkForMatch = (flipped) => {
    const [firstIndex, secondIndex] = flipped;
    const areCardsMatched = cards[firstIndex].id === cards[secondIndex].id;

    if (areCardsMatched) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
    } else {
        setTimeout(() => {
        setFlippedCards([]);
        }, 1000);
    }
    };

const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    const shuffledCards = originalCards.current.sort(() => Math.random() - 0.5); // Usar las cartas originales
    setCards(shuffledCards);
    };

if (isLoading) {
    return <div>Cargando...</div>;
    }

return (
    <div>
        <h2>Memory Game</h2>
        <button onClick={resetGame}>RESET GAME</button>
        <Link to="/home"> {/* Agrega el Link que redirige a /home */}
        <button>Volver a Home</button>
        </Link>
        <div className={styles['card-grid']}>
        {cards.map((dog, index) => (
            <div
            key={index}
            onClick={() => flipCard(index)}
            className={`${styles.card} ${flippedCards.includes(index) || matchedCards.includes(index) ? styles.flipped : ''}`}
            >
            {flippedCards.includes(index) || matchedCards.includes(index) ? (
            <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} />
            ) : (
            '🐾'
            )}
            </div>
        ))}
        </div>
    </div>
    );
};

export default Game;

