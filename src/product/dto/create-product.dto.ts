import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;
  
    @IsArray()
    image: string[];
  
    @IsString()
    productCode: string;
  
    @IsNumber()
    price: number;
  
    @IsString()
    category: string;
  
    @IsDateString()
    manufacturerDate: Date;
  
    @IsDateString()
    expiryDate: Date;
  }
  