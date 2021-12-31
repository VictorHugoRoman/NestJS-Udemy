import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';


@Injectable()
export class UserService
{
    //InjectModel recibe el nombre del modelo(schema) a inyectar en esta clase "UserService"
    //los modelos(shcemas) se importan en el "user.module.ts" checar la linea 13 donde c importa el schema con el nombre del modelo
    constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>) { }  

    async hashPassword(password: string): Promise<string>
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };
    async create(userDTO: UserDTO): Promise<IUser>
    {
        const hash = await this.hashPassword(userDTO.password);
        //userDTO viene del body request y con "password: hash"  reemplazamos el valor de la propiedad con la contra encriptada
        const newUser = new this.userModel({ ...userDTO, password: hash });//retorna el schema user con los valores nuevos
        return await newUser.save(); //como newUser es un objeto de mongoose podemos usar el metodos save()
    }
}

/*
 A Model from mongoose, es una clase que es la herramienta principal de mongoose para interactuar con MongoDB. Una instancia de un modelo se llama documento.
 */