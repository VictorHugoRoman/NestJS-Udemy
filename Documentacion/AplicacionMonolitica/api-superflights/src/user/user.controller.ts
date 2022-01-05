import { Controller, Post, Body, ValidationPipe, Get, Param, Logger, Put, Delete } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { log } from 'util';

@Controller('api/v1/user')
export class UserController
{
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body(new ValidationPipe({ validateCustomDecorators: true })) userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }

    @Get()
    findAll()
    {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        //log(id);
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO)
    {
        return this.userService.update(id, userDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}       
