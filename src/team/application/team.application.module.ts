import { Module } from '@nestjs/common';
import { TeamReadServiceImpl } from './impl/team.read.service.impl';
import { TeamWriteServiceImpl } from './impl/team.write.service.impl';
import { TeamDomainModule } from '../domain/team.domain.module';
import { HttpModule } from '@nestjs/axios';
import { SseModule } from 'src/common/sse/sse.module';

const TEAM_READ_SERVICE = { provide: 'read_impl', useClass: TeamReadServiceImpl };
const TEAM_WRITE_SERVICE = { provide: 'write_impl', useClass: TeamWriteServiceImpl };

@Module({
    imports: [TeamDomainModule, HttpModule, SseModule],
    providers: [TEAM_READ_SERVICE, TEAM_WRITE_SERVICE],
    exports: [TEAM_READ_SERVICE, TEAM_WRITE_SERVICE]
})
export class TeamApplicationModule {}
