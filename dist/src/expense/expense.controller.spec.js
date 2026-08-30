"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const expense_controller_1 = require("./expense.controller");
const expense_service_1 = require("./expense.service");
describe('ExpenseController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [expense_controller_1.ExpenseController],
            providers: [expense_service_1.ExpenseService],
        }).compile();
        controller = module.get(expense_controller_1.ExpenseController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=expense.controller.spec.js.map