import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from './provider/provider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: 'renato123',
    //     database: 'tdw_providers',
    //     entities: [Provider],
    //     synchronize: false, //true para que cree las tablas
    //     autoLoadEntities: true,
    //   }),
    // }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
