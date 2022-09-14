
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'READ_TRANSACTION,READ_USER',
  })
  permissions!: string;
}