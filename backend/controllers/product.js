const Product = require('../models/ProductModel')
let path = require('path')

const getAllProducts = async(req, res) => {
    try {
        const product = await Product.find({})
        console.log(product);
        res.status(200).json(product);
    } catch (error) { 
        res.status(400).json({msg: error.message});
    }
}

const addProduct = async(req, res) => {
    const {title, description, price, discountPercentage, rating, stock, brand, category} = req.body

    try {
        const product = await Product.create({title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images})
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const updateProduct = async(req, res) => {
    const {id: productID} = req.params
    try {
        const product = await Product.findByIdAndUpdate({_id: productID}, req.body, {
            new: true,
            runValidators: true
        })
        if(!product){
            res.status(404).json({msg: `No product with ID: ${productID}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const deleteProduct = async(req, res) => {
    const {id: productID} = req.params
    try {
        const product = await Product.findOneAndDelete({_id: productID})
        if(!product){
            res.status(404).json({msg: `No product with ID: ${productID}`})
        }
        return res.status(200).json(product);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = {
    getAllProducts,
    addProduct, 
    deleteProduct,
    updateProduct
}