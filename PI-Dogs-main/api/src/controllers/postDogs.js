const { Dog, Temperament } = require('../db');

const createDog = async (image, name, height, weight, life_span, temps) => {
    const newDog = await Dog.create({image, name, height, weight, life_span});

    for (const temp of temps) {
        const temperament = await Temperament.findOne({where: {
            name: temp
        }});

        if (temperament) {
            await newDog.addTemperament(temperament);
        }
    }

    let dog = await Dog.findByPk(newDog.id);
    let dogTemperaments = await dog.getTemperaments();
    let temperamentsNames = dogTemperaments.map((dogTemperament) => {
        return dogTemperament.name;
    })

    return {...dog.dataValues, temperament: temperamentsNames};
}

module.exports = createDog;