import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async create(@Body() dto: { orderId: string; userId: string; amount: number}) {
		return this.orderService.createOrder(dto);
	}
}
