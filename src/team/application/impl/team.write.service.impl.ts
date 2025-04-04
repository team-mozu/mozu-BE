import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { TeamWriteService } from '../team.write.service';
import { TeamDomainWrtier } from 'src/team/domain/team.domain.writer';
import { TeamDTO } from 'src/team/common/data/team.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SseService } from 'src/common/sse/sse.service';
import { EventType } from 'src/common/sse/event.type';
import { EventTeamInvEndForm, EventTeamPartInForm } from 'src/common/sse/event.form';
import { TeamOrderDTO } from 'src/team/common/data/team.order.dto';
import { DateTimeService } from 'src/common/dateTime/dateTime.service';

@Injectable()
export class TeamWriteServiceImpl implements TeamWriteService {
    constructor(
        @Inject('repository')
        private readonly writer: TeamDomainWrtier,
        private readonly sseService: SseService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly dateTimeService: DateTimeService
    ) {}

    async partInClass(teamDTO: TeamDTO): Promise<string> {
        let existingClass;
        try {
            existingClass = await firstValueFrom(
                this.httpService.get(
                    `${this.configService.get<string>('SERVER_HOST')}/class/validate/${teamDTO.classNum}`
                )
            );
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(`${error.response.data.errMsg}`);
            } else {
                throw new InternalServerErrorException(`SERVER ERROR ㅠㅠ`);
            }
        }

        const teamData = {
            ...teamDTO,
            baseMoney: +existingClass.data.baseMoney,
            totalMoney: +existingClass.data.baseMoney,
            cashMoney: +existingClass.data.baseMoney,
            valueMoney: 0,
            createdAt: await this.dateTimeService.getNowDate()
        };

        const [team, classId] = await this.writer.save(teamData, +existingClass.data.id);

        console.log(team, classId);

        await this.sseService.sendToTeacher(
            classId,
            EventType.TEAM_PART_IN,
            new EventTeamPartInForm(team.id, team.name, team.schoolName)
        );

        return await this.signToken(team);
    }

    /**
     *
     * @param teamOrderDto
     * @param teamId
     *
     * 로직
     *
     * 1. 거래 내역 items 유효성 검사
     * 2. 거래내역 저장
     * 3. 보유 주식 저장
     * 4. 참여 팀 정보 저장
     * 5. sse로 선생님 클라이언트로 정보 전송
     */
    async endInv(teamOrderDto: TeamOrderDTO[], teamId: number): Promise<void> {
        const itemIds = teamOrderDto.map((team) => team.itemId);

        const classId = await this.writer.findClassByTeamId(teamId);

        try {
            await firstValueFrom(
                this.httpService.post(
                    `${this.configService.get<string>('SERVER_HOST')}/class/validate/item/${classId}`,
                    {
                        ids: itemIds
                    }
                )
            );
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(`${error.response.data.errMsg}`);
            } else {
                throw new InternalServerErrorException(`SERVER ERROR ㅠㅠ`);
            }
        }

        const orders = await this.writer.orderSave(teamOrderDto, teamId);
        console.log(orders);

        await Promise.all(
            orders.map((order) => {
                this.writer.holdItemSave(order, teamId);
            })
        );
        const holdItems = await this.writer.holdItemUpdateNow(teamId);
        const team = await this.writer.teamMoneyUpdate(orders, holdItems, teamId);

        await this.sseService.sendToTeacher(
            classId,
            EventType.TEAM_INV_END,
            new EventTeamInvEndForm(
                teamId,
                team.name,
                team.invDeg - 1, // 현재 끝난 차수
                team.totalMoney,
                team.totalMoney - team.baseMoney,
                ((team.totalMoney - team.baseMoney) / team.baseMoney) * 100
            )
        );
    }

    async signToken(organ: TeamDTO) {
        const payload = {
            id: organ.id,
            name: organ.name,
            role: 'STUDENT',
            type: 'access'
        };

        return await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
            expiresIn: +this.configService.get<number>('JWT_ACCESS_TOKEN_TIME')
        });
    }
}
