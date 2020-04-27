const sql = require("./dbConnection");
const bcrypt = require("bcryptjs");

const Customer = function (customer) {

    this.CustomerId = customer.CustomerId
    this.CustomerName = customer.CustomerName
    this.DayOfBirth = customer.DayOfBirth
    this.Nationality = customer.Nationality
    this.Address = customer.Address
    this.Email = customer.Email
    this.Phone = customer.Phone
    this.LastVisited = customer.LastVisited
    this.Username = customer.Username
    this.Password = customer.Password
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
};

Customer.findOne = (filed, value, result) => {
    sql.query(`SELECT * FROM customers WHERE  ${filed} = '${value}'`, (err, res) => {
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

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET CustomerName = ?, DayOfBirth = ?,  Nationality= ? ,Email= ?,Phone= ?, LastVisited=?, Username=?, Password=? WHERE CustomerId = ?",
        [customer.CustomerName, customer.DayOfBirth, customer.Nationality, customer.Email, customer.Phone, customer.LastVisited, customer.Username, bcrypt.hashSync(customer.Password, 10), id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { ...customer });
        }
    );
};

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE CustomerId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};





module.exports = Customer;