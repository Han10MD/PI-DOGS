const extractAllTemps = require('../controllers/getAllTemperaments');

module.exports = async (req, res) => {
    try {
        allTemperaments = await extractAllTemps();
        return res.status(200).json(allTemperaments);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}