import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsService {
    create(createTripDto: CreateTripDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTripDto: UpdateTripDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=trips.service.d.ts.map