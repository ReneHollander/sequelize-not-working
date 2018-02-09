"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const base_1 = require("./base");
const user_model_1 = require("../models/user.model");
class UserCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = user_model_1.default;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.model.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.sendStatus(403);
            }
            const match = yield user.comparePassword(req.body.password);
            if (!match) {
                return res.sendStatus(403);
            }
            const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
        });
    }
}
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map