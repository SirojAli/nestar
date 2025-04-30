import { Controller, Get } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_PROPERTIES, BATCH_TOP_AGENTS } from './lib/config';

@Controller()
export class BatchController {
	private logger: Logger = new Logger('SocketEventsGateway');

	constructor(private readonly batchService: BatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BATCH SERVER READY');
	}

	@Cron('00 00 01 * * *', { name: BATCH_ROLLBACK }) // start: 1am (in 24h)
	public async batchRollback() {
		try {
			this.logger['context'] = BATCH_ROLLBACK;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('20 00 01 * * *', { name: BATCH_TOP_PROPERTIES }) // start: 01:00 20 sec (in 24h)
	public async batchTopProperties() {
		try {
			this.logger['context'] = BATCH_TOP_PROPERTIES;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopProperties();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('40 00 01 * * *', { name: BATCH_TOP_AGENTS }) // start: 01:00 : 40 sec (in 24h)
	public async batchTopAgents() {
		try {
			this.logger['context'] = BATCH_TOP_AGENTS;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopAgents();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/*
  @Interval(1000)
  handleInterval() {
    this.logger.debug('INTERVAL TEST');
  }
  */

	@Get()
	getHello(): string {
		return this.batchService.getHello();
	}
}
