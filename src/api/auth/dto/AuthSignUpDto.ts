import {IsEmail, IsNotEmpty} from "class-validator";

export class AuthSignUpDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;


}