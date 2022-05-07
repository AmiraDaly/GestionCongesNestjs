import {IsEmail, IsNotEmpty} from "class-validator";

export class AuthSignUpDtoResponse {
    id:number;
    name: string;
    email: string;


}