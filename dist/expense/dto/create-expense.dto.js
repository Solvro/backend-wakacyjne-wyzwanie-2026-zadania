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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateExpenseDto {
}
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Group Dinner' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 145.50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.ExpenseCategory, example: client_1.ExpenseCategory.FOOD }),
    (0, class_validator_1.IsEnum)(client_1.ExpenseCategory),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "tripId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "payerId", void 0);
//# sourceMappingURL=create-expense.dto.js.map