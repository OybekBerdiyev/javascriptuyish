import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "src/company/models/company.model";

interface IBulderCreationAttr{
    full_name:string;
    birth_day:string;
    salary:number;
}

@Table({tableName: "builder"})
export class Bulder extends Model<Bulder, IBulderCreationAttr>{
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
    full_name:string;
    
    @Column({
        type:DataType.STRING,
    })
    birth_day:string;

    @Column({
        type:DataType.DECIMAL,
    })
    salary:number;

    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER,onDelete: "CASCADE",onUpdate: "CASCADE"})
    companyId: number;

    @BelongsTo (()=> Company)
    company: Company;
}