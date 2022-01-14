import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }
});
PassengerSchema.index({ email: 1 }); //indice por username significa q solo puede exisite uno, para versiones anteriores

//estos schemas en nestJs se importan en los modulos d la entidad respectiva en este caso de passenger
//para despuest ser consumida en los servicios, lo que hace nest es usar inyeccion de dependencias