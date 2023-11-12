import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { HashingService } from '../hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt(10);
    return hash(data, salt);
  }
  async compare(data: string | Buffer, encrypt: string): Promise<boolean> {
    return compare(data, encrypt);
  }
}
