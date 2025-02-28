import { TeamDTO } from '../common/data/team.dto';
import { TeamOrderDTO } from '../common/data/team.order.dto';

export interface TeamWriteService {
    partInClass(teamDTO: TeamDTO): Promise<string>;
    endInv(teamOrderDto: TeamOrderDTO[], teamId: number): Promise<void>;
}
