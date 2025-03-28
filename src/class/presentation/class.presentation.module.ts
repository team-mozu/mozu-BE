import { Module } from '@nestjs/common';
import { ClassReadAdapter } from './class.read.adapter';
import { ClassWrtieAdapter } from './class.write.adapter';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { ClassApplicationModule } from '../application/class.application.module';
import { SseModule } from 'src/common/sse/sse.module';

@Module({
    imports: [ClassApplicationModule, SseModule],
    controllers: [ClassReadAdapter, ClassWrtieAdapter],
    providers: [RequestClassFormMapper]
})
export class ClassPresentationModule {}
