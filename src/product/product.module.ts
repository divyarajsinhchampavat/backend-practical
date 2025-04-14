import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CronService } from 'src/cron/cron.service';

@Module({
   imports: [TypeOrmModule.forFeature([Product])], 
  providers: [ProductService, CronService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
