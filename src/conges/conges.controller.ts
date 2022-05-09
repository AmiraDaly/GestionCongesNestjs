import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {CongesService} from './conges.service';
import {DemandeCongesDto} from "./dto/demande-conges.dto";
import {DemandeCongesResponseDto} from "./dto/demande-conges-response.dto";
import {Roles} from "../auth/decorators/role.decorator";
import {RoleGuard} from "../auth/guards/role.guard";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/paramDecorator/user.param-decorator";


@Controller('conges')
@Roles('admin')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
export class CongesController {
    @Inject(CongesService)
    private readonly service: CongesService;

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles('user')
    @UseGuards(RoleGuard)
    public demandeConges(@Body() demandeCongesDto: DemandeCongesDto,
        @GetUser() currentUser): Promise<DemandeCongesResponseDto> {
        return this.service.demandeConges(demandeCongesDto,currentUser);


    }


}