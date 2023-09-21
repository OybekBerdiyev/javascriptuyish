import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISFuelTypeAttr {
    name: string
}

@Table({tableName: 'fuelType'})
export class FuelType extends Model<FuelType, ISFuelTypeAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;
    @Column({
        type: DataType.STRING,
        unique:true,
    })
    name:string;
}