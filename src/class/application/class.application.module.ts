import { Module } from '@nestjs/common';
import { ClassWriteServiceImpl } from './impl/class.write.service.impl';
import { ClassReadServiceImpl } from './impl/class.read.service.impl';
import { ClassDomainModule } from '../domain/class.domain.module';
import { HttpModule } from '@nestjs/axios';

const CLASS_READ_SERVICE = { provide: 'read_impl', useClass: ClassReadServiceImpl };
const CLASS_WRITE_SERVICE = { provide: 'write_impl', useClass: ClassWriteServiceImpl };

@Module({
    imports: [ClassDomainModule, HttpModule],
    providers: [CLASS_READ_SERVICE, CLASS_WRITE_SERVICE],
    exports: [CLASS_READ_SERVICE, CLASS_WRITE_SERVICE]
})
export class ClassApplicationModule {}
