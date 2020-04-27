const sql = require("./dbConnection");

// constructor
const RoomTypes = function (roomTypes) {
    this.RoomTitle = roomTypes.RoomTitle;
    this.RoomPrice = roomTypes.RoomPrice;
    this.Person = roomTypes.Person;
};

RoomTypes.create = (newRoomTypes, result) => {
    sql.query("INSERT INTO RoomTypes SET ?", newRoomTypes, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { ...newRoomTypes });
    });
};

RoomTypes.findByTitle = (title, result) => {
    sql.query(`SELECT * FROM RoomTypes WHERE RoomTitle = '${title}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res == []) {
            result({ "message": "not_found" }, null);
            return;
        }
        result(null, res[0]);
    });
};

RoomTypes.getAll = result => {
    sql.query("SELECT * FROM RoomTypes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("RoomTypes: ", res);
        result(null, res);
    });
};

RoomTypes.updateByTitle = (title, RoomTypes, result) => {
    sql.query(
        `UPDATE RoomTypes SET RoomTitle = ?, RoomPrice = ? ,Person = ? WHERE RoomTitle = ?`,
        [RoomTypes.RoomTitle, RoomTypes.RoomPrice, RoomTypes.Person, title],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, res.message);
                return;
            }
            result(null, { ...RoomTypes });
        }
    );
};
RoomTypes.remove = (title, result) => {
    sql.query("DELETE FROM RoomTypes WHERE RoomTitle = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted RoomTypes with id: ", id);
        result(null, res);
    });
};

// RoomTypes.removeAll = result => {
//     sql.query("DELETE FROM RoomTypes", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }
//         console.log(`deleted ${res.affectedRows} RoomTypess`);
//         result(null, res);
//     });
// };

module.exports = RoomTypes;