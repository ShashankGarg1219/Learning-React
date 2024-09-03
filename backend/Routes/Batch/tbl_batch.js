const express = require('express');
const BatchRouter = express.Router();

const {view_batch} = require('../../Controller/Batch/tbl_batch');
const {add_batch} = require('../../Controller/Batch/tbl_batch');
const {edit_batch} = require('../../Controller/Batch/tbl_batch')




BatchRouter.get('/getbatch', view_batch )
BatchRouter.post('/postbatch', add_batch)
BatchRouter.put('/updatebatch/:batch_id', edit_batch)




module.exports = BatchRouter; 