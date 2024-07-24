import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExtraDto {
  @ApiProperty({ required: true })
  @IsString()
  senatorId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contact_form?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  office?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rss_url?: string;
}
