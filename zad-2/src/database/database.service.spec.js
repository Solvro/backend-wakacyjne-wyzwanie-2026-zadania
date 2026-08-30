import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
describe('DatabaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [DatabaseService],
        }).compile();
        service = module.get(DatabaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=database.service.spec.js.map