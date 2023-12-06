const getAllDogs = require('./getAllDogs.js');

const getDogByName = async (name) => {
    const dogs = await getAllDogs();
    const dog = dogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

    if (!dog) {
        throw new Error("No se encontró ningún perro con ese ID");
    }
    return dog;
}
module.exports = getDogByName;
