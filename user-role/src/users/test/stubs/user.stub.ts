import { User } from "../../models/user.model";

export const userStub = (): Partial<User> =>{
    return {
        id: 1,
        name: 'user1',
        email: 'user1@gmail.com',
        password: '1234',
        is_active: true,
    }
}