import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
describe('PersonsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PersonsService],
        }).compile();
        service = module.get(PersonsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=persons.service.spec.js.map