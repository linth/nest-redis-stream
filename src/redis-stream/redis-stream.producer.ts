import { Injectable } from "@nestjs/common";
import { RedisService } from "./redis.service";


@Injectable()
export class RedisStreamProducerService {
	constructor(private readonly redisService: RedisService) {}

	async send(stream: string, data: Record<string, string>) {
		console.log(`RedisStreamProducerService: send(), stream = ${stream}, data = ${data}`);
		await this.redisService.xAdd(stream, data);
	}
}