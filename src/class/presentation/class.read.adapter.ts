import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClassDTO } from '../common/data/class.dto';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { ClassReadService } from '../application/class.read.service';
import { ResponseClassForm } from './form/response/response.class.form';

@Controller('/class')
export default class ClassReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ClassReadService
    ) {}

    @Get('/:id')
    async getByClassID(@Param('id') classId): Promise<ClassDTO> {
        return await this.readService.getByClassId(+classId);
    }

    @Get()
    async getClassList(): Promise<ResponseClassForm> {
        const classList = await this.readService.getClassList();

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
