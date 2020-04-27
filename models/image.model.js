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

Image.findOne = (filed, value, result) => {
    sql.query(`SELECT * FROM images WHERE  ${filed} = '${value}'`, (err, res) => {
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

Image.getAll = result => {
    sql.query("SELECT * FROM images", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Image.updateByRoomType = (type, image, result) => {
    sql.query(
        "UPDATE images SET RoomType = ?, image1 = ?,  image2= ? ,image3= ?,image4= ?WHERE imageId = ?",
        [image.RoomType, image.image1, image.image2, image.image3, image.image4, type],
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

Image.remove = (roomType, result) => {
    sql.query("DELETE FROM images WHERE RoomType = ?", roomType, (err, res) => {
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