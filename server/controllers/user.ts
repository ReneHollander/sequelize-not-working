import * as jwt from 'jsonwebtoken';

import BaseCtrl from './base';
import User from "../models/user.model";

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = async (req, res) => {
    let user = await this.model.findOne({where: {email: req.body.email}});
    if (!user) {
      return res.sendStatus(403);
    }
    const match = await user.comparePassword(req.body.password);
    if (!match) {
      return res.sendStatus(403);
    }
    const token = jwt.sign({user: user}, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
    res.status(200).json({token: token});
  }
}
