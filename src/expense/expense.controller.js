"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var expense_service_1 = require("./expense.service");
var create_expense_dto_1 = require("./dto/create-expense.dto");
var update_expense_dto_1 = require("./dto/update-expense.dto");
var ExpensesController = /** @class */ (function () {
    function ExpensesController(expensesService) {
        this.expensesService = expensesService;
    }
    ExpensesController.prototype.create = function (dto) {
        return this.expensesService.create(dto);
    };
    ExpensesController.prototype.findAll = function () {
        return this.expensesService.findAll();
    };
    ExpensesController.prototype.findOne = function (id) {
        return this.expensesService.findOne(id);
    };
    ExpensesController.prototype.update = function (id, dto) {
        return this.expensesService.update(id, dto);
    };
    ExpensesController.prototype.remove = function (id) {
        return this.expensesService.remove(id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiOperation)({ summary: 'Create an expense' }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_expense_dto_1.CreateExpenseDto]),
        __metadata("design:returntype", void 0)
    ], ExpensesController.prototype, "create", null);
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({ summary: 'Retrieve all expenses' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ExpensesController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Get expense by ID' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], ExpensesController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Update an expense' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, update_expense_dto_1.UpdateExpenseDto]),
        __metadata("design:returntype", void 0)
    ], ExpensesController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Delete an expense' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], ExpensesController.prototype, "remove", null);
    ExpensesController = __decorate([
        (0, swagger_1.ApiTags)('Expenses'),
        (0, common_1.Controller)('expenses'),
        __metadata("design:paramtypes", [expense_service_1.ExpensesService])
    ], ExpensesController);
    return ExpensesController;
}());
exports.ExpensesController = ExpensesController;
