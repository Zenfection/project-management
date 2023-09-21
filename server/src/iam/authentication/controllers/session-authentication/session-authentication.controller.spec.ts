import { Test, TestingModule } from '@nestjs/testing';
import { SessionAuthenticationController } from './session-authentication.controller';

describe('SessionAuthenticationController', () => {
  let controller: SessionAuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionAuthenticationController],
    }).compile();

    controller = module.get<SessionAuthenticationController>(SessionAuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
