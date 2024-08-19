import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript"
import AdminModel from "./AdminModel"
import ComplexImages from "./ComplexImages"
import ReviewsModel from "./ReviewsModel"
import ShiftsModel from "./ShiftsModel"

@Table({ 
    tableName: "complex",
    indexes: [
        { fields: ['adminId'] },
    ]
})

class ComplexModel extends Model { 
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
        type: DataType.STRING
    })
    declare province: string

    @Column ({ 
        type: DataType.STRING
    })
    declare address: string

    @Column ({ 
        type: DataType.INTEGER
    })
    declare shiftPrice: number

    @Column ({ 
        type: DataType.INTEGER
    })
    declare numberOfCourts: number

    @Column ({ 
        type: DataType.BIGINT
    })
    declare phone: number

    @ForeignKey(() => AdminModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare adminId: number;

    @BelongsTo(() => AdminModel)
    admin: AdminModel;

    @HasMany(() => ComplexImages)
    complexImages: ComplexImages[];

    @HasMany(() => ReviewsModel)
    complexReviews: ReviewsModel[];

    @HasMany(() => ShiftsModel)
    complexShifts: ShiftsModel[];

}

export default ComplexModel