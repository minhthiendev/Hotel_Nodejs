const sql = require("./dbConnection");
const Reception = function (Reception) {

    this.ReceptionId = Reception.ReceptionId
    this.ReceptionName = Reception.ReceptionName
    this.DayOfBirth = Reception.DayOfBirth
    this.Nationality = Reception.Nationality
    this.Email = Reception.Email
    this.Phone = Reception.Phone
    this.LastVisited = Reception.LastVisited
};

Reception.create = (newReception, result) => {
    sql.query("INSERT INTO Receptions SET ?", newReception, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Reception: ", { id: res.insertId, ...newReception });
        result(null, { id: res.insertId, ...newReception });
    });
};

Reception.findById = (ReceptionId, result) => {
    sql.query(`SELECT * FROM Receptions WHERE id = ${ReceptionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Reception: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Reception.getAll = result => {
    sql.query("SELECT * FROM Receptions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Receptions: ", res);
        result(null, res);
    });
};

Reception.updateById = (id, Reception, result) => {
    sql.query(
        "UPDATE Receptions SET ReceptionName = ?, DayOfBirth = ?,  Nationality= ? ,Email= ?,Phone= ?, LastVisited=? WHERE id = ?",
        [Reception.ReceptionName, Reception.DayOfBirth, Reception.Nationality, Reception.Email, Reception.Phone, Reception.LastVisited, id],
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
            console.log("updated Reception: ", { id: id, ...Reception });
            result(null, { id: id, ...Reception });
        }
    );
};

Reception.remove = (id, result) => {
    sql.query("DELETE FROM Receptions WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Reception with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Reception with id: ", id);
        result(null, res);
    });
};

Reception.removeAll = result => {
    sql.query("DELETE FROM Receptions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} Receptions`);
        result(null, res);
    });
};

module.exports = Reception;