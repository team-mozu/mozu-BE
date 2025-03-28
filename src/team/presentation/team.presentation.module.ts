import { Module } from '@nestjs/common';

import { TeamApplicationModule } from '../application/team.application.module';
import { RequestTeamFormMapper } from './form/request/request.team.mapper';
import { TeamReadAdapter } from './team.read.adapter';
import { TeamWriteAdapter } from './team.write.adapter';

@Module({
    imports: [TeamApplicationModule],
    controllers: [TeamReadAdapter, TeamWriteAdapter],
    providers: [RequestTeamFormMapper]
})
export class TeamPresentationModule {}
