const sql = require("./dbConnection");
const ServiceUsed = function (ServiceUsed) {

    this.ServiceUsedId = ServiceUsed.ServiceUsedId
    this.ServiceUsedName = ServiceUsed.ServiceUsedName
    this.DayOfBrth = ServiceUsed.DayOfBrth
    this.Nationality = ServiceUsed.Nationality
    this.Email = ServiceUsed.Email
    this.Phone = ServiceUsed.Phone
    this.LastVisited = ServiceUsed.LastVisited
};

ServiceUsed.create = (newServiceUsed, result) => {
    sql.query("INSERT INTO ServiceUseds SET ?", newServiceUsed, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created ServiceUsed: ", { id: res.insertId, ...newServiceUsed });
        result(null, { id: res.insertId, ...newServiceUsed });
    });
};

ServiceUsed.findById = (ServiceUsedId, result) => {
    sql.query(`SELECT * FROM ServiceUseds WHERE id = ${ServiceUsedId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found ServiceUsed: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

ServiceUsed.getAll = result => {
    sql.query("SELECT * FROM ServiceUseds", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ServiceUseds: ", res);
        result(null, res);
    });
};

ServiceUsed.updateById = (id, ServiceUsed, result) => {
    sql.query(
        "UPDATE ServiceUseds SET ServiceUsedName = ?, DayOfBirth = ?,  Nationality= ? ,Email= ?,Phone= ?, LastVisited=? WHERE id = ?",
        [ServiceUsed.ServiceUsedName, ServiceUsed.DayOfBrth, ServiceUsed.Nationality, ServiceUsed.Email, ServiceUsed.Phone, ServiceUsed.LastVisited, id],
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
            console.log("updated ServiceUsed: ", { id: id, ...ServiceUsed });
            result(null, { id: id, ...ServiceUsed });
        }
    );
};

ServiceUsed.remove = (id, result) => {
    sql.query("DELETE FROM ServiceUseds WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found ServiceUsed with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted ServiceUsed with id: ", id);
        result(null, res);
    });
};
ServiceUsed.removeAll = result => {
    sql.query("DELETE FROM ServiceUseds", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} ServiceUseds`);
        result(null, res);
    });
};
module.exports = ServiceUsed;