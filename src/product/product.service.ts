import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(dto: CreateProductDto, user: User) {
    const product = this.repo.create({ ...dto, owner: user });
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto, user: User) {
    const product = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!product) throw new NotFoundException();
    if (product.owner.id !== user.id) throw new ForbiddenException('You are not the owner');
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async delete(id: number, user: User) {
    const product = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!product) throw new NotFoundException();
    if (product.owner.id !== user.id) throw new ForbiddenException('You are not the owner');
    return this.repo.remove(product);
  }

  async findAll(filter: { name?: string; category?: string }) {
    const query = this.repo.createQueryBuilder('product');
    if (filter.name) query.andWhere('product.name ILIKE :name', { name: `%${filter.name}%` });
    if (filter.category) query.andWhere('product.category = :category', { category: filter.category });
    return query.getMany();
  }
}
