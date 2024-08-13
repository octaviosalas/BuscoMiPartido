import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany} from "sequelize-typescript"
import TeamModel from "./TeamModel"; 
import ReviewsModel from "./ReviewsModel";
import ShiftsModel from "./ShiftsModel";

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
    declare email: string

    @Column ({ 
        type: DataType.STRING
    })
    declare password: string

    @HasMany(() => TeamModel, { foreignKey: 'admin' }) 
    teams: TeamModel[];

    @HasMany(() => ReviewsModel)
    reviews: ReviewsModel[];

    @HasMany(() => ShiftsModel)
    shifts: ShiftsModel[];
}

export default UserModel