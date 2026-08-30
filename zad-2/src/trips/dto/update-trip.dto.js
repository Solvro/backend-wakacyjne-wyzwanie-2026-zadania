import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
export class UpdateTripDto extends PartialType(CreateTripDto) {
}
//# sourceMappingURL=update-trip.dto.js.map