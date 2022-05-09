import {
    IsNotEmpty,
} from 'class-validator';

export class DemandeCongesDto {
    @IsNotEmpty()
    public dateDepart: Date;

    @IsNotEmpty()
    public dateRetour: Date;

    @IsNotEmpty()
    motif: String;

}
