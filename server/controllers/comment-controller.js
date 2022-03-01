const { response } = require("express");
const Comment = require("../db/models/commentModel");
const Plant = require("../db/models/plantModel");

class CommentController {
  async create(req, res) {
    const comment = new Comment({
      owner: req.user.id,
      comment: req.body.comment,
      commentFor: req.body._id,
    });
    await comment.save();
    await Plant.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { comments: comment } }
    );
    res.send("Comment was added successfully");
  }

  async update(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate(
        {
          _id: req.params.id,
          owner: req.user.id,
        },
        {
          comment: req.body.comment,
        }
      );
      if (!comment) res.status(404).send("No comment found");
      res.status(201).send("Comment updated");
    } catch (err) {
      res.send("errrr", err);
    }
  }

  async delete(req, res) {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
      });
      if (!comment) res.status(404).send("No comment found");
      res.status(200).send("Comment deleted");
    } catch (err) {
      res.send("errrr", err);
    }
  }
}

module.exports = new CommentController();
