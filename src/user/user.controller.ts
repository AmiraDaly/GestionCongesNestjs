import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../auth/decorators/role.decorator";



@Controller('user')
@Roles('admin')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @Roles('user')
    @UseGuards(RoleGuard)
    public getUser(@Param('id', ParseIntPipe) id: number
    ): Promise<User> {
        return this.service.getUser(id);
    }



}