import { Body, Controller, Get, Inject, Injectable, Param, Post, UseGuards } from '@nestjs/common';
import { OrganReadService } from '../application/organ.read.service';
import { OrganDTO } from '../common/data/organ.dto';
import { RequestLoginForm } from './form/request/request.login.form';
import { ResponseLoginForm } from './form/response/response.login.form';
import { RequestOrganFormMapper } from './form/request/request.organ.form.mapper';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';

@Controller('/organ')
@Injectable()
export class OrganReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: OrganReadService,
        private readonly requestOrganFormMapper: RequestOrganFormMapper
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getByOrganID(@Param('id') organId: string): Promise<OrganDTO> {
        return await this.readService.getByOrganID(+organId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getOrganList(): Promise<OrganDTO[]> {
        return await this.readService.getOrganList();
    }

    @Post('/login')
    async login(@Body() form: RequestLoginForm): Promise<ResponseLoginForm> {
        const internalDTO = await this.requestOrganFormMapper.loginToDTO(form);

        return await this.readService.login(internalDTO);
    }
}
