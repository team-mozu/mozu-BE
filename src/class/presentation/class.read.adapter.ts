import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ClassReadService } from '../application/class.read.service';
import {
    ReponseClassArticleForm,
    ResponseClassArticle,
    ResponseClassForm,
    ResponseClassItemsForm,
    ResponseDetailClass,
    ResponseTeamClassArticleForm,
    ResponseTeamClassItemDetailForm,
    ResponseTeamClassItemForm
} from './form/response/response.class.form';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import { SseService } from 'src/common/sse/sse.service';
import { ClassDTO } from '../common/data/class.dto';

@Controller('/class')
export class ClassReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ClassReadService,
        private readonly sseService: SseService
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

    @Get('/sse/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async start(@Param('id') classId: string, @UserID() id: string, @Res() res) {
        return await this.readService.sseConnect(+classId, +id, res);
    }

    @Get('/validate/:id')
    async getByClassNum(@Param('id') classNum: string): Promise<ClassDTO> {
        return await this.readService.getByClassNum(+classNum);
    }

    @Post('/validate/item/:id')
    async validateArticle(
        @Param('id') classId: string,
        @Body() body: { ids: number[] }
    ): Promise<void> {
        return await this.readService.validateItems(+classId, body.ids);
    }

    @Get('/classItem/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getClassItem(
        @Param('id') classId: string,
        @UserID() id: string
    ): Promise<ResponseClassItemsForm[]> {
        const classItems = await this.readService.getOrganClassItems(+classId, +id);
        return await Promise.all(
            classItems.map((classItem) => new ResponseClassItemsForm(classItem))
        );
    }

    @Get('/classArticle/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getClassArticle(
        @Param('id') classId: string,
        @UserID() id: string
    ): Promise<ReponseClassArticleForm> {
        const classArticles = await this.readService.getOrganClassArticles(+classId, +id);
        const classInfo = await this.readService.getByClassId(+classId, +id);

        return new ReponseClassArticleForm(classArticles, classInfo.classDTO.maxInvDeg);
    }

    @Get('/team/classItem')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getTeamClassItem(@UserID() id: string): Promise<ResponseTeamClassItemForm[]> {
        const classItems = await this.readService.getTeamClassItems(+id);
        const classTeam = await this.readService.getByTeamId(+id);

        return await Promise.all(
            classItems.map(
                (classItem) => new ResponseTeamClassItemForm(classItem, classTeam.curInvDeg)
            )
        );
    }

    @Get('/team/classItem/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getTeamClassItemById(
        @Param('id') itemId: string,
        @UserID() id: string
    ): Promise<ResponseTeamClassItemDetailForm> {
        const classItem = await this.readService.getClassItemById(+id, +itemId);
        const classTeam = await this.readService.getByTeamId(+id);

        return new ResponseTeamClassItemDetailForm(classItem, classTeam.curInvDeg);
    }

    @Get('/team/classArticle')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getTeamClassArticle(@UserID() id: string): Promise<ResponseTeamClassArticleForm[]> {
        const classArticles = await this.readService.getTeamClassArticles(+id);

        return await Promise.all(
            classArticles.map((classArticle) => new ResponseTeamClassArticleForm(classArticle))
        );
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

/*
[조회 API]
{기관용} 수업 모니터링 SSE 연결 요청 API - [GET]
[INPUT] -> Token, 수업 ID(Param)
[OUTPUT] ->  연결 성공 응답
[EVENT-1] -> 발생할 이벤트 1번 : 학생 참가 시에 발생할 이벤트
[EVENT-2] -> 발생할 이벤트 2번 : 학생 투자 완료 시에 발생할 이벤트

{기관용} 수업 기사 목록 조회 - [GET] Task 1
[INPUT] -> Token, 수업 ID
[OUTPUT] -> 차수별 기사 목록(기사 id, 기사 제목)

{기관용} 수업 종목 정보 조회 - [GET] Task 2
[INPUT] -> Token, 수업 ID
[OUTPUT] -> 수업 종목 정보(종목 이름, 1차 ~ 5차 금액)

{학생용} 수업 종목 차수별 목록 조회 - [GET]
[INPUT] -> Token, 수업 ID, 차수        
[OUTPUT] ->  해당 차수의 수업 종목 리스트(종목 id, 종목 이름, 로고, 금액, 금액 변동률(%)

{학생용} 수업 기사 차수별 목록 조회 [GET] Task 3
[INPUT] -> Token, 수업 ID, 차수
[OUTPUT] -> 해당 차수의 수업 기사 리스트(기사 id, 기사 이미지, 기사 제목, 기사 줄거리)

{학생용} 수업 종목 상세 조회 - [GET] 
[INPUT] -> Token, 종목 ID, 차수
[OUTPUT] ->  종목 상세 조회 + 종목 금액 리스트[현재 차수 -1 까지만]

{학생용, 기관용} 수업 기사 상세 조회 [GET] X 안만들거임 -> 기사 상세 조회와 같음
[INPUT] -> Token, 기사 ID
[OUTPUT] -> 기사 상세 정보와 같음
*/
