import { Injectable } from '@nestjs/common';
import { RedisStreamProducerService } from 'src/redis-stream/redis-stream.producer';

export type Order = {
	orderId: string;
	userId: string;
	amount: number;
}

@Injectable()
export class OrderService {
	constructor(private readonly producer: RedisStreamProducerService) {}

	async createOrder(order: Order) {
		const streamName = 'orders_stream';

		await this.producer.send(streamName, {
			orderId: order.orderId,
			userId: order.userId,
      amount: order.amount.toString(),
      status: 'created',
      createdAt: new Date().toISOString(),
		});

		console.log('Order event pushed to Redis Stream');		
	}
}
