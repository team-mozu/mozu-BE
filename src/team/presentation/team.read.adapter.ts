import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { TeamReadService } from '../application/team.read.service';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import {
    ResponseTeamForm,
    ResponseTeamRankForm,
    ResponseTeamResultForm
} from './form/response/response.team';
import { HoldItemDTO } from '../common/data/team.holdItem.dto';
import { TeamOrderDTO } from '../common/data/team.order.dto';

@Controller('/team')
export class TeamReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: TeamReadService
    ) {}

    @Get('/sse')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async sse(@UserID() id: string, @Res() res: Response): Promise<any> {
        await this.readService.sseConnect(+id, res);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getTeam(@UserID() id: string): Promise<ResponseTeamForm> {
        const team = await this.readService.getTeamById(+id);

        return new ResponseTeamForm(team);
    }

    @Get('/holdItems')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getHoldItems(@UserID() id: string): Promise<HoldItemDTO[]> {
        return await this.readService.getTeamHoldItemById(+id);
    }

    @Get('/orders')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getOrders(@UserID() id: string): Promise<TeamOrderDTO[]> {
        return await this.readService.getTeamOrderById(+id);
    }

    @Get('/result')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getResult(@UserID() id: string): Promise<ResponseTeamResultForm> {
        const [teams, orderCount] = await this.readService.getTeamResult(+id);

        return new ResponseTeamResultForm(teams, orderCount);
    }

    @Get('/rank')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async getRank(@UserID() id: string): Promise<ResponseTeamRankForm[]> {
        const teams = await this.readService.getTeamRankById(+id);

        return Promise.all(teams.map((team) => new ResponseTeamRankForm(team, +id)));
    }
}

/**
 * 조회 API
 *
수업 진행 관련 API - 참여 팀

[조회 API]
{학생용} 수업 투자 대기 SSE 연결 요청 API - [GET]
[INPUT] -> Token
[OUTPUT] ->  연결 성공 응답
[EVENT] -> 발생할 이벤트 : 수업 투자 시작 시(1~n차 투자 시작) 발생할 이벤트     
몆차 시작인지 알릴 예정

{기관용} 학생 정보 조회 - [GET]
[INPUT] -> Token, 학생 ID
[OUTPUT] -> 해당 학생 거래 현황 *현재는 가장 최근 차수에 거래한 현황만 조회됨(상의)

{학생용} 학생 정보 조회 - [GET] Task 4
[INPUT] -> Token, 
[OUTPUT] -> 총 평가 자산, 총 수익 금액, 총 수익률, 기초 자산, 보유 현금, 보유 주식 금액

{학생용} 학생 보유 주식  조회 - [GET] 
[INPUT] -> Token  
[OUTPUT] -> 종목명, 거래 가격, 수량, 거래 금액, 현재 가격, 수익률

{학생용} 학생 투자 결과 조회 - [GET]
[INPUT] -> Token
[OUTPUT] -> 진행한 차수 거래 내역 리스트,  결과 요약 -> 학생 정보 조회로 하면 됨

{학생용} 학생 랭킹 조회 - [GET]
[INPUT] -> Token
[OUTPUT] -> 현재 기준 학생 랭킹 리스트
 */
