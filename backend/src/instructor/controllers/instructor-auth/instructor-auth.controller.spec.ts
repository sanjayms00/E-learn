import { Test, TestingModule } from '@nestjs/testing';
import { InstructorAuthController } from './instructor-auth.controller';

describe('InstructorAuthController', () => {
  let controller: InstructorAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstructorAuthController],
    }).compile();

    controller = module.get<InstructorAuthController>(InstructorAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
