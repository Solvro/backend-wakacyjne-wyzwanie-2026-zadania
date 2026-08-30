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
exports.ParticipantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const participant_service_1 = require("./participant.service");
const create_participant_dto_1 = require("./dto/create-participant.dto");
const update_participant_dto_1 = require("./dto/update-participant.dto");
let ParticipantsController = class ParticipantsController {
    constructor(participantsService) {
        this.participantsService = participantsService;
    }
    create(dto) {
        return this.participantsService.create(dto);
    }
    findAll() {
        return this.participantsService.findAll();
    }
    findOne(id) {
        return this.participantsService.findOne(id);
    }
    update(id, dto) {
        return this.participantsService.update(id, dto);
    }
    remove(id) {
        return this.participantsService.remove(id);
    }
};
exports.ParticipantsController = ParticipantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a participant' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_participant_dto_1.CreateParticipantDto]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all participants' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get participant by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a participant' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_participant_dto_1.UpdateParticipantDto]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a participant' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipantsController.prototype, "remove", null);
exports.ParticipantsController = ParticipantsController = __decorate([
    (0, swagger_1.ApiTags)('Participants'),
    (0, common_1.Controller)('participants'),
    __metadata("design:paramtypes", [participant_service_1.ParticipantsService])
], ParticipantsController);
//# sourceMappingURL=participant.controller.js.map