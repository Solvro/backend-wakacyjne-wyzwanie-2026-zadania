import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { beforeEach, describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    assert.ok(service);
  });
});
