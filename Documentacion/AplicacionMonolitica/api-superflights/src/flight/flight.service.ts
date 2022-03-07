import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
    //@InjectModel(FLIGHT.name) decorador, l decimos a mongoose q tome el schema(modelo) flights para q lo inyecte, mongoose lo conoce porque lo importamos en flight.module.ts en la clase MongooseModule.
    //private readonly model: Model<IFlight> craemos la variable model que accedera a los metodos de BD de mongoose, le decimos q los tipos serán de IFlight.
    //Inyectamos el schema(Flight.schema.ts) configurado para esta entidad y q los tipos para los valores sean de tipo IFlight
    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

    async create(flightDTO: FlightDTO): Promise<IFlight> {
        //return await new this.model(flightDTO).save(); Ó
        const newFlight = new this.model(flightDTO); //creamos un documento(schema) de mongoose
        return await newFlight.save();
    }

    async findAll(): Promise<IFlight[]> {
        return this.model.find();
    }

    async findOne(id: string): Promise<IFlight> {
        return this.model.findById(id);
    }

    async update(id: string, flight: FlightDTO): Promise<IFlight> {
        //return await this.model.findByIdAndUpdate(id, flight, { new: true }) //con new = true le decimos a mongoose q retorne al objeto despues de q actualiza
        //Ó
        const res = await this.model.findByIdAndUpdate(id, flight, { new: true });
        return res;
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: "Deleted" }
    }

    async addPassenger(fligthId: string, passengerId: string): Promise<IFlight> {
        //configuramos el metodo findByIdAndUpdate() para q busque y actualice el vuelo por flightId y agregue el passengerId
        return await this.model.findByIdAndUpdate(fligthId
            , { $addToSet: { passengers: passengerId } }
            , { new: true }
        ).populate('passengers')
    }
}
//$addToSet: con esto hacemos si el id ya existe no se vuelve a agregar simplemente los sustituye
//populate(): es el plugin q instalamos nos sirve para retornar la informacion completa una vez terminado el proceso