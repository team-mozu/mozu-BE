import { TeamDTO } from '../common/data/team.dto';
import { HoldItemDTO } from '../common/data/team.holdItem.dto';
import { TeamOrderDTO } from '../common/data/team.order.dto';

export interface TeamDomainReader {
    // 학생용
    findTeamById(teamId: number): Promise<TeamDTO>;
    findTeamHoldItemById(teamId: number): Promise<HoldItemDTO[]>;
    findTeamOrderById(teamId: number): Promise<TeamOrderDTO[]>;
    findTeamRankById(teamId: number): Promise<TeamDTO[]>;

    // 기관용
    findTeamInvOrderById(teamId: number): Promise<TeamOrderDTO[]>;
}
