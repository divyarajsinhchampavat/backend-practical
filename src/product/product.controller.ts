import { Body, Controller, Get, Param, Post, Put, Delete, Query, Req, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './uploads',  // <== folder to save files
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
  

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
    @Req() req: any,  
  ) {
    const user = req.user;
    return this.productService.update(id, dto, user);
  }
  
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: number,
    @Req() req: any,  
  ) {
    const user = req.user;
    return this.productService.delete(id, user);
  }
  
  @Get()
  async getProducts(@Query('name') name?: string, @Query('category') category?: string) {
    return this.productService.findAll({ name, category });
  }
}
