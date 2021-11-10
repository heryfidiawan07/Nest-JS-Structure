import { EntityRepository, Repository } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // Example function filter => make query builder
    
    // Example get auth user from user.service
    // async filter(user: User, filter: FilterUserDto): Promise<User[]> {
    async filter(filter: FilterUserDto): Promise<User[]> {
        const { name, email } = filter;

        const query = this.createQueryBuilder('user')
        // Implement where auth user id
        // .where(
        //   'user.id = :id',
        //   { id: user.id },
        // );

        if (name) {
            query.andWhere('lower(user.name) LIKE :name', {
                name: `%${name.toLowerCase()}%`,
            });
        }

        if (email) {
            query.andWhere('lower(user.email) LIKE :email', {
                email: `%${email.toLowerCase()}`,
            });
        }

        // if (age) {
        //     query.andWhere('user.age >= :age', { age });
        // }

        // if (age) {
        //     query.andWhere('user.age <= :age', { age });
        // }

        return await query.getMany();
    }
}
