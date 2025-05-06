import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenerateCombinationsService } from './generate-combinations.service';
import {
  GenerateRequest,
  GenerateResponse,
  GetCombinationsResponse,
} from './dto/combinations.dto';

@Controller('generate')
export class GenerateCombinationsController {
  constructor(private readonly generateService: GenerateCombinationsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async generate(@Body() request: GenerateRequest): Promise<GenerateResponse> {
    return this.generateService.generate(request);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetCombinationsResponse> {
    return this.generateService.getById(parseInt(id, 10));
  }
}
