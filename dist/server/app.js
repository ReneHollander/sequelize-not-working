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
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes_1 = require("./routes");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./models/user.model");
const app = express();
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'test') {
    // mongodbURI = process.env.MONGODB_TEST_URI;
}
else {
    // mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'ibex',
    dialect: 'sqlite',
    username: null,
    password: null,
    storage: 'ibex.sqlite',
    modelPaths: [__dirname + '/models/*.model.ts']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.authenticate();
        yield sequelize.sync({ force: true });
        let user = new user_model_1.default({
            email: "max@mustermann.at",
            password: "12345678",
            name: "Max Mustermann",
            role: 'ADMIN',
            address: "Musterstrasse 1",
            postcode: 12345678,
            city: "Musterort",
            deliveryNote: "In den Mistkübel",
            accountName: "Max Mustermann",
            iban: "AT611904300234573201",
            phone: "0676 123 456 789"
        });
        user.save();
        user = yield user_model_1.default.findById(1);
        console.log(JSON.stringify(user));
        let match = yield user.comparePassword('12345678');
        console.log(match);
        routes_1.default(app);
        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
        if (!module.parent) {
            app.listen(app.get('port'), () => {
                console.log('Angular Full Stack listening on port ' + app.get('port'));
            });
        }
    });
}
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=app.js.map