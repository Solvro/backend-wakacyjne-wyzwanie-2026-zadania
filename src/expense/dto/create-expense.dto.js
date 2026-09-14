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
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateExpenseDto = /** @class */ (function () {
    function CreateExpenseDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 125.50 }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        __metadata("design:type", Number)
    ], CreateExpenseDto.prototype, "amount", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Mountain guide fee' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateExpenseDto.prototype, "description", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2026-07-16T12:00:00.000Z' }),
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", String)
    ], CreateExpenseDto.prototype, "date", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 1 }),
        (0, class_validator_1.IsInt)(),
        __metadata("design:type", Number)
    ], CreateExpenseDto.prototype, "tripId", void 0);
    return CreateExpenseDto;
}());
exports.CreateExpenseDto = CreateExpenseDto;
