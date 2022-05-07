import {IsEmail, IsNotEmpty} from "class-validator";
import {UserRoleEnum} from "../../entities/user.entity";

export class AuthSignInDtoResponse {
    id:number;
    name: string;
    email: string;
    token:string;
    role:UserRoleEnum;


}