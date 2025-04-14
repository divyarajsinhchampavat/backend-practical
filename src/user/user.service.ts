import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
      }
    
      async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
      }
    
      async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
      }
}
