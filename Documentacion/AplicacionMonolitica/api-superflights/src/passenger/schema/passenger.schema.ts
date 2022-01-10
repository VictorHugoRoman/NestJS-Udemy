import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }
});
PassengerSchema.index({ email: 1 }); //indice por username significa q solo puede exisite uno, para versiones anteriores