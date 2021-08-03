import { Test, TestingModule } from '@nestjs/testing';
import { DiffieHellman } from './diffie-hellman';

describe('DiffieHellman', () => {
  let provider: DiffieHellman;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiffieHellman],
    }).compile();

    provider = module.get<DiffieHellman>(DiffieHellman);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
