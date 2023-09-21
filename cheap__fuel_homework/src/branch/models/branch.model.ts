import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { MainStation } from './../../gas-station/models/gas-station.model';
import { FuelType } from "src/fuel_type/models/fuelType.model";
import { StationFuel } from "src/station_fuel/models/stationFuel.model";

interface IStationAttr {
    main_stationId: number;
    branch_name: string;
    address: string;
    location: string;
    phone:string;
}

@Table({tableName: 'branch'})
export class Branch extends Model<Branch, IStationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;
    @ForeignKey(()=> MainStation)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",onUpdate: "CASCADE"
    })
    main_stationId:number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    branch_name:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone:string;

    @BelongsToMany (()=> FuelType, ()=> StationFuel)
    fFuelType: FuelType[];
}