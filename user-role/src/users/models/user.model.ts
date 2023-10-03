import { BelongsToMany, Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Role } from "src/roles/models/role.model";
import { UserRoles } from "src/roles/models/user-roles.model";
import { Posts } from 'src/posts/models/post.model';

interface IUserCreationAttrs {
    name: string;
    email: string;
    password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User,IUserCreationAttrs>{

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
      name: string;
    
      @Column({
        type: DataType.STRING, 
        allowNull: false,
      })
      email: string;

      @Column({
        type: DataType.BOOLEAN, 
        allowNull: false,
        defaultValue: true,
      })
      is_active: boolean;

      @Column({
        type: DataType.STRING, 
        allowNull: false,
      })
      password: string;
      @BelongsToMany(()=> Role,()=> UserRoles)
      roles: Role[]

      @HasMany(()=> Posts)
      post: Posts
}