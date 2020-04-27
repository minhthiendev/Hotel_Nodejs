const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//routes
const room_route = require('./routes/room.route');
const customer_route = require('./routes/customer.route');
const reservation_route = require('./routes/reservation.route');
const image_route = require('./routes/image.route');


//app
const app = express();


app.use(bodyParser.json());// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser())


app.use('/api', room_route);
app.use('/api', customer_route);
app.use('/api', reservation_route);
app.use('/api', image_route);
app.listen(3000, function () {
    console.log('Node server running  http://localhost:3000')
});
