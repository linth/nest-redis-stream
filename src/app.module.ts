import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisStreamModule } from './redis-stream/redis-stream.module';
import { OrderModule } from './order/order.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    RedisStreamModule,
    OrderModule,
    InventoryModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
