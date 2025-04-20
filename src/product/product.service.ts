import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>, @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(dto: CreateProductDto, userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new Error('User not found');

      const product = this.repo.create({
        ...dto,
        owner: user,
      });

      const savedProduct = await this.repo.save(product);

      const baseUrl = `${process.env.BASE_URL}/uploads/`;

      return {
        ...savedProduct,
        image: savedProduct.image.map(fileName => `${baseUrl}${fileName}`)
      };

    }
    catch (error) {
      return error?.code === '23505' && { message: 'Duplicate product Code' };
    }
  }


  async update(id: number, dto: UpdateProductDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');
    const product = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!product) throw new NotFoundException();
    if (product.owner.id !== user.id) throw new ForbiddenException('You are not the owner');
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async delete(id: number, user: JwtPayload) {
    const product = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!product) throw new NotFoundException('Product not found');
    if (product.owner.id !== user.id) throw new ForbiddenException('You are not allowed to delete this product');
    await this.repo.softRemove(product);
    return { message: 'Product deleted successfully' };
  }

  async findAll(filter: { name?: string; category?: string }) {
    const query = this.repo.createQueryBuilder('product').where('product.deleted_at IS NULL');
    if (filter.name) query.andWhere('product.name ILIKE :name', { name: `%${filter.name}%` });
    if (filter.category) query.andWhere('product.category = :category', { category: filter.category });
    const products = await query.getMany();

    const baseUrl = `${process.env.BASE_URL}/uploads/`;

    // transform the image array
    const formattedProducts = products.map(product => ({
      ...product,
      image: product.image.map(fileName => `${baseUrl}${fileName}`)
    }));

    return formattedProducts;
  }
}
