import {IsEmail, IsNotEmpty} from "class-validator";

export class AuthSignInDtoResponse {
    id:number;
    name: string;
    email: string;
    token:string;


}