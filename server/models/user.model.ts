import * as bcrypt from 'bcryptjs';
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  Length,
  Model,
  Table,
  Unique
} from 'sequelize-typescript';
import * as IBAN from 'iban';


type Role = 'USER' | 'ADMIN';

@Table
class User extends Model<User> {

  @Unique
  @Column
  email: string;

  @Length({max: 60})
  @Column
  password: string;

  @Length({min: 64, max: 64})
  @AllowNull
  @Column
  emailToken: string;

  @Column
  name: string;

  @Default('USER')
  @Column(DataType.ENUM('USER', 'ADMIN'))
  role: Role;

  @Column
  address: string;

  @Column
  postcode: number;

  @Column
  city: string;

  @AllowNull
  @Column
  deliveryNote: string;

  @Column
  accountName: string;

  @Column
  get iban(): string {
    return this.getDataValue('iban');
  }

  set iban(value: string) {
    if (!IBAN.isValid(value)) {
      throw new Error('"${value}" is not a valid IBAN.')
    }
    this.setDataValue('name', IBAN.electronicFormat(value));
  }

  @Column
  phone: string;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(user: User): Promise<void> {
    if (user.changed('password')) {
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export default User;
