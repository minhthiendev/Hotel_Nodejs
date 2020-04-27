const express = require('express');
const customer_ctrl = require('../controllers/customer.controller');
const router = express.Router();

router.route('/customers')
    .get(customer_ctrl.findAll)
    .post(customer_ctrl.Create)

router.route('/customers/:id')
    .get(customer_ctrl.GetById)
    .put(customer_ctrl.Update)
    .delete(customer_ctrl.Remove)

router.post('/customersSignIn', customer_ctrl.signIn)
module.exports = router;
