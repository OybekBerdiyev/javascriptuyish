import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { userStub } from "./stubs/user.stub";
import { CreateUserDto } from "../dto/create-user.dto";

jest.mock('../users.service')
describe("User Controller", () => {
    let usersController: UsersController;
    let usersService: UsersService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, JwtService],
        }).compile();
        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    })
    it("should be defined UsersController", () => {
        expect(usersController).toBeDefined();
    })
    it("should be defined userService", async () => {
        expect(usersService).toBeDefined();
    });

    describe ("create", ()=> {
        describe("when create is called", ()=> {
            let user: User;
            let createUserDto: CreateUserDto
            beforeAll(async ()=> {
                createUserDto = {
                    name: userStub().name,
                    email: userStub().email,
                    password: userStub().password,
                }
                user = await usersController.create(createUserDto)
                console.log(user);  
            })
            it("then it should call usersService", ()=> {
                expect(usersService.create).toHaveBeenCalledWith(createUserDto)
            })
            it("then it should return user", ()=> {
                expect(user).toEqual(userStub());
            })
        })
    })
}) 
