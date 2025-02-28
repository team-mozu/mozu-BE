import { Module } from '@nestjs/common';

import { TeamApplicationModule } from '../application/team.application.module';
import { TeamWrtieAdapter } from './team.write.adapter';
import { RequestTeamFormMapper } from './form/request/request.team.mapper';
import { TeamReadAdapter } from './team.read.adapter';

@Module({
    imports: [TeamApplicationModule],
    controllers: [TeamReadAdapter, TeamWrtieAdapter],
    providers: [RequestTeamFormMapper]
})
export class TeamPresentationModule {}
