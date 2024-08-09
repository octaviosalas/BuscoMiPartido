import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import TeamModel from "./TeamModel"; // Importa el modelo de jugadores
import ComplexModel from "./ComplexModel";

@Table({ 
    tableName: "admin",
})

class AdminModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare email: string

    @Column ({ 
        type: DataType.STRING
    })
    declare password: string
        
    @HasMany(() => ComplexModel, { foreignKey: 'adminId' }) 
    complexData: ComplexModel[];
}

export default AdminModel