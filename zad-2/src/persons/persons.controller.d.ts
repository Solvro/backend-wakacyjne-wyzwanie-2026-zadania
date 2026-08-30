import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonsController {
    private readonly personsService;
    constructor(personsService: PersonsService);
    create(createPersonDto: CreatePersonDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePersonDto: UpdatePersonDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=persons.controller.d.ts.map