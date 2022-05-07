import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthSignUpDto} from "./dto/AuthSignUpDto";
import {UserRepository} from "../repository/user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSignUpDtoResponse} from "./dto/AuthSignUpDtoResponse";
import {AuthSignInDtoResponse} from "./dto/AuthSignInDtoResponse";
import {AuthSignInDto} from "./dto/AuthSignInDto";
import {JwtService} from "@nestjs/jwt";
import {JwtpayloadDto} from "./dto/jwtpayload.dto";

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        //injected jwtService
        private jwtService: JwtService,
    ) {}

    register(authSignUpDto: AuthSignUpDto): Promise<AuthSignUpDtoResponse> {
        return this.userRepository.register(authSignUpDto)
    }

    async signin(authSignInDto: AuthSignInDto): Promise<AuthSignInDtoResponse> {
        console.log('here now')
        const userResult = await this.userRepository.signIn(authSignInDto);
        if (!userResult) {
            throw new UnauthorizedException('Invalid Credential!');
        }
        const payload: JwtpayloadDto = {
            name: userResult.name,
            email: userResult.email,
            role: userResult.role,
        };
        const accessToken = this.jwtService.sign(payload);
        userResult.token = accessToken;
        return userResult;
    }
}
