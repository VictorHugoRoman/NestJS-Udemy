import { Injectable, HttpStatus } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { awaitExpression } from '@babel/types';


@Injectable()
export class UserService
{  
    //@InjectModel(USER.name) decorador, l decimos a mongoose q tome el schema(modelo) usuarios para q lo inyecte, mongoose lo conoce porque lo importamos en user.module.ts en la clase MongooseModule.
    //private readonly model: Model<IUser> craemos la variable "model" que accedera a los metodos de BD de mongoose, le decimos q los tipos serán de IPassenger.
    //Inyectamos el schema(user.schema.ts) configurado para esta entidad y q los tipos para los valores sean de tipo IUser
    constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>) { }  
    
    async create(userDTO: UserDTO): Promise<IUser>
    {
        const hash = await this.hashPassword(userDTO.password);
        //userDTO viene del body request y con "password: hash"  reemplazamos el valor de la propiedad con la contra encriptada
        const newUser = new this.userModel({ ...userDTO, password: hash });//retorna el schema user con los valores nuevos
        return await newUser.save(); //como newUser es un objeto de mongoose podemos usar el metodos save()    
    }

    async findAll(): Promise<IUser[]>
    {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<IUser> 
    {
        return await this.userModel.findById(id);
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser>
    {
        const hash = await this.hashPassword(userDTO.password);
        const user = { ...userDTO, password: hash };
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string)
    {
        await this.userModel.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Deleted' }
    }   

    async hashPassword(password: string): Promise<string>
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };
}

/*
 A Model from mongoose, es una clase que es la herramienta principal de mongoose para interactuar con MongoDB. Una instancia de un modelo se llama documento.
 */