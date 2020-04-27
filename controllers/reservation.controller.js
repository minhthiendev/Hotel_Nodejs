const Reservation = require('../models/Reservation.model');
const Room = require('../models/Room.model');
const message = require('../utils/message')

exports.findAll = async (req, res) => {
    //console.log(req.user)
    await Reservation.getAll((err, data) => {
        if (err) {
            message.SERVER_ERROR(err, res)
        }
        else {

            res.send({ message: "success", 'data': data });
        }
    });

};

exports.Create = async (req, res) => {
    await Room.getEmptyRoom(req.body.start, req.body.end, async (err, rooms) => {
        if (rooms != []) {
            const ro = rooms.find(x => x.RoomType == req.body.RoomType)
            const newReservation = {
                CustomerId: req.user.CustomerId,
                ExpectedRoom: ro.RoomId,
                ExpectedCheckIn: req.body.start,
                ExpectedCheckOut: req.body.end,
                ReservationStatus: 'waiting'
            }
            console.log(newReservation);
            const reservation = new Reservation(newReservation);
            await Reservation.create(reservation, (err, data) => {
                if (err)
                    message.SERVER_ERROR(err, res)
                if (data)
                    return res.send({ message: "success", 'data': data });
            })
        } else {
            return res.send({ message: `not empty room from ${req.body.start} to ${req.body.end}` });
        }
    })
};

exports.Update = async (req, res) => {
    await Room.getEmptyRoom(req.body.start, req.body.end, async (err, rooms) => {
        if (rooms != []) {
            const ro = rooms.find(x => x.RoomType == req.body.RoomType)
            const newReservation = {
                CustomerId: req.user.CustomerId,
                ExpectedRoom: ro.RoomId,
                ExpectedCheckIn: req.body.start,
                ExpectedCheckOut: req.body.end,
                ReservationStatus: 'waiting'
            }
            const reservation = new Reservation(newReservation);
            await Reservation.updateById(req.params.id, reservation, (err, data) => {
                if (err)
                    return message.SERVER_ERROR(err, res)
                if (data)
                    return res.send({ message: "success", 'newData': data });
            })
        } else {
            return res.send({ message: `not empty room from ${req.body.start} to ${req.body.end}` });
        }
    })
};

exports.Remove = async (req, res) => {
    await Reservation.remove(req.params.id, (err, raw) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (raw) return res.send({ message: "success", 'raw': raw });

    })
};

exports.GetById = async (req, res) => {
    await Reservation.findById(req.params.id, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};




