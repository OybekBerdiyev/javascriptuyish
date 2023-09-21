import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { FuelType } from "src/fuel_type/models/fuelType.model";
import { Branch } from './../../branch/models/branch.model';

interface IstationFuelAttr {
    branchId:number;
    fuelTypeId:number;
    price: number;
    isHave: boolean;
}

@Table({tableName: 'branch'})
export class StationFuel extends Model<StationFuel, IstationFuelAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;

    @ForeignKey(()=> Branch)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",onUpdate: "CASCADE"
    })
    branchId:number;

    @ForeignKey(()=> FuelType)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",onUpdate: "CASCADE"
    })
    fuelTypeId:number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    price:string;
   
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isHave: boolean;

}