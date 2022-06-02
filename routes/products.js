const express = require('express');
const router = express.Router();

const{ getAllProds, getAllProdsStatic} = require('./../controllers/products');

router.route('/').get(getAllProds);
router.route('/static').get(getAllProdsStatic);

module.exports = router