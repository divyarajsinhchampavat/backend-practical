import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductRepository } from './product.repository';
import { LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductCronService {
  private readonly logger = new Logger(ProductCronService.name);

  constructor(@InjectRepository(Product) private readonly productRepository: ProductRepository) {}

  @Cron('0 0 * * *', { timeZone: 'Asia/Kolkata' })
  async handleExpiredProducts() {
    const today = new Date();
    const expiredProducts = await this.productRepository.find({
      where: { expiryDate: LessThan(today), deleted_at: null }
    });

    if (expiredProducts.length > 0) {
      await this.productRepository.softRemove(expiredProducts);
      this.logger.log(`Soft-deleted ${expiredProducts.length} expired products.`);
    } else {
      this.logger.log(`No expired products found at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    }
  }
}
