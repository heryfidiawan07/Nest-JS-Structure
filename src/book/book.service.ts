import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookRepository)
        private readonly bookRepository: BookRepository,
    ) {}

    // async all(user: User, filter: FilterBookDto): Promise<Book[]> {
    async all(filter: FilterBookDto): Promise<Book[]> {
        // return await this.bookRepository.filter(user, filter);
        return await this.bookRepository.filter(filter);
    }

    async create(createBookDto: CreateBookDto): Promise<void> {
        const { title, author, category, year } = createBookDto;
        try {
            await this.bookRepository.save({title, author, category, year})
        }catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    // async find(user: User, id: string): Promise<Book> {
    async find(id: string): Promise<Book> {
        // const book = await this.bookRepository.findOne(id, { where: { user } });
        const book = await this.bookRepository.findOne(id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} is not found`);
        }
        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<void> {
        const { title, author, category, year } = updateBookDto;
        try {
            await this.bookRepository.update(id, {title, author, category, year});
        }catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async delete(id: string): Promise<void> {
        const result = await this.bookRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException(`Book with id ${id} is not found`);
        }
    }
}
