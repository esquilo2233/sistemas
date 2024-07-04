import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateExtraDto {
  @IsInt()
  senatorId: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  contact_form?: string;

  @IsOptional()
  @IsString()
  office?: string;

  @IsOptional()
  @IsString()
  rss_url?: string;

  @IsOptional()
  @IsString()
  created_by?: string;
}
