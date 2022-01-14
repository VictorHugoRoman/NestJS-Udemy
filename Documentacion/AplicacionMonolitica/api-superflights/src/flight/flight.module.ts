import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
        name: FLIGHT.name,
        //useFactory:()=> UserSchema Ó
        useFactory: () => {

            //podemos usar logica antes de ejecutar algun metodo del schema de mongoose que en este caso s d tipo flight.
            //podemos hacer hook const schema = UserSchema; 
            //schema.pre('save', function () { console.log('Hello from pre save') });
            //schema.plugin(require('mongoose-autopopulate')); //To register a plugin for a given schema

            //registramos el plugin 'mongoose-autopopulate' al schema, nos servira para cuando retornemos a los flights nos de la info d los passengers ligados a ese flight
            //y no unicamente el id passenger q n realidad es el q c estara guardando al guardar un flight
            //const schemaWithPlugin = FlightSchema.plugin(require('mongoose-autopopulate')); 
            return FlightSchema.plugin(require('mongoose-autopopulate')); 
        }
        }]),
        PassengerModule, //importamos modulo pasajeros (passenger.module.ts) por la relacion flight-passenger ya q estamos extrallendo automaticamente los pasajeron con el Flight y estamos usando 'mongoose-autopopulate'
    ],
    controllers: [FlightController],
    providers: [FlightService]
})
export class FlightModule { }
