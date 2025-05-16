import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InventoryService {
	private readonly logger = new Logger();
	
	async deductInventory(orderId: string): Promise<void> {
		this.logger.log(`Inventory deducted for order ${orderId}`);

		// 模擬延遲
    await new Promise((resolve) => setTimeout(resolve, 500));
	}
}
