import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get(':id')
    public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.service.getUser(id);
    }

    @Post()
    public createUser(@Body() body: CreateUserDto): Promise<User> {
        let res = this.service.createUser(body);
        return res;
    }
}