import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, Default} from "sequelize-typescript"
import ComplexModel from "./ComplexModel";
import TeamModel from "./TeamModel";
import UserModel from "./UserModel";

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
      declare start: string; 

      @Column({
        type: DataType.TIME, 
        allowNull: false,
      })
      declare end: string; 

      @ForeignKey(() => UserModel)
      @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
      declare user?: number;

      @BelongsTo(() => UserModel)
      userData: UserModel;
    

}


export default ShiftsModel