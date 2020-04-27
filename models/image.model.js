const sql = require("./dbConnection");


const Image = function (image) {
    this.RoomType = image.RoomType
    this.Path = image.Path
};

Image.create = (newListImage, result) => {
    sql.query("INSERT INTO images SET ?", newListImage, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null);
            return;
        }
        console.log
        result(null, res);
    });
};

// Image.findOne = (filed, value, result) => {
//     sql.query(`SELECT * FROM images WHERE  ${filed} = '${value}'`, (err, res) => {
//         if (err) {
//             result(err, null);
//             return;
//         }
//         if (res.length) {
//             result(null, res[0]);
//             return;
//         }
//         result({ kind: "not_found" }, null);
//     });
// };

Image.getAll = result => {
    sql.query("SELECT * FROM images", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Image.GetByRoomType = (RoomType, result) => {
    sql.query("SELECT * FROM images  WHERE RoomType = ? ", RoomType, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Image.getById = (id, result) => {
    sql.query("SELECT * FROM images  WHERE idImage = ? ", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Image.updateById = (id, image, result) => {
    sql.query(
        "UPDATE images SET RoomType = ?,Path = ? WHERE idImage = ?",
        [image.RoomType, image.Path, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { ...image });
        }
    );
};

Image.removeById = (id, result) => {
    sql.query("DELETE FROM images WHERE idImage = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found image with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

Image.removeByRoomType = (RoomType, result) => {
    sql.query("DELETE FROM images WHERE RoomType = ?", RoomType, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found image with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

Image.removeAll = result => {
    sql.query("DELETE FROM images", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Image;