const getAllDogs = require('./getAllDogs');
const { Dog, Temperament } = require('../db');

const getDogById = async (id) => {
    const dogs = await getAllDogs();
    const dog = dogs.find((dog) => dog.id === (isNaN(id) ? id : Number(id)));

    if (!dog) {
        throw new Error("No se encontró ningún perro con ese ID");
    }

    return {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament: !dog.temperament ? "not available" : dog.temperament
    }
};

module.exports = getDogById;