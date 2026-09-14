"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const expense_service_1 = require("./expense.service");
describe('ExpenseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [expense_service_1.ExpenseService],
        }).compile();
        service = module.get(expense_service_1.ExpenseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=expense.service.spec.js.map