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
}

module.exports = new CommentController();
