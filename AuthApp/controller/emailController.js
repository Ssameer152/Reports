let emailSchema = require("../model/email.model");

exports.create = (req, res) => {
  const email = new emailSchema({
    reportname: req.body.reportName,
    emails: req.body.emails.toString(),
  });
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  emailSchema.create(email, (err, result) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the email.",
      });
    else
      res.status(200).send({
        message: "Email created successfully",
      });
  });
};

exports.findAll = (req, res) => {
  const emails = req.body.emails;
  emailSchema.getAll(emails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retreiving the reports.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getEmailById = (req, res) => {
  emailSchema.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found email with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving email with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const email = new emailSchema({
    reportname: req.body.reportname,
    emails: req.body.emails.toString(),
  });

  emailSchema.update(req.params.id, email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  emailSchema.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found reports with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete report with id " + req.params.id,
        });
      }
    } else res.status(200).send(data);
  });
};
