const getDogByName = require('../controllers/getDogsByName');

module.exports = async (req, res) => {
    try{
        const {name} = req.query;
        const dog = await getDogByName(name);
        res.status(200).json(dog);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}