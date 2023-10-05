import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Driver } from "src/driver/models/driver.model";
import { Machine } from "src/machine/models/machine.model";

interface IMDCreationAttr{
    machineId: number;
    driverId: number;
}

@Table({tableName: "machine_driver",createdAt:false, updatedAt:false})
export class Machine_driver extends Model<Machine_driver, IMDCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;

    @ForeignKey(() => Machine)
    @Column({type: DataType.INTEGER,onDelete: "CASCADE",onUpdate: "CASCADE"})
    machineId: number;

    @ForeignKey(() => Driver)
    @Column({type: DataType.INTEGER,onDelete: "CASCADE",onUpdate: "CASCADE"})
    driverId: number;


}