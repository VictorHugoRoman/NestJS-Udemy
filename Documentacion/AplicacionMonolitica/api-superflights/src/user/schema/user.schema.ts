import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({  
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
});

UserSchema.index({ username: 1  }); //indice por username significa q solo puede exisite uno
UserSchema.index({ email: 1 }); ////indice por email, significa q solo puiede existir uno
