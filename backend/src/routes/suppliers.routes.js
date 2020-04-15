const { Router } = require('express');
const router = Router();

const { 
    createSupplier, 
    updateSupplier, 
    deleteSupplier, 
    getSuppliers, 
    getOneSupplier } = require('../controllers/suppliers.controller');

router.route('/')
      .post(createSupplier)
      .get(getSuppliers);

router.route('/:id')
      .put(updateSupplier)
      .delete(deleteSupplier)
      .get(getOneSupplier);


module.exports = router;