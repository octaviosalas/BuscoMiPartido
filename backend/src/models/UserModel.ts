import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany} from "sequelize-typescript"
import TeamModel from "./TeamModel"; // Importa el modelo de jugadores

@Table({ 
    tableName: "users",
})

class UserModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare name: string

    @Column ({ 
        type: DataType.STRING
    })
    declare password: string

    @HasMany(() => TeamModel, { foreignKey: 'admin' }) 
    teams: TeamModel[];
}

export default UserModel