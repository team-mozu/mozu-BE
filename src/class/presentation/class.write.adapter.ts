import { Body, Controller, Delete, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { RequestClassForm } from './form/request/request.class.form';
import { ClassWrtieService } from '../application/class.write.service';
import { ResponseDetailClass } from './form/response/response.class.form';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import { ResponseClassCodeForm } from './form/response/response.classCode.form';

@Controller('/class')
export class ClassWrtieAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ClassWrtieService,
        private readonly requestClassFormMapper: RequestClassFormMapper
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async create(
        @Body() form: RequestClassForm,
        @UserID() id: string
    ): Promise<ResponseDetailClass> {
        const { classDTO, classItemDTO, classArticleDTO } =
            await this.requestClassFormMapper.toDTO(form);

        const response = await this.writeService.create(
            +id,
            classDTO,
            classItemDTO,
            classArticleDTO
        );

        return new ResponseDetailClass(
            response.classDTO,
            response.classItemDTO,
            response.classArticleDTO
        );
    }

    @Post('/update/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async update(
        @Param('id') classId: string,
        @Body() form: RequestClassForm,
        @UserID() id: string
    ): Promise<ResponseDetailClass> {
        const { classDTO, classItemDTO, classArticleDTO } =
            await this.requestClassFormMapper.toDTO(form);

        const response = await this.writeService.update(
            +id,
            +classId,
            classDTO,
            classItemDTO,
            classArticleDTO
        );

        return new ResponseDetailClass(
            response.classDTO,
            response.classItemDTO,
            response.classArticleDTO
        );
    }

    @Post('/star/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async updateStarYN(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.changeStarYN(+id, +classId);
    }

    @Delete('/delete/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async delete(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.delete(+id, +classId);
    }

    @Post('/start/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async startClass(
        @Param('id') classId: string,
        @UserID() id: string
    ): Promise<ResponseClassCodeForm> {
        const classCode = await this.writeService.startClass(+id, +classId);

        return new ResponseClassCodeForm(classCode);
    }

    @Post('/stop/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async stopClass(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.stopClass(+id, +classId);
    }

    @Post('/next/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async classNextInvDeg(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.nextInvDeg(+id, +classId);
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

/*
[작성 API]
{기관용} 수업 시작 API - [POST]
[INPUT] -> 수업 ID(Param), Token
[OUTPUT] -> 수업 참여 코드

{기관용} 수업 종료 API - [POST]
[INPUT] -> 수업 ID(Param), Token
[OUTPUT] -> 없음

{기관용} 수업 투자 차수 진행 API - [POST]
[INPUT] -> 수업 ID(Param), Token
[OUTPUT] ->  없음
학생 클라이언트로 이벤트 발생    
*/
