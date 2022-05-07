import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthSignInDto} from "./dto/AuthSignInDto";
import {AuthSignUpDto} from "./dto/AuthSignUpDto";
import {AuthService} from "./auth.service";
import {AuthSignUpDtoResponse} from "./dto/AuthSignUpDtoResponse";
import {AuthSignInDtoResponse} from "./dto/AuthSignInDtoResponse";

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;
    @Post('/register')
    public register(@Body() authSignUpDto : AuthSignUpDto): Promise<AuthSignUpDtoResponse> {
        return this.service.register(authSignUpDto)
    }





    @Post('/signin')
    public signin(@Body() authSignInDto : AuthSignInDto):  Promise<AuthSignInDtoResponse>{
        return this.service.signin(authSignInDto)
    }
}
