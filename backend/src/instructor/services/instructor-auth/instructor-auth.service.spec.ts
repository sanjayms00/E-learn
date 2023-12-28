import { Test, TestingModule } from '@nestjs/testing';
import { InstructorAuthService } from './instructor-auth.service';

describe('InstructorAuthService', () => {
  let service: InstructorAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstructorAuthService],
    }).compile();

    service = module.get<InstructorAuthService>(InstructorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
