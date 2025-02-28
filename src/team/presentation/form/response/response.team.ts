import { TeamDTO } from 'src/team/common/data/team.dto';
import { HoldItemDTO } from 'src/team/common/data/team.holdItem.dto';

export class ResponseTeamTokenForm {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}

export class ResponseTeamForm {
    id: number;
    name: string;
    baseMoney: number;
    totalMoney: number;
    cashMoney: number;
    valueMoney: number;

    valueProfit: number;
    profitNum: string;
    invDeg: number;

    constructor(team: TeamDTO) {
        this.id = team.id;
        this.name = team.name;
        this.baseMoney = team.baseMoney;
        this.totalMoney = team.totalMoney;
        this.cashMoney = team.cashMoney;
        this.valueMoney = team.valueMoney;
        this.invDeg = team.invDeg;

        this.valueProfit = team.totalMoney - team.baseMoney;
        this.profitNum = `${((team.totalMoney - team.baseMoney) / team.baseMoney) * 100}%`;
    }
}

// id, 이름, 초기 자산, 최종 자산, 수익금, 수익률 총 거래 횟수
export class ResponseTeamResultForm {
    id: number;
    name: string;
    baseMoney: number;
    totalMoney: number;

    valueProfit: number;
    profitNum: string;
    invDeg: number;
    orderCount: number;

    constructor(team: TeamDTO, orderCount: number) {
        this.id = team.id;
        this.name = team.name;
        this.baseMoney = team.baseMoney;
        this.totalMoney = team.totalMoney;
        this.invDeg = team.invDeg - 1; // 투자 완료하면 1을 증가시킴, 과거 차수로 전달

        this.valueProfit = team.totalMoney - team.baseMoney;
        this.profitNum = `${((team.totalMoney - team.baseMoney) / team.baseMoney) * 100}%`;
        this.orderCount = orderCount;
    }
}

export class ResponseTeamRankForm {
    id: number;
    name: string;
    schoolName: string;
    totalMoney: number;
    isMyTeam: boolean;

    constructor(team: TeamDTO, teamId: number) {
        this.id = team.id;
        this.name = team.name;
        this.schoolName = team.schoolName;
        this.totalMoney = team.totalMoney;
        this.isMyTeam = team.id === teamId;
    }
}
