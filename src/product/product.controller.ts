import { Body, Controller, Get, Param, Post, Put, Delete, Query, Req, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const filenames = files.map(file => file.filename);
    return { filenames };
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() dto: CreateProductDto, @Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.productService.create(dto, user.id);
  }



  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateDto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const user = req.user as JwtPayload;
    return this.productService.update(id, updateDto, user.id);
  }



  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: number,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayload;
    return this.productService.delete(id, user);
  }


  @Get()
  async getProducts(@Query('name') name?: string, @Query('category') category?: string) {
    return this.productService.findAll({ name, category });
  }
}
