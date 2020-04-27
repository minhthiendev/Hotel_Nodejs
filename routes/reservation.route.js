const express = require('express');
const reservation_ctrl = require('../controllers/reservation.controller');
const auth = require('../middleWares/authentication')
const router = express.Router();

router.route('/reservations')
    .get(reservation_ctrl.findAll)
    .post(auth.verifyToken, reservation_ctrl.Create)

router.route('/reservations/:id')
    .get(auth.verifyToken, reservation_ctrl.GetById)
    .put(auth.verifyToken, reservation_ctrl.Update)
    .delete(auth.verifyToken, reservation_ctrl.Remove)
module.exports = router;
