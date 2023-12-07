const { Dog, Temperament } = require('../db');

const createDog = async (image, name, height, weight, life_span, temps) => {
    try {
        const newDog = await Dog.create({ image, name, height, weight, life_span });

        for (const temp of temps) {
            const temperament = await Temperament.findOne({
                where: {
                    name: temp
                }
            });

            if (temperament) {
                await newDog.addTemperament(temperament);
            }
        }

        let dog = await Dog.findByPk(newDog.id);
        let dogTemperaments = await dog.getTemperaments();
        let temperamentsNames = dogTemperaments.map((dogTemperament) => {
            return dogTemperament.name;
        });

        return { ...dog.dataValues, temperament: temperamentsNames };
    } catch (error) {
        console.error("Error al crear el perro:", error.message);
        throw new Error("Error al crear el perro");
    }
}


module.exports = createDog;