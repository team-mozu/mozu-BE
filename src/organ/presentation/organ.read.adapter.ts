import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
    Headers,
    ParseIntPipe
} from '@nestjs/common';
import { OrganReadService } from '../application/organ.read.service';
import { OrganDTO } from '../common/data/organ.dto';
import { RequestLoginForm } from './form/request/request.login.form';
import { ResponseLoginForm } from './form/response/response.login.form';
import { RequestOrganFormMapper } from './form/request/request.organ.form.mapper';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { ResponseReissueForm } from './form/response/response.reissue.form';

@Controller('/organ')
export class OrganReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: OrganReadService,
        private readonly requestOrganFormMapper: RequestOrganFormMapper
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getByOrganID(@Param('id', ParseIntPipe) organId: number): Promise<OrganDTO> {
        return await this.readService.getByOrganID(organId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getOrganList(): Promise<OrganDTO[]> {
        return await this.readService.getOrganList();
    }

    @Get('/token/re-issue')
    async tokenReissue(
        @Headers('x-refresh-token') refreshToken: string
    ): Promise<ResponseReissueForm> {
        const newToken = await this.readService.tokenReissue(refreshToken);

        return new ResponseReissueForm(newToken);
    }

    @Post('/login')
    async login(@Body() form: RequestLoginForm): Promise<ResponseLoginForm> {
        const internalDTO = await this.requestOrganFormMapper.loginToDTO(form);

        return await this.readService.login(internalDTO);
    }
}
