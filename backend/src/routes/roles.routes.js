const { Router } = require('express');
const router = Router();

const { 
      createRole, 
      updateRole, 
      deleteRole, 
      getRoles, 
      getOneRole } = require('../controllers/roles.controller')

router.route('/')
      .post(createRole)
      .get(getRoles);

router.route('/:id')
      .put(updateRole)
      .delete(deleteRole)
      .get(getOneRole);     

module.exports = router;