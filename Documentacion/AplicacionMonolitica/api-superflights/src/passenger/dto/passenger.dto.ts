import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class PassengerDTO
{
    @IsNotEmpty() @IsString()
    readonly name: string;
    @IsNotEmpty() @IsEmail()
    readonly email: string;
}

//Estas clases DTO se usan normalmente en los endpoint para validar los datos de entrada a la aplicacion