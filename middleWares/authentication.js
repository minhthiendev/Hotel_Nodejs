const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer.model');

async function verifyToken(req, res, next) {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const tokenJwt = bearer[1];
        req.token = tokenJwt;
        try {
            const decode = jwt.verify(req.token, 'secretHotelKey');
            Customer.findOne("CustomerId", decode.id, (err, customer) => {
                if (customer) {
                    req.user = customer
                    return next();
                }
                return res.sendStatus(403)
            });
        } catch (error) {
            return res.sendStatus(403)
        }
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}
module.exports = {
    verifyToken: verifyToken
}
