import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TeamDomainReader } from 'src/team/domain/team.domain.reader';
import { TeamReadService } from '../team.read.service';
import { Inject, Injectable } from '@nestjs/common';
import { SseService } from 'src/common/sse/sse.service';
import { TeamDTO } from 'src/team/common/data/team.dto';
import { HoldItemDTO } from 'src/team/common/data/team.holdItem.dto';
import { TeamOrderDTO } from 'src/team/common/data/team.order.dto';

@Injectable()
export class TeamReadServiceImpl implements TeamReadService {
    constructor(
        @Inject('repository')
        private readonly reader: TeamDomainReader,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly sseService: SseService
    ) {}

    async sseConnect(id: number, res: any): Promise<void> {
        return await this.sseService.addStudentClient(id, res);
    }

    async getTeamById(teamId: number): Promise<TeamDTO> {
        return await this.reader.findTeamById(teamId);
    }

    async getTeamHoldItemById(teamId: number): Promise<HoldItemDTO[]> {
        return await this.reader.findTeamHoldItemById(teamId);
    }

    async getTeamOrderById(teamId: number): Promise<TeamOrderDTO[]> {
        return await this.reader.findTeamOrderById(teamId);
    }

    async getTeamResult(teamId: number): Promise<[TeamDTO, number]> {
        const team = await this.reader.findTeamById(teamId);
        const orders = await this.reader.findTeamInvOrderById(teamId);

        return [team, orders.length];
    }

    async getTeamRankById(teamId: number): Promise<TeamDTO[]> {
        return await this.reader.findTeamRankById(teamId);
    }

    async getTeamInvOrderById(teamId: number): Promise<TeamOrderDTO[]> {
        return await this.reader.findTeamInvOrderById(teamId);
    }
}
