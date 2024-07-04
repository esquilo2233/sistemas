import { Test, TestingModule } from '@nestjs/testing';
import { CongressController } from './congress.controller';

describe('CongressController', () => {
  let controller: CongressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongressController],
    }).compile();

    controller = module.get<CongressController>(CongressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
