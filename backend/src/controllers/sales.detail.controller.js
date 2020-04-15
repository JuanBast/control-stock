const salesdetailCtrl = {};
const SaleDetail = require('../models/Sale.Detail');

salesdetailCtrl.createSaleDetail = async (req, res) => {
    const { salemaster, product, quantity, subtotal } = req.body;
    const newSaleDetail = new SaleDetail({
        salemaster, 
        product, 
        quantity, 
        subtotal
    });
    await newSaleDetail.save();
    res.json({ message: 'Sale Detail saved' });
}

salesdetailCtrl.updateSaleDetail = async (req, res) => {
    const id = req.params.id;
    const { salemaster, product, quantity, subtotal } = req.body;
    await SaleDetail.findByIdAndUpdate(id, {
        salemaster, 
        product, 
        quantity, 
        subtotal
    });
    res.json({ message: 'Sale Detail updated' });
}

salesdetailCtrl.deleteSaleDetail = async (req, res) => {
    const id = req.params.id;
    await SaleDetail.findByIdAndDelete(id);
    res.json({ message: 'Sale Detail deleted' });
}

salesdetailCtrl.getSalesDetail = async (req, res) => {
    const salesDetail = SaleDetail.find();
    res.json(salesDetail);
}

salesdetailCtrl.getOneSaleDetail = async (req, res) => {
    const id = req.params.id;
    const salesDetail = SaleDetail.findById(id);
    res.json(salesDetail);
}

module.exports = salesdetailCtrl;