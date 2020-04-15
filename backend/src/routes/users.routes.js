const { Router } = require('express');
const router = Router();
const { 
      createUser, 
      getUsers, 
      updateUser, 
      deleteUser, 
      getOneUser } = require('../controllers/users.controller');
// REST:
// C - Create  - POST
// R - Read    - GET
// U - Update  - PUT
// D - Delete  - DELETE

router.route('/')
      .post(createUser)    // C - Create  - POST
      .get(getUsers);      // R - Read    - GET

router.route('/:id')
      .put(updateUser)     // U - Update  - PUT
      .delete(deleteUser)  // D - Delete  - DELETE
      .get(getOneUser);    // R - Read    - GET


module.exports = router;