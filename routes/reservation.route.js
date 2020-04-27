const express = require('express');
const reservation_ctrl = require('../controllers/reservation.controller');
const auth = require('../middleWares/authentication')
const router = express.Router();

router.route('/reservations')
    .get(auth.verifyToken, reservation_ctrl.findAll)
    .post(auth.verifyToken, reservation_ctrl.Create)

router.route('/reservations/:id')
    .get(reservation_ctrl.GetById)
    .put(reservation_ctrl.Update)
    .delete(reservation_ctrl.Remove)
module.exports = router;
