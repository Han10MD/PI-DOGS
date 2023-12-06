const {Dog, Temperament} = require('../db')

const getDogsFromDb = async () => {
    let dogs = await Dog.findAll({
        include: {
            model: Temperament,
            through: { attributes: [] },
            attributes: ["name"],
        },
    })
    
    return dogs;
}

module.exports = getDogsFromDb;
