import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([ //registra hooks antes del registro del modelo, c tiene q usar un proveedor de f�brica o (useFactory) hay de terceros en s t caso usamos d nest
            {
                name: USER.name,
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

//MongooseModule.forFeatureAsync
