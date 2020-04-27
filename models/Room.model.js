const sql = require("./dbConnection");
// constructor
const Room = function (room) {
    this.RoomId = room.RoomId;
    this.RoomType = room.RoomType;
    this.RoomStatus = room.RoomStatus;
};

Room.create = (newRoom, result) => {
    sql.query("INSERT INTO rooms SET ?", newRoom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { ...newRoom });
    });
};

Room.findById = (id, result) => {
    sql.query(`SELECT * FROM rooms WHERE RoomId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
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

Room.getAll = result => {
    sql.query("SELECT * FROM rooms", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("rooms: ", res);
        result(null, res);
    });
};

Room.updateById = (id, room, result) => {
    sql.query(
        `UPDATE rooms SET RoomType = ?, RoomStatus = ? WHERE RoomId = ?`,
        [room.RoomType, room.RoomStatus, id],
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
            result(null, { ...room });
        }
    );
};
Room.remove = (id, result) => {
    sql.query("DELETE FROM rooms WHERE RoomId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted room with id: ", id);
        result(null, res);
    });
};

Room.removeAll = result => {
    sql.query("DELETE FROM rooms", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Room.CountRoom = async result => {
    await sql.query(
        `SELECT RoomType , Count(*)  as Quantity 
        FROM hotel.rooms
        group by RoomType`,
        (err, res) => {
            result(null, res);
        })

}
Room.getEmptyRoom = async (start, end, result) => {
    await sql.query(
        `SELECT *
        FROM hotel.rooms
        where RoomStatus='empty'
        and RoomId not in ( select ExpectedRoom 
					from hotel.reservations)
        or RoomId in ( select ExpectedRoom 
        from hotel.reservations 
        where reservations.ReservationStatus='waiting'
        and ExpectedCheckIn not between  '${start}' and  '${end}'
        and ExpectedCheckOut< '${start}')`,
        (err, res) => {
            result(null, res);
        })
}
module.exports = Room;