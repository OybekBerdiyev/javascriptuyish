import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Bulder } from "src/boulder/models/boulder.model";
import { Machine } from "src/machine/models/machine.model";
import { Machine_driver } from "src/machine_driver/models/md.model";

interface DriverCreationAttr{
    name:string;
    address:string;
    phone:string;
}

@Table({tableName: "driver"})
export class Driver extends Model<Driver, DriverCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    first_name:string;
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    last_name:string;
    
    @Column({
        type:DataType.STRING,
    })
    driver_license:string;

    @Column({
        type:DataType.STRING,
        unique: true,
    })
    phone:string;

    @BelongsToMany (()=> Machine, ()=> Machine_driver)
    machine: Machine[];
    // @HasMany(()=> Bulder)
    // builders: Bulder[]
    // @HasMany(()=> Machine)
    // machines: Machine[]
}