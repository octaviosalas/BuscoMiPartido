import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, BelongsTo, ForeignKey} from "sequelize-typescript"
import ComplexModel from "./ComplexModel";
import UserModel from "./UserModel";

@Table({ 
    tableName: "reviews",
    indexes: [
        { fields: ['complex'] } 
    ]
})

class ReviewsModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare text: string

    @Column ({ 
        type: DataType.INTEGER
    })
    declare punctuation : number

  
    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    declare user?: number;

    @BelongsTo(() => UserModel)
    userData: UserModel;


    @ForeignKey(() => ComplexModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    declare complex?: number;

    @BelongsTo(() => ComplexModel)
    complexData: ComplexModel;
}

export default ReviewsModel