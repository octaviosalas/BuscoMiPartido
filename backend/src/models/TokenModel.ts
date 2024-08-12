import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import UserModel from "./UserModel";
import AdminModel from "./AdminModel";

@Table({
  tableName: "token",
})
class TokenModel extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  declare number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare referenceId: number; 

  @BelongsTo(() => UserModel, { foreignKey: 'id', constraints: false })
  user?: UserModel;

  @BelongsTo(() => AdminModel, { foreignKey: 'id', constraints: false })
  admin?: AdminModel;
} 

export default TokenModel;