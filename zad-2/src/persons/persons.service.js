var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
let PersonsService = class PersonsService {
    create(createPersonDto) {
        return 'This action adds a new person';
    }
    findAll() {
        return `This action returns all persons`;
    }
    findOne(id) {
        return `This action returns a #${id} person`;
    }
    update(id, updatePersonDto) {
        return `This action updates a #${id} person`;
    }
    remove(id) {
        return `This action removes a #${id} person`;
    }
};
PersonsService = __decorate([
    Injectable()
], PersonsService);
export { PersonsService };
//# sourceMappingURL=persons.service.js.map