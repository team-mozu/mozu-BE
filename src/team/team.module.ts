import { Module } from '@nestjs/common';
import { TeamPresentationModule } from './presentation/team.presentation.module';

@Module({
    imports: [TeamPresentationModule],
    controllers: [],
    providers: []
})
export class TeamModule {}
