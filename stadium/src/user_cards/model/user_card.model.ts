import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/Models/user.models";

interface UserCardAttr {
    userId: number;
    name: string;
    phone: string;
    number: number;
    year: number;
    month: number;
}

@Table({tableName: "user_card"})
export class UserCard extends Model<UserCard, UserCardAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @ApiProperty({example:2, description: "Userning ID si"})
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
    })
    userId:number;
    
    @ApiProperty({example:"Humo,Visa, UZCARD", description: "Kartaning nomi"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example:"+998331234567", description: "Userning telefon raqami"})
    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @ApiProperty({example:"1234 5678 9634 4789", description: "Karta raqami"})
    @Column({
        type: DataType.INTEGER,
    })
    number: number;

    @ApiProperty({example:"26", description: "Kartaning yili"})
    @Column({
        type: DataType.INTEGER,
    })
    year: number;

    @ApiProperty({example:"06", description: "Kartaning oyi"})
    @Column({
        type: DataType.INTEGER,
    })
    month: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,

    })
    is_main:boolean; 

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false,
    })

    isActive:boolean
}
