import { TeamDTO } from '../common/data/team.dto';
import { HoldItemDTO } from '../common/data/team.holdItem.dto';
import { TeamOrderDTO } from '../common/data/team.order.dto';

export interface TeamDomainWrtier {
    save(teamDTO: TeamDTO, classId: number): Promise<[TeamDTO, number]>;
    orderSave(teamOrderDto: TeamOrderDTO[], teamId: number): Promise<TeamOrderDTO[]>;
    holdItemSave(teamOrderDto: TeamOrderDTO, teamId: number): Promise<void>;
    holdItemUpdateNow(teamId: number): Promise<HoldItemDTO[]>;
    teamMoneyUpdate(
        orderDTOs: TeamOrderDTO[],
        holdItemDTOs: HoldItemDTO[],
        teamId: number
    ): Promise<TeamDTO>;
    findClassByTeamId(teamId: number): Promise<number>;
}
