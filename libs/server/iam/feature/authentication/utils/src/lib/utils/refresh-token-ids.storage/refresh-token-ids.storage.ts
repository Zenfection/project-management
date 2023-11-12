import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

import redisClient from 'ioredis';

export class RefreshTokenIdsStorageError extends Error {
  constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: redisClient;

  onApplicationBootstrap() {
    this.redisClient = new redisClient(process.env.REDIS_URL);
  }
  onApplicationShutdown() {
    this.redisClient.quit();
  }

  async insert(userId: number, tokenID: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenID);
  }

  async validate(userId: number, tokenID: string): Promise<boolean> {
    const storedTokenID = await this.redisClient.get(this.getKey(userId));
    if (!storedTokenID)
      throw new RefreshTokenIdsStorageError('Token ID not found');
    return storedTokenID === tokenID;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
