import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import ComplexModel from "./ComplexModel";

@Table({ tableName: "complexImages" })

class ComplexImages extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare url: string;

    @ForeignKey(() => ComplexModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare complexId: number;

    @BelongsTo(() => ComplexModel)
    complex: ComplexModel;
}

export default ComplexImages;