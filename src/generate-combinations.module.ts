import { Module } from '@nestjs/common';
import { GenerateCombinationsController } from './generate-combinations.controller';
import { GenerateCombinationsService } from './generate-combinations.service';
import { DatabaseService } from '../libs/database/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../libs/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [GenerateCombinationsController],
  providers: [GenerateCombinationsService, DatabaseService, ConfigService],
})
export class GenerateCombinationsModule {}
