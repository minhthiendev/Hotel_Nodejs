const RoomTypes = require('../models/RoomTypes.model');
const message = require('../utils/message')
exports.findAll = async (req, res) => {
    RoomTypes.getAll((err, data) => {
        if (err) {
            message.SERVER_ERROR(err, res)
        }
        else {
            res.send({ message: "success", 'data': data });
        }
    });
};

exports.Create = async (req, res) => {
    const roomTypes = new RoomTypes(req.body);
    console.log(roomTypes)
    await RoomTypes.create(roomTypes, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.Update = async (req, res) => {
    const roomTypes = new RoomTypes(req.body);
    await RoomTypes.updateByTitle(req.params.title, roomTypes, (err, data) => {
        if (err)
            return message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'newData': data });
    })
};

exports.Remove = async (req, res) => {
    await RoomTypes.remove(req.params.title, (err, raw) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (raw) return res.send({ message: "success", 'raw': raw });

    })
};

exports.GetByTitle = async (req, res) => {
    await RoomTypes.findByTitle(req.params.title, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};




