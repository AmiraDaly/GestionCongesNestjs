import {IsEmail, IsNotEmpty} from "class-validator";
import {UserRoleEnum} from "../../entities/user.entity";

export class AuthSignUpDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    role: UserRoleEnum;


}