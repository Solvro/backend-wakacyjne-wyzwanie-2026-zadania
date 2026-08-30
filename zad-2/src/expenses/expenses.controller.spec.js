import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
describe('ExpensesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ExpensesController],
            providers: [ExpensesService],
        }).compile();
        controller = module.get(ExpensesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=expenses.controller.spec.js.map