const products = require('../models/products')

const getAllProdsStatic = async(req,res)=>{
    let allProds = await products.find({})
    res.status(200).json({allProds});
}

const getAllProds = async(req,res)=>{
    const {featured, company, name,sort,fields,limit,page} = req.query;
    const queryP = {}
    if(featured){
        queryP.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryP.company = company;
    }
    if(name){
        queryP.name = { $regex: name, $options: 'i' };
    } 
    let result = products.find(queryP)
    if(sort){
        const sortL = sort.split(',').join(' ')
        result = result.sort(sortL);
    }else{
        result = result.sort('createdAt');
    }
    if(fields){
        const fieldsL = fields.split(',').join(' ')
        result = result.select(fieldsL)
    }
    // if(limit){
    //     result = result.limit(parseInt(limit));
    // }
    const pageL = Number(req.query.page) || 1
    const limitL = Number(req.query.limit) || 10;
    const skip = (pageL - 1) * limitL;
    result = result.limit(limitL).skip(skip);

    console.log(pageL);
    let allProdsP = await result
    res.status(200).json({allProdsP});
}

module.exports = {
    getAllProds,
    getAllProdsStatic
}