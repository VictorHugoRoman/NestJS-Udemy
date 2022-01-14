import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document {
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers: IPassenger[];
}


//Estos tipos de interfaces de entidades de la aplicacion se usan normalmente para el manejo de tipos de entidad.