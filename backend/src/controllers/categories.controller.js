const categoriesCtrl = {};
const Category = require('../models/Category');

categoriesCtrl.createCategory = async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
        name
    });
    await newCategory.save();
    res.json({ message: 'Category saved' });
}

categoriesCtrl.updateCategory = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    await Category.findByIdAndUpdate(id, {
        name
    });
    res.json({ message: 'Category updated' });
}

categoriesCtrl.deleteCategory = async (req, res) => {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
}

categoriesCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

categoriesCtrl.getOneCategory = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    res.json(category);
}

module.exports = categoriesCtrl;