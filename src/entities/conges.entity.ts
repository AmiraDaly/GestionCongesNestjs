import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {User} from "./user.entity";

export enum EtatCongesEnum {
    enCours = 'enCours',
    valide = 'valide',
    refuse = 'refuse',
    annule = 'annule',
}


@Entity()
export class Conges extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    dateDepart: Date;

    @Column()
    dateRetour: Date;

    @CreateDateColumn({
        update: false,
    })
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    motif: String;
    @Column()
    nbJourConges: number;

    @Column({
        type: 'enum',
        enum: EtatCongesEnum,
        default: EtatCongesEnum.enCours,
    })
    etat: EtatCongesEnum;
    @ManyToOne(() => User, user => user.conges)
    user: User;

}
