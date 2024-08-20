import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import PlayerModel from "./PlayerModel"; // Importa el modelo de jugadores
import UserModel from "./UserModel";
import TeamSeekingMatchModel from "./TeamSeekingMatch";

@Table({ 
    tableName: "teams",
    indexes: [
        { fields: ['userOwner'] } 
    ]
})

class TeamModel extends Model { 
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
    declare location: string

    @Column ({ 
        type: DataType.BIGINT
    })
    declare phone: number
 
    @HasMany(() => PlayerModel, { foreignKey: 'teamId' })
    players: PlayerModel[];

    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare userOwner: number; 
  
    @BelongsTo(() => UserModel)
    creatorData: UserModel;

    @HasMany(() => TeamSeekingMatchModel, { foreignKey: 'teamId' })
    teamData: TeamSeekingMatchModel[];

    
}

export default TeamModel