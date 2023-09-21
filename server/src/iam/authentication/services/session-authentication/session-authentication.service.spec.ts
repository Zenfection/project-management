import { Test, TestingModule } from '@nestjs/testing';
import { SessionAuthenticationService } from './session-authentication.service';

describe('SessionAuthenticationService', () => {
  let service: SessionAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionAuthenticationService],
    }).compile();

    service = module.get<SessionAuthenticationService>(SessionAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
