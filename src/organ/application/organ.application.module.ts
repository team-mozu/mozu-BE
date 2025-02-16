import { Module } from '@nestjs/common';
import { OrganReadServiceImpl } from './impl/organ.read.service.impl';
import { OrganDomainModule } from '../domain/organ.domain.module';
import { OrganWriteServiceImpl } from './impl/organ.write.service.impl';

const ORGAN_READ_SERVICE = { provide: 'read_impl', useClass: OrganReadServiceImpl };
const ORGAN_WRITE_SERVICE = { provide: 'write_impl', useClass: OrganWriteServiceImpl };

@Module({
    imports: [OrganDomainModule],
    providers: [ORGAN_READ_SERVICE, ORGAN_WRITE_SERVICE],
    exports: [ORGAN_READ_SERVICE, ORGAN_WRITE_SERVICE]
})
export class OrganApplicationModule {}
