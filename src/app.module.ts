import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getEnvPath} from './common/helper/env.helper';
import {TypeOrmConfigService} from './shared/typeorm/typeorm.service';
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import { CongesModule } from './conges/conges.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath, isGlobal: true}),
        TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        AuthModule,
        UserModule,
        CongesModule,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}