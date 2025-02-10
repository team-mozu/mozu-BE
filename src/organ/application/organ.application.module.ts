import { Module } from '@nestjs/common';
import { OrganReadServiceImpl } from './impl/organ.read.service.impl';
import { OrganDomainModule } from '../domain/organ.domain.module';
import { OrganWriteServiceImpl } from './impl/organ.write.service.impl';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const ORGAN_READ_SERVICE = { provide: 'read_impl', useClass: OrganReadServiceImpl };
const ORGAN_WRITE_SERVICE = { provide: 'write_impl', useClass: OrganWriteServiceImpl };

@Module({
    imports: [OrganDomainModule, ConfigModule, JwtModule.register({})],
    providers: [ORGAN_READ_SERVICE, ORGAN_WRITE_SERVICE],
    exports: [ORGAN_READ_SERVICE, ORGAN_WRITE_SERVICE]
})
export class OrganApplicationModule {}
