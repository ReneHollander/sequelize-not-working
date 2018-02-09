abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = async (req, res) => {
    res.status(200).json(await this.model.findAll());
  };

  // Count all
  count = async (req, res) => {
    res.status(200).json(await this.model.count());
  };

  // Insert
  insert = async (req, res) => {
    const item = await this.model.create(req.body);
    res.status(200).json(item);
  };

  // Get by id
  get = async (req, res) => {
    const item = await this.model.findById(req.params.id);
    res.status(200).json(item);
  };

  // Update by id
  update = async (req, res) => {
    await this.model.update(req.body, {where: {id: req.params.id}});
    res.sendStatus(200);
  };

  // Delete by id
  delete = async (req, res) => {
    await this.model.destroy({where: {id: req.params.id}});
    res.sendStatus(200);
  }
}

export default BaseCtrl;
