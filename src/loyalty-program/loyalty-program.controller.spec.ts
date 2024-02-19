import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyProgramController } from './loyalty-program.controller';

describe('LoyaltyProgramController', () => {
  let controller: LoyaltyProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyProgramController],
    }).compile();

    controller = module.get<LoyaltyProgramController>(LoyaltyProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
