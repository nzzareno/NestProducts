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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse, ApiGoneResponse } from '@nestjs/swagger';

@ApiTags('Products')
@ApiExtraModels(PaginationDto)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
    @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
    }

  @Get()
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    findAll(@Query() queryParameters: PaginationDto) {
    return this.productsService.findAll(queryParameters);
    }

  @Get(':id')
    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id);
    }

  @Patch(':id')
    @ApiOkResponse({ description: 'The resource was updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    update(@Param('id', ParseMongoIdPipe) id: string, @Body()     updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
    }

  @Delete(':id')
    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.remove(id);
    }

}
