import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "../../repository/user.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    //configuring strategy and jwt
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'ourSecretKey',
      signOptions: {
        expiresIn: 3600,
      }
    }),
      TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
