const sql = require("../db/connection");

const emailList = function (email) {
  this.reportname = email.reportname;
  this.emails = email.emails;
};

emailList.create = (newEmail, result) => {
  sql.query(`INSERT INTO reports SET ?`, newEmail, (err, res) => {
    console.log("email List", newEmail);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reports: ", { id: res.insertId, ...newEmail });
    result(null, { id: res.insertId, ...newEmail });
  });
};

emailList.getAll = (req, result) => {
  let query = "SELECT * FROM reports";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error ", err);
      result(null, err);
      return;
    }
    res.map((ele, i) => {
      ele.emails = ele.emails.split(",");
    });

    result(null, res);
  });
};

emailList.getById = (id, result) => {
  sql.query(`SELECT * from reports where reportId = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("email found ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not found" }, null);
  });
};

emailList.update = (id, req, result) => {
  reportname = req.reportname;
  emails = req.emails;
  let qry = "UPDATE reports SET reportname=?, emails=? where reportId=?";
  sql.query(qry, [reportname, emails, id], (err, res) => {
    if (err) {
      console.log("error ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("updated report details: ", { id: id, ...req });
    result(null, { id: id, ...req });
  });
};

emailList.delete = (id, result) => {
  let qry = "DELETE from reports where reportId=?";
  sql.query(qry, id, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted reports with id: ", id);
    result(null, res);
  });
};

module.exports = emailList;
