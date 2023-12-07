const axios = require('axios');
const { API_KEY } = process.env;
const getDogsFromDb = require('./getDogsFromDb');
const URL = "https://api.thedogapi.com/v1/breeds/";

const getAllDogs = async () => {
    const response = await axios(`${URL}?api_key=${API_KEY}`);
    const apiDogs = response.data.map((dog) => {
        if (dog.reference_image_id === 'B12uzg9V7' || dog.reference_image_id === '_Qf9nfRzL' || dog.reference_image_id === 'HkC31gcNm') {
            dog.reference_image_id = 'H1oLMe94m';
        }
        return {
            id: dog.id,
            image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
            name: dog.name,
            height: dog.height?.metric,
            weight: dog.weight?.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
        }
    })
    const dbDogs = await getDogsFromDb();
    const dbDogsMapped = dbDogs.map((dog) => {
        return {
            id: dog.id,
            image: dog.image,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: dog.Temperaments.map((temperament) => temperament.name).join(", "),
        };
    });
    const allDogs = [...apiDogs, ...dbDogsMapped];
    if (allDogs.length === 0) {
        throw new Error("No results found");
    }
    return allDogs;
}

module.exports = getAllDogs;