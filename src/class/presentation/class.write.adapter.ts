import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { RequestClassForm } from './form/request/request.class.form';
import { ClassWrtieService } from '../application/class.write.service';
import { ResponseDetailClass } from './form/response/response.class.form';

@Controller('/class')
export class ClassWrtieAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ClassWrtieService,
        private readonly requestClassFormMapper: RequestClassFormMapper
    ) {}

    @Post('/create')
    async create(@Body() form: RequestClassForm): Promise<ResponseDetailClass> {
        const { classDTO, classArticleDTO } = await this.requestClassFormMapper.toDTO(form);

        const response = await this.writeService.create(classDTO, classArticleDTO);

        return new ResponseDetailClass(response.classDTO, response.classArticleDTO);
    }
}

/**
 * 수업 생성, 수정, 삭제, 변경 API
 *
 * 1. 수업 생성 API
 *      수업 이름, 투자 차수, 기초 자산, [ 차수별 종목 정보 ], [ 차수별 기사 정보 ] <- 입력
 * 2. 수업 수정 API
 *      수업 이름, 투자 차수, 기초 자산, [ 차수별 종목 정보(번호) ], [ 차수별 기사 정보(번호) ] <- 입력
 *
 * 3. 수업 삭제 API
 *      수업 번호 <- 입력
 *
 * 4. 수업 즐겨찾기 변경 API
 *      수업 번호 <- 입력
 */
