import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from './custom-logger.service';
describe('CustomLogger', () => {
  let service: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomLogger,
        { provide: 'CONFIGURATION(config)', useValue: { config: {} } }
      ]
    }).compile();

    service = module.get<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
