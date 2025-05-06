import { IsArray, IsNumber, ArrayNotEmpty, Min } from 'class-validator';

export class GetCombinationsResponse {
  @IsNumber()
  id: number;

  @IsArray()
  combination: string[][];
}

export class GenerateRequest {
  @IsArray()
  @ArrayNotEmpty()
  items: number[];
  @IsNumber()
  @Min(1)
  length: number;
}

export class GenerateResponse {
  @IsNumber()
  id: number;
  @IsArray()
  combination: string[][];
}
