var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../generated/prisma/enums';
import { IsEnum, IsNumber, IsString } from 'class-validator';
export class CreatePersonDto {
    id;
    first_name;
    last_name;
    dob;
    gender;
}
__decorate([
    ApiProperty(),
    IsNumber({}, { message: "ID must be a number" }),
    __metadata("design:type", Number)
], CreatePersonDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    IsString({ message: "First name must be a string" }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "first_name", void 0);
__decorate([
    ApiProperty(),
    IsString({ message: "Last name must be a string" }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "last_name", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], CreatePersonDto.prototype, "dob", void 0);
__decorate([
    ApiProperty({ enum: ['MALE', 'FEMALE', 'OTHER'] }),
    IsEnum(Gender, { message: "Gender must be one of MALE, FEMALE, OTHER" }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "gender", void 0);
//# sourceMappingURL=create-person.dto.js.map