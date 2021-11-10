import { User } from 'src/user/entity/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    author: string;

    @Column()
    category: string;

    @Column()
    year: number;

    @ManyToOne(() => User, (user) => user.book)
    user: User;
}
