import { Test, TestingModule } from '@nestjs/testing';
import { ClientManagementController } from './client-management.controller';

describe('ClientManagementController', () => {
  let controller: ClientManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientManagementController],
    }).compile();

    controller = module.get<ClientManagementController>(ClientManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
