
const Image = require('../models/image.model');
const fs = require('fs');
const message = require('../utils/message')

exports.findAll = async (req, res) => {
    Image.getAll((err, data) => {
        if (err) {
            message.SERVER_ERROR(err, res)
        }
        else {
            return res.send({ message: "success", 'data': data });
        }
    });
};
exports.Create = async (req, res) => {
    try {

        const files = req.files
        if (files) {
            files.forEach(async file => {
                const ext = '.' + file.originalname.split('.')[1];
                fs.renameSync(file.path, file.path + ext)
                const newImage = new Image({
                    RoomType: req.body.RoomType,
                    Path: file.filename + ext
                })
                await Image.create(newImage, (err, img) => {
                    if (err) {
                        return res.status(500).json({ message: err })
                    }
                })
            })
            return res.status(500).json({ message: "Success" })

        } else {
            return res.status(500).json({ message: "please choice a image file" })
        }

    } catch (error) {

        message.SERVER_ERROR(error, res)
    }

};

exports.Update = async (req, res) => {
    if (req.file) {
        const ext = '.' + req.file.originalname.split('.')[1];
        fs.renameSync(req.file.path, req.file.path + ext)
        const newImage = new Image({
            RoomType: req.body.RoomType,
            Path: req.file.filename + ext
        })
        await Image.updateById(req.params.id, newImage, (err, data) => {
            if (err)
                return message.SERVER_ERROR(err, res)
            if (data)
                return res.send({ message: "success", 'newData': data });
        })
    } else {
        Image.getById(req.params.id, (err, img) => {
            if (err) {
                return message.SERVER_ERROR(err, res)
            }
            else {
                const newImage = new Image({
                    RoomType: req.body.RoomType,
                    Path: img.Path
                })
                Image.updateById(req.params.id, newImage, (err, data) => {
                    if (err)
                        return message.SERVER_ERROR(err, res)
                    if (data)
                        return res.send({ message: "success", 'newData': data });
                })
            }
        })
    }
}
exports.RemoveById = async (req, res) => {
    await Image.removeById(req.params.id, (err, raw) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (raw) return res.send({ message: "success", 'raw': raw });

    })
};


exports.GetById = async (req, res) => {
    await Image.getById(req.params.id, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.GetByRoomType = async (req, res) => {
    await Image.GetByRoomType(req.params.roomType, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.Remove = async (req, res) => {
    await Image.removeAll((err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};







