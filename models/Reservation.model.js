const sql = require("./dbConnection");
const Reservation = function (reservation) {

    this.ReservationId = reservation.ReservationId
    this.CustomerId = reservation.CustomerId
    this.ExpectedRoom = reservation.ExpectedRoom
    this.ExpectedCheckIn = reservation.ExpectedCheckIn
    this.ExpectedCheckOut = reservation.ExpectedCheckOut
    this.ReservationStatus = reservation.ReservationStatus

};

Reservation.create = (newReservation, result) => {
    sql.query("INSERT INTO reservations SET ?", newReservation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { ...newReservation });
    });
};

Reservation.findById = (ReservationId, result) => {
    sql.query(`SELECT * FROM reservations WHERE ReservationId = ${ReservationId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Reservation: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Reservation.findByCustomerId = (customerId, result) => {
    sql.query(`SELECT * FROM reservations WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Reservation.getAll = result => {
    sql.query("SELECT * FROM reservations", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Reservation.updateById = (id, Reservation, result) => {
//     sql.query(
//         "UPDATE Reservations SET ReservationStatus = ? WHERE ReservationId = ?",
//         [Reservation.ReservationStatus, id],
//         (err, res) => {
//             if (err) {
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             result(null, { ...Reservation });
//         }
//     );
// };

// Reservation.remove = (id, result) => {
//     sql.query("DELETE FROM reservations WHERE ReservationId = ?", id, (err, res) => {
//         if (err) {
//             result(null, err);
//             return;
//         }
//         if (res.affectedRows == 0) {
//             // not found Reservation with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }
//         result(null, res);
//     });
// };


module.exports = Reservation;