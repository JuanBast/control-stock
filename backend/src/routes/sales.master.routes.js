const { Router } = require('express');
const router = Router();

const { 
    createSaleMaster, 
    updateSaleMaster, 
    deleteSaleMaster, 
    getSalesMaster, 
    getOneSaleMaster } = require('../controllers/sales.master.controller');

router.route('/')
      .post(createSaleMaster)
      .get(getSalesMaster);

router.route('/:id')
      .put(updateSaleMaster)
      .delete(deleteSaleMaster)
      .get(getOneSaleMaster);

module.exports = router;