import { Test, TestingModule } from '@nestjs/testing';
import { SenatorController } from './senator.controller';

describe('SenatorController', () => {
  let controller: SenatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SenatorController],
    }).compile();

    controller = module.get<SenatorController>(SenatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
