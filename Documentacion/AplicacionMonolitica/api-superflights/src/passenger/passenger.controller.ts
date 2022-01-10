import { Controller, Post, Body } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { create } from 'istanbul-reports';
import { PassengerDTO } from './dto/passenger.dto';

@Controller('api/v1/passenger') //url para la entidad pasajeros
export class PassengerController
{
    constructor(private readonly passengerService: PassengerService) { }

    @Post()
    create(@Body() passengerDTO: PassengerDTO)
    {
        return this.passengerService.create(passengerDTO);
    }
}
