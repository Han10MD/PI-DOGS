const createDog = require('../controllers/postDogs');

module.exports = async (req, res) => {
    try{
        const { image, name, height, weight, life_span, temps } = req.body;
        const newDog = await createDog(image, name, height, weight, life_span, temps);
        res.status(201).json(newDog);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}