import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript"
import TeamModel from "./TeamModel"

@Table({ 
    tableName: "TeamSeekingMatch",
    indexes: [
        { fields: ['teamId'] },
    ]
})

class TeamSeekingMatchModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => TeamModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare teamId: number;

    @BelongsTo(() => TeamModel)
    teamData: TeamModel;

    @Column ({ 
        type: DataType.DATE
    })
    declare date: string

    @Column ({ 
        type: DataType.DATE
    })
    declare hour: string

    @Column ({ 
        type: DataType.DATE
    })
    declare location: string

}

export default TeamSeekingMatchModel