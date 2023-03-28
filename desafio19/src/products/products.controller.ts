import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productsService.create(createProductDto);
    if (product) {
      return { message: 'producto creado correctamente', product };
    } else {
      return { message: 'Error al crear producto' };
    }
  }

  @Get()
  findAll(@Query('limite') limite: string) {
    const products = this.productsService.findAll(+limite || 0);
    return { message: 'Productos encontrados', products };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (product) {
      return { message: 'Producto encontrado', product };
    } else {
      return { message: 'Producto no encontrado' };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productsService.update(+id, updateProductDto);
    if (product) {
      return { message: 'Producto actualizado', product };
    } else {
      return { message: 'No se pudo actualizar el producto' };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const products = this.productsService.remove(+id);
    if (products) {
      return { message: 'Producto eliminado', products };
    } else {
      return { message: 'No se pudo eliminar el producto' };
    }
  }
}
