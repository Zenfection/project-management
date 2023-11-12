import { Test, TestingModule } from '@nestjs/testing';
import { TfaAuthenticationService } from './tfa-authentication.service';

describe('TfaAuthenticationService', () => {
  let service: TfaAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TfaAuthenticationService],
    }).compile();

    service = module.get<TfaAuthenticationService>(TfaAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
