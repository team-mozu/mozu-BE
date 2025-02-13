export class HoldItemDTO {
    id: string;
    classTeamId: string;
    itemName: string;
    itemCnt: number;
    buyMoney: number;
    valProfit: number;
    profitNum: number;

    constructor(
        holdItemId: string,
        classTeamId: string,
        itemName: string,
        itemCnt: number,
        buyMoney: number,
        valProfit: number,
        profitNum: number,

    ) {
        this.id = holdItemId;
        this.classTeamId = classTeamId;
        this.itemName = itemName;
        this.itemCnt = itemCnt;
        this.buyMoney = buyMoney;
        this.valProfit = valProfit;
        this.profitNum =profitNum;
    }
}