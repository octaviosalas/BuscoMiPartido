import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default} from "sequelize-typescript"
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
    declare name: string

    @Column ({ 
        type: DataType.STRING
    })
    declare password: string

    @Default(false)
    @Column ({ 
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean
        
    @HasMany(() => ComplexModel, { foreignKey: 'adminId' }) 
    complexData: ComplexModel[];
}

export default AdminModel