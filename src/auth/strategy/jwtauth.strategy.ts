import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtpayloadDto } from '../dto/jwtpayload.dto';
import { UserService } from '../../user/user.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtauthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'ourSecretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtpayloadDto) {
    // Todo Récupérer le user
    console.log('in validate ', payload.email);
    const user = await this.userService.findUserByEmail(
      payload.email,
    );
    //  Vérifier s'il existe on le retourne
    if (!user) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource`,
      );
    }
    return user;
    //  sinon on déclenche une erreur
  }
}
