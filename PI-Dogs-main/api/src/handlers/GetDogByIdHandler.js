const getDogById = require('../controllers/getDogsById');

module.exports = async (req, res) =>{
    try{
        const {id} = req.params;
        const DogById = await getDogById(id);
            return res.status(200).json(DogById);
    } catch(error){
        return res.status(400).json({error: error.message});
    }
}