import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GenerateCombinationsService } from './generate-combinations.service';
import { GenerateRequest, GenerateResponse } from './dto/combinations.dto';

@Controller('combinations')
export class GenerateCombinationsController {
  constructor(private readonly generateService: GenerateCombinationsService) {}

  @Post('/generate')
  @HttpCode(HttpStatus.OK)
  async generate(@Body() request: GenerateRequest): Promise<GenerateResponse> {
    return this.generateService.generate(request);
  }

  // TODO get by responseId
}
