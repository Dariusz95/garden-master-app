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
      Plant.find({}).then(function (plants) {
        res.send(plants);
      });
    } catch (err) {
      res.json({ message: err });
    }
  }
}

module.exports = new PlantController();
