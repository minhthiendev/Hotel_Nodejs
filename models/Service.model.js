const sql = require("./dbConnection");
const Service = function (Service) {

    this.ServiceId = Service.ServiceId
    this.ServiceName = Service.ServiceName
    this.DayOfBrth = Service.DayOfBrth
    this.Nationality = Service.Nationality
    this.Email = Service.Email
    this.Phone = Service.Phone
    this.LastVisited = Service.LastVisited
};

Service.create = (newService, result) => {
    sql.query("INSERT INTO Services SET ?", newService, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Service: ", { id: res.insertId, ...newService });
        result(null, { id: res.insertId, ...newService });
    });
};

Service.findById = (ServiceId, result) => {
    sql.query(`SELECT * FROM Services WHERE id = ${ServiceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Service: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Service.getAll = result => {
    sql.query("SELECT * FROM Services", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Services: ", res);
        result(null, res);
    });
};

Service.updateById = (id, Service, result) => {
    sql.query(
        "UPDATE Services SET ServiceName = ?, DayOfBirth = ?,  Nationality= ? ,Email= ?,Phone= ?, LastVisited=? WHERE id = ?",
        [Service.ServiceName, Service.DayOfBrth, Service.Nationality, Service.Email, Service.Phone, Service.LastVisited, id],
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
            console.log("updated Service: ", { id: id, ...Service });
            result(null, { id: id, ...Service });
        }
    );
};

Service.remove = (id, result) => {
    sql.query("DELETE FROM Services WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Service with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Service with id: ", id);
        result(null, res);
    });
};

Service.removeAll = result => {
    sql.query("DELETE FROM Services", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} Services`);
        result(null, res);
    });
};

module.exports = Service;