import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
describe('ExpensesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ExpensesService],
        }).compile();
        service = module.get(ExpensesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=expenses.service.spec.js.map