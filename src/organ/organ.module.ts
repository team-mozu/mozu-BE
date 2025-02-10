import { Module } from '@nestjs/common';
import { OrganPresentationModule } from './presentation/organ.presentation.module';

@Module({
    imports: [OrganPresentationModule],
    controllers: [],
    providers: []
})
export class OrganModule {}
