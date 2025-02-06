import { Module } from '@nestjs/common';
import { ClassPresentationModule } from './presentation/class.presentation.module';

@Module({
    imports: [ClassPresentationModule],
    controllers: [],
    providers: []
})
export class ClassModule {}
