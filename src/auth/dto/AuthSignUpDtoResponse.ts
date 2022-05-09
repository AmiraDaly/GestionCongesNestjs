import {IsEmail, IsNotEmpty} from "class-validator";
import {UserRoleEnum} from "../../entities/user.entity";
import {Column} from "typeorm";

export class AuthSignUpDtoResponse {
    id:number;
    name: string;
    email: string;
    role:UserRoleEnum;
    soldeannuel: number;
    nbrjourpris: number;

}