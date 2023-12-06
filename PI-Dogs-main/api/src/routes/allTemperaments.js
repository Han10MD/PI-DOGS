const { Router } = require('express');
const router = Router();
const getAllTemperamentsHandler = require("../handlers/AllTemperamentsHandler");

//* GET ALL TEMPERAMENTS
router.use("/", getAllTemperamentsHandler);

module.exports = router;