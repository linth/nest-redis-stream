import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private client: RedisClientType;

	async onModuleInit() {
		this.client = createClient({
			url: 'redis://localhost:6379',
		});

		this.client.on('error', (err) => console.error('Redis Client Error', err));
		await this.client.connect();
	}

	async onModuleDestroy() {
		await this.client.quit();
	}

	getClient(): RedisClientType {
		return this.client;
	}

	async xAdd(stream: string, message: Record<string, string>): Promise<string> {
		return await this.client.xAdd(stream, '*', message);
	}

	async xRead(stream: string, lastId: string = '$'): Promise<any> {
		return await this.client.xRead(
			{ key: stream, id: lastId },
			{ BLOCK: 5000, COUNT: 10 },
		);
	}
}