import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { User } from 'src/user/entity/user.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('book')
@UseGuards(JwtGuard)
export class BookController {
    constructor(private service: BookService) {}

    @Get()
    async index(
        @Query() filter: FilterBookDto,
        // @Auth() user: User,
    ): Promise<Book[]> {
        // return this.service.all(user, filter);
        return this.service.all(filter);
    }

    @Get('/:id')
    async show(
        // @Auth() user: User,
        @Param('id', UUIDValidationPipe) id: string,
    ): Promise<Book> {
        // return this.service.find(user, id);
        return this.service.find(id);
    }

    @Post()
    async store(
        // @Auth() user: User,
        @Body() payload: CreateBookDto,
    ): Promise<void> {
        // return this.service.create(user, payload);
        return this.service.create(payload);
    }

    @Put('/:id')
    async update(
        @Param('id', UUIDValidationPipe) id: string,
        @Body() payload: UpdateBookDto,
        // @Auth() user: User,
    ): Promise<void> {
        // return this.service.update(user, id, payload);
        return this.service.update(id, payload);
    }

    @Delete('/:id')
    async destroy(
        // @Auth() user: User,
        @Param('id', UUIDValidationPipe) id: string,
    ): Promise<void> {
        // return this.service.delete(user, id);
        return this.service.delete(id);
    }
}
