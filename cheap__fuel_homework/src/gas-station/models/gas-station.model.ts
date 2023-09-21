import { Column, DataType, Model, Table,BelongsTo } from "sequelize-typescript";
import { Branch } from './../../branch/models/branch.model';

interface IStationAttr {
    main_gas_station_name: string
}

@Table({tableName: 'main_station'})
export class MainStation extends Model<MainStation, IStationAttr>{
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
    main_gas_station_name:string;

    @BelongsTo (()=> Branch)
    branch: Branch;
}