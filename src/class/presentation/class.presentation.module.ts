import { Module } from '@nestjs/common';
import { ClassWrtieAdapter } from './class.write.adapter';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { ClassApplicationModule } from '../application/class.application.module';
import ClassReadAdapter from './class.read.adapter';

@Module({
    imports: [ClassApplicationModule],
    controllers: [ClassReadAdapter, ClassWrtieAdapter],
    providers: [RequestClassFormMapper]
})
export class ClassPresentationModule {}
