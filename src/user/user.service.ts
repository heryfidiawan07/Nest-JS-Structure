import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly repository: UserRepository,
    ) {}

    // Example get auth user from user.controller
    // async all(user: User, filter: FilterUserDto): Promise<User[]> {
    async all(filter: FilterUserDto): Promise<User[]> {
        // Example send param auth user to user.repository
        // return await this.repository.filter(user, filter);
        return await this.repository.filter(filter);
    }
  
    async create(request: CreateUserDto): Promise<void> {
        const { name, email } = request;
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(request.password, salt);

        try {
            await this.repository.save({name, email, salt, password});
        }catch (e) {
            if (e.code == '23505') {
                throw new ConflictException(`Email ${email} already used`);
            } else {
                throw new InternalServerErrorException(e);
            }
        }
    }

    async find(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} is not found`);
        }
        return user;
    }

    // async findWhere(user: User, id: string): Promise<User> {
    //     console.log('user',user)
    //     const result = await this.repository.findOne(id, { where: { id: user.id } });
    //     if (!result) {
    //         throw new NotFoundException(`User with id ${id} is not found`);
    //     }
    //     return result;
    // }

    async update(
        id: string,
        request: UpdateUserDto,
    ): Promise<void> {
        const { name, email } = request;
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(request.password, salt);
        try {
            await this.repository.update(id, {name, email, salt, password});
        }catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete({id});
        if (result.affected == 0) {
            throw new NotFoundException(`User with id ${id} is not found`);
        }
    }

    // Function for validate user login
    // implement on src/auth/auth.service login function
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        if (user && (await user.validatePassword(password))) {
            return user;
        }
        return null;
    }
}
