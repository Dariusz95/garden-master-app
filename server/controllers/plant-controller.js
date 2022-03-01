const Plant = require("../db/models/plantModel");

class PlantController {
  async create(req, res) {
    const plant = new Plant({
      kind: req.body.kind,
      tips: req.body.tips,
      type: req.body.type,
      owner: req.user.id,
      image: req.file.filename,
    });

    plant
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }

  async showAll(req, res) {
    try {
      Plant.find({})
        .populate("comments")
        .populate({
          path: "comments",
          populate: {
            path: "owner",
          },
        })
        .populate("owner")
        .then(function (plants) {
          res.json(plants);
        });
    } catch (err) {
      res.json({ message: err });
    }
  }

  async showPlantByID(req, res) {
    try {
      Plant.findOne({ _id: req.params.id })
        .populate("comments")
        .populate({
          path: "comments",
          populate: {
            path: "owner",
          },
        })
        .populate("owner")
        .then(function (plants) {
          res.json(plants);
        });
    } catch (err) {
      res.json({ message: err });
    }
  }
  async addLike(req, res) {
    try {
      console.log("req user", req.user);
      const user = await Plant.findOne({
        _id: req.body._id,
        like: { $in: [req.user.id] },
      });
      console.log("user", user);
      if (!user) {
        await Plant.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { like: req.user.id } }
        ).then((plants) => {
          res.json(plants);
        });
      } else {
        res.status(403).json("Użytkownik może polubić tylko raz");
      }
    } catch (err) {
      res.json(err);
    }
  }
  async updatePlant(req, res) {
    try {
      if (req.file) {
        var data = {
          kind: req.body.kind,
          type: req.body.type,
          tips: req.body.tips,
          image: req.file.filename,
        };
      } else {
        var data = {
          kind: req.body.kind,
          type: req.body.type,
          tips: req.body.tips,
        };
      }

      const plant = await Plant.findOneAndUpdate(
        {
          _id: req.params.id,
          owner: req.user.id,
        },
        data
      );
      console.log("plant");
      if (!plant) res.status(404).send("No plant found");
      res.status(201).send("Plant updated");
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new PlantController();
