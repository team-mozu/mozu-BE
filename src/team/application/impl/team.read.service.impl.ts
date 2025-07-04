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
    private rankingCache: Map<number, { data: TeamDTO[]; timestamp: number }> = new Map();
    private readonly CACHE_TTL = 5000; // 5초 캐시

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
        // 캐시 확인
        const cached = this.rankingCache.get(teamId);
        const now = Date.now();

        if (cached && now - cached.timestamp < this.CACHE_TTL) {
            return cached.data;
        }

        // 캐시가 없거나 만료된 경우 DB에서 조회
        const teams = await this.reader.findTeamRankById(teamId);

        // 캐시 업데이트
        this.rankingCache.set(teamId, { data: teams, timestamp: now });

        return teams;
    }

    async getTeamInvOrderById(teamId: number): Promise<TeamOrderDTO[]> {
        return await this.reader.findTeamInvOrderById(teamId);
    }

    // 캐시 무효화 메서드 (투자 완료 시 호출)
    invalidateRankingCache(teamId: number): void {
        this.rankingCache.delete(teamId);
    }
}
