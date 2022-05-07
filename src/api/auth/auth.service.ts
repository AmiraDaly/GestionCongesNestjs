import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthSignUpDto} from "./dto/AuthSignUpDto";
import {UserRepository} from "../../repository/user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSignUpDtoResponse} from "./dto/AuthSignUpDtoResponse";
import {AuthSignInDtoResponse} from "./dto/AuthSignInDtoResponse";
import {AuthSignInDto} from "./dto/AuthSignInDto";
import {JwtService} from "@nestjs/jwt";

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

        const userResult = await this.userRepository.signIn(authSignInDto);
        if (!userResult) {
            throw new UnauthorizedException('Invalid Credential!');
        }
        const payload = {userResult};
        const accessToken = this.jwtService.sign(payload);
        userResult.token = accessToken;
        return userResult;
    }
}
