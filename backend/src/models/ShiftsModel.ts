import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, Default} from "sequelize-typescript"
import ComplexModel from "./ComplexModel";
import TeamModel from "./TeamModel";

@Table({ 
    tableName: "Shifts",
})

class ShiftsModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => ComplexModel)
    @Column({
      type: DataType.INTEGER
    })
    declare complex: number; 
    @BelongsTo(() => ComplexModel)
    complexData: ComplexModel;

    @Default(true)
    @Column ({ 
        type: DataType.BOOLEAN()
    })
    declare available: boolean

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
      })
      declare date: string; 
    
      @Column({
        type: DataType.TIME, 
        allowNull: false,
      })
      declare hour: string; 

      @ForeignKey(() => TeamModel)
      @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
      declare team1Id?: number;
    
      @BelongsTo(() => TeamModel, { foreignKey: 'team1Id', as: 'team1' })
      team1?: TeamModel;
    
      @ForeignKey(() => TeamModel)
      @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
      declare team2Id?: number;
    
      @BelongsTo(() => TeamModel, { foreignKey: 'team2Id', as: 'team2' })
      team2?: TeamModel;  
}


export default ShiftsModel