const Room = require('../models/Room.model');
const message = require('../utils/message')
exports.findAll = async (req, res) => {
    Room.getAll((err, data) => {
        if (err) {
            message.SERVER_ERROR(err, res)
        }
        else {
            res.send({ message: "success", 'data': data });
        }
    });
};

exports.Create = async (req, res) => {
    const room = new Room(req.body);
    console.log(req.body)
    await Room.create(room, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.Update = async (req, res) => {
    const room = new Room(req.body);
    await Room.updateById(req.params.id, room, (err, data) => {
        if (err)
            return message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'newData': data });
    })
};

exports.Remove = async (req, res) => {
    await Room.remove(req.params.id, (err, raw) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (raw) return res.send({ message: "success", 'raw': raw });

    })
};

exports.GetById = async (req, res) => {
    await Room.findById(req.params.id, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.GetEmptyRoom = async (req, res) => {
    const { start, end } = req.body
    await Room.getEmptyRoom(start, end, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
}



