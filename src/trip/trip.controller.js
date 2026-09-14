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
exports.TripsController = void 0;
// src/trips/trips.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var trip_service_1 = require("./trip.service");
var create_trip_dto_1 = require("./dto/create-trip.dto");
var update_trip_dto_1 = require("./dto/update-trip.dto");
var TripsController = /** @class */ (function () {
    function TripsController(tripsService) {
        this.tripsService = tripsService;
    }
    TripsController.prototype.create = function (createTripDto) {
        return this.tripsService.create(createTripDto);
    };
    TripsController.prototype.findAll = function () {
        return this.tripsService.findAll();
    };
    TripsController.prototype.findOne = function (id) {
        return this.tripsService.findOne(id);
    };
    TripsController.prototype.update = function (id, updateTripDto) {
        return this.tripsService.update(id, updateTripDto);
    };
    TripsController.prototype.remove = function (id) {
        return this.tripsService.remove(id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiOperation)({ summary: 'Create a new trip' }),
        (0, swagger_1.ApiResponse)({ status: 201, description: 'Trip created successfully.' }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto]),
        __metadata("design:returntype", void 0)
    ], TripsController.prototype, "create", null);
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({ summary: 'Retrieve all trips with expenses and participants' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TripsController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Get trip by ID' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found.' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], TripsController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Update trip details' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, update_trip_dto_1.UpdateTripDto]),
        __metadata("design:returntype", void 0)
    ], TripsController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Delete a trip' }),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], TripsController.prototype, "remove", null);
    TripsController = __decorate([
        (0, swagger_1.ApiTags)('Trips'),
        (0, common_1.Controller)('trips'),
        __metadata("design:paramtypes", [trip_service_1.TripsService])
    ], TripsController);
    return TripsController;
}());
exports.TripsController = TripsController;
