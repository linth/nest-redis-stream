import { Injectable, OnModuleInit } from "@nestjs/common";
import { RedisService } from "./redis.service";
import Redis from "ioredis";
import { InventoryService } from "src/inventory/inventory.service";


@Injectable()
export class RedisStreamConsumerService implements OnModuleInit {
	private readonly streamKey = 'orders_stream';
	private lastId = '0';

	constructor(
		private readonly redisService: RedisService,
		private readonly inventoryService: InventoryService,
	) {}

	async onModuleInit() {
		this.consume();
	}

	async consume() {
		const client = await this.redisService.getClient();

		console.log('[Consumer] Start consuming Redis Stream:', this.streamKey);

		while (true) {
			try {
				const response = await client.xRead(
					{
            key: this.streamKey,
            id: this.lastId,
          },
          { 
						BLOCK: 5000, 
						COUNT: 10 
					},
				);

				if (Array.isArray(response)) {
          for (const { name, messages } of response) {
            for (const { id, message } of messages) {
              console.log(`Consumed message from ${name}:`, message);
              this.lastId = id;

              // 執行對應邏輯
              await this.handleOrderMessage(message);
            }
          }
        } else {
					console.log('[Consumer] No new message.');
				}

			} catch (err) {
				console.error('[Consumer] Error while reading from stream:', err);
			}
		}
	}

	private async handleOrderMessage(message: Record<string, string>) {
		console.log('handleOrderMessage().....');
		
    const { orderId, userId, amount } = message;

    // 1. 扣庫存
    await this.inventoryService.deductInventory(orderId);

    // 2. 發送 email
    // await this.emailService.sendOrderConfirmation(userId, orderId);

    // 3. 統計分析
    // if (this.analyticsService) {
    //   await this.analyticsService.trackOrderConversion(orderId, parseFloat(total));
    // }
	}
}