import { TeamDTO } from 'src/team/common/data/team.dto';
import { RequestTeamOrderForm } from './request.team.order';
import { TeamOrderDTO } from 'src/team/common/data/team.order.dto';
import { RequestTeamForm } from './request.team';

export class RequestTeamFormMapper {
    async toDTO(form: RequestTeamForm): Promise<TeamDTO> {
        return new TeamDTO(
            null,
            form.teamName,
            form.classNum,
            form.schoolName,
            null,
            null,
            null,
            null,
            1,
            null
        );
    }

    async toOrderDTO(form: RequestTeamOrderForm): Promise<TeamOrderDTO> {
        return new TeamOrderDTO(
            null,
            form.itemId,
            form.itemName,
            form.itemMoney,
            form.orderCount,
            form.totalMoney,
            form.orderType,
            null
        );
    }
}
