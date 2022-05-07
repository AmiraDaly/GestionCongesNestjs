import {UserRoleEnum} from "../../entities/user.entity";

export class JwtpayloadDto {
  name: string;
  email: string;
  role: string;
}
