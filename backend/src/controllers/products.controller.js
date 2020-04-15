const productsCtrl = {};
const Product = require('../models/Products');

productsCtrl.createProduct = async (req, res) => {
    const { name, quantity, supplier, category } = req.body;
    const newProduct = new Product({
        name, 
        quantity, 
        supplier, 
        category
    });
    await newProduct.save();
    res.json({ message: 'Product saved' });
}

productsCtrl.updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, quantity, supplier, category } = req.body;
    await Product.findByIdAndUpdate(id, {
        name, 
        quantity, 
        supplier, 
        category
    });
    res.json({ message: 'Product updated' });
}

productsCtrl.deleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
}

productsCtrl.getProducts = async (req, res) => {
    const products = await Product.find()
                                  .populate('category', '_id name')
                                  .populate('supplier', '_id name');
    res.json(products);
}

productsCtrl.getOneProduct = async (req, res) => {
    const id = req.params.id;
    const product = Product.findById(id)
                           .populate('category', '_id name')
                           .populate('supplier', '_id name');
    res.json(product);
}

module.exports = productsCtrl;