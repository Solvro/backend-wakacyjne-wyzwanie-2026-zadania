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
exports.CreateParticipantDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateParticipantDto = /** @class */ (function () {
    function CreateParticipantDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Alex Morgan' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateParticipantDto.prototype, "name", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'alex.morgan@example.com' }),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], CreateParticipantDto.prototype, "email", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 1 }),
        (0, class_validator_1.IsInt)(),
        __metadata("design:type", Number)
    ], CreateParticipantDto.prototype, "tripId", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({ example: '+15550192834' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateParticipantDto.prototype, "phone", void 0);
    return CreateParticipantDto;
}());
exports.CreateParticipantDto = CreateParticipantDto;
