import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCongressDto {
  @IsInt()
  senatorId: number;

  @IsInt()
  congress_number: number;

  @IsOptional()
  @IsString()
  created_by?: string;
}
