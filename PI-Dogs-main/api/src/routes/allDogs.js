const { Router } = require('express');
const AllDogsHandler = require('../handlers/AllDogsHandler');
const PostDogsHandler = require('../handlers/PostDogsHandler');
const GetDogByIdHandler = require('../handlers/GetDogByIdHandler');
const GetDogsByNameHandler = require('../handlers/GetDogsByNameHandler');
const router = Router();

//* GET ALL DOGS
router.get("/", AllDogsHandler);
router.get("/searchByName", GetDogsByNameHandler);
router.get("/:id", GetDogByIdHandler);

//* POST DOGS
router.post("/", PostDogsHandler);

module.exports = router;