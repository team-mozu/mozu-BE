import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './persistence/team.entity';
import { TeamRepository } from './persistence/team.repository';
import { TeamDomainMapper } from './persistence/team.domain.mapper';
import { TeamOrderEntity } from './persistence/team.order.entity';
import { HoldItemEntity } from './persistence/holdItem.entity';

const TEAM_REPOSITORY = { provide: 'repository', useClass: TeamRepository };
const TEAM_ENTITY = TypeOrmModule.forFeature([TeamEntity, TeamOrderEntity, HoldItemEntity]);

@Module({
    imports: [TEAM_ENTITY],
    providers: [TEAM_REPOSITORY, TeamDomainMapper],
    exports: [TEAM_REPOSITORY]
})
export class TeamDomainModule {}
