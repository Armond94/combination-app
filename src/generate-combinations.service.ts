import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../libs/database/database.service';
import { GenerateRequest, GenerateResponse } from './types';
import * as mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface ItemResult extends RowDataPacket {
  id: number;
}

@Injectable()
export class GenerateCombinationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private convertInputToItems(items: number[]): string[] {
    const result: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const count = items[i];
      const letter = String.fromCharCode('A'.charCodeAt(0) + i);

      for (let j = 1; j <= count; j++) {
        result.push(`${letter}${j}`);
      }
    }

    return result;
  }

  private generateCombinations(items: string[], length: number): string[][] {
    const result: string[][] = [];
    const used = new Set<string>();

    const isValidCombination = (current: string[]): boolean => {
      const prefixes = new Set<string>();
      for (const item of current) {
        const prefix = item[0];
        if (prefixes.has(prefix)) return false;
        prefixes.add(prefix);
      }
      return true;
    };

    const backtrack = (start: number, current: string[]) => {
      if (current.length === length) {
        const sortedComb = [...current].sort();
        const key = sortedComb.join(',');
        if (!used.has(key) && isValidCombination(current)) {
          used.add(key);
          result.push(sortedComb);
        }
        return;
      }

      for (let i = start; i < items.length; i++) {
        current.push(items[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack(0, []);

    return result.sort((a, b) => {
      for (let i = 0; i < length; i++) {
        const comp = a[i].localeCompare(b[i]);
        if (comp !== 0) return comp;
      }
      return 0;
    });
  }

  private async storeItems(
    items: string[],
    connection: mysql.PoolConnection,
  ): Promise<Map<string, number>> {
    const itemMap = new Map<string, number>();

    for (const item of items) {
      const [rows] = await connection.execute<ResultSetHeader>(
        'INSERT IGNORE INTO items (name) VALUES (?)',
        [item],
      );

      if (rows.insertId === 0) {
        // Item already exists, get its ID
        const [existing] = await connection.execute<ItemResult[]>(
          'SELECT id FROM items WHERE name = ?',
          [item],
        );
        itemMap.set(item, existing[0].id);
      } else {
        itemMap.set(item, rows.insertId);
      }
    }

    return itemMap;
  }

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    console.log(1111)
    const items = this.convertInputToItems(request.items);

    if (request.length > items.length) {
      throw new BadRequestException(
        'Length cannot be greater than unique items count',
      );
    }

    const combinations = this.generateCombinations(items, request.length);

    return await this.databaseService.transaction(async (connection) => {
      const [responseResult] = await connection.execute<ResultSetHeader>(
        'INSERT INTO responses (created_at) VALUES (NOW())',
      );
      const responseId = responseResult.insertId;

      for (const combination of combinations) {
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
  }
}
