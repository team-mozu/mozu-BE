import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { RequestOrganForm } from './form/request/request.organ.form';
import { OrganDTO } from '../common/data/organ.dto';
import { RequestOrganFormMapper } from './form/request/request.organ.form.mapper';
import { OrganWrtieService } from '../application/organ.write.service';

@Controller('/organ')
@Injectable()
export class OrganWriteAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: OrganWrtieService,
        private readonly requestOrganFormMapper: RequestOrganFormMapper
    ) {}

    @Post('/create')
    async create(@Body() form: RequestOrganForm): Promise<OrganDTO> {
        const internalDTO = await this.requestOrganFormMapper.toDTO(form);

        return await this.writeService.create(internalDTO);
    }
}
