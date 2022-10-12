import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @ApiPropertyOptional({
    description:
      'The number of items to skip before starting to collect the result set.',
    minimum: 1,
    default: 7,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'The number of items to return.',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  offset?: number;
}
