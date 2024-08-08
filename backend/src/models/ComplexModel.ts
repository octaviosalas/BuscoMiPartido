import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, Default} from "sequelize-typescript"

@Table({ 
    tableName: "complex",
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
        type: DataType.INTEGER
    })
    declare phone: number

}

export default ComplexModel