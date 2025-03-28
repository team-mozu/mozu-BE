export class TeamDTO {
    id: number;
    name: string;
    schoolName: string;
    classNum: number;
    baseMoney: number;
    totalMoney: number;
    cashMoney: number;
    valueMoney: number;
    invDeg: number;
    createdAt: string;

    constructor(
        id: number,
        name: string,
        classNum: number,
        schoolName: string,
        baseMoney: number,
        totalMoney: number,
        cashMoney: number,
        valueMoney: number,
        invDeg: number,
        createdAt: string
    ) {
        this.id = id;
        this.name = name;
        this.classNum = classNum;
        this.schoolName = schoolName;
        this.baseMoney = baseMoney;
        this.totalMoney = totalMoney;
        this.cashMoney = cashMoney;
        this.valueMoney = valueMoney;
        this.invDeg = invDeg;
        this.createdAt = createdAt;
    }
}
