import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env.development'], isGlobal: true }), //config archivo variables de entorno
        MongooseModule.forRoot(process.env.URI_MONGODB,
            {
                //con esta config me agarro los "unique" de los schemas
                useNewUrlParser: true
                //autoIndex: false, // Don't build indexes
                //useUnifiedTopology:true,
                //connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
                //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                //family: 4 // Use IPv4, skip trying IPv6
            }
        ),//config conexion a mongo
        UserModule, PassengerModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//OPCIONES EN CADENA DE CONECCION
//useNewUrlParser, useUnifiedTopology, useFindAndModify y useCreateIndex ya no son opciones compatibles.Mongoose 6 siempre se comporta como si useNewUrlParser,
//useUnifiedTopology y useCreateIndex fueran verdaderos y useFindAndModify fuera falso.Elimine estas opciones de su código.
// La version q manejo solo tiene las sig opciones
//uri ?: string; //retryAttempts ?: number; //retryDelay ?: number; //connectionName ?: string; //connectionFactory ?: (connection: any, name: string) => any;
//https://github.com/Automattic/mongoose/blob/master/CHANGELOG.md