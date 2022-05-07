import {IsEmail, IsNotEmpty} from "class-validator";
import {UserRoleEnum} from "../../entities/user.entity";

export class AuthSignUpDtoResponse {
    id:number;
    name: string;
    email: string;
    role:UserRoleEnum;

}