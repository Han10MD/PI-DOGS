const getAllDogs = require('../controllers/getAllDogs');

module.exports = async (req, res) => {
    try {
        const allDogs = await getAllDogs();
        if(allDogs.length === 0) {
            throw new Error("No se encuentran perros")
        }
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}