import { Module } from '@nestjs/common';
import { RedisStreamModule } from 'src/redis-stream/redis-stream.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
	imports: [RedisStreamModule],
	providers: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
