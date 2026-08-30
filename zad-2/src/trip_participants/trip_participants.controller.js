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
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TripParticipantsService } from './trip_participants.service';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';
let TripParticipantsController = class TripParticipantsController {
    tripParticipantsService;
    constructor(tripParticipantsService) {
        this.tripParticipantsService = tripParticipantsService;
    }
    create(createTripParticipantDto) {
        return this.tripParticipantsService.create(createTripParticipantDto);
    }
    findAll() {
        return this.tripParticipantsService.findAll();
    }
    findOne(id) {
        return this.tripParticipantsService.findOne(+id);
    }
    update(id, updateTripParticipantDto) {
        return this.tripParticipantsService.update(+id, updateTripParticipantDto);
    }
    remove(id) {
        return this.tripParticipantsService.remove(+id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTripParticipantDto]),
    __metadata("design:returntype", void 0)
], TripParticipantsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripParticipantsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TripParticipantsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateTripParticipantDto]),
    __metadata("design:returntype", void 0)
], TripParticipantsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TripParticipantsController.prototype, "remove", null);
TripParticipantsController = __decorate([
    Controller('trip-participants'),
    __metadata("design:paramtypes", [TripParticipantsService])
], TripParticipantsController);
export { TripParticipantsController };
//# sourceMappingURL=trip_participants.controller.js.map