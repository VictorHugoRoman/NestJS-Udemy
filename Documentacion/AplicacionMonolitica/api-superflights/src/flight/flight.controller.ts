import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';

@Controller('api/v1/flight')
export class FlightController
{
    constructor(private readonly flightService: FlightService
        , private readonly passengerService: PassengerService) { } //agregamos el PassengerService

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
    
    @Post(':flightId/passenger/:passengerId') //passenger es nombre solo por nomenclatura para saber q l sig parametro pertenece al modelo passenger
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
        const passenger = await this.passengerService.findOne(passengerId);
        if (!passenger)
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
        return this.flightService.addPassenger(flightId, passengerId)
    }

}