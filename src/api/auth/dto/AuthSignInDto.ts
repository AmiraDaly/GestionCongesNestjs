import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class AuthSignInDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    public password: string;

}