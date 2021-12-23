import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);
////creamos indices como sql 
//UserSchema.index({ username: 1 }); //indice por username
//UserSchema.index({ email: 1 }); ////indice por email