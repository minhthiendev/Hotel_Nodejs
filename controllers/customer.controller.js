const Customer = require('../models/Customer.model');
const Room = require('../models/Room.model');
const message = require('../utils/message')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.findAll = async (req, res) => {
    console.log(req.user)
    Customer.getAll((err, data) => {
        if (err) {
            message.SERVER_ERROR(err, res)
        }
        else {
            res.send({ message: "success", 'data': data });
        }
    });
};

exports.Create = async (req, res) => {
    const customer = new Customer(req.body);
    await Customer.create(customer, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.Update = async (req, res) => {
    const customer = new Customer(req.body);
    await Customer.updateById(parseInt(req.params.id, 10), customer, (err, data) => {
        if (err)
            return message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'newData': data });
    })
};

exports.Remove = async (req, res) => {
    await Customer.remove(req.params.id, (err, raw) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (raw) return res.send({ message: "success", 'raw': raw });

    })
};

exports.GetById = async (req, res) => {
    await Customer.findOne("CustomerId", req.params.id, (err, data) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (data)
            return res.send({ message: "success", 'data': data });
    })
};

exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    await Customer.findOne("Username", username, (err, customer) => {
        if (err)
            message.SERVER_ERROR(err, res)
        if (customer) {
            if (bcrypt.compareSync(password, customer.Password)) {
                jwt.sign({ id: customer.CustomerId }, "secretHotelKey", { expiresIn: "24h" }, (err, token) => {
                    if (err) {
                        res.send({
                            status: "error",
                            err: err
                        });
                    }
                    res.send({
                        status: "success",
                        token: token,
                    });
                });
            } else {
                res.send({
                    status: "ERROR: Could not log in"
                });
            }
        }
    });
}




