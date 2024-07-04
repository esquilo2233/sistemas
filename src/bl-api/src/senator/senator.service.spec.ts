import { Test, TestingModule } from '@nestjs/testing';
import { SenatorService } from './senator.service';

describe('SenatorService', () => {
  let service: SenatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenatorService],
    }).compile();

    service = module.get<SenatorService>(SenatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
