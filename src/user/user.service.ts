import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public getUser(id: number): Promise<User> {
        return this.repository.findOne(id);
    }

    public createUser(body: CreateUserDto): Promise<User> {
        const user: User = new User();

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;

        return this.repository.save(user);
    }
    public loginUserDto(id: number): Promise<User> {
        return this.repository.findOne(id);
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }

public async  updateUserNbrJourpris(id:number, soldepris:number)
{
    await this.repository.save({
        id: id,
        nbrjourpris: soldepris
    });
}


}