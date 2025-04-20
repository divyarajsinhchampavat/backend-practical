import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { ProductCronService } from './product-cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product,User])], 
  providers: [ProductService, ProductCronService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
