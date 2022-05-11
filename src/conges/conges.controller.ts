import {Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CongesService} from './conges.service';
import {DemandeCongesDto} from "./dto/demande-conges.dto";
import {DemandeCongesResponseDto} from "./dto/demande-conges-response.dto";
import {Roles} from "../auth/decorators/role.decorator";
import {RoleGuard} from "../auth/guards/role.guard";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/paramDecorator/user.param-decorator";
import {SoldeCongesDto} from "../user/dto/SoldeCongesDto";


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
        return this.service.demandeConges(demandeCongesDto, currentUser);


    }


    @Get('/listCongesForCurrentUser')
    @UseGuards(AuthGuard('jwt'))
    @Roles('user')
    @UseGuards(RoleGuard)
    public getListCongesForCurrentUser(@GetUser() currentUser): Promise<DemandeCongesResponseDto[]> {
        return this.service.getListCongesForCurrentUser(currentUser);


    }

    @Get('/listConges')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @UseGuards(RoleGuard)
    public getListConges(): Promise<DemandeCongesResponseDto[]> {
        return this.service.getListConges();


    }

    @Patch('/validate/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @UseGuards(RoleGuard)
    public validateDemandeConges(@Param('id', ParseIntPipe) id: number
    ): Promise<DemandeCongesResponseDto> {
        return this.service.validateDemandeConges(id);
    }


    @Patch('/cancel/:id')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @UseGuards(RoleGuard)
    public cancelDemandeConges(@Param('id', ParseIntPipe) id: number,
                               @GetUser() currentUser): Promise<DemandeCongesResponseDto> {
        return this.service.CancelDemandeConges(id, currentUser);


    }


}