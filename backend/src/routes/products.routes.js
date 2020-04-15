const { Router } = require('express');
const router = Router();

const { 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProducts, 
    getOneProduct } = require('../controllers/products.controller');

router.route('/')
      .post(createProduct)
      .get(getProducts);

router.route('/:id')
      .put(updateProduct)
      .delete(deleteProduct)
      .get(getOneProduct);


module.exports = router;