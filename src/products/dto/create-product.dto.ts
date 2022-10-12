import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title is too short',
  })
  title: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(0, {
    message: 'Price have to be greater than 0',
  })
  price: number;

  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'URL of image is too short',
  })
  img?: string;
}
