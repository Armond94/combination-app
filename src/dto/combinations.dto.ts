import { IsArray, IsNumber, ArrayNotEmpty, Min } from 'class-validator';
import { RowDataPacket } from 'mysql2';

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

export interface ItemResult extends RowDataPacket {
  id: number;
}
