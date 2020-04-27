const express = require('express');
const room_ctrl = require('../controllers/room.controller');
const roomTypes_ctrl = require('../controllers/roomTypes.controller');
const router = express.Router();

router.route('/rooms')
    .get(room_ctrl.findAll)
    .post(room_ctrl.Create)

router.route('/rooms/:id')
    .get(room_ctrl.GetById)
    .put(room_ctrl.Update)
    .delete(room_ctrl.Remove)
router.get('/emptyRooms', room_ctrl.GetEmptyRoom)

router.route('/roomTypes')
    .get(roomTypes_ctrl.findAll)
    .post(roomTypes_ctrl.Create)

router.route('/roomTypes/:title')
    .get(roomTypes_ctrl.GetByTitle)
    .put(roomTypes_ctrl.Update)
    .delete(room_ctrl.Remove)
module.exports = router;
