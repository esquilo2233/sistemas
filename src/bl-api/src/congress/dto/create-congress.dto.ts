import { IsOptional, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCongressDto {
  @ApiProperty({ required: true })
  @IsInt()
  senatorId: number;

  @ApiProperty({ required: true })
  @IsInt()
  congress_number: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  created_by?: string;
}
