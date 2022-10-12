import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    createProductDto.title = createProductDto.title.toLowerCase();
    try {
      const products = await this.productModel.create(createProductDto);

      return products;
    } catch (error) {
      this.handlerException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = process.env.DEFAULT_LIMIT, offset = 4 } = paginationDto;
    return this.productModel
      .find()
      .limit(+limit)
      .skip(offset);
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      this.handlerException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        { new: true },
      );
      if (updateProductDto.title) {
        product.title = updateProductDto.title.toLowerCase();
      }
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      this.handlerException(error);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      this.handlerException(error);
    }
  }

  handlerException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon already exists');
    }
    throw new InternalServerErrorException('Error creating pokemon');
  }
}
