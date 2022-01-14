import { IsNotEmpty, IsString, IsEmail, IsDate } from "class-validator";
import { Type } from "class-transformer"; //transforma los datos a algun tipo en especifico
export class FlightDTO
{
    @IsNotEmpty() @IsString()
    readonly pilot: string;
    @IsNotEmpty() @IsString()
    readonly airplane: string;
    @IsNotEmpty() @IsString()
    readonly destinationCity: string;
    @IsNotEmpty()
    @Type(() => Date) //trnasformamos el dato a fecha
    @IsDate()
    readonly flightDate: Date;
}

//Estas clases DTO se usan normalmente en los endpoint para validar los datos de entrada a la aplicacion