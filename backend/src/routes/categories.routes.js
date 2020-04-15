const { Router } = require('express');
const router = Router();

const { 
      createCategory, 
      updateCategory, 
      deleteCategory, 
      getCategories, 
      getOneCategory } = require('../controllers/categories.controller');

router.route('/')
      .post(createCategory)
      .get(getCategories);

router.route('/:id')
      .put(updateCategory)
      .delete(deleteCategory)
      .get(getOneCategory);

module.exports = router;