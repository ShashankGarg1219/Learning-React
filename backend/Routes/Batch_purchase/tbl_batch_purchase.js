const express = require('express');
const PurchaseRouter = express.Router();

const {view_purchase} = require('../../Controller/Batch_purchase/tbl_batch_purchase');
const {add_purchase} = require('../../Controller/Batch_purchase/tbl_batch_purchase');




PurchaseRouter.get('/getpurchase', view_purchase )
PurchaseRouter.post('/postpurchase', add_purchase)




module.exports = PurchaseRouter; 