import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  monthlyLimit?: number;
}
