import { Module } from '@nestjs/common';
import { OrganApplicationModule } from '../application/organ.application.module';
import { OrganReadAdapter } from './organ.read.adapter';
import { OrganWriteAdapter } from './organ.write.adapter';
import { RequestOrganFormMapper } from './form/request/request.organ.form.mapper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [OrganApplicationModule, JwtModule.register({}), ConfigModule],
    controllers: [OrganReadAdapter, OrganWriteAdapter],
    providers: [RequestOrganFormMapper]
})
export class OrganPresentationModule {}
