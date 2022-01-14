import { IsEmail, IsNotEmpty, IsString} from 'class-validator'
export class UserDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

//Estas clases DTO se usan normalmente en los endpoint para validar los datos de entrada a la aplicacion