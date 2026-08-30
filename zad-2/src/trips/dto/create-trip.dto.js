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
import { IsDate, IsNumber, IsString } from "class-validator";
export class CreateTripDto {
    id;
    name;
    description;
    start_time;
    end_time;
}
__decorate([
    ApiProperty(),
    IsNumber({}, { message: "ID must be a number" }),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    IsString({ message: "Name must be a string" }),
    __metadata("design:type", String)
], CreateTripDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString({ message: "Description must be a string" }),
    __metadata("design:type", String)
], CreateTripDto.prototype, "description", void 0);
__decorate([
    ApiProperty(),
    IsDate({ message: "Start time must be a date" }),
    __metadata("design:type", Date)
], CreateTripDto.prototype, "start_time", void 0);
__decorate([
    ApiProperty(),
    IsDate({ message: "End time must be a date" }),
    __metadata("design:type", Date)
], CreateTripDto.prototype, "end_time", void 0);
//# sourceMappingURL=create-trip.dto.js.map