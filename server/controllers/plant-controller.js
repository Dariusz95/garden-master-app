const Plant = require("../db/models/plantModel");

class PlantController {
  async create(req, res) {
    const plant = new Plant({
      kind: req.body.kind,
      tips: req.body.tips,
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
}

module.exports = new PlantController();
