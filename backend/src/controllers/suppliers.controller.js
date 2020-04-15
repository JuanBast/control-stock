const suppliersCtrl = {};
const Supplier = require('../models/Supplier');

suppliersCtrl.createSupplier = async (req, res) => {
    const { name, cuit, mail, address, telephone } = req.body;
    const newSupplier = new Supplier({
        name, 
        cuit, 
        mail, 
        address, 
        telephone
    });
    await newSupplier.save();
    res.json({ message: 'Supplier saved' });
}

suppliersCtrl.updateSupplier = async (req, res) => {
    const id = req.params.id;
    const { name, cuit, mail, address, telephone } = req.body;
    await Supplier.findByIdAndUpdate(id, {
        name, 
        cuit, 
        mail, 
        address, 
        telephone
    });
    res.json({ message: 'Supplier saved' });
}

suppliersCtrl.deleteSupplier = async (req, res) => {
    const id = req.params.id;
    await Supplier.findByIdAndDelete(id);
    res.json({ message: 'Supplier deleted' });
}

suppliersCtrl.getSuppliers = async (req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
}

suppliersCtrl.getOneSupplier = async (req, res) => {
    const id = req.params.id;
    const supplier = await Supplier.findById(id);
    res.json(supplier);
}

module.exports = suppliersCtrl;