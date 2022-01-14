import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
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

    @Get()
    findAll() {
        return this.passengerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.passengerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
        return this.passengerService.update(id, passengerDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.passengerService.delete(id);
    }
}
