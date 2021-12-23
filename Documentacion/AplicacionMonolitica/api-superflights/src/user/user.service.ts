import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService
{
    async create(userDTO: UserDTO): Promise<IUser>
    {

    }
}
