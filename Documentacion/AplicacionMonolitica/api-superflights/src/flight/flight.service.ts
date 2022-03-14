import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';
import axios from 'axios'
import * as _moment from 'moment'
import { ILocation } from 'src/common/interfaces/location.interface';
import { IWeather } from 'src/common/interfaces/weather.location';
@Injectable()
export class FlightService {
    //@InjectModel(FLIGHT.name) decorador, l decimos a mongoose q tome el schema(modelo) flights para q lo inyecte, mongoose lo conoce porque lo importamos en flight.module.ts en la clase MongooseModule.
    //private readonly model: Model<IFlight> craemos la variable model que accedera a los metodos de BD de mongoose, le decimos q los tipos serán de IFlight.
    //Inyectamos el schema(Flight.schema.ts) configurado para esta entidad y q los tipos para los valores sean de tipo IFlight
    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

    async getLocation(destinationCity: string): Promise<ILocation> {
        const { data } = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`);
        return data[0]; //recordar q l endpoint retorna una array con 1 item
    }

    async getWeather(woeid: number, flightDate: Date): Promise<IWeather[]> {
        const dateFormat = _moment.utc(flightDate).format();
        const year = dateFormat.substring(0, 4);
        const month = dateFormat.substring(5, 7);
        const day = dateFormat.substring(8, 10);
        const { data } = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}/`);
        return data;
    }
    assign({ _id, pilot, airplane, destinationCity, flightDate, passengers }: IFlight, weather: IWeather[]): IFlight {
        return Object.assign({ _id, pilot, airplane, destinationCity, flightDate, passengers, weather });
    }
    async create(flightDTO: FlightDTO): Promise<IFlight> {
        //return await new this.model(flightDTO).save(); Ó
        const newFlight = new this.model(flightDTO); //creamos un documento(schema) de mongoose
        return await newFlight.save();
    }

    async findAll(): Promise<IFlight[]> {
        return this.model.find().populate('passengers');
    }

    async findOne(id: string): Promise<IFlight> {
        const flight = await this.model.findById(id).populate('passengers');
        const location: ILocation = await this.getLocation(flight.destinationCity); //obtemer localdad
        const weather: IWeather[] = await this.getWeather(location.woeid, flight.flightDate); //obtener clima
        return this.assign(flight, weather)
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