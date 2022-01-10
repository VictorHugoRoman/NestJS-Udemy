import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{ //registra hooks antes del registro del modelo, c tiene q usar un proveedor de fábrica o (useFactory) hay de terceros en s t caso usamos d nest
            name: PASSENGER.name, //nombre para st schema o modelo
            //useFactory: () => PassengerSchema Ó   
            useFactory: () => {
                //podemos usar logica antes de ejecutar algun metodo del schema de mongoose que en este caso s d tipo passenger
                //podemos hacer hookconst schema = UserSchema; 
                //schema.pre('save', function () { console.log('Hello from pre save') });
                //schema.plugin(require('mongoose-autopopulate')); To register a plugin for a given schema
                return PassengerSchema;
            },
        }])
    ],
  controllers: [PassengerController],
  providers: [PassengerService]
})
export class PassengerModule {}
