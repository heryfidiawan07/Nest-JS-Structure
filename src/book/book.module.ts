import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './repository/book.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BookRepository])],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
