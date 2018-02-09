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
class BaseCtrl {
    constructor() {
        // Get all
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(yield this.model.findAll());
        });
        // Count all
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(yield this.model.count());
        });
        // Insert
        this.insert = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model.create(req.body);
            res.status(200).json(item);
        });
        // Get by id
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model.findById(req.params.id);
            res.status(200).json(item);
        });
        // Update by id
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.model.update(req.body, { where: { id: req.params.id } });
            res.sendStatus(200);
        });
        // Delete by id
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.model.destroy({ where: { id: req.params.id } });
            res.sendStatus(200);
        });
    }
}
exports.default = BaseCtrl;
//# sourceMappingURL=base.js.map