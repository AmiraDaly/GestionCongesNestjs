import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Conges} from '../entities/conges.entity';
import {DemandeCongesDto} from "./dto/demande-conges.dto";
import {DemandeCongesResponseDto} from "./dto/demande-conges-response.dto";
import {User} from "../entities/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class CongesService {
    @InjectRepository(Conges)
    private readonly repository: Repository<Conges>;
    constructor(
        private userService: UserService,
    ) {}




    public async demandeConges(body: DemandeCongesDto, currentUser: User): Promise<DemandeCongesResponseDto> {
        console.log('rrrrrrrrrr ', currentUser);
        // dto to entity
        let nbjour: number = 0;
        let d1 = new Date(body.dateRetour).getTime();
        let d2 = new Date(body.dateDepart).getTime();
        nbjour = (d1 - d2) / (1000 * 3600 * 24);
        if (nbjour <= 0) {

            throw new BadRequestException('Erreur : Date de Retour est inférieur ou egale a la  Date de Depart ')
        }
        if (nbjour > currentUser.soldeannuel) {
            const msg = 'Erreur : Solde insuffisant , il vous reste (jours)' + currentUser.soldeannuel.toString();
                throw new BadRequestException(msg);
        }
        const congesTosave: Conges = new Conges();

        congesTosave.dateDepart = body.dateDepart;
        congesTosave.dateRetour = body.dateRetour;
        congesTosave.motif = body.motif;
        congesTosave.nbJourConges = nbjour;

        congesTosave.user = currentUser;
        // save entity to DB
        const res: Conges = await this.repository.save(congesTosave);
        // reduire le solde congé : appel fonction updateuser

         await this.userService.updateUserNbrJourpris(currentUser.id, nbjour+currentUser.nbrjourpris);

        return this.mappingEntityToDemandeCongesResponseDtoTo(res)

    }

    private async mappingEntityToDemandeCongesResponseDtoTo(res: Conges): Promise<DemandeCongesResponseDto> {
        const retour: DemandeCongesResponseDto = new DemandeCongesResponseDto();
        retour.id = res.id;
        retour.dateDepart = res.dateDepart;
        retour.dateRetour = retour.dateRetour;
        retour.etat = res.etat;
        retour.createdAt = res.createdAt;
        retour.motif = res.motif;
        retour.updatedAt = res.updatedAt;
        retour.nbJourConges = res.nbJourConges;
        return retour;
    }

}