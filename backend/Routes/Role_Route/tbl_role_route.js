const express = require('express');
const RoleRouter = express.Router();

const {view_role} = require('../../Controller/Role/tbl_role');
 const {post_role} = require('../../Controller/Role/tbl_role');
 const {update_role} = require('../../Controller/Role/tbl_role');
 const {delete_role} = require('../../Controller/Role/tbl_role');

RoleRouter.get('/getdata', view_role )
 RoleRouter.post('/postdata', post_role)
 RoleRouter.put('/updatedata/:role_id', update_role)
 RoleRouter.delete('/deletedata/:role_id', delete_role)

module.exports = RoleRouter; 