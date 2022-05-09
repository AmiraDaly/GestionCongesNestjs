import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CongesController} from "./conges.controller";
import {CongesService} from "./conges.service";
import {Conges} from "../entities/conges.entity";
import {UserModule} from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Conges]),UserModule],
    controllers: [CongesController],
    exports: [],
    providers: [CongesService],
})
export class CongesModule {}
