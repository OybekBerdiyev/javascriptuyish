import { Model, Column, DataType, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserRoles } from "./user-roles.model";
import { User } from "../../users/models/user.model";

interface IRoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
  })
  description: string;



  @BelongsToMany(()=>User ,()=> UserRoles)
  roles: User[]

}
