import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class CronService {
    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>
      ) {}
    
      @Cron('0 0 * * *', { timeZone: 'Asia/Kolkata' })
      async handleExpiredProducts() {
        await this.productRepo.delete({ expiryDate: LessThan(new Date()) });
      }
}
