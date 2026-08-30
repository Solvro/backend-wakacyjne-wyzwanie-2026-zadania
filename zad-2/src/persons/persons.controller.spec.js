import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
describe('PersonsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [PersonsController],
            providers: [PersonsService],
        }).compile();
        controller = module.get(PersonsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=persons.controller.spec.js.map