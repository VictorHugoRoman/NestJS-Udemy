import { IPassenger } from "./passenger.interface";
import { IWeather } from "./weather.location";

export interface IFlight extends Document {
    _id?: string;
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers: IPassenger[];
    weather: IWeather
}


//Estos tipos de interfaces de entidades de la aplicacion se usan normalmente para el manejo de tipos de entidad.