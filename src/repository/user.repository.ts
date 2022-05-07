import { Repository, EntityRepository } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {AuthSignUpDto} from "../api/auth/dto/AuthSignUpDto";
import * as bcrypt from 'bcrypt';
import {AuthSignUpDtoResponse} from "../api/auth/dto/AuthSignUpDtoResponse";
import {AuthSignInDto} from "../api/auth/dto/AuthSignInDto";
import {AuthSignInDtoResponse} from "../api/auth/dto/AuthSignInDtoResponse";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async register(authSignUpDto: AuthSignUpDto): Promise<AuthSignUpDtoResponse> {
        const { name , email, password } = authSignUpDto;

        const user = new User();
        //random salt and encrypting password
        user.salt = await bcrypt.genSalt();
        user.email = email;
        user.password = await this.hashPassword(password, user.salt);;
        user.name = name;


        try {
            let  res = await user.save();
            return this.userToAuthSignUpDtoResponse(res);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    //private method to encrypt password
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
    private userToAuthSignUpDtoResponse(res: User) : AuthSignUpDtoResponse{
        const userResponse = new AuthSignUpDtoResponse();
        userResponse.id= res.id;
        userResponse.name= res.name;
        userResponse.email= res.email;
        return userResponse;
    }

    //signIn method to validate user's email and password
    async signIn(authSignInDto: AuthSignInDto): Promise<AuthSignInDtoResponse> {
        const { email, password } = authSignInDto;

        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            const userResponse = new AuthSignInDtoResponse();
            userResponse.name = user.name;
            userResponse.email = user.email;
            userResponse.id = user.id;
            return userResponse;
        } else {
            return null;
        }
    }
}