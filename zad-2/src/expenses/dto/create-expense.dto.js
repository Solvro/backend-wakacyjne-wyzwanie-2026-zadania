var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateExpenseDto {
    id;
    trip_id;
    name;
    value;
}
__decorate([
    ApiProperty(),
    IsNumber({}, { message: "ID must be a number" }),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    IsNumber({}, { message: "Trip ID must be a number" }),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "trip_id", void 0);
__decorate([
    ApiProperty(),
    IsString({ message: "Name must be a string" }),
    IsNotEmpty({ message: "Name cannot be empty" }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsNumber({}, { message: "Value must be a number" }),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "value", void 0);
//# sourceMappingURL=create-expense.dto.js.map