import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({  
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
});

UserSchema.index({ username: 1  }); //indice por username significa q solo puede exisite uno
UserSchema.index({ email: 1 }); ////indice por email, significa q solo puiede existir uno


//estos schemas en nestJs se importan en los modulos d la entidad respectiva en este caso de user
//para despuest ser consumida en los servicios, lo que hace nest es usar inyeccion de dependencias