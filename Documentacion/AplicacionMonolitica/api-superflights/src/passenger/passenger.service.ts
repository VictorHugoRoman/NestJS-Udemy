import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService
{
    //@InjectModel(PASSENGER.name) decorador, l decimos a mongoose q tome el schema(modelo) passengers para q lo inyecte, mongoose lo conoce porque lo importamos en passenger.module.ts en la clase MongooseModule.
    //private readonly model: Model<IPassenger> craemos la variable model que accedera a los metodos de BD de mongoose, le decimos q los tipos serán de IPassenger.
    //Inyectamos el schema(passenger.schema.ts) configurado para esta entidad y q los tipos para los valores sean de tipo IPassenger
    constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) { }


    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        //return await new this.model(passengerDTO).save(); Ó
        const newPassenger = new this.model(passengerDTO); //creamos un documento(schema) de mongoose
        return await newPassenger.save();
    }
     
    async findAll(): Promise<IPassenger[]>{
        return await this.model.find();
    }

    async findOne(id: string): Promise<IPassenger>{
        return await this.model.findById(id);
    }

    async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger>{
        return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true }); //con new = true le decimos a mongoose q retorne al objeto despues de q actualiza
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: "Deleted" }
    }
}
    