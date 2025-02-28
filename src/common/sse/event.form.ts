export class EventTeamPartInForm {
    teamId: number;
    teamName: string;
    schoolName: string;

    constructor(teamId: number, teamName: string, schoolName: string) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.schoolName = schoolName;
    }
}

export class EventTeamInvEndForm {
    teamId: number;
    teamName: string;
    invDeg: number;
    totalMoney: number;
    valMoney: number;
    profitNum: string;

    constructor(
        teamId: number,
        teamName: string,
        invDeg: number,
        totalMoney: number,
        valMoney: number,
        profitNum: number
    ) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.invDeg = invDeg;
        this.totalMoney = totalMoney;
        this.valMoney = valMoney;
        this.profitNum = `${profitNum}%`;
    }
}

export class EventClassNextInvStartForm {
    classId: number;
    nextInvDeg: number;

    constructor(classId: number, nextInvDeg: number) {
        this.classId = classId;
        this.nextInvDeg = nextInvDeg;
    }
}
