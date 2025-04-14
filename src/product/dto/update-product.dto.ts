import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    image?: string;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsOptional()
    @IsDateString()
    manufacturerDate?: Date;
  
    @IsOptional()
    @IsDateString()
    expiryDate?: Date;
  
    @IsOptional()
    @IsString()
    status?: string;
  }
  