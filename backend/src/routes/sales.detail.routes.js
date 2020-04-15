const { Router } = require('express');
const router = Router();

const { 
    createSaleDetail, 
    updateSaleDetail, 
    deleteSaleDetail, 
    getSalesDetail, 
    getOneSaleDetail } = require('../controllers/sales.detail.controller');

router.route('/')
      .post(createSaleDetail)
      .get(getSalesDetail);

router.route('/:id')
      .put(updateSaleDetail)
      .delete(deleteSaleDetail)
      .get(getOneSaleDetail);


module.exports = router;