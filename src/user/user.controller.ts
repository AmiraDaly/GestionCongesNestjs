import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../auth/decorators/role.decorator";
import {GetUser} from "../auth/paramDecorator/user.param-decorator";


@Controller('user')
@Roles('admin')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RoleGuard)
    @Roles('user')
    public getUser(@Param('id', ParseIntPipe) id: number,
    @GetUser() user
    ): Promise<User> {
        return this.service.getUser(id);
    }

    @Post()
    public createUser(@Body() body: CreateUserDto): Promise<User> {
        let res = this.service.createUser(body);
        return res;
    }
}