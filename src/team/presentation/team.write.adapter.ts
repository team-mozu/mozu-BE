import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';
import { TeamWriteService } from '../application/team.write.service';
import { RequestTeamForm } from './form/request/reqeust.team';
import { RequestTeamFormMapper } from './form/request/request.team.mapper';
import { RequestTeamOrderForm } from './form/request/request.team.order';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import { ResponseTeamTokenForm } from './form/response/response.team';

@Controller('/team')
export class TeamWrtieAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: TeamWriteService,
        private readonly requestTeamFormMapper: RequestTeamFormMapper
    ) {}

    @Post('/participate')
    async participate(@Body() form: RequestTeamForm): Promise<ResponseTeamTokenForm> {
        const internalDTO = await this.requestTeamFormMapper.toDTO(form);

        const accessToken = await this.writeService.partInClass(internalDTO);

        return new ResponseTeamTokenForm(accessToken);
    }

    @Post('/end')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.STUDENT])
    async end(@Body() form: RequestTeamOrderForm[], @UserID() id: string): Promise<void> {
        const internalDTO = await Promise.all(
            form.map((order) => this.requestTeamFormMapper.toOrderDTO(order))
        );

        return await this.writeService.endInv(internalDTO, +id);
    }
}

/*
[작성 API]
{학생용} 수업 참여 API - [POST]
[INPUT] -> 참여코드, 학교 이름, 팀 명   
[OUTPUT] -> AccessToken(6시간?)

{학생용} 투자 완료 API - [POST]  *매도 매수 처리 로직 상의 필요
[INPUT] -> Token, 거래 내역(매도/매수 Type, 종목 id, 매도/매수 개수, 매도/매수 금액, 차수)  
[OUTPUT] ->  없음
선생님 클라이언트로 해당 학생 투자 완료 상태 변경  이벤트 발생
이벤트에 담길 내용(학생 id, 팀 명, 차수, 총 자산, 총 수익률)
*/
