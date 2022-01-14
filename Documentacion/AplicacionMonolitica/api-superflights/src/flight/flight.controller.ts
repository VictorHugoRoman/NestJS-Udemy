import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';

@Controller('api/v1/flight')
export class FlightController
{
    constructor(private readonly flightService: FlightService) { }

    @Post()
    create(@Body() flight: FlightDTO){
        return this.flightService.create(flight);
    }

    @Get()
    findAll(){
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flight: FlightDTO) {
        return this.flightService.update(id, flight);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.flightService.delete(id);
    }
}