import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisStreamProducerService } from './redis-stream.producer';
import { RedisStreamConsumerService } from './redis-stream.consumer';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [InventoryModule],
  providers: [
    RedisService,
    RedisStreamProducerService,
    RedisStreamConsumerService,
  ],
  exports: [
    RedisService,
    RedisStreamProducerService,     
  ],
})
export class RedisStreamModule {}
