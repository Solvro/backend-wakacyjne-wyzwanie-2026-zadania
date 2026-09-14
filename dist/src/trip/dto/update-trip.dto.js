"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTripDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_trip_dto_1 = require("./create-trip.dto");
class UpdateTripDto extends (0, swagger_1.PartialType)(create_trip_dto_1.CreateTripDto) {
}
exports.UpdateTripDto = UpdateTripDto;
//# sourceMappingURL=update-trip.dto.js.map