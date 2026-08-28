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
exports.CreateTripDto = void 0;
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTripDto {
    destination;
    startDate;
    endDate;
    status;
}
exports.CreateTripDto = CreateTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Krakow' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-28 18:30:00' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-08-30 18:30:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.TripStatus, default: client_1.TripStatus.PLANNED }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TripStatus),
    __metadata("design:type", String)
], CreateTripDto.prototype, "status", void 0);
//# sourceMappingURL=create-trip.dto.js.map