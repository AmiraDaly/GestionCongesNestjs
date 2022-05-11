
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Unique,
    OneToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Conges} from "./conges.entity";


export enum UserRoleEnum {
    admin = 'admin',
    user = 'user',
}


@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;

    @Column({ type: 'varchar', length: 120 })
    public email: string;

    @Column({ type: 'varchar', length: 120 })
    public password: string;

    //additional table column to store random salt per user
    @Column()
    salt: string;

    // @OneToMany(() => Conges, (conges) => conges.user, {}) ;

    @Column()
    role: UserRoleEnum;
    @OneToMany(() => Conges, conges => conges.user)
    conges: Conges[];
    //validating incoming password with password in the database
    async validatePassword(password: string):Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    @Column()
    soldeannuel: number;

    @Column()
    nbrjourpris: number;
}