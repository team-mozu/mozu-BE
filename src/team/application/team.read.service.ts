import { TeamDTO } from '../common/data/team.dto';
import { HoldItemDTO } from '../common/data/team.holdItem.dto';
import { TeamOrderDTO } from '../common/data/team.order.dto';

export interface TeamReadService {
    // 학생용
    sseConnect(id: number, res: any): Promise<void>;
    getTeamById(teamId: number): Promise<TeamDTO>;
    getTeamHoldItemById(teamId: number): Promise<HoldItemDTO[]>;
    getTeamOrderById(teamId: number): Promise<TeamOrderDTO[]>;
    getTeamResult(teamId: number): Promise<[TeamDTO, number]>;
    getTeamRankById(teamId: number): Promise<TeamDTO[]>;

    // 기관용
    getTeamInvOrderById(teamId: number): Promise<TeamOrderDTO[]>;
}
