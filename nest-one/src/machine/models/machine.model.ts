import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "src/company/models/company.model";
import { Driver } from "src/driver/models/driver.model";
import { Machine_driver } from "src/machine_driver/models/md.model";

interface IMachineCreationAttr{
    model:string;
    name: string;
    companyId: number;
}

@Table({tableName: "machine"})
export class Machine extends Model<Machine, IMachineCreationAttr>{
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
    model:string;
    
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    name:string;

    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER,onDelete: "CASCADE",onUpdate: "CASCADE"})
    companyId: number;

    @BelongsToMany (()=> Driver, ()=> Machine_driver)
    drivers: Driver[];

    @BelongsTo (()=> Company)
    company: Company;
}