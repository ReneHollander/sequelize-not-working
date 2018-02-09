import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import setRoutes from './routes';
import {Sequelize} from "sequelize-typescript";
import User from "./models/user.model";

const app = express();
dotenv.load({path: '.env'});
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'test') {
  // mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  // mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

const sequelize = new Sequelize({
  database: 'ibex',
  dialect: 'sqlite',
  username: null,
  password: null,
  storage: 'ibex.sqlite',
  modelPaths: [__dirname + '/models/*.model.ts']
});

async function main() {
  await sequelize.authenticate();
  await sequelize.sync({force: true});

  let user = new User({
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

  user = await User.findById(1);
  console.log(JSON.stringify(user));

  let match = await user.comparePassword('12345678');
  console.log(match);

  setRoutes(app);

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log('Angular Full Stack listening on port ' + app.get('port'));
    });
  }
}

main().catch(err => {
  console.error(err);
});

// mongoose.Promise = global.Promise;

// mongoose.connect(mongodbURI)
//   .then(async (db) => {

export {app};
