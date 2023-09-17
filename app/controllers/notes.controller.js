const db = require("../models");
const Notes = db.notes;
const Op = db.Sequelize.Op;

// Create and Save a new Notes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Notes
  const notes = {
    title: req.body.title,
    content: req.body.content
  };

  // Save Notes in the database
  Notes.create(notes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notes."
      });
    });
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Notes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single Notes with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Notes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving notes with id=" + id
      });
    });
};

// Update a Notes by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Notes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Notes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Notes with id=${id}. Maybe Notes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Notes with id=" + id
      });
    });
};

// Delete a Notes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Notes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Notes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Notes with id=${id}. Maybe Notes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Notes with id=" + id
      });
    });
};

// Delete all Notes from the database.
exports.deleteAll = (req, res) => {
  Notes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} notes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notes."
      });
    });
};
