import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import AdminModel from "./AdminModel";

@Table({
  tableName: "adminToken",
})
class TokenAdminModel extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  declare number: number;


  @ForeignKey(() => AdminModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    declare admin?: number;

    @BelongsTo(() => AdminModel)
    adminData: AdminModel;

} 

export default TokenAdminModel;