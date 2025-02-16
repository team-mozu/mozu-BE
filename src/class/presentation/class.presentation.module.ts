import { Module } from '@nestjs/common';
import { ClassReadAdapter } from './class.read.adapter';
import { ClassWrtieAdapter } from './class.write.adapter';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { ClassApplicationModule } from '../application/class.application.module';

@Module({
    imports: [ClassApplicationModule],
    controllers: [ClassReadAdapter, ClassWrtieAdapter],
    providers: [RequestClassFormMapper]
})
export class ClassPresentationModule {}
