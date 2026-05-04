import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const defaultDatabaseUrl =
  'postgresql://loresabi:loresabi@localhost:15432/loresabi';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL ?? defaultDatabaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
