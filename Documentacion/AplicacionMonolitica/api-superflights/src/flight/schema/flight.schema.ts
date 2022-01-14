import * as mongoose from 'mongoose';
import { PASSENGER } from 'src/common/models/models';

export const FlightSchema = new mongoose.Schema(
    {
        pilot: { type: String, required: true },
        airplane: { type: String, required: true },
        destinationCity: { type: String, required: true },
        flightDate: { type: Date, required: true },
        passengers: [{
            type: mongoose.Schema.Types.ObjectId, //relacion Por Id
            ref: PASSENGER.name //nombre del objeto a relacionar
        }]
    },
    { timestamps: true }
);

//FlightSchema.index({ pilot: 1 }); ////indice por email, significa q solo puiede existir uno
//FlightSchema.index({ airplane: 1  }); //indice por username significa q solo puede exisite uno

//estos schemas en nestJs se importan en los modulos d la entidad respectiva en este caso de user
//para despuest ser consumida en los servicios, lo que hace nest es usar inyeccion de dependencias