import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Bulder } from "src/boulder/models/boulder.model";
import { Machine } from "src/machine/models/machine.model";

interface CompanyCreationAttr{
    name:string;
    address:string;
    phone:string;
}

@Table({tableName: "company"})
export class Company extends Model<Company, CompanyCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name:string;
    
    @Column({
        type:DataType.STRING,
    })
    address:string;

    @Column({
        type:DataType.STRING,
        unique: true,
    })
    phone:string;

    @HasMany(()=> Bulder)
    builders: Bulder[]
    @HasMany(()=> Machine)
    machines: Machine[]
}