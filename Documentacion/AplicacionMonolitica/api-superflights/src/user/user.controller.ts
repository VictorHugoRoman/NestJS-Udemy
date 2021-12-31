import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController
{
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body(new ValidationPipe({ validateCustomDecorators: true })) userDTO: UserDTO)
    {
        return this.userService.create(userDTO);
    }
}
