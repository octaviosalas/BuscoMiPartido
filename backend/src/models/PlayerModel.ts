import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import TeamModel from "./TeamModel";

@Table({
  tableName: "players",
})
class PlayerModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => TeamModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare teamId: number;

  @BelongsTo(() => TeamModel)
  team: TeamModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string; 

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare age: number;

}

export default PlayerModel;