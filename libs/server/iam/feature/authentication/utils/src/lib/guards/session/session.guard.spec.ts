import { SessionGuard } from './session.guard';

describe('SessionGuard', () => {
  it('should be defined', () => {
    expect(new SessionGuard()).toBeDefined();
  });
});
