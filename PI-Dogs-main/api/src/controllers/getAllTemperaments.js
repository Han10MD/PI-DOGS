const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db');
const URL = "https://api.thedogapi.com/v1/breeds/"
const getAllDogs = require('./getAllDogs')

const getAllTemperaments = async () => {
    const response = await axios(`${URL}?api_key=${API_KEY}`);
    const allTemperaments = response.data;
    const getTemperamentsFromDb = await Temperament.findAll();

    return [...allTemperaments, ...getTemperamentsFromDb].map((dog) => {
        return {
            id: dog.id,
            temperament: dog.temperament,
        }
    });
}

const extractAllTemps = async () => {
    const allTempsArray = await getAllTemperaments();
    let temperaments = [];
    let uniqueTemperaments = new Set();

    allTempsArray.forEach((dog) => {
        temperaments.push(dog.temperament)
    })

    for (let i = 0; i < 126; i++) {
        temperaments[i].split(", ").forEach((temp) => {
            uniqueTemperaments.add(temp)
        })
    }

    let temperamentsArray = Array.from(uniqueTemperaments);
    const tempsOrdenados = temperamentsArray.sort((a, b) => a.localeCompare(b));

    return tempsOrdenados;
}

//*Función para subir todos los temperamentos a la base de datos
const subirTemps = async() => {
    const tempsOrdenados = await extractAllTemps();
    const temperamentos = tempsOrdenados.map((el) => {
        return {
            name: el
        }
    })
    await Temperament.bulkCreate(temperamentos);
    console.log("Temperamentos subidos a la base de datos");
}

module.exports = extractAllTemps;