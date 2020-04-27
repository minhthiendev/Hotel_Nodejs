const sql = require("./dbConnection");
const Payment = function (Payment) {

    this.PaymentId = Payment.PaymentId
    this.PaymentName = Payment.PaymentName
    this.DayOfBrth = Payment.DayOfBrth
    this.Nationality = Payment.Nationality
    this.Email = Payment.Email
    this.Phone = Payment.Phone
    this.LastVisited = Payment.LastVisited
};

Payment.create = (newPayment, result) => {
    sql.query("INSERT INTO Payments SET ?", newPayment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Payment: ", { id: res.insertId, ...newPayment });
        result(null, { id: res.insertId, ...newPayment });
    });
};

Payment.findById = (PaymentId, result) => {
    sql.query(`SELECT * FROM Payments WHERE id = ${PaymentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Payment: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Payment.getAll = result => {
    sql.query("SELECT * FROM Payments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Payments: ", res);
        result(null, res);
    });
};

Payment.updateById = (id, Payment, result) => {
    sql.query(
        "UPDATE Payments SET PaymentName = ?, DayOfBirth = ?,  Nationality= ? ,Email= ?,Phone= ?, LastVisited=? WHERE id = ?",
        [Payment.PaymentName, Payment.DayOfBrth, Payment.Nationality, Payment.Email, Payment.Phone, Payment.LastVisited, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated Payment: ", { id: id, ...Payment });
            result(null, { id: id, ...Payment });
        }
    );
};

Payment.remove = (id, result) => {
    sql.query("DELETE FROM Payments WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Payment with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Payment with id: ", id);
        result(null, res);
    });
};

Payment.removeAll = result => {
    sql.query("DELETE FROM Payments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} Payments`);
        result(null, res);
    });
};

module.exports = Payment;