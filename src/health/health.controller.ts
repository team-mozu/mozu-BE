import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    TypeOrmHealthIndicator
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private healthCheckService: HealthCheckService,
        private dbHealthIndicator: TypeOrmHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    async check() {
        return this.healthCheckService.check([
            async () => this.dbHealthIndicator.pingCheck('database') // DB 상태 체크디스크 사용량 90% 이하인지 체크
        ]);
    }
}
