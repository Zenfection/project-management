import { JwtConfig } from './jwt.config';

describe('JwtConfig', () => {
  it('should be defined', () => {
    expect(new JwtConfig()).toBeDefined();
  });
});
