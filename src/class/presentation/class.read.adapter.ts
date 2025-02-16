import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ClassReadService } from '../application/class.read.service';
import { ResponseClassForm, ResponseDetailClass } from './form/response/response.class.form';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';

@Controller('/class')
export class ClassReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ClassReadService
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getByClassID(@Param('id') classId, @UserID() id: string): Promise<ResponseDetailClass> {
        const response = await this.readService.getByClassId(+classId, +id);

        return new ResponseDetailClass(
            response.classDTO,
            response.classItemDTO,
            response.classArticleDTO
        );
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getClassList(@UserID() id: string): Promise<ResponseClassForm> {
        const classList = await this.readService.getClassList(+id);

        return new ResponseClassForm(classList);
    }
}

/**
 * 수업 조회 API
 *
 * 1. 수업 목록 조회 API ✅
 *      수업명, 생성일자, 즐겨찾기 여부
 * 2. 수업 상세 조회 API ✅
 *      수업 이름, 투자 차수, 기초자산, 생성일자, [ 종목 정보 ], [기사 정보]
 */
