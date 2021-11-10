import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { Auth } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    // Example specific middleware auth
    // @UseGuards(JwtGuard)
    async index(
        @Query() filter: FilterUserDto,
        // Example get auth user
        // @Auth() user: User,
    ): Promise<User[]> {
        // console.log('auth user controller index',user)
        // Example send param auth user to user.service
        // return this.service.all(user, filter);
        return this.service.all(filter);
    }

    @Post()
    async store(@Body() payload: CreateUserDto): Promise<void> {
        return this.service.create(payload);
    }

    @Get('/:id')
    async show(
        // @Auth() user: User,
        @Param('id', UUIDValidationPipe) id: string,
    ): Promise<User> {
        // return this.service.findWhere(user, id);
        return this.service.find(id);
    }

    @Put('/:id')
    async update(
        @Param('id', UUIDValidationPipe) id: string,
        @Body() payload: UpdateUserDto,
    ): Promise<void> {
        return this.service.update(id, payload);
    }

    @Delete('/:id')
    async destroy(
        @Param('id', UUIDValidationPipe) id: string,
    ): Promise<void> {
        return this.service.delete(id);
    }
}
