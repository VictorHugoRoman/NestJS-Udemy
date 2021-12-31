import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env.development'], isGlobal: true }), //config archivo variables de entorno
        MongooseModule.forRoot(process.env.URI_MONGODB),//config conexion a mongo
        UserModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
