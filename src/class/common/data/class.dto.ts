import { ClassArticleDTO } from './class.article.dto';

export class ClassDTO {
    id: number;
    name: string;
    maxInvDeg: number;
    curInvDeg: number;
    baseMoney: number;
    classNum: string;
    starYN: boolean;
    createdAt: string;
    deleteYN: boolean;

    constructor(
        id: number,
        name: string,
        maxInvDeg: number,
        curInvDeg: number,
        baseMoney: number,
        classNum: string,
        starYN: boolean,
        createdAt: string,
        deleteYN: boolean
    ) {
        this.id = id;
        this.name = name;
        (this.maxInvDeg = maxInvDeg), (this.curInvDeg = curInvDeg);
        this.baseMoney = baseMoney;
        this.classNum = classNum;
        this.starYN = starYN;
        this.createdAt = createdAt;
        this.deleteYN = deleteYN;
    }
}
