import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../libs/database/database.service';
import {
  GenerateRequest,
  GenerateResponse,
  ItemResult,
} from './dto/combinations.dto';
import { ResultSetHeader } from 'mysql2';
import { convertInputToItems } from './helpers/items.helper';
import { generateCombinations } from './helpers/combinations.helper';

@Injectable()
export class GenerateCombinationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generate(payload: GenerateRequest): Promise<GenerateResponse> {
    try {
      const items = convertInputToItems(payload.items);
      if (payload.length > items.length) {
        throw new BadRequestException(
          'Length cannot be greater than unique items count',
        );
      }
      const combinations = generateCombinations(items, payload.length);

      const itemMap = new Map<string, number>();
      return await this.databaseService.transaction(async (connection) => {
        for (const item of items) {
          const [rows] = await connection.execute<ResultSetHeader>(
            'INSERT IGNORE INTO items (name) VALUES (?)',
            [item],
          );

          if (rows.insertId === 0) {
            const [existing] = await connection.execute<ItemResult[]>(
              'SELECT id FROM items WHERE name = ?',
              [item],
            );
            itemMap.set(item, existing[0].id);
          } else {
            itemMap.set(item, rows.insertId);
          }
        }

        const [responseResult] = await connection.execute<ResultSetHeader>(
          'INSERT INTO responses (created_at) VALUES (NOW())',
        );
        const responseId = responseResult.insertId;

        for (const combination of combinations) {
          //TODO remove combination json and refactor logic to get data from items
          await connection.execute(
            'INSERT INTO combinations (response_id, combination) VALUES (?, ?)',
            [responseId, JSON.stringify(combination)],
          );
        }

        return {
          id: responseId,
          combination: combinations,
        };
      });
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
