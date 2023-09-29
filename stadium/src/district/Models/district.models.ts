import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Region } from "src/region/Models/region.models";

interface DistrictCreateAttrs {
    name: string;
    regionId: number;
}

@Table({tableName: "districts"})
export class District extends Model<District, DistrictCreateAttrs>{
    @ApiProperty({example: 1, description: "Id serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ApiProperty({example: "Urgut", description: "Tuman nomi kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example: "1", description: "Viloyat id kiritiladi"})
    @ForeignKey(()=> Region)
    @Column({
        type: DataType.INTEGER,
    })
    regionId: number;
}
