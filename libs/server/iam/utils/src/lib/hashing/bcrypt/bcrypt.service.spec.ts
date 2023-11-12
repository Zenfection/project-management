import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash data correctly', async () => {
    const data = 'test';
    const hashedData = await service.hash(data);
    expect(hashedData).not.toEqual(data);
    expect(typeof hashedData).toEqual('string');
  });

  it('should compare hashed and original data correctly', async () => {
    const data = 'test';
    const hashedData = await service.hash(data);
    const isMatch = await service.compare(data, hashedData);
    expect(isMatch).toEqual(true);
  });

  it('should return false when comparing non-matching data', async () => {
    const data = 'test';
    const hashedData = await service.hash(data);
    const isMatch = await service.compare('wrong', hashedData);
    expect(isMatch).toEqual(false);
  });
});
