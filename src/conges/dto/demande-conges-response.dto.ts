import {EtatCongesEnum} from "../../entities/conges.entity";

export class DemandeCongesResponseDto {
    id: number;
    dateDepart: Date;
    dateRetour: Date;
    motif: String;
    createdAt: Date;
    updatedAt: Date;
    etat: EtatCongesEnum;
    nbJourConges: number;
}