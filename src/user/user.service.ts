import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/user.dto';
import {User} from '../entities/user.entity';
import {SoldeCongesDto} from "./dto/SoldeCongesDto";

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
        return this.repository.findOne({email});
    }

    public async updateUserNbrJourpris(id: number, soldepris: number) {
        await this.repository.save({
            id: id,
            nbrjourpris: soldepris
        });
    }


    public async getSoldeConges(id: number): Promise<SoldeCongesDto> {

        // on cherche user de lid id
        const user: User = await this.repository.findOne(id);
        //mapping
        // creation instance dto
        const soldeCongesDto: SoldeCongesDto = new SoldeCongesDto()

        //
        soldeCongesDto.soldeAnnuel = user.soldeannuel;
        soldeCongesDto.soldePris = user.nbrjourpris;
        soldeCongesDto.soldeRestant = soldeCongesDto.soldeAnnuel - soldeCongesDto.soldePris;

        // return dto
        return soldeCongesDto;
    }

}