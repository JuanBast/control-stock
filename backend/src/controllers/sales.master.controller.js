const salesMasterCtrl = {};
const SaleMaster = require('../models/Sale.Master');

salesMasterCtrl.createSaleMaster = async (req, res) => {
    const {  date, total, user, salesdetails } = req.body;
    const newSaleMaster = new SaleMaster({
        date, 
        total, 
        user, 
        salesdetails
    });
    await newSaleMaster.save();
    res.json({ message: 'Sale Master saved' });
}

salesMasterCtrl.updateSaleMaster = async (req, res) => {
    const id = req.params.id;
    await SaleMaster.findByIdAndDelete(id, {
        date, 
        total, 
        user, 
        salesdetails
    });
    res.json({ message: 'Sale Master updated' });
}

salesMasterCtrl.deleteSaleMaster = async (req, res) => {
    const id = req.params.id;
    await SaleMaster.findByIdAndDelete(id);
    res.json({ message: 'Sale Master deleted' });
}

salesMasterCtrl.getSalesMaster = async (req, res) => {
    const salesMaster = await SaleMaster.find();
    res.json(salesMaster);
}

salesMasterCtrl.getOneSaleMaster = async (req, res) => {
    const id = req.params.id;
    const saleMaster = SaleMaster.findById(id);
    res.json(saleMaster);
}

module.exports = salesMasterCtrl;