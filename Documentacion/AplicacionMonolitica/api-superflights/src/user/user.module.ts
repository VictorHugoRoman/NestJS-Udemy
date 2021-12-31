import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ 
        MongooseModule.forFeatureAsync([ //registra hooks antes del registro del modelo, c tiene q usar un proveedor de fábrica o (useFactory) hay de terceros en s t caso usamos d nest
            {
                name: USER.name, //
                imports: [ConfigModule],
                useFactory: () => {
                    //podemos hacer hookconst schema = UserSchema; 
                    //schema.pre('save', function () { console.log('Hello from pre save') });
                    //schema.plugin(require('mongoose-autopopulate')); To register a plugin for a given schema
                    return UserSchema;
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }

//MongooseModule.forFeatureAsync n s t caso hacemos referencia al schema de user q con sta configuracion podremos inyectar este modelo o schema a las clases q
    //ocupemos lo podemos mandar llamar con el name(linea 13) y ademas tendra la funcionalidad  de useFactory que podemos meter logica ahí. ejemplo linea 15 "user.service.ts"
