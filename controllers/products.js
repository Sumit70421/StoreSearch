const products = require('../models/products')

const getAllProdsStatic = async(req,res)=>{
    let allProds = await products.find({})
    res.status(200).json({allProds});
}

const getAllProds = async(req,res)=>{
    res.status(200).json({msg:'products route'})
}

module.exports = {
    getAllProds,
    getAllProdsStatic
}